# Virtual Team - 贡献指南

感谢您对 Virtual Team 项目的关注！

## 开发环境

### 环境要求
- Node.js 18+
- pnpm 8+

### 安装步骤

```bash
pnpm install
pnpm dev
```

## 项目结构

```
virtual-team/
├── apps/           # 应用
├── packages/       # 共享包
└── docs/           # 文档
```

## 代码规范

使用 Turborepo 进行构建管理：
- `pnpm build` - 构建所有包
- `pnpm lint` - 代码检查
- `pnpm test` - 运行测试

## 提交规范

```
<type>(<scope>): <subject>

feat(api): add new endpoint
fix(web): resolve login issue
```
