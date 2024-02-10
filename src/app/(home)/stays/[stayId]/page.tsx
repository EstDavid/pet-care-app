import StayCard from '@/components/stay-card';
import {Button} from '@/components/ui/button';
import {getStayById} from '@/lib/db/controller/Stay';
import {getUserByClerkId} from '@/lib/db/controller/User';
import {currentUser} from '@clerk/nextjs';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {FaCat, FaDog} from 'react-icons/fa';

const TimeLine = ({
  stayId,
  from,
  to,
  role,
  petSpecies,
}: {
  stayId: string;
  from: Date;
  to: Date;
  role: 'owner' | 'sitter';
  petSpecies: 'dog' | 'cat';
}) => {
  const today = new Date();

  const percentageElapsed =
    ((today.getTime() - from.getTime()) / (to.getTime() - from.getTime())) *
    100;

  const percentage = Math.floor(percentageElapsed);
  const positionPhoto = percentage - 15;
  return (
    <div className="w-full h-[40vh] flex justify-center gap-3">
      <div className="flex flex-col">
        <div style={{height: `${positionPhoto}%`}}></div>
        <Link href={`/stays/${stayId}/updates`}>
          <Button className="flex flex-col h-auto p-3 gap-2 shadow-xl">
            <p className="text-lg text-brand-cta-50">{`${
              role === 'owner' ? 'View updates' : 'Send updates'
            }`}</p>
            {petSpecies === 'dog' ? (
              <FaDog size="3em" className="text-brand-fg-300" />
            ) : (
              <FaCat size="3em" className="text-brand-bg-300" />
            )}
          </Button>
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="w-[20px] bg-brand-bg-500"
          style={{height: `${percentage}%`}}
        ></div>
        <div
          className="w-[20px] bg-brand-bg-200"
          style={{height: `${100 - percentage}%`}}
        ></div>
      </div>
      <div className="flex flex-col justify-between">
        <h3>{new Date(from).toLocaleDateString('es-ES')}</h3>
        <h3>{new Date(to).toLocaleDateString('es-ES')}</h3>
      </div>
    </div>
  );
};

export default async function Page({params}: {params: {stayId: string}}) {
  const {stayId} = params;

  let stay = await getStayById(stayId);

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return notFound();
  }

  const user = await getUserByClerkId(clerkUser.id);

  if (!stay || !user || !user._id) {
    return notFound();
  }

  const today = new Date();

  const ongoingStay = stay.confirmed && stay.from <= today && stay.to >= today;

  stay = JSON.parse(JSON.stringify(stay));

  if (!stay) {
    return notFound();
  }

  return (
    <div className="w-full">
      <StayCard
        stay={stay}
        userId={user._id.toString()}
        role={user.role || 'sitter'}
      >
        {ongoingStay && (
          <TimeLine
            stayId={stay._id.toString()}
            from={new Date(stay.from)}
            to={new Date(stay.to)}
            role={user.role}
            petSpecies={stay.pet[0].species}
          />
        )}
      </StayCard>
    </div>
  );
}
