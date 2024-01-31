import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    {
      name: 'Home',
      href: 'dashboard'
    },
    {
      name: 'Sitters',
      href: 'dashboard/sitters'
    },
    {
      name: 'Account Settings',
      href: 'dashboard/account-settings'
    }
  ];
  return (
    <nav className="w-full h-footer-nav bg-brand-bg">
      <ul className="flex h-full flex-row justify-between items-center px-x-pad-footer container">
        {navLinks.map((navLink, index) => {
          return (
            <div key={index}>
              <Link
                href={`/${navLink.href}`}
                className="text-brand-fg h-auto text-2xl"
              >
                {navLink.name}
              </Link>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}
