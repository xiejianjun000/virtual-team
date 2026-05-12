import Link from 'next/link';
import { Github, Zap, Users, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm text-primary mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          开箱即用，5分钟配置
        </div>
        
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          一人 <span className="text-primary">AI 工程团队</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          50+ AI 智能体虚拟工程团队，覆盖产品、开发、测试、发布全流程。
          一个人，顶二十人的团队。
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">
              <Github className="mr-2 h-5 w-5" />
              开始使用
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">
              查看功能
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="50+ AI 专家"
            description="YC 产品诊断、CEO 战略挑战、架构师、设计审查、代码审查、安全审计..."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="虚拟工程团队"
            description="无需管理真实团队，随用随叫，24小时待命，不抱怨不请假"
          />
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="知识复利"
            description="自动沉淀解决方案，跨项目累积，越用越聪明"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 border">
          <h2 className="text-3xl font-bold mb-4">开始你的 AI 团队之旅</h2>
          <p className="text-muted-foreground mb-8">
            5 分钟配置，立即拥有顶级工程团队
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              免费开始
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 VirtualTeam. 一人顶二十人，不是梦。</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}
