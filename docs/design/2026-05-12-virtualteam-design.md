# VirtualTeam 产品设计文档

> 版本：v1.0
> 日期：2026-05-12
> 状态：待审查

---

## 1. 产品概述

### 1.1 产品定位

**VirtualTeam** 是一款面向一人公司创业者的 SaaS 产品，整合 gstack + Superpowers + Compound Engineering 三大 AI 工程工具，为用户提供一个"虚拟 AI 工程团队"，实现一人顶二十人的开发效率。

### 1.2 核心价值

- **零门槛**：无需 AI 编程知识，即可享受顶级 AI 开发工具
- **一键部署**：GitHub 一键安装，5 分钟配置完成
- **完整团队**：50+ AI 智能体，覆盖产品、开发、测试、发布全流程
- **知识复利**：自动沉淀解决方案，跨项目累积知识资产

### 1.3 目标用户

- **一人公司创始人**：技术或非技术背景，需要快速开发产品
- **独立开发者**：希望提升开发效率，减少重复工作
- **技术创业者**：需要工程团队质量，但预算有限

---

## 2. 产品形态

### 2.1 SaaS 网站

- **技术栈**：Next.js 15 + React + Tailwind CSS + shadcn/ui
- **部署**：Vercel
- **功能**：用户管理、项目控制台、AI 团队状态、订阅管理

### 2.2 GitHub App

- **技术栈**：Probot + Node.js
- **功能**：自动配置、AI 任务触发、每日审计、Webhook 事件处理
- **部署**：Railway / Fly.io

### 2.3 API 服务

- **技术栈**：Node.js + Fastify + tRPC
- **数据库**：PostgreSQL + Prisma + Redis
- **部署**：Railway

---

## 3. 功能清单

### 3.1 用户系统

| 功能 | 优先级 | 说明 |
|------|--------|------|
| GitHub OAuth 登录 | P0 | 一键登录，无需注册 |
| 邮箱绑定 | P1 | 接收通知、找回密码 |
| 用户设置 | P2 | 头像、通知偏好 |
| 账户删除 | P2 | GDPR 合规 |

### 3.2 项目管理

| 功能 | 优先级 | 说明 |
|------|--------|------|
| GitHub App 安装 | P0 | 一键授权所有仓库 |
| 仓库列表 | P0 | 查看已连接仓库 |
| 仓库详情 | P0 | 查看仓库状态、AI 配置 |
| 仓库启用/禁用 | P1 | 灵活控制 |
| 仓库移除 | P1 | 断开连接 |

### 3.3 AI 团队控制台

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 任务看板 | P0 | 查看 AI 当前任务（Kanban 视图） |
| 任务详情 | P0 | 查看任务进度、历史记录 |
| AI 配置 | P1 | 启用/禁用特定 AI 技能 |
| 实时状态 | P1 | WebSocket 实时更新 |

### 3.4 发布管理

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 发布历史 | P0 | 查看每次发布的版本、内容 |
| 发布详情 | P0 | 查看 PR 链接、变更统计 |
| 快速发布 | P1 | 一键触发 /ship |
| 发布预览 | P1 | 发布前预览变更 |

### 3.5 知识库

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 沉淀列表 | P1 | 查看沉淀的知识 |
| 知识详情 | P1 | 查看具体内容 |
| 知识搜索 | P1 | 全文搜索 |
| 知识导出 | P2 | 导出为 Markdown |

### 3.6 订阅管理

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 套餐展示 | P0 | 免费/Pro/团队 |
| 套餐切换 | P0 | 在线升级/降级 |
| 支付集成 | P0 | LemonSqueezy |
| 用量统计 | P1 | 仓库数、API 调用数 |
| 账单管理 | P2 | 发票、退款 |

### 3.7 GitHub App 功能

