import type { Probot, Context } from 'probot';
import { db } from '../lib/prisma';

export async function handlePush(
  app: Probot,
  context: Context<'push'>
) {
  const repoFullName = context.payload.repository.full_name;
  const branch = context.payload.ref.replace('refs/heads/', '');

  app.log.info(`Push event on ${repoFullName} to ${branch}`);

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

  // 记录 push 事件到数据库
  await db.webhookEvent.create({
    data: {
      repositoryId: repository.id,
      type: 'push',
      action: null,
      payload: context.payload,
      processed: false,
    },
  });

  app.log.info(`Push event recorded for ${repoFullName}`);
}
