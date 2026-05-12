import type { Probot, Context } from 'probot';
import { db } from '../lib/prisma';

export async function handlePullRequest(
  app: Probot,
  context: Context<'pull_request'>
) {
  const action = context.payload.action;
  const pr = context.payload.pull_request;
  const repoFullName = context.payload.repository.full_name;

  app.log.info(`Pull request ${action}: ${repoFullName}#${pr.number}`);

  // 查找仓库
  const repository = await db.repository.findUnique({
    where: { fullName: repoFullName },
  });

  if (!repository) {
    app.log.warn(`Repository not found: ${repoFullName}`);
    return;
  }

  if (!repository.isEnabled) {
    app.log.info(`Repository disabled: ${repoFullName}`);
    return;
  }

  if (action === 'opened' || action === 'synchronize') {
    // 创建代码审查任务
    const task = await db.task.create({
      data: {
        repositoryId: repository.id,
        type: 'REVIEW',
        status: 'QUEUED',
        title: `Code Review: ${pr.title} (#${pr.number})`,
        input: {
          prNumber: pr.number,
          prTitle: pr.title,
          prBody: pr.body,
          action,
          prUrl: pr.html_url,
        },
      },
    });

    app.log.info(`Created review task: ${task.id}`);
    
    // 这里我们可以通过 API 调用将任务加入队列，或者直接使用共享的队列
    // 暂时先记录任务，后续 worker 会处理
  }

  // 处理 PR 合并
  if (action === 'closed' && pr.merged) {
    const task = await db.task.create({
      data: {
        repositoryId: repository.id,
        type: 'SHIP',
        status: 'QUEUED',
        title: `Ship: ${pr.title} (#${pr.number})`,
        input: {
          prNumber: pr.number,
          prTitle: pr.title,
          mergedBy: pr.merged_by?.login,
          prUrl: pr.html_url,
          mergeCommitSha: pr.merge_commit_sha,
        },
      },
    });

    app.log.info(`Created ship task: ${task.id}`);
  }
}
