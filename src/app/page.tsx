import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {RocketIcon} from '@radix-ui/react-icons';


export default function Home() {
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
