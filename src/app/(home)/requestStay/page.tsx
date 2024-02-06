'use client';
import { useState } from 'react';
import {
  Drawer,
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

export default function RequestStay({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>();
  // for setting up initial date range
  // {
  // from: new Date(2022, 0, 20),
  // to: addDays(new Date(2022, 0, 20), 20),
  // }
  return (
    <Drawer>
      <DrawerTrigger>Sitter1</DrawerTrigger>
      <DrawerContent className="bg-brand-bg">
        <DrawerHeader>
          <DrawerTitle>Request a stay</DrawerTitle>
          <DrawerDescription className="flex flex-col items-center w-full gap-2">
            {/* Render Pet checkboxes */}
            <div className="flex gap-1">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium text-brand-bg-950"
              >
                Gyoza
              </label>
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium text-brand-bg-950"
              >
                Gyoza
              </label>
            </div>
            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal',
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
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
