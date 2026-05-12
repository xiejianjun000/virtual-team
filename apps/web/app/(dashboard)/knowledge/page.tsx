import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">知识库</h2>
      
      <Card>
        <CardHeader>
        <CardTitle>沉淀的知识</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">暂无知识沉淀</p>
      </CardContent>
    </Card>
    </div>
  );
}