| 功能 | 优先级 | 说明 |
|------|--------|------|
| 自动配置 | P0 | 新增仓库时，自动 PR 添加 gstack 配置 |
| PR 审查触发 | P0 | PR 创建时，自动调用 /review |
| 每日审计 | P0 | 每日运行审计，发送邮件 |
| 发布触发 | P1 | 合并时自动 /ship |
| 安全扫描 | P1 | 定期 /cso 扫描 |
| 金丝雀监控 | P2 | 发布后监控健康状态 |

---

## 4. 技术架构

### 4.1 系统架构图

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              用户浏览器                                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Next.js Frontend (Vercel)                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  React Components + Tailwind CSS + shadcn/ui                    │   │
│  │  tRPC Client                                                    │   │
│  │  WebSocket (Pusher/Ably)                                       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────────────┐
│   Node.js API (Railway)       │   │   GitHub App (Probot) (Railway)   │
│   Fastify + tRPC             │   │   Webhook Handlers               │
│   Authentication (Auth.js)   │   │   Task Queue (BullMQ)            │
│   Prisma ORM                 │   │   Claude API Integration          │
└───────────────────────────────┘   └───────────────────────────────────┘
            │                                       │
            │                                       │
            ▼                                       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          Managed Services                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ PostgreSQL  │  │    Redis    │  │ Resend     │  │ LemonSqueezy│     │
│  │  (Neon)     │  │ (Upstash)   │  │ (Email)    │  │  (Payment) │     │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 数据库模型

```prisma
// User - 用户
model User {
  id            String   @id @default(cuid())
  githubId      String   @unique
  email         String?  @unique
  name          String?
  avatarUrl     String?
  plan          Plan     @default(FREE)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

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
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  plan            Plan
  status          SubscriptionStatus
  lemonSqueezyId String?  @unique
  currentPeriodEnd DateTime
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  PAUSED
}

// Repository - GitHub 仓库
model Repository {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  githubRepoId    Int      @unique
  name            String
  fullName        String
  isEnabled       Boolean  @default(true)
  installedAt     DateTime @default(now())
  updatedAt       DateTime @updatedAt

  tasks           Task[]
  releases        Release[]
  auditReports    AuditReport[]
  knowledgeItems  Knowledge[]

  @@index([userId])
  @@index([githubRepoId])
}

// Task - AI 任务
model Task {
  id              String   @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id])
  type            TaskType
  status          TaskStatus @default(PENDING)
  progress        Int      @default(0)
  input           Json?
  output          Json?
  error           String?
  startedAt       DateTime?
  completedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([repositoryId])
  @@index([status])
}

enum TaskType {
  REVIEW          // /review
  QA              // /qa
  SHIP            // /ship
  CSO             // /cso 安全审计
  BENCHMARK       // /benchmark
  AUTO_CONFIG     // 自动配置
  DAILY_AUDIT     // 每日审计
}

enum TaskStatus {
  PENDING
  QUEUED
  RUNNING
  COMPLETED
  FAILED
}

// Release - 发布记录
model Release {
  id              String   @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id])
  version         String
  title           String
  body            String?
  prNumber        Int?
  publishedAt     DateTime?
  createdAt       DateTime @default(now())

  @@index([repositoryId])
}

// AuditReport - 审计报告
model AuditReport {
  id              String   @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id])
  date            DateTime @db.Date
  summary         Json
  issues          Json?
  createdAt       DateTime @default(now())

  @@unique([repositoryId, date])
}

// Knowledge - 沉淀知识
model Knowledge {
  id              String   @id @default(cuid())
  repositoryId    String
  repository      Repository @relation(fields: [repositoryId], references: [id])
  title           String
  content         String   @db.Text
  tags            String[]
  sourceTaskId    String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([repositoryId])
}

// WebhookEvent - Webhook 事件记录
model WebhookEvent {
  id              String   @id @default(cuid())
  repositoryId    String?
  type            String
  payload         Json
  processed       Boolean  @default(false)
  createdAt       DateTime @default(now())

  @@index([processed])
  @@index([createdAt])
}
```

### 4.3 API 设计

