import { auth } from "@clerk/nextjs";
import { getUserByClerkId } from "./db/controller/User";

export async function getUser () {
  const { userId } = auth();

  if (userId) {
    const user = await getUserByClerkId(userId);

    return user;
  }

  return undefined;
}
