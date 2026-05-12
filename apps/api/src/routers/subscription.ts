import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { StripeService } from '../services/stripe.service';

export const subscriptionRouter = router({
  // 获取所有套餐
  getPlans: publicProcedure.query(async () => {
    return StripeService.getPlans();
  }),

  // 获取用户订阅信息
  getSubscription: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return StripeService.getSubscription(input.userId);
    }),

  // 创建 Checkout Session
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        plan: z.enum(['PRO', 'TEAM']),
        billing: z.enum(['monthly', 'yearly']),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await StripeService.createCheckoutSession(
        input.userId,
        input.plan,
        input.billing,
        input.successUrl,
        input.cancelUrl
      );
      return { url: session.url };
    }),

  // 创建客户门户 Session
  createCustomerPortalSession: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        returnUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const session = await StripeService.createCustomerPortalSession(
        input.userId,
        input.returnUrl
      );
      return { url: session.url };
    }),
});
