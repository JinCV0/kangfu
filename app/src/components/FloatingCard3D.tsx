import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform sampler2D uDataTexture;
  uniform sampler2D uTexture;
  uniform vec4 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 data = texture2D(uDataTexture, uv);
    vec3 transformed = vec3(position.x, position.y, position.z) + vec3(data.r, data.g, 0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uDataTexture;
  uniform sampler2D uTexture;
  uniform vec4 uMouse;
  varying vec2 vUv;

  vec3 rgb(sampler2D image, vec2 uv) {
    vec4 tex = texture2D(image, uv);
    return vec3(tex.b, tex.g, tex.r);
  }

  void main() {
    vec3 color = rgb(uTexture, vUv);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const dataFragmentShader = `
  precision highp float;
  uniform vec4 uMouse;
  uniform vec2 uMouseDirection;
  uniform float uTime;
  uniform float uRelaxation;
  uniform sampler2D uDataTexture;
  uniform float uStrength;
  varying vec2 vUv;

  #define M_PI 3.141592653589793

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec4 data = texture2D(uDataTexture, vUv);
    float dist = sqrt((vUv.x - uMouse.x)*(vUv.x - uMouse.x) + (vUv.y - uMouse.y)*(vUv.y - uMouse.y));
    float distance = 0.25;
    float displacement = data.b;

    if (dist <= distance && displacement < 0.6) {
      float angle = atan(uMouseDirection.y, uMouseDirection.x) - M_PI * 0.5;
      vec2 dir = vec2(cos(angle), sin(angle));
      float strength = clamp((distance - dist) / distance, 0.0, 1.0);
      data.rg += dir.xy * strength * uStrength;
      data.b += strength * uStrength;
    }

    // Relaxation branch
    float d1 = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
    float d2 = cos(vUv.y * 8.0 + uTime * 0.8) * 0.5 + 0.5;
    float relaxFactor = d1 * d2;
    data.rg += (-data.rg + (data.rg * relaxFactor)) * uRelaxation;
    data.b *= (1.0 - uRelaxation * 0.5);

    gl_FragColor = data;
  }
`;

const dataVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function FloatingMesh({ imagePath }: { imagePath: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const texture = useTexture(imagePath);
  
  const width = Math.min(viewport.width * 0.85, 3.2);
  const height = width * 1.25;
  
  const [dataTexture, dataMaterial] = useMemo(() => {
    const size = 256;
    const data = new Float32Array(size * size * 4);
    for (let i = 0; i < size * size * 4; i += 4) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 1;
    }
    
    const dt = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dt.minFilter = THREE.NearestFilter;
    dt.magFilter = THREE.NearestFilter;
    dt.needsUpdate = true;
    
    const dm = new THREE.ShaderMaterial({
      vertexShader: dataVertexShader,
      fragmentShader: dataFragmentShader,
      uniforms: {
        uDataTexture: { value: dt },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseDirection: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uRelaxation: { value: 0.4 },
        uStrength: { value: 1.0 },
      },
    });
    
    return [dt, dm];
  }, []);
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uDataTexture: { value: dataTexture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
    });
  }, [texture, dataTexture]);
  
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const clock = useRef(new THREE.Clock());
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX / window.innerWidth;
        mouse.current.y = 1.0 - e.touches[0].clientY / window.innerHeight;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const elapsed = clock.current.getElapsedTime();
    
    // Lerp mouse
    smoothMouse.current.lerp(mouse.current, 0.1);
    
    // Calculate direction
    const dir = new THREE.Vector2(
      mouse.current.x - prevMouse.current.x,
      mouse.current.y - prevMouse.current.y
    );
    if (dir.length() > 0) dir.normalize();
    
    // Update data texture uniforms
    dataMaterial.uniforms.uMouse.value.copy(smoothMouse.current);
    dataMaterial.uniforms.uMouseDirection.value.copy(dir);
    dataMaterial.uniforms.uTime.value = elapsed;
    
    // Render data texture to itself using a temporary scene
    const tempScene = new THREE.Scene();
    const tempCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1);
    const tempMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), dataMaterial);
    tempScene.add(tempMesh);
    
    const renderer = meshRef.current.parent?.userData.renderer;
    if (renderer) {
      const currentTarget = renderer.getRenderTarget();
      renderer.setRenderTarget(dataTexture as any);
      renderer.render(tempScene, tempCamera);
      renderer.setRenderTarget(currentTarget);
      (dataTexture as any).needsUpdate = true;
    }
    
    // Update display material
    material.uniforms.uMouse.value.copy(smoothMouse.current);
    
    // Auto rotation
    meshRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.08;
    meshRef.current.rotation.x = Math.cos(elapsed * 0.2) * 0.03;
    meshRef.current.position.y = Math.sin(elapsed * 0.5) * 0.05;
    
    prevMouse.current.copy(mouse.current);
  });
  
  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[width, height, 80, 80]} />
    </mesh>
  );
}

export default function FloatingCard3D({ imagePath }: { imagePath: string }) {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <FloatingMesh imagePath={imagePath} />
      </Canvas>
    </div>
  );
}
