'use server';
import Link from 'next/link';
import {buttonVariants} from '../ui/button';
import {GoHomeFill} from 'react-icons/go';
import {currentUser} from '@clerk/nextjs';
import {checkUserRole} from '@/lib/db/controller/User';
import {FaDog} from 'react-icons/fa';
import {FaRegMessage} from 'react-icons/fa6';
import {FaUserCircle} from 'react-icons/fa';

export default async function Footer() {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;
  const role = await checkUserRole(clerkUserId || '');

  let navLinks: {name: string; href: string; icon: JSX.Element}[] = [];
  if (role === 'owner') {
    navLinks = [
      {
        name: 'Home',
        href: 'owner/dashboard',
        icon: <GoHomeFill size="2em" />,
      },
      {
        name: 'Stays',
        href: 'owner/stays',
        icon: <FaDog size="2em" />,
      },
      {
        name: 'Messages',
        href: 'chat',
        icon: <FaRegMessage size="2em" />,
      },
      {
        name: 'Profile',
        href: 'user-profile',
        icon: <FaUserCircle size="2em" />,
      },
    ];
  } else if (role === 'sitter') {
    navLinks = [
      {
        name: 'Home',
        href: 'sitter/dashboard',
        icon: <GoHomeFill size="2em" />,
      },
      {
        name: 'Stays',
        href: 'sitter/stays',
        icon: <FaDog size="2em" />,
      },
      {
        name: 'Messages',
        href: 'chat',
        icon: <FaRegMessage size="2em" />,
      },
      {
        name: 'Profile',
        href: 'user-profile',
        icon: <FaUserCircle size="2em" />,
      },
    ];
  }

  return (
    <nav className="w-full h-footer-nav bg-grad-down-brand-bg shadow-md">
      <ul className="flex h-full justify-between items-center px-x-pad-footer container shadow-md">
        {navLinks.map((navLink, index) => {
          return (
            <Link
              key={index}
              href={`/${navLink.href}`}
              className={`${buttonVariants({
                variant: 'link',
                size: 'iconFooter',
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
