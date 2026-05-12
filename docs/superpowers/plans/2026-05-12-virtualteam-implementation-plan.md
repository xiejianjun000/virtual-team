# VirtualTeam 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建完整的 VirtualTeam SaaS 产品，包括前端、后端 API、GitHub App，支持 50+ AI 智能体虚拟工程团队

**Architecture:** 分离架构（Monorepo） - Next.js 前端 + Node.js API + PostgreSQL + Probot GitHub App + BullMQ 任务队列

**Tech Stack:** 
- 前端: Next.js 15, React, Tailwind CSS, shadcn/ui, tRPC, Pusher
- 后端: Node.js, Fastify, tRPC, Prisma, Redis
- 数据库: PostgreSQL (Neon), Redis (Upstash)
- GitHub: Probot, GitHub App SDK
- 支付: Stripe
- 邮件: Resend
- 部署: Vercel (前端), Railway (后端/GitHub App)

---

## 项目概述

### 阶段划分

| 阶段 | 周期 | 内容 |
|------|------|------|
| **Phase 0** | 1 周 | 项目初始化、环境配置 |
| **Phase 1** | 3 周 | 用户系统、GitHub OAuth |
| **Phase 2** | 4 周 | GitHub App、仓库管理 |
| **Phase 3** | 4 周 | AI 任务队列、Claude 集成 |
| **Phase 4** | 2 周 | 前端控制台 UI |
| **Phase 5** | 2 周 | 订阅系统、Stripe 集成 |
| **Phase 6** | 1 周 | 上线准备、测试 |

**总工期：约 13 周**

---

## 项目结构

```
virtualteam/
├── apps/
│   ├── web/                    # Next.js 前端 (Vercel)
│   │   ├── app/
│   │   │   ├── (auth)/        # 认证页面
│   │   │   │   ├── login/
│   │   │   │   └── callback/
│   │   │   ├── (dashboard)/   # 仪表盘
│   │   │   │   ├── page.tsx   # 首页
│   │   │   │   ├── repositories/
│   │   │   │   ├── tasks/
│   │   │   │   ├── knowledge/
│   │   │   │   └── settings/
│   │   │   ├── pricing/       # 定价页
│   │   │   └── api/           # API 路由
│   │   ├── components/
│   │   │   ├── ui/           # shadcn/ui 组件
│   │   │   ├── dashboard/     # 仪表盘组件
│   │   │   └── billing/      # 账单组件
│   │   ├── lib/
│   │   │   ├── trpc.ts       # tRPC 客户端
│   │   │   └── stripe.ts     # Stripe 客户端
│   │   └── package.json
│   │
│   ├── api/                   # Node.js API (Railway)
│   │   ├── src/
│   │   │   ├── index.ts      # 入口
│   │   │   ├── app.ts        # Fastify 实例
│   │   │   ├── router/       # tRPC 路由
│   │   │   │   ├── _app.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── repository.ts
│   │   │   │   ├── task.ts
│   │   │   │   ├── knowledge.ts
│   │   │   │   └── subscription.ts
│   │   │   ├── service/      # 业务逻辑
│   │   │   │   ├── github.service.ts
│   │   │   │   ├── claude.service.ts
│   │   │   │   └── stripe.service.ts
│   │   │   ├── worker/       # BullMQ Workers
│   │   │   │   ├── index.ts
│   │   │   │   └── ai-tasks.worker.ts
│   │   │   └── lib/
│   │   │       ├── prisma.ts
│   │   │       ├── redis.ts
│   │   │       └── github.ts
│   │   └── package.json
│   │
│   └── github-app/            # GitHub App (Railway)
│       ├── src/
│       │   ├── index.ts      # 入口
│       │   ├── app.ts        # Probot 实例
│       │   ├── handlers/     # Webhook 处理器
│       │   │   ├── index.ts
│       │   │   ├── installation.ts
│       │   │   ├── pull_request.ts
│       │   │   ├── push.ts
│       │   │   └── issue_comment.ts
│       │   └── lib/
│       │       └── gstack.ts
│       └── package.json
│
├── packages/
│   ├── db/                    # Prisma Schema
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── package.json
│   │
│   └── config/               # 共享配置
│       ├── eslint/
│       │   └── base.js
│       └── typescript/
│           └── base.json
│
├── docker-compose.yml         # 本地开发
├── turbo.json                 # Turborepo 配置
├── package.json              # 根 package.json
├── .env.example             # 环境变量示例
└── README.md
```

