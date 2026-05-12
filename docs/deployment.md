# 部署指南

本指南涵盖 Virtual Team 平台的多种部署方式。

---

## 📋 目录

- [前置准备](#前置准备)
- [Docker 部署](#docker-部署)
- [Vercel + Fly.io 部署](#vercel--flyio-部署)
- [传统服务器部署](#传统服务器部署)
- [环境变量配置](#环境变量配置)

---

## 前置准备

### 必需的服务

1. **PostgreSQL 数据库** - 主数据库
2. **Redis** - 可选，用于任务队列
3. **GitHub App** - 用于 GitHub 集成
4. **Stripe 账号** - 用于支付（可选）
5. **Anthropic API Key** - 用于 AI 功能

---

## Docker 部署

### 使用 Docker Compose（推荐用于开发/测试）

1. 确保已安装 Docker 和 Docker Compose
2. 在项目根目录运行：

```bash
docker-compose up -d
```

### 生产环境 Docker 部署

1. 构建镜像：

```bash
# 构建 API
docker build -f apps/api/Dockerfile -t virtualteam/api:latest .

# 构建 Web
docker build -f apps/web/Dockerfile -t virtualteam/web:latest .

# 构建 GitHub App
docker build -f apps/github-app/Dockerfile -t virtualteam/github-app:latest .
```

2. 使用 Docker Compose 启动生产环境：

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## Vercel + Fly.io 部署

### 前端部署到 Vercel

1. 安装 Vercel CLI：

```bash
npm i -g vercel
```

2. 部署前端：

```bash
cd apps/web
vercel --prod
```

3. 配置环境变量：
   - 在 Vercel 项目设置中添加所有必要的环境变量
   - 确保 `NEXT_PUBLIC_API_URL` 指向你的 API 地址

### 后端部署到 Fly.io

1. 安装 Fly CLI：

```bash
curl -L https://fly.io/install.sh | sh
```

2. 部署 API：

```bash
cd apps/api
fly launch
fly deploy
```

3. 部署 GitHub App：

```bash
cd apps/github-app
fly launch
fly deploy
```

4. 配置数据库：

```bash
fly postgres create
fly postgres attach --app <your-api-app> <your-db-app>
```

---

## 传统服务器部署

### 1. 服务器准备

确保服务器满足以下要求：
- Ubuntu 20.04+ 或 Debian 11+
- Node.js 20+
- PostgreSQL 14+
- Redis 7+（可选）
- Nginx（用作反向代理）

### 2. 安装依赖

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 pnpm
npm install -g pnpm@9

# 安装 PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# 安装 Redis（可选）
sudo apt install -y redis-server

# 安装 Nginx
sudo apt install -y nginx
```

### 3. 配置数据库

```bash
# 创建数据库用户
sudo -u postgres createuser -P virtualteam

# 创建数据库
sudo -u postgres createdb -O virtualteam virtualteam_prod
```

### 4. 部署应用

```bash
# 克隆项目
cd /var/www
git clone https://github.com/xiejianjun000/virtual-team.git
cd virtual-team

# 安装依赖
pnpm install --frozen-lockfile

# 配置环境变量
cp .env.example .env
# 编辑 .env，设置生产环境配置

# 构建项目
pnpm build

# 运行数据库迁移
pnpm db:push
```

### 5. 使用 PM2 管理进程

```bash
# 安装 PM2
npm install -g pm2

# 启动 API
cd apps/api
pm2 start ecosystem.config.js --name virtualteam-api

# 启动 Web
cd ../web
pm2 start ecosystem.config.js --name virtualteam-web

# 启动 GitHub App
cd ../github-app
pm2 start ecosystem.config.js --name virtualteam-github-app

# 保存 PM2 配置
pm2 save
pm2 startup
```

### 6. 配置 Nginx 反向代理

创建 `/etc/nginx/sites-available/virtualteam`：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # GitHub Webhook
    location /webhook {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/virtualteam /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. 配置 SSL（使用 Let's Encrypt）

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 环境变量配置

复制 `.env.example` 为 `.env` 并配置以下变量：

```bash
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/virtualteam_prod"

# Redis（可选）
REDIS_URL="redis://localhost:6379"

# API
API_PORT=3001
API_HOST="0.0.0.0"

# Web
NEXT_PUBLIC_API_URL="https://your-domain.com/api"

# GitHub App
GITHUB_APP_ID="your-github-app-id"
GITHUB_PRIVATE_KEY="your-private-key"
GITHUB_WEBHOOK_SECRET="your-webhook-secret"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Anthropic
ANTHROPIC_API_KEY="sk-ant-..."

# 生产环境
NODE_ENV="production"
```

---

## 🚀 部署检查清单

部署后，请确认以下事项：

- [ ] 所有环境变量已正确配置
- [ ] 数据库连接正常
- [ ] Redis 连接正常（如使用）
- [ ] SSL 证书已安装并生效
- [ ] 日志系统已配置
- [ ] 监控告警已设置
- [ ] 备份策略已建立
- [ ] CI/CD 流程正常工作

---

## 📞 需要帮助？

如有部署问题，请开启 [Issue](https://github.com/xiejianjun000/virtual-team/issues)。

---

*文档版本：v1.0*
*最后更新：2026-05-12*
