# OpenTaiji - 虚拟团队配置

> 整合 gstack + Superpowers + Compound Engineering 打造顶级 AI 开发团队

## 📋 项目概述

这是一个为一人公司打造的虚拟工程团队配置项目，整合了三个最佳的 Claude Code Skills：

| 项目 | 作者 | Stars | 核心价值 |
|------|------|-------|----------|
| **gstack** | Garry Tan (YC CEO) | 68.8k+ | 虚拟工程团队 |
| **Superpowers** | Jesse Vincent | 39.7k+ | 工程方法论 |
| **Compound Engineering** | Every Inc | 11k+ | 知识复利 |

## 🚀 工作流程

### Phase 1: 产品规划 (gstack)
```bash
/office-hours
/plan-ceo-review
/plan-eng-review
/autoplan
```

### Phase 2: 工程执行 (Superpowers)
```bash
/brainstorming
/test-driven-development
/systematic-debugging
/requesting-code-review
/finishing-a-development-branch
```

### Phase 3: 知识沉淀 (Compound Engineering)
```bash
/ce:compound
/ce:compound-refresh
/lfg
```

## 📁 项目结构

```
virtual-team/
├── TEAM.md                    # 虚拟团队配置
├── README.md                  # 本文件
├── package.json               # 项目配置
├── bin/
│   └── virtual-team.js       # 团队启动器
└── .gitignore
```

## 🛠️ 快速开始

### 安装依赖

```bash
# 1. 安装 gstack
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --host hermes

# 2. 安装 Superpowers (Claude Code 内)
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace

# 3. 安装 Compound Engineering (Claude Code 内)
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering

# 4. 重载插件
/reload-plugins
```

### 启动虚拟团队

```bash
cd /path/to/your-project
git clone https://github.com/xiejianjun000/virtual-team
npm run team
```

## 🌟 核心特性

### 1. 虚拟团队 (gstack)
- 23+ 专业角色
- CEO 质疑视角
- 完整从 idea 到 ship 链路

### 2. 工程纪律 (Superpowers)
- TDD 强制模式
- 4 阶段系统调试
- 铁则模式 + 合理化防止

### 3. 知识复利 (Compound Engineering)
- 50+ 专业 Agent
- 跨 session 记忆
- 持续学习积累

## 📊 命令速查表

| 命令 | 项目 | 用途 |
|------|------|------|
| `/office-hours` | gstack | 产品诊断 |
| `/plan-ceo-review` | gstack | CEO审查 |
| `/plan-eng-review` | gstack | 架构审查 |
| `/autoplan` | gstack | 自动规划 |
| `/review` | gstack | 代码审查 |
| `/qa` | gstack | QA测试 |
| `/ship` | gstack | 发布 |
| `/brainstorming` | Superpowers | 头脑风暴 |
| `/test-driven-development` | Superpowers | TDD开发 |
| `/systematic-debugging` | Superpowers | 系统调试 |
| `/ce:compound` | Compound | 知识沉淀 |
| `/lfg` | Compound | 全自主工作流 |

## 🔧 在你的项目中使用

### 1. 将此配置作为子目录
```bash
cd your-project
git submodule add https://github.com/xiejianjun000/virtual-team
cp virtual-team/TEAM.md your-project/
```

### 2. 或直接复制 TEAM.md
```bash
cp TEAM.md your-project-root/
```

### 3. 启动开发
```bash
# 在 Claude Code 中
/office-hours
# 开始规划你的产品
```

## 📚 相关项目

- **open-taiji**: 分布式多智能体协作引擎
- **tritai**: 零 Token AI 防幻觉引擎
- **taiji-agent**: 太极智能体框架
- **github-ops**: GitHub 运维工具

## 🔒 安全说明

- GitHub Token: 仅用于仓库操作，不要提交到仓库
- 个人访问令牌 (PAT) 权限: 仅 repo 范围即可
- 建议使用细粒度 token (Fine-grained PAT)

## 📝 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎贡献！请提交 Issue 或 Pull Request。

## 📬 联系

- GitHub: @xiejianjun000

---

**Let's build together with our virtual engineering team!**
