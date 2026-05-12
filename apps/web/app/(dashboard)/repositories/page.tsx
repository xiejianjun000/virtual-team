import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';

export default function RepositoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">仓库</h2>
        <Button>添加仓库</Button>
      </div>
      
      <Card>
        <CardHeader>
        <CardTitle>已连接的仓库</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">暂无仓库，请先安装 GitHub App</p>
      </CardContent>
    </Card>
    </div>
  );
}