---

## Phase 0: 项目初始化 (Week 1)

### Task 0.1: 初始化 Monorepo 结构

**文件:**
- 创建: `package.json`
- 创建: `turbo.json`
- 创建: `docker-compose.yml`
- 创建: `.env.example`
- 创建: `.gitignore`

- [ ] **Step 1: 创建根目录结构**

```bash
mkdir -p virtualteam/packages/{db,config}
mkdir -p virtualteam/apps/{web,api,github-app}
```

- [ ] **Step 2: 创建根 package.json**

```json
{
  "name": "virtualteam",
  "version": "0.0.1",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test",
    "db:push": "pnpm --filter @virtualteam/db db:push",
    "db:studio": "pnpm --filter @virtualteam/db db:studio",
    "db:migrate": "pnpm --filter @virtualteam/db db:migrate",
    "db:seed": "pnpm --filter @virtualteam/db db:seed"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

- [ ] **Step 3: 创建 turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

- [ ] **Step 4: 创建 docker-compose.yml**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: virtualteam
      POSTGRES_PASSWORD: virtualteam
      POSTGRES_DB: virtualteam
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # 可选：本地开发用的完整服务
  # neon-local:
  #   image: neondatabase/postgres
  #   environment:
  #     POSTGRES_USER: virtualteam
  #     POSTGRES_PASSWORD: virtualteam
  #     POSTGRES_DB: virtualteam
  #     POSTGRES_HOST_AUTH_METHOD: trust

volumes:
  postgres_data:
  redis_data:
```

- [ ] **Step 5: 创建 .env.example**

```bash
# Database
DATABASE_URL="postgresql://virtualteam:virtualteam@localhost:5432/virtualteam"

# Redis
REDIS_URL="redis://localhost:6379"

# GitHub App
GITHUB_APP_ID="123456"
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
GITHUB_WEBHOOK_SECRET="your-webhook-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-client-id"
GITHUB_CLIENT_SECRET="your-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Clerk (Auth)
CLERK_SECRET_KEY="sk_test_..."
CLERK_PUBLISHABLE_KEY="pk_test_..."

# Resend (Email)
RESEND_API_KEY="re_..."

# Claude API
ANTHROPIC_API_KEY="sk-ant-..."

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Pusher (Real-time)
PUSHER_APP_ID="..."
PUSHER_KEY="..."
PUSHER_SECRET="..."
PUSHER_CLUSTER="..."
NEXT_PUBLIC_PUSHER_KEY="..."
NEXT_PUBLIC_PUSHER_CLUSTER="..."
```

- [ ] **Step 6: 创建 .gitignore**

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
.next/
dist/
.turbo/
out/

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/

# Prisma
packages/db/prisma/migrations/
packages/db/.env

# Turborepo
.turbo/

# Misc
*.local
```

- [ ] **Step 7: 初始化 Git**

```bash
cd virtualteam
git init
git add .
git commit -m "chore: 初始化 Monorepo 项目结构"
```

### Task 0.2: 配置 packages

**文件:**
- 创建: `packages/config/eslint/base.js`
- 创建: `packages/config/typescript/base.json`

- [ ] **Step 1: 创建 ESLint 配置**

```javascript
// packages/config/eslint/base.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

- [ ] **Step 2: 创建 TypeScript 配置**

```json
// packages/config/typescript/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "composite": true,
    "resolveJsonModule": true
  },
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 8: 提交**

```bash
git add packages/config
git commit -m "chore: 添加共享配置包"
```

### Task 0.3: 设置 Prisma 数据库包

**文件:**
- 创建: `packages/db/package.json`
- 创建: `packages/db/prisma/schema.prisma`
- 创建: `packages/db/tsconfig.json`

- [ ] **Step 1: 创建 db 包 package.json**

```json
{
  "name": "@virtualteam/db",
  "version": "0.0.1",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:migrate": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts",
    "db:generate": "prisma generate",
    "build": "tsc --build",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@prisma/client": "^5.14.0"
  },
  "devDependencies": {
    "prisma": "^5.14.0",
    "tsx": "^4.10.0",
    "typescript": "^5.4.0",
    "@virtualteam/config": "workspace:*"
  },
  "prisma": {
    "schema": "prisma/schema.prisma"
  }
}
```

- [ ] **Step 2: 创建 Prisma Schema**

```prisma
// packages/db/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User - 用户
model User {
  id            String    @id @default(cuid())
  githubId      String    @unique
  githubLogin  String?
  email         String?   @unique
  name          String?
  avatarUrl     String?
  plan          Plan      @default(FREE)
  stripeCustomerId String? @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  repositories  Repository[]
  subscription  Subscription?
}

