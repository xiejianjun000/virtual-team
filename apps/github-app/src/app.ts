import { Probot } from 'probot';
import { handleInstallation } from './handlers/installation';
import { handlePullRequest } from './handlers/pull_request';
import { handlePush } from './handlers/push';

export function createApp(app: Probot) {
  app.on('installation.created', async (context) => {
    await handleInstallation(app, context);
  });

  app.on('installation.deleted', async (context) => {
    await handleInstallation(app, context);
  });

  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    await handlePullRequest(app, context);
  });

  app.on(['pull_request.closed'], async (context) => {
    await handlePullRequest(app, context);
  });

  app.on('push', async (context) => {
    await handlePush(app, context);
  });

  app.log.info('VirtualTeam GitHub App loaded successfully!');
}
