import { auth } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUserByClerkId } from "./db/controller/User";

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getUser () {
  const { userId } = auth();

  if (userId) {
    const user = await getUserByClerkId(userId);

    return user;
  }

  return undefined;
}
