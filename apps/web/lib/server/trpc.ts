import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;
export const router = t.router;

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      return {
        greeting: `Hello ${opts.input.name}!`,
      };
    }),
  getStats: publicProcedure
    .query(async () => {
      return {
        repos: 12,
        tasks: 5,
        releases: 8,
        reviews: 24,
      };
    }),
});

export type AppRouter = typeof appRouter;
