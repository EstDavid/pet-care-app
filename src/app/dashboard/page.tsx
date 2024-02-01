import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1>This is the dashboard</h1>
      <Link href="/dashboard/pet">
        <Button className="mt-10">Add a pet</Button>
      </Link>
    </div>
  );
}
