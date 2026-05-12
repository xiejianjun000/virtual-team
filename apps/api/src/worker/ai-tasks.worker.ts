import { Anthropic } from '@anthropic-ai/sdk';
import { Octokit } from '@octokit/rest';
import { db } from '../lib/prisma';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface TaskInput {
  prNumber?: number;
  prTitle?: string;
  prBody?: string;
  action?: string;
}

export async function processReviewTask(
  taskId: string,
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
  const [owner, repo] = repository.fullName.split('/');
  
  // 首先获取 PR 信息
  const { data: pr } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: input.prNumber!,
  });

  // 获取 PR diff
  const { data: diff } = await octokit.repos.compareCommits({
    owner,
    repo,
    base: pr.base.sha,
    head: pr.head.sha,
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
  taskId: string,
  repositoryId: string,
  input: any
) {
  // QA 任务处理逻辑
  return { success: true, taskId, repositoryId };
}

export async function processShipTask(
  taskId: string,
  repositoryId: string,
  input: any
) {
  // Ship 任务处理逻辑
  return { success: true, taskId, repositoryId };
}