// Plan - 订阅套餐
enum Plan {
  FREE
  PRO
  TEAM
}

// Subscription - 订阅
model Subscription {
  id               String             @id @default(cuid())
  userId           String             @unique
  user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan             Plan
  status           SubscriptionStatus
  stripeSubscriptionId String?       @unique
  stripePriceId    String?
  currentPeriodEnd DateTime
  cancelAtPeriodEnd Boolean           @default(false)
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  PAUSED
  INCOMPLETE
  TRIALING
}

// Repository - GitHub 仓库
model Repository {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  githubRepoId    Int       @unique
  name            String
  fullName        String
  description     String?
  defaultBranch   String    @default("main")
  isEnabled       Boolean   @default(true)
  installedAt     DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  tasks           Task[]
  releases        Release[]
  auditReports    AuditReport[]
  knowledgeItems  Knowledge[]
  webhookEvents   WebhookEvent[]

  @@index([userId])
}

// Task - AI 任务
model Task {
  id              String     @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  type            TaskType
  status          TaskStatus @default(PENDING)
  progress        Int        @default(0)
  title           String
  input           Json?
  output          Json?
  error           String?
  startedAt       DateTime?
  completedAt     DateTime?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@index([repositoryId])
  @@index([status])
  @@index([createdAt])
}

enum TaskType {
  REVIEW
  QA
  SHIP
  CSO
  BENCHMARK
  AUTO_CONFIG
  DAILY_AUDIT
  DEPLOY
}

enum TaskStatus {
  PENDING
  QUEUED
  RUNNING
  COMPLETED
  FAILED
  CANCELED
}

// Release - 发布记录
model Release {
  id              String    @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  version         String
  title           String
  body            String?   @db.Text
  prNumber        Int?
  prUrl           String?
  publishedAt     DateTime?
  createdAt       DateTime  @default(now())

  @@index([repositoryId])
  @@index([publishedAt])
}

// AuditReport - 审计报告
model AuditReport {
  id              String    @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  date            DateTime  @db.Date
  summary         Json
  issues          Json?
  createdAt       DateTime  @default(now())

  @@unique([repositoryId, date])
  @@index([createdAt])
}

// Knowledge - 沉淀知识
model Knowledge {
  id              String    @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id], onDelete: Cascade)
  title           String
  content         String    @db.Text
  tags            String[]
  sourceTaskId    String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([repositoryId])
  @@index([tags])
}

