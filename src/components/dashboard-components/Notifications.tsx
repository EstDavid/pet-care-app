'use server';
import { FullStay } from '@/lib/db/models/Stay';
import Notification from './Notification';
import { getStaysByUser } from '@/lib/db/controller/Stay';
import { getUnreadMessages } from '@/lib/db/controller/Conversation';
import { User as IUser } from '@/lib/db/models/User';
import { notFound } from 'next/navigation';
import StayConfirmed from './StayConfirmed';

export default async function Notifications({ user }: { user: IUser }) {
  if (!user || !user._id) {
    return notFound();
  }

  // Getting the relevant info on ongoing and upcoming stays
  const today = new Date();

  const stays: FullStay[] = await getStaysByUser(user._id, today);

  const closestUpcomingStay =
    stays.length > 0
      ? stays
          .filter((stay) => stay.from >= today)
          .reduce((a, b) => (a.from < b.from ? a : b))
      : null;

  const onGoingStays = stays.filter((stay) => stay.from < today);

  // Getting the number of unread messages and conversations
  const unreadConversations = await getUnreadMessages(user._id);

  const unreadMessages =
    unreadConversations && unreadConversations.length > 0
      ? unreadConversations.flatMap((conversation) =>
          conversation.messages.filter(
            (message) => !message.sender?._id.equals(user._id)
          )
        )
      : [];

  return (
    <div className="flex flex-col gap-y-4 text-center">
      {unreadConversations &&
      unreadConversations.length &&
      unreadMessages &&
      unreadMessages.length > 0 ? (
        <Notification title="Latest messages">
          <h3 className="text-lg">
            You have <strong>{unreadMessages.length}</strong> message
            {unreadMessages.length > 1 ? 's' : ''} from{' '}
            <strong>{unreadConversations?.length}</strong> conversation
            {unreadConversations?.length > 1 ? 's' : ''}
          </h3>
        </Notification>
      ) : null}
      {stays.length > 0 && (
        <Notification title="Stays">
          <div className="flex flex-col gap-2 mb-2">
            {onGoingStays.length > 0 &&
              onGoingStays.map((stay, index) => {
                if (stay.to) {
                  return (
                    <div
                      key={index}
                      className="bg-brand-fg-100 p-1 px-3 rounded-full text-brand-fg-900"
                    >
                      <h3>{`Ongoing stay until ${new Date(
                        stay.to
                      ).toDateString()}`}</h3>
                      <div className="flex justify-around">
                        <h3>{`Pet${stay.pet.length > 1 ? 's' : ''}: ${stay.pet
                          .map((pet) => pet.name)
                          .join(' ')}`}</h3>
                        <StayConfirmed confirmed={stay.confirmed} />
                      </div>
                    </div>
                  );
                }
              })}
            {closestUpcomingStay && (
              <div className="bg-brand-bg-100 p-1 rounded-full text-brand-bg-900">
                <h3>{`Upcoming stay: ${new Date(
                  closestUpcomingStay.from
                ).toDateString()}`}</h3>
                <div className="flex justify-around">
                  <h3>{`Pet${
                    closestUpcomingStay.pet.length > 1 ? 's' : ''
                  }: ${closestUpcomingStay.pet
                    .map((pet) => pet.name)
                    .join(', ')}`}</h3>
                  <StayConfirmed confirmed={closestUpcomingStay.confirmed} />
                </div>
              </div>
            )}
          </div>
        </Notification>
      )}
    </div>
  );
}
