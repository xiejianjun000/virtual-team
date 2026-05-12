import 'dotenv/config';
import { Probot, ProbotOctokit } from 'probot';
import { createApp } from './app';

console.log('VirtualTeam GitHub App');
console.log('Environment configured');

// 创建 Probot 实例（为了类型检查）
const probot = new Probot({
  appId: 12345,
  privateKey: 'dummy-key',
  secret: 'dummy-secret',
  Octokit: ProbotOctokit.defaults({
    userAgent: 'VirtualTeam/1.0.0',
  }),
});

// 注册应用
probot.load(createApp);

console.log('App loaded');