// WebhookEvent - Webhook 事件记录
model WebhookEvent {
  id              String    @id @default(cuid())
  repositoryId    String?
  repository      Repository? @relation(fields: [repositoryId], references: [id], onDelete: SetNull)
  type            String
  action          String?
  payload         Json
  processed       Boolean   @default(false)
  processedAt     DateTime?
  error           String?
  createdAt       DateTime  @default(now())

  @@index([processed])
  @@index([repositoryId])
  @@index([createdAt])
}
```

- [ ] **Step 3: 创建 db 包 tsconfig.json**

```json
{
  "extends": "@virtualteam/config/typescript/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "."
  },
  "include": ["prisma/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 4: 提交**

```bash
git add packages/db
git commit -m "feat: 设置 Prisma 数据库包和 Schema"
```

---

## Phase 1: 用户系统 (Week 2-4)

### Task 1.1: 设置 Next.js 前端

**文件:**
- 创建: `apps/web/package.json`
- 创建: `apps/web/tsconfig.json`
- 创建: `apps/web/next.config.ts`
- 创建: `apps/web/tailwind.config.ts`
- 创建: `apps/web/app/layout.tsx`
- 创建: `apps/web/app/page.tsx`

- [ ] **Step 1: 创建 web 包 package.json**

```json
{
  "name": "@virtualteam/web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@tanstack/react-query": "^5.40.0",
    "@trpc/client": "^11.0.0-rc.446",
    "@trpc/react-query": "^11.0.0-rc.446",
    "@trpc/server": "^11.0.0-rc.446",
    "zod": "^3.23.0",
    "lucide-react": "^0.400.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.4.0",
    "date-fns": "^3.6.0",
    "pusher-js": "^8.4.0",
    "@stripe/stripe-js": "^3.3.0",
    "@clerk/nextjs": "^5.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "@virtualteam/config": "workspace:*"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "extends": "@virtualteam/config/typescript/base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "~/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
```

- [ ] **Step 4: 创建 tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
```

- [ ] **Step 5: 创建 PostCSS 配置**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: 创建 app/layout.tsx**

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'VirtualTeam - 一人 AI 工程团队',
  description: '50+ AI 智能体虚拟工程团队，一人顶二十人团队',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: 创建 app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 8: 创建 app/page.tsx**

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Zap, Users, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          一人 AI 工程团队
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          50+ AI 智能体虚拟工程团队，覆盖产品、开发、测试、发布全流程。
          一个人，顶二十个人的团队。
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/login">
              <Github className="mr-2 h-5 w-5" />
              使用 GitHub 登录
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">查看定价</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="50+ AI 专家"
            description="YC 产品诊断、CEO 战略挑战、架构师、设计审查、代码审查、安全审计..."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="虚拟工程团队"
            description="无需管理真实团队，随用随叫，24小时待命，不抱怨不请假"
          />
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="知识复利"
            description="自动沉淀解决方案，跨项目累积，越用越聪明"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">开始你的 AI 团队之旅</h2>
        <p className="text-muted-foreground mb-8">
          5 分钟配置，立即拥有顶级工程团队
        </p>
        <Button asChild size="lg">
          <Link href="/auth/login">免费开始</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 VirtualTeam. 一人顶二十人，不是梦。</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
```

- [ ] **Step 9: 提交**

```bash
git add apps/web
git commit -m "feat: 初始化 Next.js 前端项目"
```

### Task 1.2: 创建 UI 组件库

**文件:**
- 创建: `apps/web/components/ui/button.tsx`
- 创建: `apps/web/components/ui/card.tsx`
- 创建: `apps/web/components/ui/input.tsx`
- 创建: `apps/web/components/ui/toaster.tsx`
- 创建: `apps/web/components/lib/utils.ts`

- [ ] **Step 1: 创建 utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: 创建 button.tsx**

```typescript
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

- [ ] **Step 3: 创建 card.tsx**

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

- [ ] **Step 4: 创建 input.tsx**

```typescript
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
```

- [ ] **Step 5: 创建 toaster.tsx**

```typescript
'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return <SonnerToaster richColors closeButton />;
}
```

- [ ] **Step 6: 提交**

```bash
git add apps/web/components
git commit -m "feat: 添加基础 UI 组件库"
```

### Task 1.3: 设置 tRPC

**文件:**
- 创建: `apps/web/lib/trpc.ts`
- 创建: `apps/web/lib/api.ts`
- 创建: `apps/api/src/router/_app.ts`
- 创建: `apps/api/src/trpc.ts`

- [ ] **Step 1: 创建 API tRPC 配置**

```typescript
// apps/api/src/trpc.ts
import { initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure;
export const middleware = t.middleware;
```

- [ ] **Step 2: 创建 API 路由**

```typescript
// apps/api/src/router/_app.ts
import { router } from '../trpc';
import { githubRouter } from './github';
import { userRouter } from './user';
import { repositoryRouter } from './repository';
import { taskRouter } from './task';

export const appRouter = router({
  github: githubRouter,
  user: userRouter,
  repository: repositoryRouter,
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
```

- [ ] **Step 3: 创建用户路由**

```typescript
// apps/api/src/router/user.ts
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        subscription: true,
      },
    });
  }),

  update: protectedProcedure
    .input(z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: input,
      });
    }),
});
```

- [ ] **Step 4: 创建 Web 端 tRPC 客户端**

```typescript
// apps/web/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@virtualteam/api';

