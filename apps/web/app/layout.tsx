import type { Metadata } from 'next';
import './globals.css';
import { APIProvider } from '~/lib/api';

export const metadata: Metadata = {
  title: 'VirtualTeam - 一人 AI 工程团队',
  description: '50+ AI 智能体虚拟工程团队，一人顶二十人团队',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <APIProvider>{children}</APIProvider>
      </body>
    </html>
  );
}
