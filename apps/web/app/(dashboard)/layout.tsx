import Link from 'next/link';
import { Github, Home, FolderGit2, CheckSquare, BookOpen, Settings } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/dashboard', icon: Home, label: '首页' },
    { href: '/dashboard/repositories', icon: FolderGit2, label: '仓库' },
    { href: '/dashboard/tasks', icon: CheckSquare, label: '任务' },
    { href: '/dashboard/knowledge', icon: BookOpen, label: '知识库' },
    { href: '/dashboard/settings', icon: Settings, label: '设置' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="font-bold">VirtualTeam</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold">仪表盘</h1>
          <Button size="sm">
            <Github className="h-4 w-4 mr-2" />
            安装 GitHub App
          </Button>
        </header>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
