# 一人 AI 公司架构：50+ AI 智能体虚拟团队

> Garry Tan + Superpowers + Compound Engineering 整合方案
> 
> 一人顶二十人团队的秘密武器

---

## 🔭 项目全景图

```
你的 GitHub 组织架构（一人 AI 公司）：

┌───────────────────────────────────────────────────────────────────┐
│                        xiejianjun000 (你)                         │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🔧 **基础设施层**                                                │
│  ├── virtual-team/            - 整合配置中心                       │
│  ├── github-ops/              - GitHub 全生命周期运维              │
│  └── (未来) infra/            - 云基础设施管理                     │
│                                                                   │
│  🚀 **产品矩阵**                                                │
│  ├── open-taiji/              - 太极智能体运行时                   │
│  ├── tritai/                  - 零 Token AI 引擎（规划中）         │
│  ├── taiji-agent/             - 太极智能体 SDK（规划中）          │
│  └── (未来) 更多产品...       - 一人公司产品矩阵                   │
│                                                                   │
│  🤖 **AI 团队层**（50+ 智能体）                                 │
│  ├── gstack                   - 虚拟工程团队（23+ 专家）         │
│  ├── Superpowers              - 工程纪律执行者（14+ 技能）       │
│  └── Compound Engineering     - 知识复利系统（25+ Agent）         │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 🤖 AI 团队成员详情（50+）

---

### 🎯 产品战略组（gstack）

| 角色 | 技能 | 职责 | 模式 |
|------|------|------|------|
| **YC 产品诊断官** | `/office-hours` | 6 个强制问题，重构产品思路 | 对话模式 |
| **CEO 战略挑战官** | `/plan-ceo-review` | 4 种范围模式：扩张/选择性扩张/保持/缩减 | 决策模式 |
| **架构锁定师** | `/plan-eng-review` | ASCII 流程图、状态机、错误路径、测试矩阵 | 架构模式 |
| **设计审查官** | `/plan-design-review` | 0-10 评分，解释标准，实时修复 | 评审模式 |
| **DX 体验官** | `/plan-devex-review` | 开发者 persona、竞品基准、神奇时刻、摩擦追踪 | 体验模式 |
| **创意探索者** | `/design-shotgun` | 4-6 个 AI 变体，对比板，迭代直到满意 | 探索模式 |
| **设计工程师** | `/design-html` | Pretext 计算布局，响应式，生产级 HTML | 实现模式 |
| **设计系统专家** | `/design-consultation` | 从零构建完整设计系统，研究竞品，承担创意风险 | 构建模式 |
| **全自动化规划师** | `/autoplan` | CEO → 设计 → 工程 → DX 自动轮询 | 全自动模式 |

---

### 🏗️ 工程实现组（gstack + Superpowers）

| 角色 | 技能 | 职责 | 铁律 |
|------|------|------|------|
| **代码审查员** | `/review` | 自动修复明显问题，报告竞争条件，安全审计 | 完整性检查 |
| **问题侦探** | `/investigate` | 4 阶段根本原因分析，无调查不修复 | 铁律 1 |
| **TDD 铁律执行者** | `/test-driven-development` | 无测试不写代码 | 铁律 2 |
| **苏格拉底式提问者** | `/brainstorming` | 强制先提问后执行 | 铁律 3 |
| **计划撰写者** | `/writing-plans` | 5-10 个可验证原子步骤 | 铁律 4 |
| **计划执行者** | `/executing-plans` | 严格按步骤执行，每步验证 | 铁律 5 |
| **并行调度官** | `/dispatching-parallel-agents` | 子代理并行工作 | 铁律 6 |
| **设计审查修复者** | `/design-review` | 同 `/plan-design-review`，但实际修复 | 铁律 7 |
| **DX 现场测试员** | `/devex-review` | 实际测试入职流程，截图错误，TTHW 计时 | 铁律 8 |

---

### 🧪 质量保障组（gstack + Superpowers）

| 角色 | 技能 | 职责 | 覆盖率目标 |
|------|------|------|-----------|
| **测试主管** | `/qa` | 打开真实浏览器，发现 bug，原子提交修复，自动回归测试 | 100% |
| **QA 报告员** | `/qa-only` | 报告不修复，纯 bug 报告 | - |
| **性能工程师** | `/benchmark` | 基线页面加载时间、Core Web Vitals、资源大小 | - |
| **安全官** | `/cso` | OWASP Top 10 + STRIDE 威胁模型，零噪音 | - |
| **安全卫士** | `/careful` | 危险命令前警告（rm -rf, DROP TABLE, force-push） | - |
| **编辑锁定者** | `/freeze` | 限制编辑范围，防止事故修复 | - |
| **全防护罩** | `/guard` | `/careful` + `/freeze` 二合一 | - |
| **第二意见官** | `/codex` | OpenAI Codex 独立审查：通过/失败、对抗性挑战、咨询 | - |

---

### 📦 发布交付组（gstack + github-ops）

| 角色 | 技能 | 职责 | 工具 |
|------|------|------|------|
| **发布工程师** | `/ship` | 同步 main → 运行测试 → 覆盖率审计 → 推送 → 开 PR | gstack |
| **部署专员** | `/land-and-deploy` | 合并 PR → 等待 CI/部署 → 验证生产健康 | gstack |
| **金丝雀发布者** | `/canary` | 发布后监控循环：控制台错误、性能回归、页面失败 | gstack |
| **文档工程师** | `/document-release` | 自动更新所有文档，README、架构、贡献指南等 | gstack |
| **Git 运维机器人** | `/daily-audit` | 每日审计所有仓库 | github-ops |
| **Git 报告员** | `/daily-report` | 生成日报 | github-ops |
| **分支管理员** | `/finishing-a-development-branch` | 完成分支，清理 | Superpowers |
| **代码审查请求员** | `/requesting-code-review` | 发起审查请求 | Superpowers |

---

### 📈 知识复利组（Compound Engineering + GBrain）

| 角色 | 技能 | 职责 | 知识类型 |
|------|------|------|---------|
| **回顾主管** | `/retro` | 团队感知的每周回顾，按人分解，发布 streak，测试健康趋势 | 团队知识 |
| **记忆管理员** | `/learn` | 管理跨会话学习内容：审查、搜索、修剪、导出项目特定模式 | 项目知识 |
| **知识沉淀师** | `/ce:compound` | 每次任务后沉淀解决方案到 docs/solutions/ | 解决方案 |
| **知识刷新师** | `/ce:compound-refresh` | 刷新旧知识 | - |
| **全自主工作流** | `/lfg` | 从 idea 到 ship 的全自主工作流 | 全流程 |
| **并行执行模式** | `/slfg` | 并行多任务执行 | 并行 |
| **创意发散师** | `/ce:ideate` | 发散 + 对抗性过滤 | 创意 |
| **需求探索师** | `/ce:brainstorm` | 需求深度挖掘 | 需求 |
| **实现计划师** | `/ce:plan` | 详细实现计划 | 计划 |
| **全面审查师** | `/ce:review` | 全面代码审查 | 审查 |
| **系统执行师** | `/ce:work` | 系统执行任务 | 执行 |
| **大脑同步员** | `/sync-gbrain` | 将代码索引到 GBrain，增量/完整/预览 | 知识 |
| **大脑配置员** | `/setup-gbrain` | 从零配置 GBrain，3 种路径：PGLite、Supabase 现有、Supabase 自动配置 | 基础设施 |

---

### 🔧 底层支撑组（OpenTaiji + gstack）

| 角色 | 模块 | 职责 | 状态 |
|------|------|------|------|
| **防幻觉验证官** | WFGY System | 5 重验证，知识溯源，自一致性检查 | ✅ 可用 |
| **记忆库管理员** | Memory System | 3 层内存 Map，评分机制，晋升系统 | ⚠️ 部分 |
| **梦境培育者** | Dream System | 5 阶段梦境流程 | ⚠️ 部分 |
| **成果调度员** | Outcome Scheduler | Cron/at/every 调度，模板引擎，Webhook | ⚠️ 部分 |
| **Actor 导演** | Actor Runtime | 万物皆 Actor，邮箱驱动，无共享内存 | ❌ 规划中 |
| **人格塑造者** | Personality Engine | Big Five 特质提取 | ❌ 规划中 |
| **进化策略师** | Evolution System | 遗传/梯度/强化学习三大策略 | ❌ 规划中 |
| **浏览器自动化师** | `/browse` | 真实浏览器，Playwright，CDP，反检测隐身 | ✅ 可用 |
| **配对协调官** | `/pair-agent` | 多 Agent 共享浏览器：OpenClaw/Hermes/Codex/Cursor | ✅ 可用 |
| **Cookie 管理员** | `/setup-browser-cookies` | 从真实浏览器导入 Cookie | ✅ 可用 |
| **gstack 浏览器启动者** | `/open-gstack-browser` | gstack 浏览器 + 侧边栏 + 隐身 + 自动模型路由 | ✅ 可用 |
| **部署配置员** | `/setup-deploy` | 一次性部署配置 | ✅ 可用 |
| **自动升级员** | `/gstack-upgrade` | 自动升级到最新版本 | ✅ 可用 |

---

## 🚀 工作流：从 Idea 到 Ship

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

## 🛠️ 快速开始

### 在 Claude Code 中使用

```bash
# 1. 安装 gstack
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup

# 2. 在你的项目中创建 CLAUDE.md（使用 virtual-team 配置）
cd your-project
cp ~/virtual-team/TEAM.md ./CLAUDE.md

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

---

## 🎯 针对你的项目的建议

### open-taiji 的下一步

| 优先级 | 任务 | 使用的 AI 团队 |
|--------|------|---------------|
| 🔴 P0 | **完成 Actor 运行时** | `/office-hours` → `/autoplan` → `/qa` |
| 🟡 P1 | **完善 19 个 LLM 适配器** | `/plan-eng-review` → `/review` → `/ship` |
| 🟡 P1 | **记忆系统持久化** | `/plan-eng-review` → `/test-driven-development` |
| 🟢 P2 | **WFGY 测试覆盖到 100%** | `/qa-only` → `/test-driven-development` |

### github-ops 的增强

| 优先级 | 任务 | 说明 |
|--------|------|------|
| 🟡 P1 | **集成 gstack 的 /ship** | github-ops + gstack /ship = 自动化发布 |
| 🟡 P1 | **集成 /cso 安全审计** | 自动安全扫描 |
| 🟢 P2 | **集成 /benchmark 性能** | 性能基准测试 |

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

## 🔧 配置文件

### 项目级 CLAUDE.md（来自 virtual-team）