export const api = createTRPCReact<AppRouter>();
```

- [ ] **Step 5: 创建 API Provider**

```typescript
// apps/web/lib/api.ts
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { useState } from 'react';
import { api } from './trpc';
import superjson from 'superjson';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3001`;
}

export function APIProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
}
```

- [ ] **Step 6: 提交**

```bash
git add apps/api/src/router apps/web/lib
git commit -m "feat: 设置 tRPC 配置"
```

---

## Phase 2: GitHub App 和仓库管理 (Week 5-8)

### Task 2.1: 创建 GitHub App

**文件:**
- 创建: `apps/github-app/package.json`
- 创建: `apps/github-app/tsconfig.json`
- 创建: `apps/github-app/src/index.ts`
- 创建: `apps/github-app/src/app.ts`
- 创建: `apps/github-app/src/handlers/index.ts`
- 创建: `apps/github-app/src/handlers/installation.ts`
- 创建: `apps/github-app/src/handlers/pull_request.ts`

- [ ] **Step 1: 创建 github-app 包 package.json**

```json
{
  "name": "@virtualteam/github-app",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc --build",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "probot": "^13.3.0",
    "@virtualteam/db": "workspace:*",
    "superjson": "^2.2.0",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.4.0",
    "tsx": "^4.10.0",
    "@virtualteam/config": "workspace:*"
  }
}
```

- [ ] **Step 2: 创建 Probot App 配置**

```typescript
// apps/github-app/src/app.ts
import { Probot } from 'probot';
import { handleInstallation } from './handlers/installation';
import { handlePullRequest } from './handlers/pull_request';
import { handlePush } from './handlers/push';

export function createApp(app: Probot) {
  app.on('installation.created', handleInstallation);
  app.on('installation.deleted', handleInstallation);
  
  app.on('pull_request.opened', handlePullRequest);
  app.on('pull_request.synchronize', handlePullRequest);
  app.on('pull_request.closed', handlePullRequest);
  
  app.on('push', handlePush);
  
  app.log.info('VirtualTeam GitHub App loaded');
}
```

- [ ] **Step 3: 创建安装处理器**

```typescript
// apps/github-app/src/handlers/installation.ts
import type { Probot } from 'probot';
import { db } from '@virtualteam/db';

export async function handleInstallation(
  app: Probot,
  context: any
) {
  const installationId = context.payload.installation?.id;
  const accountId = context.payload.installation?.account?.id;
  const accountLogin = context.payload.installation?.account?.login;
  const accountType = context.payload.installation?.account?.type;

  if (!installationId) {
    app.log.error('No installation ID found');
    return;
  }

  if (context.payload.action === 'created') {
    // 新安装
    app.log.info(`New installation: ${accountLogin}`);
    
    // 获取所有仓库
    const repositories = await context.octokit.apps.listReposForAuthenticatedUser({
      per_page: 100,
    });

    for (const repo of repositories.data.repositories) {
      // 在数据库中创建仓库记录
      await db.repository.upsert({
        where: { githubRepoId: repo.id },
        create: {
          githubRepoId: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || null,
          defaultBranch: repo.default_branch || 'main',
          userId: accountLogin, // 后续需要通过映射获取正确的 userId
        },
        update: {
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || null,
          defaultBranch: repo.default_branch || 'main',
        },
      });
    }
  } else if (context.payload.action === 'deleted') {
    // 卸载 - 删除仓库记录
    app.log.info(`Installation deleted: ${accountLogin}`);
    // 需要通过 installation ID 查找并删除
  }
}
```

- [ ] **Step 4: 创建 PR 处理器**

