import { initTRPC } from '@trpc/server';
import { FastifyPluginAsync } from 'fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { subscriptionRouter } from './routers/subscription';

// Create tRPC context
export const createContext = () => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Root router
export const appRouter = router({
  health: publicProcedure.query(() => ({ status: 'ok' })),
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

// Fastify plugin
export const trpcRouter: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });
};
