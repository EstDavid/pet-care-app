import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
export default async function Notification({ title }: { title: string }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="w-3/5 ">
          <CardContent className="flex flex-row justify-between self-center mt-4"></CardContent>
          <CardContent></CardContent>
        </CardContent>
      </Card>
    </div>
  );
}