```typescript
// apps/github-app/src/handlers/pull_request.ts
import type { Probot } from 'probot';
import { db } from '@virtualteam/db';

export async function handlePullRequest(
  app: Probot,
  context: any
) {
  const action = context.payload.action;
  const pr = context.payload.pull_request;
  const repoFullName = context.payload.repository.full_name;
  
  app.log.info(`Pull request ${action}: ${repoFullName}#${pr.number}`);

  // 查找仓库
  const repository = await db.repository.findUnique({
    where: { fullName: repoFullName },
  });

  if (!repository) {
    app.log.warn(`Repository not found: ${repoFullName}`);
    return;
  }

  if (!repository.isEnabled) {
    app.log.info(`Repository disabled: ${repoFullName}`);
    return;
  }

  // 创建任务
  if (action === 'opened' || action === 'synchronize') {
    const task = await db.task.create({
      data: {
        repositoryId: repository.id,
        type: 'REVIEW',
        status: 'QUEUED',
        title: `Code Review: ${pr.title} (#${pr.number})`,
        input: {
          prNumber: pr.number,
          prTitle: pr.title,
          prBody: pr.body,
          action: 'opened',
        },
      },
    });

    // 将任务加入队列（后续 Worker 处理）
    // await addToQueue('ai-tasks', { taskId: task.id });
    app.log.info(`Created review task: ${task.id}`);
  }

  // 处理 PR 合并
  if (action === 'closed' && pr.merged) {
    const task = await db.task.create({
      data: {
        repositoryId: repository.id,
        type: 'SHIP',
        status: 'QUEUED',
        title: `Ship: ${pr.title} (#${pr.number})`,
        input: {
          prNumber: pr.number,
          prTitle: pr.title,
          mergedBy: pr.merged_by?.login,
        },
      },
    });

    app.log.info(`Created ship task: ${task.id}`);
  }
}
```

- [ ] **Step 5: 提交**

```bash
git add apps/github-app
git commit -m "feat: 创建 GitHub App"
```

### Task 2.2: 创建任务队列 Worker

**文件:**
- 创建: `apps/api/src/worker/index.ts`
- 创建: `apps/api/src/worker/ai-tasks.worker.ts`

- [ ] **Step 1: 创建 Worker 配置**

```typescript
// apps/api/src/worker/index.ts
import { Queue, Worker } from 'bullmq';
import { redis } from '../lib/redis';
import { db } from '@virtualteam/db';
import { processReviewTask } from './ai-tasks.worker';
import { processQaTask } from './ai-tasks.worker';
import { processShipTask } from './ai-tasks.worker';

// 任务队列
export const aiTasksQueue = new Queue('ai-tasks', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 1000,
  },
});

