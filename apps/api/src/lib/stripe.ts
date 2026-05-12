import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-04-22.dahlia' as any,
  typescript: true,
});

// 定价配置
export const PRICES = {
  FREE: null,
  PRO: {
    monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
    yearly: process.env.STRIPE_PRICE_PRO_YEARLY || '',
  },
  TEAM: {
    monthly: process.env.STRIPE_PRICE_TEAM_MONTHLY || '',
    yearly: process.env.STRIPE_PRICE_TEAM_YEARLY || '',
  },
};

// 套餐详情
export const PLAN_DETAILS = {
  FREE: {
    name: 'Free',
    price: {
      monthly: 0,
      yearly: 0,
    },
    currency: 'cny',
    features: [
      '3 个仓库',
      '每月 100 次 AI 任务',
      '基础功能',
      '7 天历史记录',
    ],
  },
  PRO: {
    name: 'Pro',
    price: {
      monthly: 65,
      yearly: 650,
    },
    currency: 'cny',
    features: [
      '无限仓库',
      '无限 AI 任务',
      '全部功能',
      '90 天历史记录',
      '100MB 知识库存储',
      '优先支持',
    ],
  },
  TEAM: {
    name: 'Team',
    price: {
      monthly: 210,
      yearly: 2100,
    },
    currency: 'cny',
    features: [
      '无限仓库',
      '无限 AI 任务',
      '全部功能',
      '1 年历史记录',
      '1GB 知识库存储',
      '5 人团队协作',
      '专属支持',
    ],
  },
} as const;
