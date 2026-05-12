# 一人 AI 公司：50+ AI 智能体虚拟团队

> Garry Tan + Superpowers + Compound Engineering 整合方案
> 
> 一人顶二十人团队的秘密武器

---

## 📋 项目概述

这是一个为一人公司打造的虚拟工程团队配置项目，整合了三个最佳的 Claude Code Skills：

| 项目 | 作者 | Stars | 核心价值 |
|------|------|-------|----------|
| **gstack** | Garry Tan (YC CEO) | 68.8k+ | 虚拟工程团队（23+ 专家） |
| **Superpowers** | Jesse Vincent | 39.7k+ | 工程纪律执行者（14+ 技能） |
| **Compound Engineering** | Every Inc | 11k+ | 知识复利系统（25+ Agent） |

---

## 🎯 一人 AI 公司架构

### 你的 AI 团队（50+ 智能体）

```
┌─────────────────────────────────────────────────────────────────────┐
│                    xiejianjun000 (一人 AI 公司 CEO)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🎯 **产品层** - 规划与设计                                        │
│  ├── /office-hours              - YC 产品诊断官                      │
│  ├── /plan-ceo-review           - CEO 战略挑战官                    │
│  ├── /plan-design-review        - 首席设计官                        │
│  ├── /design-shotgun            - 创意探索者                        │
│  ├── /design-html               - 设计工程师                        │
│  └── /autoplan                  - 全自动化规划师                     │
│                                                                      │
│  🏗️ **执行层** - 工程实现                                          │
│  ├── /plan-eng-review           - 架构师                            │
│  ├── /review                    - 代码审查员                        │
│  ├── /codex                     - 第二意见官 (OpenAI)               │
│  ├── /test-driven-development   - TDD 铁律执行者                   │
│  ├── /systematic-debugging      - 问题侦探                        │
│  └── /brainstorming             - 苏格拉底式提问者                 │
│                                                                      │
│  🧪 **质量层** - 测试与验证                                        │
│  ├── /qa                        - 测试主管                          │
│  ├── /benchmark                 - 性能工程师                        │
│  ├── /cso                       - 安全官                            │
│  └── /careful / freeze / guard  - 安全卫士                        │
│                                                                      │
│  📦 **发布层** - 部署与交付                                        │
│  ├── /ship                      - 发布工程师                        │
│  ├── /land-and-deploy           - 部署专员                          │
│  ├── /document-release          - 文档工程师                        │
│  └── /daily-audit / daily-report - GitHub 运维机器人               │
│                                                                      │
│  📈 **沉淀层** - 知识复利                                          │
│  ├── /retro                     - 回顾主管                          │
│  ├── /learn                     - 记忆管理员                        │
│  ├── /ce:compound               - 知识沉淀师                        │
│  └── /gbrain-sync               - 大脑同步员                        │
│                                                                      │
│  🔧 **底层支撑** - 技术平台                                        │
│  ├── OpenTaiji WFGY             - 防幻觉验证系统                    │
│  ├── OpenTaiji Memory           - 记忆系统                          │
│  ├── gstack Browser             - 真实浏览器                        │
│  └── gstack /browse             - 浏览技能                          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📁 项目结构

```
virtual-team/
├── README.md                  # 本文件
├── ARCHITECTURE.md           # 50+ AI 智能体架构详解
├── TEAM.md                   # 虚拟团队配置
├── CLAUDE.md                 # Claude Code 配置模板
├── package.json              # 项目配置
├── bin/
│   └── virtual-team.js      # 团队启动器
├── templates/               # 配置模板目录
│   └── (未来更多模板...)
└── .gitignore
```

---

## 🚀 快速开始

### 在 Claude Code 中使用

```bash
# 1. 安装 gstack
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# 2. 在你的项目中创建 CLAUDE.md（使用 virtual-team 配置）
cd your-project
git clone https://github.com/xiejianjun000/virtual-team
cp virtual-team/CLAUDE.md ./

# 3. 开始使用！
/office-hours
```

### 在 OpenClaw 中使用

```bash
# 方式 1：使用原生技能
clawhub install gstack-openclaw-office-hours
clawhub install gstack-openclaw-ceo-review
clawhub install gstack-openclaw-investigate
clawhub install gstack-openclaw-retro

# 方式 2：通过 Claude Code 会话（更完整）
# 在 AGENTS.md 中添加 gstack 配置
```

### 在 Hermes 中使用

```bash
# 生成 Hermes 技能文档
cd ~/gstack && ./setup --host hermes

# 配置 Hermes 使用这些技能
```

### 在 Cursor / Codex / Slate / Factory 中使用

```bash
cd ~/gstack && ./setup --host cursor
cd ~/gstack && ./setup --host codex
cd ~/gstack && ./setup --host slate
cd ~/gstack && ./setup --host factory
```

### 启动虚拟团队 CLI

```bash
cd virtual-team
npm run team
```

---

## 🎯 工作流：从 Idea 到 Ship

### 标准流程（Think → Plan → Build → Review → Test → Ship → Reflect）

```
1. Think 阶段
   ├── /office-hours                    → 产品诊断
   ├── /design-shotgun                  → 创意探索
   └── /plan-ceo-review                 → CEO 战略挑战

2. Plan 阶段
   ├── /autoplan                        → 全自动化规划
   ├── /plan-eng-review                 → 架构锁定
   ├── /plan-design-review              → 设计审查
   └── /plan-devex-review               → DX 体验设计

3. Build 阶段
   ├── /brainstorming                   → 苏格拉底式提问
   ├── /writing-plans                   → 可验证原子计划
   ├── /test-driven-development         → TDD 铁律
   └── /executing-plans                 → 严格执行