// Worker
export const aiTasksWorker = new Worker(
  'ai-tasks',
  async (job) => {
    const { taskId, type, repositoryId } = job.data;

    // 更新任务状态
    await db.task.update({
      where: { id: taskId },
      data: { status: 'RUNNING', startedAt: new Date() },
    });

    try {
      let result;
      switch (type) {
        case 'REVIEW':
          result = await processReviewTask(repositoryId, job.data);
          break;
        case 'QA':
          result = await processQaTask(repositoryId, job.data);
          break;
        case 'SHIP':
          result = await processShipTask(repositoryId, job.data);
          break;
        default:
          throw new Error(`Unknown task type: ${type}`);
      }

      // 更新任务完成
      await db.task.update({
        where: { id: taskId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          output: result,
          progress: 100,
        },
      });

      return result;
    } catch (error) {
      // 更新任务失败
      await db.task.update({
        where: { id: taskId },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  },
  { connection: redis }
);

aiTasksWorker.on('completed', (job) => {
  console.log(`Task ${job.id} completed`);
});

aiTasksWorker.on('failed', (job, err) => {
  console.error(`Task ${job?.id} failed:`, err);
});
```

- [ ] **Step 2: 创建 AI 任务处理器**

```typescript
// apps/api/src/worker/ai-tasks.worker.ts
import { Anthropic } from '@anthropic-ai/sdk';
import { Octokit } from '@octokit/rest';
import { db } from '@virtualteam/db';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface TaskInput {
  prNumber?: number;
  prTitle?: string;
  prBody?: string;
  action?: string;
}

export async function processReviewTask(
  repositoryId: string,
  input: TaskInput
) {
  const repository = await db.repository.findUnique({
    where: { id: repositoryId },
    include: { user: true },
  });

  if (!repository) {
    throw new Error('Repository not found');
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // 获取 PR diff
  const { data: diff } = await octokit.repos.compareCommits({
    owner: repository.fullName.split('/')[0],
    repo: repository.name,
    base: repository.defaultBranch,
    head: `pull/${input.prNumber}/head`,
    headers: { Accept: 'application/vnd.github.v3.diff' },
  });

  // 调用 Claude API 进行代码审查
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `You are a paranoid staff engineer conducting code review.
You look for:
1. Race conditions
2. Security issues (injection, XSS, auth bypass)
3. Performance problems
4. Completeness gaps
5. Error handling

Format your review as JSON with findings array.`,
    messages: [
      {
        role: 'user',
        content: `Review this pull request:\n\nTitle: ${input.prTitle}\n\nDiff:\n${diff}`,
      },
    ],
  });

  return {
    review: message.content[0].type === 'text' ? message.content[0].text : null,
    tokensUsed: message.usage,
  };
}

export async function processQaTask(
  repositoryId: string,
  input: any
) {
  // QA 任务处理逻辑
  return { success: true };
}

export async function processShipTask(
  repositoryId: string,
  input: any
) {
  // Ship 任务处理逻辑
  return { success: true };
}
```

- [ ] **Step 3: 提交**

```bash
git add apps/api/src/worker
git commit -m "feat: 创建任务队列 Worker"
```

---

## Phase 3: 前端仪表盘 (Week 9-10)

### Task 3.1: 创建仪表盘页面

**文件:**
- 创建: `apps/web/app/(dashboard)/layout.tsx`
- 创建: `apps/web/app/(dashboard)/page.tsx`
- 创建: `apps/web/app/(dashboard)/repositories/page.tsx`
- 创建: `apps/web/app/(dashboard)/tasks/page.tsx`

- [ ] **Step 1: 创建仪表盘布局**

```typescript
// apps/web/app/(dashboard)/layout.tsx
import Link from 'next/link';
import { Github, Home, FolderGit2, CheckSquare, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/dashboard', icon: Home, label: '首页' },
    { href: '/dashboard/repositories', icon: FolderGit2, label: '仓库' },
    { href: '/dashboard/tasks', icon: CheckSquare, label: '任务' },
    { href: '/dashboard/knowledge', icon: BookOpen, label: '知识库' },
    { href: '/dashboard/settings', icon: Settings, label: '设置' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="font-bold">VirtualTeam</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold">仪表盘</h1>
          <Button size="sm">
            <Github className="h-4 w-4 mr-2" />
            安装 GitHub App
          </Button>
        </header>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: 创建首页仪表盘**

```typescript
// apps/web/app/(dashboard)/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="活跃仓库"
          value="12"
          icon={<FolderGit2 className="h-4 w-4" />}
          trend="+2"
        />
        <StatsCard
          title="运行中任务"
          value="5"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          title="本周发布"
          value="8"
          icon={<CheckCircle className="h-4 w-4" />}
          trend="+3"
        />
        <StatsCard
          title="代码审查"
          value="24"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="+12"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近任务</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TaskItem
                title="Review: 添加用户认证"
                type="REVIEW"
                status="running"
                repo="open-taiji"
                time="2 分钟前"
              />
              <TaskItem
                title="QA: 登录页面测试"
                type="QA"
                status="completed"
                repo="open-taiji"
                time="15 分钟前"
              />
              <TaskItem
                title="Ship: v1.2.0"
                type="SHIP"
                status="queued"
                repo="github-ops"
                time="1 小时前"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>仓库状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RepoItem
                name="open-taiji"
                tasks={12}
                lastActive="刚刚"
                health="good"
              />
              <RepoItem
                name="github-ops"
                tasks={8}
                lastActive="2 小时前"
                health="warning"
              />
              <RepoItem
                name="virtual-team"
                tasks={3}
                lastActive="1 天前"
                health="good"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Components
function StatsCard({ title, value, icon, trend }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
        {trend && (
          <p className="text-xs text-green-500 mt-2">
            {trend} vs 上周
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function TaskItem({ title, type, status, repo, time }: any) {
  const statusColors = {
    running: 'bg-blue-500',
    completed: 'bg-green-500',
    queued: 'bg-yellow-500',
    failed: 'bg-red-500',
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{repo}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
    </div>
  );
}

function RepoItem({ name, tasks, lastActive, health }: any) {
  const healthColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          {tasks} 个活跃任务
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${healthColors[health]}`} />
        <span className="text-sm text-muted-foreground">{lastActive}</span>
      </div>
    </div>
  );
}

// Need to import
import { FolderGit2 } from 'lucide-react';
```

- [ ] **Step 3: 提交**

```bash
git add apps/web/app/\(dashboard\)
git commit -m "feat: 创建仪表盘页面"
```

---

## Phase 4: Stripe 订阅 (Week 11-12)

### Task 4.1: 创建订阅页面和 API

**文件:**
- 创建: `apps/web/app/pricing/page.tsx`
- 创建: `apps/api/src/router/subscription.ts`

- [ ] **Step 1: 创建定价页面**

```typescript
// apps/web/app/pricing/page.tsx
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: '适合个人项目和小型项目',
    features: [
      '3 个仓库',
      '100 次 AI 任务/月',
      '基础代码审查',
      '每日审计报告',
    ],
    limitations: [
      '无知识库',
      '无团队协作',
      '社区支持',
    ],
  },
  {
    name: 'Pro',
    price: 9,
    priceLabel: '$9/月',
    description: '适合一人公司和独立开发者',
    features: [
      '无限仓库',
      '无限 AI 任务',
      '50+ AI 专家',
      '知识库',
      '优先支持',
      '微信/支付宝支付',
    ],
    limitations: [],
    popular: true,
  },
  {
    name: 'Team',
    price: 29,
    priceLabel: '$29/月',
    description: '适合小团队',
    features: [
      '无限仓库',
      '无限 AI 任务',
      '5 人团队协作',
      '知识库',
      '专属支持',
      '自定义工作流',
    ],
    limitations: [],
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">简单透明的定价</h1>
        <p className="text-xl text-muted-foreground">
          选择适合你的计划，开始你的 AI 工程团队之旅
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'border-primary' : ''}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                最受欢迎
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-6">
                {plan.priceLabel || '免费'}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.price === 0 ? '免费开始' : '立即订阅'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground mb-4">
          我们支持以下支付方式
        </p>
        <div className="flex justify-center gap-4">
          <span className="px-4 py-2 bg-muted rounded-md text-sm">
            💳 信用卡
          </span>
          <span className="px-4 py-2 bg-muted rounded-md text-sm">
            💬 微信支付
          </span>
          <span className="px-4 py-2 bg-muted rounded-md text-sm">
            📱 支付宝
          </span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 创建订阅 API**

