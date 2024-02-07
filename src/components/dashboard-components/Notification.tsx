import { Card, CardHeader, CardTitle } from '@/components/ui/card';
export default async function Notification({
  title,
  children
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Card>
        <CardHeader className="p-3">
          <CardTitle className="text-lg text-left border-b-2 border-b-brand-bg-100">
            {title}
          </CardTitle>
        </CardHeader>
        <div className="px-3 py-2">{children}</div>
      </Card>
    </div>
  );
}
