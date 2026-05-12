'use client';

import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '~/components/ui/card';

// 套餐数据
const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    currency: '¥',
    description: '适合个人探索',
    features: [
      '3 个仓库',
      '每月 100 次 AI 任务',
      '基础功能',
      '7 天历史记录',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 65, yearly: 650 },
    currency: '¥',
    description: '适合个人开发者',
    features: [
      '无限仓库',
      '无限 AI 任务',
      '全部功能',
      '90 天历史记录',
      '100MB 知识库存储',
      '优先支持',
    ],
    popular: true,
  },
  {
    name: 'Team',
    price: { monthly: 210, yearly: 2100 },
    currency: '¥',
    description: '适合小团队',
    features: [
      '无限仓库',
      '无限 AI 任务',
      '全部功能',
      '1 年历史记录',
      '1GB 知识库存储',
      '5 人团队协作',
      '专属支持',
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // 处理订阅 - 这里我们暂时使用占位逻辑，等下更新 tRPC 后再完善
  const handleSubscribe = async (plan: string) => {
    if (plan === 'Free') return;
    
    setIsLoading(plan);
    try {
      // 这里将连接到 tRPC
      // 暂时模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`即将跳转到 ${plan} 套餐的支付页面（${billing}）`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            简单透明的定价
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            选择适合你的套餐，支持微信和支付宝
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-muted rounded-lg p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                billing === 'monthly' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-2 rounded-md transition-colors ${
                billing === 'yearly' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              年付
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                省 2 个月
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`flex flex-col ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105 relative z-10' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  最受欢迎
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.currency}
                    {billing === 'monthly' ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-muted-foreground">
                    /{billing === 'monthly' ? '月' : '年'}
                  </span>
                  {plan.price.monthly === 0 && (
                    <span className="ml-2 text-muted-foreground">永久免费</span>
                  )}
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isLoading === plan.name}
                >
                  {plan.price.monthly === 0 ? (
                    '开始使用'
                  ) : (
                    <>
                      {isLoading === plan.name ? '处理中...' : '升级'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">常见问题</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">支持哪些支付方式？</h3>
              <p className="text-muted-foreground">
                支持微信支付、支付宝，以及国际信用卡（Visa、MasterCard 等）。
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">可以随时取消订阅吗？</h3>
              <p className="text-muted-foreground">
                是的，你可以随时取消订阅。取消后，你仍可以使用服务直到当前计费周期结束。
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">有退款政策吗？</h3>
              <p className="text-muted-foreground">
                我们提供 7 天无理由退款。如果你对服务不满意，可以在 7 天内申请全额退款。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