#### 认证
- `GET /api/auth/github` - GitHub OAuth 登录
- `GET /api/auth/github/callback` - OAuth 回调
- `POST /api/auth/logout` - 登出
- `GET /api/auth/me` - 获取当前用户

#### 用户
- `GET /api/users/:id` - 获取用户信息
- `PATCH /api/users/:id` - 更新用户信息
- `DELETE /api/users/:id` - 删除账户

#### 仓库
- `GET /api/repositories` - 获取用户仓库列表
- `GET /api/repositories/:id` - 获取仓库详情
- `PATCH /api/repositories/:id` - 更新仓库配置
- `DELETE /api/repositories/:id` - 移除仓库

#### 任务
- `GET /api/tasks` - 获取任务列表
- `GET /api/tasks/:id` - 获取任务详情
- `POST /api/tasks` - 创建任务
- `DELETE /api/tasks/:id` - 取消任务

#### 发布
- `GET /api/releases` - 获取发布历史
- `GET /api/releases/:id` - 获取发布详情
- `POST /api/releases/:id/rollback` - 回滚发布

#### 知识库
- `GET /api/knowledge` - 获取知识列表
- `GET /api/knowledge/:id` - 获取知识详情
- `POST /api/knowledge` - 创建知识
- `DELETE /api/knowledge/:id` - 删除知识

#### 订阅
- `GET /api/subscription` - 获取订阅信息
- `POST /api/subscription/checkout` - 创建 Stripe Checkout 会话
- `POST /api/subscription/portal` - 创建客户门户会话
- `POST /api/webhooks/stripe` - 处理 Stripe Webhook

#### Webhook（GitHub App）
- `POST /api/webhooks/github` - 处理 GitHub Webhook

---

## 5. AI 任务执行

### 5.1 执行模式

| 触发方式 | 执行模式 | 说明 |
|----------|----------|------|
| 用户主动 | 异步队列 | 用户触发 → 加入队列 → 后台执行 → WebSocket 通知 |
| GitHub 事件 | Webhook | PR 创建 → Webhook → 任务队列 → 执行 |
| 定时任务 | Cron | 每日审计、安全扫描 |

### 5.2 任务队列

```typescript
// BullMQ 任务队列配置
const taskQueue = new Queue('ai-tasks', {
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

// Worker 处理任务
const worker = new Worker('ai-tasks', async (job) => {
  const { taskId, type, repositoryId, input } = job.data;
  
  // 更新任务状态
  await updateTaskStatus(taskId, 'RUNNING');
  
  // 执行对应的 AI 技能
  switch (type) {
    case 'REVIEW':
      return await executeReview(repositoryId, input);
    case 'QA':
      return await executeQA(repositoryId, input);
    case 'SHIP':
      return await executeShip(repositoryId, input);
    case 'CSO':
      return await executeCSO(repositoryId, input);
    // ...
  }
}, { connection: redis });
```

### 5.3 Claude API 集成

```typescript
// Claude API 客户端
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 执行 gstack 技能
async function executeSkill(
  skill: string,
  context: {
    repository: Repository;
    task: Task;
    user: User;
  }
) {
  // 1. 加载 gstack 技能配置
  const skillConfig = await loadSkillConfig(skill);
  
  // 2. 准备上下文
  const systemPrompt = await prepareContext(skillConfig, context);
  
  // 3. 调用 Claude API
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: 'user', content: context.task.input }
    ],
  });
  
  // 4. 解析输出
  const result = parseSkillOutput(skill, response);
  
  // 5. 更新任务状态
  await updateTaskResult(context.task.id, result);
  
  return result;
}
```

---

## 6. 商业模式

### 6.1 定价套餐

| 套餐 | 价格 | 仓库数 | 功能 |
|------|------|--------|------|
| **Free** | $0/月 | 3 个 | 基础功能、AI 任务 100次/月 |
| **Pro** | $9/月 | 无限 | 全部功能、AI 任务无限 |
| **Team** | $29/月 | 无限 | Pro + 5人团队协作 |

