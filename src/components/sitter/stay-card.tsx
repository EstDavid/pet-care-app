import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Stay} from '@/lib/db/models/Stay'

export default function StayCard({stay}:{stay:Stay}) {
  console.log(stay);

  return (
  <>
hello
  <Card>
    <CardHeader>

    </CardHeader>
    <CardContent><div></div><div>owner name = {stay.owner.firstname}</div>
    </CardContent>
    <CardFooter>

    </CardFooter>
  </Card>
  </>);
}
