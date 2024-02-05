'use server';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { GoHomeFill } from 'react-icons/go';
import { HiUsers } from 'react-icons/hi';
import { CiSettings } from 'react-icons/ci';
import { currentUser } from '@clerk/nextjs';
import { checkUserRole, getUserByClerkId } from '@/lib/db/controller/User';
import { FaRegMessage } from 'react-icons/fa6';
import { ColumnSpacingIcon } from '@radix-ui/react-icons';
import { getUnreadMessages } from '@/lib/db/controller/Conversation';
import { notFound } from 'next/navigation';

export default async function Footer() {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;
  const role = await checkUserRole(clerkUserId || '');

  if (!clerkUserId) {
    return notFound();
  }

  const user = await getUserByClerkId(clerkUserId);

  if (!user || !user._id) {
    return notFound();
  }

  const messages = await getUnreadMessages(user._id.toString());

  let navLinks: { name: string; href: string; icon: JSX.Element }[] = [];
  if (role === 'owner') {
    navLinks = [
      {
        name: 'Home',
        href: 'owner/dashboard',
        icon: <GoHomeFill size="2em" />
      },
      {
        name: 'Messages',
        href: 'owner/sitters',
        icon: <FaRegMessage size="2em" />
      },
      {
        name: 'Settings',
        href: 'user-profile',
        icon: <CiSettings size="2em" />
      }
    ];
  } else if (role === 'sitter') {
    navLinks = [
      {
        name: 'Home',
        href: 'sitter/dashboard',
        icon: <GoHomeFill size="2em" />
      },
      {
        name: 'Messages',
        href: 'sitter/dashboard',
        icon: <FaRegMessage size="2em" />
      },
      {
        name: 'Settings',
        href: 'user-profile',
        icon: <CiSettings size="2em" />
      }
    ];
  }

  return (
    <nav className="w-full h-footer-nav bg-brand-bg">
      <ul className="flex h-full justify-between items-center px-x-pad-footer container">
        {navLinks.map((navLink, index) => {
          return (
            <Link
              key={index}
              href={`/${navLink.href}`}
              className={`${buttonVariants({
                variant: 'link',
                size: 'iconFooter'
              })}`}
            >
              <div className="flex flex-col items-center w-full">
                {navLink.icon}
                {navLink.name}
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