### 6.2 用量限制

| 资源 | Free | Pro | Team |
|------|------|-----|------|
| 仓库数 | 3 | 无限 | 无限 |
| AI 任务/月 | 100 | 无限 | 无限 |
| 团队成员 | 1 | 1 | 5 |
| 知识库存储 | 1MB | 100MB | 1GB |
| 邮件通知 | 10封/天 | 无限 | 无限 |
| 保留历史 | 7天 | 90天 | 1年 |

### 6.3 支付集成

#### 支付提供商：Stripe

选择 Stripe 作为支付提供商，原因：
- **全球覆盖**：支持 135+ 种货币
- **中国支付**：原生支持微信支付（WeChat Pay）和支付宝（Alipay）
- **API 友好**：与 LemonSqueezy 相比，Stripe 的 API 更成熟
- **合规安全**：PCI DSS Level 1 认证
- **开发者体验**：优秀的文档和 SDK

#### 支付方式

| 地区 | 支付方式 |
|------|----------|
| **中国** | 微信支付、支付宝、银联卡 |
| **国际** | Visa、Mastercard、American Express、PayPal |
| **加密货币** | USDC (通过 Stripe) |

#### Stripe 配置

```typescript
// stripe.config.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// 支持的支付方式配置
const paymentMethods = {
  payment_method_types: ['card', 'wechat_pay', 'alipay'],
  currencies: ['cny', 'usd'],
};
```

#### Webhook 处理

```typescript
// stripeWebhook.ts
app.post('/api/webhooks/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature']!;
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
    }
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

#### 价格配置

| 套餐 | USD | CNY | Stripe Price ID |
|------|-----|-----|-----------------|
| **Free** | $0 | ¥0 | - |
| **Pro 月付** | $9 | ¥65 | `price_xxx_monthly` |
| **Pro 年付** | $90 | ¥650 | `price_xxx_yearly` |
| **Team 月付** | $29 | ¥210 | `price_xxx_team_monthly` |
| **Team 年付** | $290 | ¥2100 | `price_xxx_team_yearly` |

#### 计费周期

- **月付**：每月自动扣款
- **年付**：享受 17% 折扣（相当于免费 2 个月）
- **退款政策**：7天无理由退款

### 6.4 区域定价策略

| 地区 | 货币 | 定价 | 说明 |
|------|------|------|------|
| **中国大陆** | CNY | ¥65/月 | 微信/支付宝支付 |
| **香港/澳门** | HKD | HK$70/月 | 八达通/信用卡 |
| **台湾** | TWD | NT$280/月 | 信用卡 |
| **国际** | USD | $9/月 | Stripe |
| **东南亚** | USD | $7/月 | Stripe（本地定价） |

#### 本地化价格计算

```typescript
// pricing.ts
const regionalPricing = {
  CN: { currency: 'cny', pro: 65, team: 210, discount: 0 },
  HK: { currency: 'hkd', pro: 70, team: 230, discount: 0 },
  TW: { currency: 'twd', pro: 280, team: 900, discount: 0 },
  US: { currency: 'usd', pro: 9, team: 29, discount: 0 },
  SEA: { currency: 'usd', pro: 7, team: 22, discount: 0.22 }, // 22% 本地折扣
  DEFAULT: { currency: 'usd', pro: 9, team: 29, discount: 0 },
};

// Stripe Checkout Session
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card', 'wechat_pay', 'alipay'],
  line_items: [{
    price: priceId,
    quantity: 1,
  }],
  currency: regionalPricing[region].currency,
  success_url: `${domain}/dashboard?success=true`,
  cancel_url: `${domain}/pricing?canceled=true`,
});

---

## 7. 项目结构

