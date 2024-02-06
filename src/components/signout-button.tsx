// <span class="cl-userButtonPopoverActionButtonText cl-userButtonPopoverActionButtonText__signOut 🔒️ cl-internal-17bz5n6" data-localization-key="userButton.action__signOut">Sign out</span>

import React from "react";
import { useClerk } from "@clerk/clerk-react";

const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOutClick = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return <button onClick={handleSignOutClick}>Sign Out</button>;
};

export default SignOutButton;
