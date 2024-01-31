import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { GoHomeFill } from 'react-icons/go';
import { HiUsers } from 'react-icons/hi';
import { CiSettings } from 'react-icons/ci';

export default function Footer() {
  const navLinks = [
    {
      name: 'Home',
      href: 'dashboard',
      icon: <GoHomeFill size="2em" />
    },
    {
      name: 'Sitters',
      href: 'dashboard/sitters',
      icon: <HiUsers size="2em" />
    },
    {
      name: 'Settings',
      href: 'dashboard/account-settings',
      icon: <CiSettings size="2em" />
    }
  ];
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
