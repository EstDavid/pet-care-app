'use client';
import {Card} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import PetProfile from './pet-profile';
import {Button} from '@/components/ui/button';
import {FullStay} from '@/lib/db/models/Stay';
import {useState} from 'react';
import {confirmStayAction} from '@/lib/actions/stay-actions';

import Image from 'next/image';
import {FaDog, FaCat} from 'react-icons/fa';
import StayConfirmed from './dashboard-components/StayConfirmed';
import {useToast} from '@/components/ui/use-toast';
import contactUser from '@/lib/actions/conversation-actions';

export default function StayCard({
  stay,
  userId,
  role,
  children,
}: {
  stay: FullStay;
  userId: string;
  role: 'owner' | 'sitter';
  children?: React.ReactNode;
}) {
  const [confirmed, setConfirmed] = useState(stay.confirmed);
  const {toast} = useToast();

  async function handleConfirm() {
    await confirmStayAction(stay._id);
    setConfirmed(!confirmed);
    toast({
      title: 'Request confirmed.',
      duration: 2000,
    });
  }

  const stayContact = role === 'owner' ? stay.sitter : stay.owner;

  const getInContact = contactUser.bind(null, userId);

  return (
    <div>
      <Dialog>
        <Card>
          <div className="flex w-full flex-col p-2 gap-1">
            <div className="flex justify-between p-2">
              <div className="flex flex-col justify-between items-start w-full gap-1">
                <Image
                  src={
                    stayContact.pfpUrl ||
                    'https://res.cloudinary.com/cw-app/image/upload/v1707210944/pet-app/bttjaerjdctmwp1b2abr.jpg'
                  }
                  alt={stayContact.firstname || 'photo of owner'}
                  width={0}
                  height={0}
                  sizes="200px"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <p>{`${stayContact.firstname} / ${stayContact.contact?.city}`}</p>
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

            <div>
              {role === 'owner' ? (
                <div className="gap-2 flex flex-col m-2">
                  {children}
                  <form className="w-full" action={getInContact}>
                    <input
                      type="text"
                      defaultValue={stay.sitter._id?.toString()}
                      name="recipient"
                      className="hidden"
                    ></input>
                    <Button variant="outline" className="w-full">
                      CONTACT SITTER
                    </Button>
                  </form>
                  <div className="w-full">
                    <StayConfirmed confirmed={confirmed} />
                  </div>
                </div>
              ) : (
                <div className="gap-2 flex flex-col m-2">
                  {children}
                  <form className="w-full" action={getInContact}>
                    <input
                      type="text"
                      defaultValue={stay.owner._id?.toString()}
                      name="recipient"
                      className="hidden"
                    ></input>
                    <Button variant="outline" className="w-full">
                      CONTACT OWNER
                    </Button>
                  </form>
                  <div className="w-full">
                    {!confirmed && (
                      <Button className="w-full" onClick={handleConfirm}>
                        CONFIRM
                      </Button>
                    )}
                    {confirmed && (
                      <Button className="w-full" disabled>
                        CONFIRMED!
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Dialog>
    </div>
  );
}
