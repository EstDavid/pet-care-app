'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // TODO: update this variable with context
  const loggedinUser = undefined;

  if (!loggedinUser) {
    router.push('/homepage');
  }
  return (
    <main>
      <h1>Hello world</h1>
      <h2>Here we go</h2>
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </main>
  );
}
