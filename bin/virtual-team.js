#!/usr/bin/env node
/**
 * OpenTaiji 虚拟团队启动器
 * 整合 gstack + Superpowers + Compound Engineering
 */

import { spawn } from 'child_process';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'virtual-team> '
});

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                     虚拟团队启动器 v1.0                        ║
║              gstack + Superpowers + Compound Engineering       ║
╚════════════════════════════════════════════════════════════════╝

可用命令:
  plan        - 启动产品规划 (gstack)
  develop     - 启动工程开发 (Superpowers)
  compound    - 沉淀知识 (Compound Engineering)
  status      - 查看项目状态
  help        - 显示帮助
  exit        - 退出

示例:
  virtual-team> plan
  virtual-team> develop
`);

rl.prompt();

rl.on('line', (input) => {
  const command = input.trim().toLowerCase();
  
  switch (command) {
    case 'plan':
      console.log('\n🚀 启动产品规划阶段...');
      console.log('建议命令: /office-hours');
      console.log('用途: 产品诊断、需求分析、路线图规划\n');
      break;
      
    case 'develop':
      console.log('\n🛠️ 启动工程开发阶段...');
      console.log('建议命令: /test-driven-development');
      console.log('用途: TDD开发、系统调试、代码审查\n');
      break;
      
    case 'compound':
      console.log('\n📚 启动知识沉淀阶段...');
      console.log('建议命令: /ce:compound');
      console.log('用途: 沉淀解决方案、刷新知识库\n');
      break;
      
    case 'status':
      console.log('\n📊 项目状态:');
      console.log('┌─────────────────┬─────────┐');
      console.log('│    项目         │  状态   │');
      console.log('├─────────────────┼─────────┤');
      console.log('│ open-taiji      │  开发中  │');
      console.log('│ tritai          │  规划中  │');
      console.log('│ taiji-agent     │  规划中  │');
      console.log('│ github-ops      │  完成   │');
      console.log('└─────────────────┴─────────┘\n');
      break;
      
    case 'help':
      console.log(`
帮助信息:

工作流程:
  1. plan     → 用 gstack 进行产品规划
  2. develop  → 用 Superpowers 进行工程开发
  3. compound → 用 Compound Engineering 沉淀知识

命令说明:
  plan        - 启动产品规划阶段
  develop     - 启动工程开发阶段  
  compound    - 启动知识沉淀阶段
  status      - 查看项目状态
  help        - 显示此帮助
  exit        - 退出虚拟团队

详细文档:
  - TEAM.md     - 完整配置说明
  - README.md   - 项目说明
`);
      break;
      
    case 'exit':
      console.log('\n👋 再见！下次继续打造顶级项目！\n');
      rl.close();
      process.exit(0);
      break;
      
    default:
      console.log(`\n❓ 未知命令: ${command}`);
      console.log('输入 help 查看可用命令\n');
      break;
  }
  
  rl.prompt();
}).on('close', () => {
  console.log('\n👋 再见！');
  process.exit(0);
});
