import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { CheckCircle, Clock, AlertCircle, TrendingUp, FolderGit2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="活跃仓库"
          value="12"
          icon={<FolderGit2 className="h-4 w-4" />}
          trend="+2"
        />
        <StatsCard
          title="运行中任务"
          value="5"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          title="本周发布"
          value="8"
          icon={<CheckCircle className="h-4 w-4" />}
          trend="+3"
        />
        <StatsCard
          title="代码审查"
          value="24"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="+12"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近任务</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <TaskItem
                title="Review: 添加用户认证"
                type="REVIEW"
                status="running"
                repo="open-taiji"
                time="2 分钟前"
              />
              <TaskItem
                title="QA: 登录页面测试"
                type="QA"
                status="completed"
                repo="open-taiji"
                time="15 分钟前"
              />
              <TaskItem
                title="Ship: v1.2.0"
                type="SHIP"
                status="queued"
                repo="github-ops"
                time="1 小时前"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>仓库状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RepoItem
                name="open-taiji"
                tasks={12}
                lastActive="刚刚"
                health="good"
              />
              <RepoItem
                name="github-ops"
                tasks={8}
                lastActive="2 小时前"
                health="warning"
              />
              <RepoItem
                name="virtual-team"
                tasks={3}
                lastActive="1 天前"
                health="good"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, trend }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
        {trend && (
          <p className="text-xs text-green-500 mt-2">
            {trend} vs 上周
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function TaskItem({ title, type, status, repo, time }: {
  title: string;
  type: string;
  status: 'running' | 'completed' | 'queued' | 'failed';
  repo: string;
  time: string;
}) {
  const statusColors = {
    running: 'bg-blue-500',
    completed: 'bg-green-500',
    queued: 'bg-yellow-500',
    failed: 'bg-red-500',
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{repo}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${statusColors[status]}`}></span>
        <span className="text-sm text-muted-foreground">{time}</span>
      </div>
    </div>
  );
}

function RepoItem({ name, tasks, lastActive, health }: {
  name: string;
  tasks: number;
  lastActive: string;
  health: 'good' | 'warning' | 'error';
}) {
  const healthColors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          {tasks} 个活跃任务
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${healthColors[health]}`}></span>
        <span className="text-sm text-muted-foreground">{lastActive}</span>
      </div>
    </div>
  );
}
