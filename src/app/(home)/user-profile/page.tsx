import UserProfile from "@/components/user-profile";
import { getUserByClerkId } from "@/lib/db/controller/User";
import { notFound } from "next/navigation";
import { SignOutButton, currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import SignOutLogo from "@/../public/sign_out_icon.svg";
import Image from "next/image";

export default async function Page() {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;
  const rawUserData = await getUserByClerkId(clerkUserId || "");
  // serializing the user object to avoid circular structure error
  const user = JSON.parse(JSON.stringify(rawUserData));

  if (!user) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold text pb-2">Your profile</h1>
      <UserProfile user={user} />
      <div className="flex m-4">
        <Button>
          {/* but image {SignOutLogo} beside the signOutButton with width and hights of 20px */}
          <SignOutButton />
          <Image
            src={SignOutLogo}
            alt="Sign Out Logo"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </Button>
      </div>
    </div>
  );
}
