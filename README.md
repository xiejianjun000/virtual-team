# Virtual Team - 一人 AI 公司平台

> 整合了 50+ AI 智能体的虚拟团队平台，让你一人顶二十人

---

## 🌟 项目简介

Virtual Team 是一个完整的 SaaS 平台，整合了 Garry Tan 的 gstack、Superpowers 和 Compound Engineering，为一人公司提供完整的虚拟工程团队解决方案。

### 核心功能

- 🤖 **50+ AI 智能体** - 从产品设计到部署上线的完整团队
- 🏗️ **现代化技术栈** - Turborepo、Next.js、Fastify、tRPC、Prisma
- 🔄 **GitHub 集成** - 完整的 CI/CD 和自动化流程
- 📊 **知识复利系统** - 自动沉淀项目经验
- 🚀 **一键部署** - 支持 Docker、Vercel、Fly.io 等多种部署方式

---

## 🏗️ 系统架构

```
virtual-team/
├── apps/
│   ├── web/              # Next.js 前端应用
│   ├── api/              # Fastify + tRPC API 服务
│   └── github-app/       # GitHub App (Probot)
├── packages/
│   ├── db/               # Prisma 数据库包
│   └── config/           # 共享配置
├── docs/                 # 文档目录
└── bin/                  # CLI 工具
```

### 技术栈

| 层级 | 技术 |
|------|------|
| **前端** | Next.js 15, React 18, Tailwind CSS, tRPC Client |
| **后端** | Fastify, tRPC Server, Zod |
| **数据库** | PostgreSQL, Prisma ORM |
| **队列** | BullMQ, Redis |
| **支付** | Stripe |
| **GitHub** | Probot, Octokit |
| **AI** | Anthropic Claude SDK |
| **构建工具** | Turborepo, TypeScript, pnpm |

---

## 🚀 快速开始（5 分钟）

### 前置要求

- Node.js 20+
- pnpm 9+
- PostgreSQL 数据库
- Redis（可选，用于队列）

### 1. 克隆项目

```bash
git clone https://github.com/xiejianjun000/virtual-team.git
cd virtual-team
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的配置
```

### 4. 初始化数据库

```bash
pnpm db:push
pnpm db:seed  # 可选，填充示例数据
```

### 5. 启动开发服务器

```bash
pnpm dev
```

现在你可以访问：
- 前端: http://localhost:3000
- API: http://localhost:3001

---

## 📁 详细文档

- [部署指南](./docs/deployment.md) - 生产环境部署
- [架构文档](./ARCHITECTURE.md) - 50+ AI 智能体架构详解
- [团队配置](./TEAM.md) - 虚拟团队配置

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👏 致谢

- [gstack](https://github.com/garrytan/gstack) - Garry Tan 的虚拟工程团队
- [Superpowers](https://github.com/obra/superpowers) - 工程纪律执行者
- [Compound Engineering](https://github.com/EveryInc/compound-engineering) - 知识复利系统

---

## 📞 支持

如有问题，请开启 [Issue](https://github.com/xiejianjun000/virtual-team/issues) 或联系维护者。

---

*文档版本：v2.0*
*最后更新：2026-05-12*
*维护者：@xiejianjun000*
