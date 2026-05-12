import Fastify from 'fastify';
import fastifyRawBody from 'fastify-raw-body';
import { trpcRouter } from './trpc';
import { stripe } from './lib/stripe';
import { StripeService } from './services/stripe.service';
import dotenv from 'dotenv';

dotenv.config();

export const app = Fastify({
  logger: true,
});

// Register raw body plugin for Stripe webhooks
app.register(fastifyRawBody, {
  field: 'rawBody',
  global: false,
  encoding: 'utf8',
  runFirst: true,
});

// Simple health check
app.get('/health', async () => {
  return { status: 'ok' };
});

// Stripe webhook
app.post(
  '/api/webhooks/stripe',
  { config: { rawBody: true } },
  async (request, reply) => {
    const sig = request.headers['stripe-signature'] as string;
    const rawBody = (request as any).rawBody;

    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      switch (event.type) {
        case 'checkout.session.completed':
          await StripeService.handleCheckoutCompleted(event.data.object);
          break;
        case 'customer.subscription.updated':
          await StripeService.handleSubscriptionUpdated(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await StripeService.handleSubscriptionDeleted(event.data.object);
          break;
        case 'invoice.payment_failed':
          await StripeService.handlePaymentFailed(event.data.object);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return reply.status(200).send({ received: true });
    } catch (err) {
      console.error('Webhook Error:', err);
      return reply.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }
  }
);

// tRPC plugin
app.register(trpcRouter, {
  prefix: '/api/trpc',
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await app.close();
  process.exit(0);
});
