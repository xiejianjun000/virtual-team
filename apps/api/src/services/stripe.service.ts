import { stripe, PRICES, PLAN_DETAILS } from '../lib/stripe';
import { prisma } from '../lib/prisma';
import type { Stripe } from 'stripe';

export class StripeService {
  // 创建或获取 Stripe 客户
  static async getOrCreateCustomer(userId: string, email?: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.stripeCustomerId) {
      return stripe.customers.retrieve(user.stripeCustomerId) as Promise<Stripe.Customer>;
    }

    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return customer;
  }

  // 创建 Checkout Session
  static async createCheckoutSession(
    userId: string,
    plan: 'PRO' | 'TEAM',
    billing: 'monthly' | 'yearly',
    successUrl: string,
    cancelUrl: string
  ) {
    const customer = await this.getOrCreateCustomer(userId);
    const priceId = PRICES[plan]?.[billing];

    if (!priceId) {
      throw new Error('Invalid plan or billing');
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        plan,
        billing,
      },
    });

    return session;
  }

  // 创建客户门户 Session
  static async createCustomerPortalSession(userId: string, returnUrl: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeCustomerId) {
      throw new Error('User or Stripe customer not found');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: returnUrl,
    });

    return session;
  }

  // 处理 Checkout Session 完成
  static async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, plan } = session.metadata as { userId: string; plan: 'PRO' | 'TEAM' };
    const subscriptionId = session.subscription as string;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    await prisma.$transaction(async (tx: any) => {
      // 更新用户的 plan
      await tx.user.update({
        where: { id: userId },
        data: { plan },
      });

      // 创建或更新订阅记录
      await tx.subscription.upsert({
        where: { userId },
        create: {
          userId,
          plan,
          status: 'ACTIVE',
          stripeSubscriptionId: subscriptionId,
          stripePriceId: subscription.items.data[0].price.id,
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        },
        update: {
          plan,
          status: 'ACTIVE',
          stripeSubscriptionId: subscriptionId,
          stripePriceId: subscription.items.data[0].price.id,
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        },
      });
    });
  }

  // 处理订阅更新
  static async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    const userId = (customer as Stripe.Customer).metadata.userId;

    if (!userId) return;

    const statusMap: Record<string, any> = {
      active: 'ACTIVE',
      past_due: 'PAST_DUE',
      canceled: 'CANCELED',
      paused: 'PAUSED',
      incomplete: 'INCOMPLETE',
      trialing: 'TRIALING',
    };

    let plan: 'FREE' | 'PRO' | 'TEAM' = 'FREE';
    const priceId = subscription.items.data[0].price.id;

    if (priceId === PRICES.PRO?.monthly || priceId === PRICES.PRO?.yearly) {
      plan = 'PRO';
    } else if (priceId === PRICES.TEAM?.monthly || priceId === PRICES.TEAM?.yearly) {
      plan = 'TEAM';
    }

    await prisma.$transaction(async (tx: any) => {
      await tx.user.update({
        where: { id: userId },
        data: { plan },
      });

      await tx.subscription.upsert({
        where: { userId },
        create: {
          userId,
          plan,
          status: statusMap[subscription.status] || 'ACTIVE',
          stripeSubscriptionId: subscription.id,
          stripePriceId: priceId,
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
        update: {
          plan,
          status: statusMap[subscription.status] || 'ACTIVE',
          stripePriceId: priceId,
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      });
    });
  }

  // 处理订阅删除
  static async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    const userId = (customer as Stripe.Customer).metadata.userId;

    if (!userId) return;

    await prisma.$transaction(async (tx: any) => {
      await tx.user.update({
        where: { id: userId },
        data: { plan: 'FREE' },
      });

      await tx.subscription.update({
        where: { userId },
        data: {
          status: 'CANCELED',
          cancelAtPeriodEnd: true,
        },
      });
    });
  }

  // 处理支付失败
  static async handlePaymentFailed(invoice: Stripe.Invoice) {
    const customer = await stripe.customers.retrieve(invoice.customer as string);
    const userId = (customer as Stripe.Customer).metadata.userId;

    if (!userId) return;

    await prisma.subscription.update({
      where: { userId },
      data: { status: 'PAST_DUE' },
    });
  }

  // 获取用户的订阅信息
  static async getSubscription(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      user: {
        id: user.id,
        plan: user.plan,
      },
      subscription: user.subscription,
      planDetails: PLAN_DETAILS[user.plan as keyof typeof PLAN_DETAILS],
    };
  }

  // 获取所有套餐详情
  static async getPlans() {
    return PLAN_DETAILS;
  }
}
