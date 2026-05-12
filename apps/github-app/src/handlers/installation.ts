import type { Probot, Context } from 'probot';
import { db } from '../lib/prisma';

export async function handleInstallation(
  app: Probot,
  context: Context<'installation.created' | 'installation.deleted'>
) {
  const installationId = context.payload.installation?.id;
  const accountId = context.payload.installation?.account?.id;
  const accountLogin = context.payload.installation?.account?.login;

  if (!installationId) {
    app.log.error('No installation ID found');
    return;
  }

  if (context.payload.action === 'created') {
    app.log.info(`New installation created: ${accountLogin}`);

    // 获取安装的所有仓库
    const repositories = await context.octokit.apps.listInstallationReposForAuthenticatedUser({
      installation_id: installationId,
      per_page: 100,
    });

    // 这里需要简化处理：我们先创建一个临时用户或者用其他方式关联
    // 实际生产环境中，需要通过 GitHub OAuth 用户来关联
    for (const repo of repositories.data.repositories) {
      try {
        await db.repository.upsert({
          where: { githubRepoId: repo.id },
          create: {
            githubRepoId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || '',
            defaultBranch: repo.default_branch || 'main',
            // 这里暂时先使用一个占位符 userId，实际应用中需要通过 OAuth 关联真实用户
            userId: 'temp-user-id-' + accountLogin,
          },
          update: {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || '',
            defaultBranch: repo.default_branch || 'main',
          },
        });
        app.log.info(`Repository synced: ${repo.full_name}`);
      } catch (error) {
        app.log.error(`Failed to sync repository ${repo.full_name}`);
      }
    }
  } else if (context.payload.action === 'deleted') {
    app.log.info(`Installation deleted: ${accountLogin}`);
    // 这里可以处理删除操作，例如禁用仓库等
  }
}
