# 一人公司虚拟团队配置

> 整合 gstack + Superpowers + Compound Engineering 打造顶级 AI 开发团队

## 团队架构

```
┌─────────────────────────────────────────────────────────────┐
│                    虚拟团队成员                            │
├─────────────────┬─────────────────────────────────────────┤
│   gstack 团队   │ CEO、架构师、QA、发布工程师               │
├─────────────────┼─────────────────────────────────────────┤
│ Superpowers     │ TDD执行者、系统调试员、代码审查员        │
├─────────────────┼─────────────────────────────────────────┤
│ Compound Eng    │ 知识工程师、研究员、安全专家             │
└─────────────────┴─────────────────────────────────────────┘
```

## 工作流程

### Phase 1: 产品规划 (gstack)

```bash
# 启动产品诊断
/office-hours

# 输入示例：
"我想为 open-taiji 添加 Actor 运行时，2周内完成MVP"

# 后续命令
/plan-ceo-review    # CEO视角审查
/plan-eng-review    # 架构审查
/autoplan           # 自动生成开发计划
```

### Phase 2: 工程执行 (Superpowers)

```bash
# 强制TDD开发
/test-driven-development

# 系统调试（如果遇到问题）
/systematic-debugging

# 代码审查
/requesting-code-review

# 完成分支
/finishing-a-development-branch
```

### Phase 3: 知识沉淀 (Compound Engineering)

```bash
# 沉淀解决方案
/ce:compound

# 刷新旧知识
/ce:compound-refresh

# 完整工作流
/lfg                # 全自主模式
/slfg               # 并行执行模式
```

## 命令速查表

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
| `/requesting-code-review` | Superpowers | 请求审查 |
| `/ce:compound` | Compound | 知识沉淀 |
| `/lfg` | Compound | 全自主工作流 |

## 项目配置

### 项目列表
- **open-taiji**: 分布式多智能体协作引擎
- **tritai**: 零 Token AI 防幻觉引擎
- **taiji-agent**: 太极智能体框架
- **github-ops**: GitHub 运维工具

### 禁止操作
- 不要删除 WFGY 相关代码（核心亮点）
- 不要降低测试覆盖率（目标 95%+）

## 质量保障

```
铁则 (Iron Law):
├─ TDD: 测试无しのプロダクションコード禁止
├─ デバッグ: 根本原因調査なしの修正禁止
└─ 検証: 証拠なしの完了宣言禁止

合理化防止:
├─ "手動テストで十分" → ❌
├─ "変更は小さいから" → ❌
└─ "後でテストを書く" → ❌
```

## 知识沉淀规范

每次任务完成后，执行：
```bash
/ce:compound
```

沉淀内容包括：
- 解决的问题
- 技术方案决策
- 遇到的坑和解决方案
- 代码片段和模式

## 安装说明

```bash
# 1. 安装 gstack
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --host hermes

# 2. 安装 Superpowers（Claude Code 内）
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace

# 3. 安装 Compound Engineering（Claude Code 内）
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering

# 4. 重载插件
/reload-plugins
```
