import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function DecorativeLines({ factorRef, cameraRef }: { factorRef: React.MutableRefObject<number>; cameraRef: React.MutableRefObject<THREE.Vector3> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const result: THREE.Line[] = [];
    for (let i = 0; i < 4; i++) {
      const points = [];
      for (let j = 0; j <= 50; j++) {
        const t = j / 50;
        points.push(new THREE.Vector3(
          (t - 0.5) * 8,
          Math.sin(t * Math.PI * 2 + i) * 0.5,
          (t - 0.5) * 4
        ));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: '#86868B', transparent: true, opacity: 0.3 });
      const line = new THREE.Line(geo, mat);
      result.push(line);
    }
    return result;
  }, []);
  
  useEffect(() => {
    if (groupRef.current) {
      lines.forEach(line => groupRef.current!.add(line));
    }
    return () => {
      if (groupRef.current) {
        lines.forEach(line => groupRef.current!.remove(line));
      }
    };
  }, [lines]);
  
  useFrame((state) => {
    const et = state.clock.getElapsedTime();
    const factor = factorRef.current;
    const camPos = cameraRef.current;
    
    lines.forEach((line, i) => {
      const positions = line.geometry.attributes.position;
      const arr = positions.array as Float32Array;
      
      for (let j = 0; j < positions.count; j++) {
        const idx = j * 3;
        const z = (j / positions.count - 0.5) * 4;
        
        if (i === 0) {
          arr[idx + 1] = Math.sin(et * 0.5) * camPos.x * 2;
          arr[idx] = z * factor * 0.2;
        } else if (i === 1) {
          arr[idx + 1] = Math.cos(et * 0.5) * camPos.y * 2;
          arr[idx] = z * factor * 0.2 - camPos.x * 2;
        } else if (i === 2) {
          arr[idx + 1] = Math.sin(et * 0.5) * camPos.y * 2;
          arr[idx] = z * factor * 0.5 - camPos.x;
        } else {
          arr[idx + 1] = Math.cos(et * 0.5) * camPos.x * 2;
          arr[idx] = z * factor * 0.5 + camPos.x;
        }
      }
      
      positions.needsUpdate = true;
      line.geometry.computeBoundingSphere();
    });
  });
  
  return <group ref={groupRef} />;
}

function ParallaxContent() {
  const groupRef = useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const factorRef = useRef(1);
  const cameraPosRef = useRef(new THREE.Vector3());
  
  useFrame((state) => {
    const { mouse, clock } = state;
    const et = clock.getElapsedTime();
    
    // Smooth camera follow
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouse.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);
    
    // Calculate factor
    const factor = 1 - Math.abs(Math.sqrt(state.camera.position.x ** 2 + state.camera.position.y ** 2) * 0.2);
    factorRef.current = factor;
    cameraPosRef.current.copy(state.camera.position);
    
    // Update box rotation (reverse to mouse)
    if (boxRef.current) {
      boxRef.current.rotation.x = Math.sin(et * 0.2) * 0.1 + mouse.y * factor * 0.1;
      boxRef.current.rotation.y = Math.cos(et * 0.5) * 0.1 + mouse.x * factor * 0.1;
    }
    
    // Update background meshes (parallax)
    if (mesh1Ref.current) {
      mesh1Ref.current.position.x = -state.camera.position.x * 1.5;
      mesh1Ref.current.position.y = -state.camera.position.y * 1.5;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.position.x = state.camera.position.x * 1.5;
      mesh2Ref.current.position.y = -state.camera.position.y * 1.5;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Background planes */}
      <mesh ref={mesh1Ref} position={[-2, 0, -3]}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial color="#E8E8ED" transparent opacity={0.5} />
      </mesh>
      <mesh ref={mesh2Ref} position={[2, 0, -4]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshBasicMaterial color="#DEDEE3" transparent opacity={0.4} />
      </mesh>
      
      {/* Central RoundedBox */}
      <RoundedBox
        ref={boxRef}
        args={[1.2, 1.2, 1.2]}
        radius={0.15}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#111111"
          roughness={0.3}
          metalness={0.6}
        />
      </RoundedBox>
      
      {/* Decorative lines */}
      <DecorativeLines factorRef={factorRef} cameraRef={cameraPosRef} />
      
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={0.8} />
      <pointLight position={[-3, -2, 2]} intensity={0.3} color="#007AFF" />
    </group>
  );
}

export default function ParallaxScene3D() {
  return (
    <div style={{ width: '100%', height: '280px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ParallaxContent />
      </Canvas>
    </div>
  );
}
