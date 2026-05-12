import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">任务</h2>
      
      <Card>
        <CardHeader>
        <CardTitle>任务列表</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">暂无任务</p>
      </CardContent>
    </Card>
    </div>
  );
}
