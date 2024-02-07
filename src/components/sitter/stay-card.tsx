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
import Image from 'next/image';
import { PiDogFill, PiCatFill } from "react-icons/pi";


export default function StayCard({ stay, role }: { stay: FullStay, role: string }) {
  const [confirmed, setConfirmed] = useState(stay.confirmed)


  async function handleConfirm() {
    await confirmStayAction(stay._id);
    setConfirmed(!confirmed)
  }

  return (
    <>
      <Card>
        <div className='flex w-full flex-col'>
          <div className='flex w-full'>
            <Image src={stay.owner.pfpUrl || 'https://res.cloudinary.com/cw-app/image/upload/v1707210944/pet-app/bttjaerjdctmwp1b2abr.jpg'}
              alt={stay.owner.firstname || 'photo of owner'}
              width={0} height={0} sizes='200px' className='w-[50px] h-[50px] rounded-full'
            />
            <p>{`${stay.owner.firstname} / ${stay.owner.contact?.city}`}</p>
            <p>From :{new Date(stay.from).toLocaleDateString('de-AT')}</p>
            <p>To :{new Date(stay.to).toLocaleDateString('de-AT')}</p>
          </div>

          <div className='flex flex-col gap-3'>
            {stay.pet.map((onePet) => {
              return (
                <div key={onePet.name} className='flex flex-row gap-8 m-2 content-center justify-around border'>
                  <div>
                    {onePet.pfpUrl && // pet profile pic or icon
                      <Image src={onePet.pfpUrl || 'https://res.cloudinary.com/cw-app/image/upload/v1707210944/pet-app/bttjaerjdctmwp1b2abr.jpg'}
                        alt={stay.owner.firstname || 'photo of owner'}
                        width={0} height={0} sizes='200px' className='w-[50px] h-[50px] rounded-full'
                      />
                    }
                    {!onePet.pfpUrl && onePet.species == 'dog' ? <PiDogFill /> : <PiCatFill />}
                  </div>
                  <p>{onePet.name}</p>
                  <p className='text-nowrap'>Age: {onePet.age}</p>
                  <p>{onePet.sex[0].toUpperCase() + onePet.sex.substring(1)}</p>
                  <p className='rounded-sm p-1 bg-brand-bg-600'>{onePet.sprayed ? 'SPAYED' : 'INTACT'}</p>
                </div>
              )
            })}
          </div>
          <div className='gap-2 flex flex-col m-2'>
            <Button>CONTACT OWNER</Button>
            {!confirmed && <Button onClick={handleConfirm}>CONFIRM</Button>}
            {confirmed && <Button disabled>CONFIRMED!</Button>}
          </div>
        </div>
      </Card>
    </>);
}
