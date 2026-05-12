'use client';

import { useState } from 'react';
import { Settings, CreditCard, Calendar, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '~/components/ui/card';

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false);

  // 模拟数据
  const subscription = {
    plan: 'Pro',
    status: 'active',
    currentPeriodEnd: '2026-06-12',
    price: '¥65/月',
  };

  const invoices = [
    {
      id: 'inv_1',
      date: '2026-05-12',
      amount: '¥65',
      status: 'paid',
      pdfUrl: '#',
    },
    {
      id: 'inv_2',
      date: '2026-04-12',
      amount: '¥65',
      status: 'paid',
      pdfUrl: '#',
    },
  ];

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      // 这里将连接到 tRPC
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('即将跳转到订阅管理页面');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">账单与订阅</h1>
          <p className="text-muted-foreground">管理你的订阅和查看发票</p>
        </div>

        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <CardTitle>当前订阅</CardTitle>
            </div>
            <CardDescription>你的套餐详情和状态</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{subscription.plan}</h3>
                <p className="text-muted-foreground mb-4">{subscription.price}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  {subscription.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="capitalize">
                    {subscription.status === 'active' ? '活跃' : subscription.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    当前周期结束: {subscription.currentPeriodEnd}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col justify-end">
                <Button 
                  onClick={handleManageSubscription}
                  disabled={isLoading}
                  className="w-full md:w-auto"
                >
                  {isLoading ? '处理中...' : '管理订阅'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>发票历史</CardTitle>
            <CardDescription>查看和下载你的发票</CardDescription>
          </CardHeader>
          
          <CardContent>
            {invoices.length > 0 ? (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">发票 #{invoice.id.slice(-6)}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{invoice.amount}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        invoice.status === 'paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {invoice.status === 'paid' ? '已支付' : '待支付'}
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer">
                          下载
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>暂无发票记录</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Billing Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <CardTitle>账单设置</CardTitle>
            </div>
            <CardDescription>更新你的账单信息和通知偏好</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">电子邮件收据</p>
                  <p className="text-sm text-muted-foreground">支付后发送收据到你的邮箱</p>
                </div>
                <Button variant="outline" size="sm">
                  配置
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">付款方式</p>
                  <p className="text-sm text-muted-foreground">更新你的支付信息</p>
                </div>
                <Button variant="outline" size="sm">
                  更新
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
