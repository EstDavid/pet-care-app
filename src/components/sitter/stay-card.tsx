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
import { FullStay } from '@/lib/db/models/Stay'
import { useState } from 'react';
import confirmStayAction from '@/lib/actions/stay-actions';
import { Pet as IPet } from '@/lib/db/models/Pet'
import { getStaysByClerkUser } from "@/lib/db/controller/Stay";
import { Types } from 'mongoose';

export default function StayCard({ stay }: { stay: FullStay }) {
  const [confirmed, setConfirmed] = useState(stay.confirmed)

  async function handleConfirm() {
    await confirmStayAction(stay._id);
    setConfirmed(!confirmed)
  }

  return (
    <>
        <Card>
          <CardHeader>

          </CardHeader>
          <CardContent>
            <div>
              {stay.pet.map((onePet) => {
                return (
                  <div key={(onePet._id as Types.ObjectId).toString()}>{onePet.name}</div>
                )
              })}
            </div>
            <div>owner name = {stay.owner.firstname}</div>
            {!confirmed && <Button onClick={handleConfirm}>CONFIRM</Button>}
            {confirmed && <Button disabled>CONFIRMED!</Button>}
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
    </>);
}
