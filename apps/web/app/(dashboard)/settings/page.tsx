import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">设置</h2>
      
      <Card>
        <CardHeader>
        <CardTitle>用户设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">用户名</label>
          <Input placeholder="输入用户名" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">邮箱</label>
          <Input placeholder="输入邮箱" />
        </div>
        <Button>保存设置</Button>
      </CardContent>
    </Card>
    </div>
  );
}
