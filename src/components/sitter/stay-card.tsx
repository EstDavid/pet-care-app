'use client';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import PetProfile from '../pet-profile';
import { Button } from '@/components/ui/button';
import { FullStay } from '@/lib/db/models/Stay';
import { useState } from 'react';
import confirmStayAction from '@/lib/actions/stay-actions';

import Image from 'next/image';
import { FaDog, FaCat } from 'react-icons/fa';
import Subheader from '../navigation/subheader';

export default function StayCard({ stay }: { stay: FullStay }) {
  const [confirmed, setConfirmed] = useState(stay.confirmed);

  async function handleConfirm() {
    await confirmStayAction(stay._id);
    setConfirmed(!confirmed);
  }

  return (
    <>
      <Subheader title="Stays Overview" />
      <Dialog>
        <Card className="mt-subheader-height">
          <div className="flex w-full flex-col p-2 gap-1">
            <div className="flex justify-between p-2">
              <div className="flex flex-col justify-between items-start w-full gap-1">
                <Image
                  src={
                    stay.owner.pfpUrl ||
                    'https://res.cloudinary.com/cw-app/image/upload/v1707210944/pet-app/bttjaerjdctmwp1b2abr.jpg'
                  }
                  alt={stay.owner.firstname || 'photo of owner'}
                  width={0}
                  height={0}
                  sizes="200px"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <p>{`${stay.owner.firstname} / ${stay.owner.contact?.city}`}</p>
              </div>
              <div className="flex flex-col justify-between items-end w-full gap-1">
                <p>From: {new Date(stay.from).toLocaleDateString('de-AT')}</p>
                <p>To: {new Date(stay.to).toLocaleDateString('de-AT')}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1 p-2">
              {stay.pet.map((onePet) => {
                return (
                  <div
                    key={onePet.name}
                    className="flex w-full gap-3 border justify-between items-center content-start px-5 py-2 rounded-full bg-brand-bg-50"
                  >
                    <DialogTrigger
                      key={onePet._id?.toString()}
                      className="w-full"
                    >
                      <div
                        key={onePet.name}
                        className="flex w-full justify-between items-center"
                      >
                        <div>
                          {onePet.pfpUrl && ( // pet profile pic or icon
                            <div className="flex items-center gap-2">
                              <Image
                                src={
                                  onePet.pfpUrl ||
                                  'https://res.cloudinary.com/cw-app/image/upload/v1707210944/pet-app/bttjaerjdctmwp1b2abr.jpg'
                                }
                                alt={stay.owner.firstname || 'photo of owner'}
                                width={0}
                                height={0}
                                sizes="200px"
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>
                          )}
                          <p className="text-lg">{onePet.name}</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          {onePet.species === 'dog' ? (
                            <FaDog size="2em" className="text-brand-fg-400" />
                          ) : (
                            <FaCat size="2em" className="text-brand-bg-500" />
                          )}
                          <p className="">{onePet.breed}</p>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="mx-auto w-full max-w-sm">
                        <PetProfile pet={onePet} role={'sitter'} />
                      </div>
                      <DialogClose>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </div>
                );
              })}
            </div>

            <div className="gap-2 flex flex-col m-2">
              <Button variant="outline">CONTACT OWNER</Button>
              {!confirmed && <Button onClick={handleConfirm}>CONFIRM</Button>}
              {confirmed && <Button disabled>CONFIRMED!</Button>}
            </div>
          </div>
        </Card>
      </Dialog>
    </>
  );
}
