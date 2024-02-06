"use server";
import { currentUser } from "@clerk/nextjs";
import { User } from '@clerk/nextjs/server';
import { getStaysByClerkUser } from "@/lib/db/controller/Stay";
import StayCard from '@/components/sitter/stay-card'
// import {getStay}


export default async function Page() {
  const user = await currentUser() as User;
  let stays = await getStaysByClerkUser(user.id);


  return (
    <>
    {stays?.map((stay, index) => {
     return( <StayCard stay={stay} key={stay._id.toString()}/>)
    })}
    </>
  );
}