import { Queue, Worker } from 'bullmq';
import { redis } from '../lib/redis';
import { db } from '../lib/prisma';
import { processReviewTask, processQaTask, processShipTask } from './ai-tasks.worker';

// 任务队列
export const aiTasksQueue = new Queue('ai-tasks', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: 100,
    removeOnFail: 1000,
  },
});

// Worker
export const aiTasksWorker = new Worker(
  'ai-tasks',
  async (job) => {
    const { taskId, type, repositoryId } = job.data;

    // 更新任务状态
    await db.task.update({
      where: { id: taskId },
      data: { status: 'RUNNING', startedAt: new Date() },
    });

    try {
      let result;
      switch (type) {
        case 'REVIEW':
          result = await processReviewTask(taskId, repositoryId, job.data);
          break;
        case 'QA':
          result = await processQaTask(taskId, repositoryId, job.data);
          break;
        case 'SHIP':
          result = await processShipTask(taskId, repositoryId, job.data);
          break;
        default:
          throw new Error(`Unknown task type: ${type}`);
      }

      // 更新任务完成
      await db.task.update({
        where: { id: taskId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          output: result,
          progress: 100,
        },
      });

      return result;
    } catch (error) {
      // 更新任务失败
      await db.task.update({
        where: { id: taskId },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  },
  { connection: redis }
);

aiTasksWorker.on('completed', (job) => {
  console.log(`Task ${job.id} completed`);
});

aiTasksWorker.on('failed', (job, err) => {
  console.error(`Task ${job?.id} failed:`, err);
});

// 添加任务到队列的函数
export async function addAiTask(taskId: string, type: string, repositoryId: string, data: any) {
  await aiTasksQueue.add('ai-task', {
    taskId,
    type,
    repositoryId,
    ...data,
  });
}
