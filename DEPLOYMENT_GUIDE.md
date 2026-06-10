# 髋关节康复训练系统 - 部署指南

## 目录

1. [项目架构](#1-项目架构)
2. [环境要求](#2-环境要求)
3. [开发环境搭建](#3-开发环境搭建)
4. [生产环境部署](#4-生产环境部署)
5. [数据库配置](#5-数据库配置)
6. [域名与HTTPS配置](#6-域名与https配置)
7. [Nginx配置](#7-nginx配置)
8. [PM2进程管理](#8-pm2进程管理)
9. [环境变量配置](#9-环境变量配置)
10. [验证测试](#10-验证测试)

---

## 1. 项目架构

```
├── Kangfu/                    # 项目根目录
│   ├── app/                   # 前端应用 (React + TypeScript)
│   │   ├── src/               # 前端源代码
│   │   ├── public/            # 静态资源
│   │   └── package.json       # 前端依赖配置
│   ├── backend/               # 后端服务 (Node.js + Express)
│   │   ├── src/               # 后端源代码
│   │   │   ├── controllers/   # 控制器
│   │   │   ├── models/        # 数据模型
│   │   │   ├── routes/        # 路由配置
│   │   │   ├── middleware/    # 中间件
│   │   │   ├── config/        # 配置文件
│   │   │   └── server.ts      # 服务器入口
│   │   ├── dist/              # 编译输出目录
│   │   └── package.json       # 后端依赖配置
│   └── DEPLOYMENT_GUIDE.md    # 部署指南
```

---

## 2. 环境要求

### 基础环境
| 组件 | 版本要求 | 说明 |
|------|----------|------|
| Node.js | >= 20.x | 推荐 LTS 版本 |
| npm | >= 9.x | 包管理器 |
| MongoDB | >= 6.x | 数据库 |
| Nginx | >= 1.20.x | 反向代理 |

### 服务器配置（生产环境）
| 配置项 | 最低要求 | 推荐配置 |
|--------|----------|----------|
| CPU | 2核 | 4核 |
| 内存 | 2GB | 4GB |
| 存储 | 20GB | 50GB |
| 带宽 | 1Mbps | 10Mbps |

---

## 3. 开发环境搭建

### 3.1 克隆项目

```bash
cd /path/to/your/workspace
git clone <repository-url>
cd Kangfu
```

### 3.2 安装前端依赖

```bash
cd app
npm install
```

### 3.3 安装后端依赖

```bash
cd ../backend
npm install
```

### 3.4 启动开发服务器

**启动前端（开发模式）：**
```bash
cd app
npm run dev
# 访问: http://localhost:5173
```

**启动后端（开发模式）：**
```bash
cd backend
npm run dev
# 访问: http://localhost:5000
```

---

## 4. 生产环境部署

### 4.1 服务器准备

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MongoDB
sudo apt-get install -y mongodb

# 安装 Nginx
sudo apt-get install -y nginx

# 安装 PM2
npm install -g pm2
```

### 4.2 构建应用

**构建前端：**
```bash
cd app
npm run build
```

**构建后端：**
```bash
cd backend
npm run build
```

### 4.3 部署文件

```bash
# 创建项目目录
sudo mkdir -p /var/www/kangfu

# 复制前端构建文件
sudo cp -r app/dist/* /var/www/kangfu/

# 复制后端文件
sudo cp -r backend/dist /var/www/kangfu/api
sudo cp backend/package.json /var/www/kangfu/api/

# 安装后端生产依赖
cd /var/www/kangfu/api
npm install --production
```

---

## 5. 数据库配置

### 5.1 MongoDB配置

```bash
# 启动 MongoDB 服务
sudo systemctl start mongodb
sudo systemctl enable mongodb

# 创建数据库用户
mongo
use kangfu_db
db.createUser({
  user: "kangfu_user",
  pwd: "your_secure_password",
  roles: [{ role: "readWrite", db: "kangfu_db" }]
})
exit
```

### 5.2 导入初始数据

```bash
# 创建初始数据文件
cat > /tmp/init_data.js << 'EOF'
db.exercises.insertMany([
  {
    name: "踝泵训练",
    coverImage: "/images/hero-training.jpg",
    duration: 300,
    category: "hip",
    phase: "early",
    sets: 3,
    reps: 10,
    description: "通过踝关节的屈伸运动，促进下肢血液循环，预防深静脉血栓形成。",
    keyPoints: ["尽量屈伸踝关节", "动作缓慢有控制", "保持5分钟/次"],
    commonMistakes: ["动作过快", "幅度不够", "膝盖跟着晃动"]
  },
  {
    name: "躯干旋转训练",
    coverImage: "/images/hero-training.jpg",
    duration: 300,
    category: "hip",
    phase: "early",
    sets: 3,
    reps: 10,
    description: "由家属帮助固定骨盆，协助患者脊柱整体缓慢进行旋转。",
    keyPoints: ["家属固定骨盆", "脊柱整体旋转", "动作缓慢平稳"],
    commonMistakes: ["用力过猛", "骨盆跟着转动", "旋转幅度过大"]
  },
  {
    name: "勾脚尖训练",
    coverImage: "/images/hero-training.jpg",
    duration: 300,
    category: "hip",
    phase: "middle",
    sets: 3,
    reps: 10,
    description: "身体正直站立，双手扶住栏杆或椅背，抬起脚尖。",
    keyPoints: ["身体正直", "脚跟着地", "抬起脚尖"],
    commonMistakes: ["身体晃动", "脚跟抬起", "动作过快"]
  },
  {
    name: "提踵训练",
    coverImage: "/images/hero-training.jpg",
    duration: 300,
    category: "hip",
    phase: "middle",
    sets: 3,
    reps: 10,
    description: "两脚尖着地，抬脚跟，使身体自然前倾。",
    keyPoints: ["脚尖着地", "抬起脚跟", "身体前倾"],
    commonMistakes: ["身体不稳", "脚尖抬起", "幅度不够"]
  },
  {
    name: "倒着走",
    coverImage: "/images/hero-training.jpg",
    duration: 300,
    category: "hip",
    phase: "late",
    sets: 3,
    reps: 5,
    description: "借助相关辅助工具，向后缓慢行走，训练平衡能力。",
    keyPoints: ["借助辅助工具", "缓慢行走", "保持平衡"],
    commonMistakes: ["速度过快", "不看后方", "身体不稳"]
  },
  {
    name: "8字走",
    coverImage: "/images/hero-training.jpg",
    duration: 300,
    category: "hip",
    phase: "late",
    sets: 3,
    reps: 2,
    description: "借助相关辅助工具，在平地按8字行走。",
    keyPoints: ["保持8字轨迹", "速度均匀", "身体稳定"],
    commonMistakes: ["轨迹不标准", "速度过快", "身体晃动"]
  }
]);
EOF

# 导入数据
mongo kangfu_db /tmp/init_data.js
```

---

## 6. 域名与HTTPS配置

### 6.1 域名注册

1. 在域名服务商处注册域名（如阿里云、腾讯云、GoDaddy）
2. 将域名解析到服务器IP

### 6.2 申请SSL证书（Let's Encrypt）

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 自动更新证书
sudo certbot renew --dry-run
```

---

## 7. Nginx配置

```bash
# 创建Nginx配置文件
sudo cat > /etc/nginx/sites-available/kangfu << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # 重定向HTTP到HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    # SSL配置
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 前端静态文件
    location / {
        root /var/www/kangfu;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 启用配置
sudo ln -s /etc/nginx/sites-available/kangfu /etc/nginx/sites-enabled/

# 测试配置并重启
sudo nginx -t
sudo systemctl restart nginx
```

---

## 8. PM2进程管理

### 8.1 创建PM2配置文件

```bash
cat > /var/www/kangfu/api/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'kangfu-api',
    script: 'dist/server.js',
    cwd: '/var/www/kangfu/api',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000,
      MONGO_URI: 'mongodb://localhost:27017/kangfu_db',
      JWT_SECRET: 'your_secure_jwt_secret_here',
    },
    error_file: '/var/log/kangfu/api-error.log',
    out_file: '/var/log/kangfu/api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    restart_delay: 4000,
    max_restarts: 10,
  }]
};
EOF
```

### 8.2 启动服务

```bash
# 创建日志目录
sudo mkdir -p /var/log/kangfu

# 启动PM2服务
cd /var/www/kangfu/api
pm2 start ecosystem.config.js

# 设置开机自启
pm2 startup
pm2 save
```

### 8.3 PM2常用命令

```bash
pm2 status              # 查看状态
pm2 logs kangfu-api     # 查看日志
pm2 restart kangfu-api  # 重启服务
pm2 stop kangfu-api     # 停止服务
pm2 reload kangfu-api   # 零停机重启
```

---

## 9. 环境变量配置

### 后端环境变量（.env）

```bash
# 数据库配置
MONGO_URI=mongodb://localhost:27017/kangfu_db

# 服务器配置
PORT=5000
NODE_ENV=production

# JWT配置
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here

# 前端配置（可选）
CLIENT_URL=https://yourdomain.com
```

### 前端环境变量

在前端项目根目录创建 `.env.production`：

```bash
VITE_API_URL=https://yourdomain.com/api
VITE_APP_NAME=髋关节康复训练系统
```

---

## 10. 验证测试

### 10.1 健康检查

```bash
# 检查后端服务
curl https://yourdomain.com/api/health

# 预期响应:
# {"message":"服务器运行正常","timestamp":"2024-01-01T12:00:00.000Z"}
```

### 10.2 API测试

```bash
# 测试用户注册
curl -X POST https://yourdomain.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "password": "123456",
    "surgeryType": "髋关节翻修术",
    "surgeryDate": "2024-01-01",
    "doctorName": "李医生"
  }'

# 测试用户登录
curl -X POST https://yourdomain.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### 10.3 前端测试

1. 访问 `https://yourdomain.com`
2. 检查页面是否正常加载
3. 测试登录、注册功能
4. 测试训练计划查看和打卡功能
5. 测试评估报告功能

---

## 11. 安全建议

| 措施 | 说明 |
|------|------|
| 防火墙 | 只开放80、443端口 |
| 定期更新 | 定期更新系统和依赖 |
| 日志监控 | 配置日志轮转和监控告警 |
| 备份策略 | 定期备份数据库 |
| 权限管理 | 最小化文件和数据库权限 |

---

## 附录：常用命令

```bash
# 查看服务器状态
htop

# 查看网络状态
netstat -tlnp

# 查看Nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 查看MongoDB日志
tail -f /var/log/mongodb/mongod.log
```