```markdown
## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy,
/canary, /benchmark, /browse, /open-gstack-browser, /qa, /qa-only, /design-review,
/setup-browser-cookies, /setup-deploy, /setup-gbrain, /sync-gbrain, /retro, /investigate, /document-release,
/codex, /cso, /autoplan, /pair-agent, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn.

## Superpowers (补充 gstack)
Additional skills: /brainstorming, /writing-plans, /executing-plans,
/test-driven-development, /systematic-debugging, /requesting-code-review,
/finishing-a-development-branch, /dispatching-parallel-agents, /subagent-driven-development.

## Compound Engineering (知识沉淀)
Additional skills: /ce:ideate, /ce:brainstorm, /ce:plan, /ce:review, /ce:work,
/ce:compound, /ce:compound-refresh, /lfg, /slfg.
```

### 团队配置 TEAM.md

参见 [virtual-team/TEAM.md](file:///workspace/virtual-team/TEAM.md)

---

## 📝 成功案例

### Garry Tan 的 gstack 体验

```
产品：Bookface v2（YC 内部社交网络）
时间：2026 年 Q1
团队：1 人（Garry Tan）
成果：
  ├── 40+ 发布的功能
  ├── 3 个生产服务
  └── 810x 效率提升 vs 2013 年
```

### Peter Steinberger 的 OpenClaw 体验

```
产品：OpenClaw (247k+ GitHub stars)
时间：2025-2026 年
团队：1 人（Peter Steinberger）
成就：
  ├── 247k+ stars
  ├── 多 Agent 协调系统
  └── Claude Code + gstack 集成
```

---

## 🎓 学习路径

### 第一周：熟悉工具
- ✅ 安装 gstack、Superpowers、Compound Engineering
- ✅ 尝试 3 个技能：`/office-hours` → `/review` → `/qa`
- ✅ 完成一个小功能发布

### 第二周：建立流程
- ✅ 配置完整工作流
- ✅ 启动 Conductor 并行 3 个会话
- ✅ 使用 `/retro` 做第一次回顾

### 第三周：知识复利
- ✅ 配置 GBrain
- ✅ 使用 `/ce:compound` 沉淀知识
- ✅ 启动 10 个并行会话

### 第四周：一人顶二十人
- ✅ 10-15 个并行冲刺
- ✅ 完整的 Think-Plan-Build-Review-Test-Ship-Reflect 闭环
- ✅ 开始下一个产品！

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
- [virtual-team 仓库](https://github.com/xiejianjun000/virtual-team)
- [gstack 文档](https://github.com/garrytan/gstack)
- [open-taiji 项目](https://github.com/xiejianjun000/open-taiji)
- [github-ops 工具](https://github.com/xiejianjun000/github-ops)

---

*文档版本：v1.0*
*最后更新：2026-05-12*
*维护者：一人 AI 公司 CEO（你）*
