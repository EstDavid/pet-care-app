'use client';
import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import Pet from '@/lib/db/models/Pet';
import requestStay from '@/lib/actions/request-stay';
import { Input } from '@/components/ui/input';

export default function RequestStay({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>();
  // for setting up initial date range
  // {
  // from: new Date(2022, 0, 20),
  // to: addDays(new Date(2022, 0, 20), 20),
  // }

  // Pets need to be fetched in parent component
  // const pets = (await getPetsOwnedByUser(userId)) || [];
  const pets: any = [
    { _id: '1', name: 'Gyoza' },
    { _id: '2', name: 'Pluto' },
    { _id: '3', name: 'Mars' },
  ];
  const from = date?.from;

  // const test = requestStay.bind(
  //   null,
  //   from,
  //   to: date.to,
  // );

  // Date is a object
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(typeof date?.from?.toLocaleDateString());
  }

  return (
    <Drawer>
      <DrawerTrigger>Sitter1</DrawerTrigger>

      <DrawerContent className="bg-brand-bg flex flex-col gap-2">
        <form>
          <DrawerHeader>
            <DrawerTitle className="mb-4">Request a stay</DrawerTitle>
            <DrawerDescription className="flex flex-col items-center w-full gap-2">
              {/* Render Pet checkboxes */}
              <div className="flex gap-4">
                {pets?.map((pet: any) => (
                  <div className="flex gap-1" key={pet._id}>
                    <Checkbox id={pet._id} name={pet._id} />
                    <label
                      htmlFor={pet._id}
                      className="text-sm font-medium text-brand-bg-950"
                    >
                      {pet.name}
                    </label>
                  </div>
                ))}
              </div>
              {/* Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={'outline'}
                    className={cn(
                      'w-[300px] justify-start text-left font-normal mt-2',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'LLL dd, y')} -{' '}
                          {format(date.to, 'LLL dd, y')}
                        </>
                      ) : (
                        format(date.from, 'LLL dd, y')
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </DrawerDescription>
          </DrawerHeader>
          {/* Buttons */}
          <DrawerFooter>
            <Button onClick={handleClick}>Submit</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
