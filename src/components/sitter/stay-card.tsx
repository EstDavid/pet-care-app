'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {Stay} from '@/lib/db/models/Stay'
import { useState } from 'react';
import confirmStayAction from '@/lib/actions/stay-actions';

export default function StayCard({stay}:{stay:Stay}) {
const [confirmed, setConfirmed] = useState(stay.confirmed)

async function doStuff (e){
  e.preventDefault();
  await confirmStayAction(stay);
  setConfirmed(!confirmed)
  }

  return (
  <>
<form action="">

    <Card>
      <CardHeader>

      </CardHeader>
      <CardContent>
        <div>
          id = {stay._id}
        </div>
        <div>owner name = {stay.owner.firstname}</div>
        {!confirmed && <Button onClick={doStuff}>CONFIRM</Button>}
        {confirmed && <Button disabled>CONFIRMED!</Button>}
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
</form>
  </>);
}