4. Review 阶段
   ├── /review                          → 代码审查
   ├── /codex                           → 第二意见
   ├── /design-review                   → 设计修复
   └── /devex-review                    → DX 测试

5. Test 阶段
   ├── /qa                              → 真实浏览器测试
   ├── /benchmark                       → 性能基准
   └── /cso                             → 安全审计

6. Ship 阶段
   ├── /ship                            → 发布 PR
   ├── /land-and-deploy                 → 部署生产
   ├── /canary                          → 金丝雀监控
   └── /document-release                → 更新文档

7. Reflect 阶段
   ├── /retro                           → 每周回顾
   ├── /ce:compound                     → 知识沉淀
   ├── /learn                           → 记忆管理
   └── /sync-gbrain                     → 大脑同步
```

### 并行冲刺模式（Conductor + 10-15 并行）

```
[ Session 1 ] /office-hours on Idea A      ┐
[ Session 2 ] /review on PR B               ├─ 10-15 并行 Claude Code 会话
[ Session 3 ] /qa on Staging C             ┤
[ Session 4 ] /autoplan on Feature D       ┘
                    │
                    ▼
         你：管理决策，让 AI 执行
```

---

## 📊 量化效益

### 一人 vs 20 人团队对比

| 指标 | 传统 20 人团队 | 一人 AI 公司 | 提升 |
|------|--------------|-------------|------|
| **发布速度** | 2 周/feature | 1 天/feature | **14x** |
| **代码产出** | ~100 行/人/天 | ~10,000 行/day | **100x** |
| **测试覆盖率** | 60-70% | 90-100% | **1.5x** |
| **Bug 数量** | 高 | 低（QA 自动化） | **0.2x** |
| **成本** | $2M/年 | $10k/年（API 费用） | **200x** |
| **知识沉淀** | 靠文档，易丢失 | 自动沉淀，复利积累 | **∞** |

### Garry Tan 的真实数据

```
2013 年（YC 期间）
- 772 GitHub contributions
- Bookface 项目

2026 年（使用 gstack）
- 1,237+ GitHub contributions
- 3 个生产服务
- 40+ 发布的功能
- 810x 效率提升！
```

---

## 🎯 针对你的一人 AI 公司的项目矩阵

### 你的 GitHub 仓库

| 仓库 | 状态 | 使用的 AI 团队 |
|------|------|---------------|
| **virtual-team** | ✅ 新创建 | 整合配置中心 |
| **open-taiji** | ⚠️ 开发中 | gstack + github-ops |
| **github-ops** | ✅ 可用 | gstack 集成 |
| **tritai** | ❌ 规划中 | gstack + 未来 |
| **taiji-agent** | ❌ 规划中 | gstack + 未来 |

### open-taiji 的下一步

| 优先级 | 任务 | 使用的 AI 团队 |
|--------|------|---------------|
| 🔴 P0 | **完成 Actor 运行时** | `/office-hours` → `/autoplan` → `/qa` |
| 🟡 P1 | **完善 19 个 LLM 适配器** | `/plan-eng-review` → `/review` → `/ship` |
| 🟡 P1 | **记忆系统持久化** | `/plan-eng-review` → `/test-driven-development` |
| 🟢 P2 | **WFGY 测试覆盖到 100%** | `/qa-only` → `/test-driven-development` |

---

## 📚 相关资源

| 资源 | 说明 |
|------|------|
| [gstack GitHub](https://github.com/garrytan/gstack) | 虚拟工程团队 |
| [Superpowers GitHub](https://github.com/obra/superpowers) | 工程纪律 |
| [Compound Engineering GitHub](https://github.com/EveryInc/compound-engineering) | 知识复利 |
| [OpenClaw](https://github.com/openclaw/openclaw) | 247k+ stars AI IDE |
| [Conductor](https://conductor.build) | 多 Claude Code 会话管理 |
| [GBrain](https://github.com/garrytan/gbrain) | 智能体记忆系统 |
| [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code) | 官方文档 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 50+ AI 智能体详细架构 |
| [TEAM.md](./TEAM.md) | 虚拟团队配置 |

---

## ⚖️ 重要提示

### 什么是真实的（不是炒作）

✅ **真实的：**
- 20 人团队的效率提升
- 10-15 个并行冲刺
- 50+ AI 专家可调用
- 真实的浏览器自动化
- 生产级代码质量
- 知识复利确实存在

❌ **不真实的：**
- AI 会完全替代你（不可能）
- 100% 无 Bug（AI 也会犯错）
- 零成本（API 费用还是要花）
- 完全无人工干预（你还是 CEO）

### 你的定位

你是：**AI 团队的 CEO**
- 不是 coder，是决策官
- 不是 tester，是质量官
- 不是 PM，是产品战略官

AI 团队：**你的虚拟 20 人工程团队**
- 听你指挥
- 帮你实现
- 不抱怨，不睡觉，随叫随到

---

## 🎉 开始你的一人 AI 公司之旅！

> 一人顶二十人，不是梦。
> 
> Garry Tan 2026 年做到了，你也可以！

---

## 📞 需要帮助？

查看：
- [本仓库 GitHub](https://github.com/xiejianjun000/virtual-team)
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 详细架构
- [TEAM.md](./TEAM.md) - 团队配置
- [open-taiji 项目](https://github.com/xiejianjun000/open-taiji)
- [github-ops 工具](https://github.com/xiejianjun000/github-ops)

---

*文档版本：v1.0*
*最后更新：2026-05-12*
*维护者：一人 AI 公司 CEO（@xiejianjun000）*