```typescript
// apps/api/src/router/subscription.ts
import { z } from 'zod';
import Stripe from 'stripe';
import { router, protectedProcedure } from '../trpc';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const subscriptionRouter = router({
  getPlans: publicProcedure.query(async () => {
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
    });

    return prices.data.map((price) => ({
      id: price.id,
      name: (price.product as Stripe.Product).name,
      price: price.unit_amount,
      currency: price.currency,
      interval: price.recurring?.interval,
    }));
  }),

  createCheckoutSession: protectedProcedure
    .input(z.object({ priceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // 获取或创建 Stripe Customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          metadata: { userId: user.id },
        });
        customerId = customer.id;
        await ctx.db.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId },
        });
      }

      // 创建 Checkout Session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card', 'wechat_pay', 'alipay'],
        line_items: [{ price: input.priceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
        metadata: { userId: user.id },
      });

      return { url: session.url };
    }),

  createPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (!user?.stripeCustomerId) {
      throw new Error('No subscription found');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });

    return { url: session.url };
  }),
});
```

- [ ] **Step 3: 提交**

```bash
git add apps/web/app/pricing apps/api/src/router/subscription.ts
git commit -m "feat: 添加订阅系统和 Stripe 集成"
```

---

## Phase 5: 上线准备 (Week 13)

### Task 5.1: CI/CD 配置

**文件:**
- 创建: `.github/workflows/ci.yml`
- 创建: `apps/web/.github/workflows/deploy.yml`
- 创建: `apps/api/.github/workflows/deploy.yml`

- [ ] **Step 1: 创建 CI 配置**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DATABASE_URL: postgresql://test:test@localhost:5432/test
      REDIS_URL: redis://localhost:6379
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm db:push
      - run: pnpm test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

- [ ] **Step 2: 提交**

```bash
git add .github
git commit -m "chore: 添加 CI/CD 配置"
```

---

## 下一步

实施计划已完成！现在你可以选择执行方式：

1. **Subagent 驱动（推荐）** - 我会为每个 Phase 分配专门的子 agent 进行开发
2. **Inline 执行** - 在当前会话中逐步执行任务

请告诉我你选择哪种方式，或者有其他问题需要讨论？