```
virtualteam/
├── apps/
│   ├── web/                    # Next.js 前端
│   │   ├── app/
│   │   │   ├── (auth)/        # 认证页面
│   │   │   ├── (dashboard)/   # 仪表盘
│   │   │   ├── api/           # API 路由
│   │   │   └── page.tsx       # 首页
│   │   ├── components/        # React 组件
│   │   ├── lib/               # 工具函数
│   │   └── package.json
│   │
│   ├── api/                   # Node.js API
│   │   ├── src/
│   │   │   ├── routers/       # tRPC 路由
│   │   │   ├── services/      # 业务逻辑
│   │   │   ├── workers/       # BullMQ Workers
│   │   │   └── index.ts       # 入口
│   │   └── package.json
│   │
│   └── github-app/            # GitHub App
│       ├── src/
│       │   ├── app.ts         # Probot 入口
│       │   ├── handlers/      # Webhook 处理器
│       │   └── services/      # 服务
│       └── package.json
│
├── packages/
│   ├── db/                    # Prisma Schema
│   │   └── prisma/
│   │       └── schema.prisma
│   │
│   └── config/               # 共享配置
│       ├── eslint/
│       └── typescript/
│
├── docker-compose.yml         # 开发环境
├── turbo.json                 # Turborepo 配置
└── package.json              # 根 package.json
```

---

## 8. 开发计划

### Phase 1: 基础架构（4 周）

| 周次 | 任务 |
|------|------|
| Week 1 | 项目初始化（Monorepo、数据库、CI/CD） |
| Week 2 | 用户系统（GitHub OAuth、用户管理） |
| Week 3 | 仓库管理（GitHub App 安装、仓库列表） |
| Week 4 | 基础 API（仓库 CRUD、Webhook） |

### Phase 2: AI 核心（4 周）

| 周次 | 任务 |
|------|------|
| Week 5 | 任务队列（BullMQ、Worker） |
| Week 6 | Claude API 集成 |
| Week 7 | /review、/qa 功能 |
| Week 8 | /ship、/cso 功能 |

### Phase 3: 控制台（3 周）

| 周次 | 任务 |
|------|------|
| Week 9 | 任务看板 UI |
| Week 10 | 发布历史、知识库 UI |
| Week 11 | WebSocket 实时更新 |

### Phase 4: 订阅（2 周）

| 周次 | 任务 |
|------|------|
| Week 12 | LemonSqueezy 集成 |
| Week 13 | 套餐限制、用量统计 |

### Phase 5: 上线（1 周）

| 周次 | 任务 |
|------|------|
| Week 14 | 测试、Bug 修复、上线准备 |

**总工期：约 14 周**

---

## 9. 竞争优势

### 9.1 差异化

| 竞品 | VirtualTeam |
|------|-------------|
| **Claude Code** | 需要手动配置，门槛高 |
| **OpenClaw** | 仅 IDE，无项目管理 |
| **Copilot** | 仅代码补全，无全流程 |
| **Linear** | 无 AI 能力 |
| **VirtualTeam** | ✅ 开箱即用 + 全流程 + 知识复利 |

### 9.2 核心壁垒

1. **配置自动化**：一键安装，无需手动配置
2. **全流程覆盖**：从 Idea 到 Ship 全链路
3. **知识复利**：自动沉淀，跨项目累积
4. **50+ AI 专家**：整合最佳实践

---

## 10. 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Claude API 成本失控 | 高 | 任务队列限流、用量监控 |
| GitHub API 限制 | 中 | 请求缓存、批量处理 |
| 竞争加剧 | 中 | 快速迭代、用户反馈 |
| 技术债务 | 中 | 代码审查、架构重构 |
| 安全漏洞 | 高 | 定期审计、依赖更新 |

---

## 11. 成功指标

| 指标 | 目标（6个月） |
|------|---------------|
| 注册用户 | 1,000 |
| 付费用户 | 50 |
| MRR | $500 |
| 仓库连接数 | 5,000 |
| 用户满意度 | 4.5/5 |
| NPS | 40 |

---

## 12. 下一步

1. 审查设计文档
2. 批准后创建实施计划（writing-plans）
3. 开始 Phase 1 开发

---

*文档状态：待审查*
*最后更新：2026-05-12*
