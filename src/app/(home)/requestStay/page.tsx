import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

import RequestDrawer from '@/components/request-drawer';
import { auth } from '@clerk/nextjs';
import { getPetsOwnedByUser } from '@/lib/db/controller/User';

export default async function RequestStay() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const pets = (await getPetsOwnedByUser(userId)) || [];

  const petsObject = JSON.parse(JSON.stringify(pets));

  return (
    <Drawer>
      <DrawerTrigger>
        <Button>Request Stay</Button>
      </DrawerTrigger>

      <DrawerContent className="bg-brand-bg flex flex-col gap-2">
        <RequestDrawer pets={petsObject} />
      </DrawerContent>
    </Drawer>
  );
}
