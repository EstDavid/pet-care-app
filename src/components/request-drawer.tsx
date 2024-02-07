'use client';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Checkbox } from '@/components/ui/checkbox';
import requestStay from '@/lib/actions/request-stay';
import { Pet } from '@/lib/db/models/Pet';

export default function RequestDrawer({
  pets,
  owner,
  sitter,
}: {
  pets: Pet[];
  owner: string;
  sitter: string;
}) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedPets, setSelectedPets] = useState<boolean[]>(
    Array(pets.length).fill(false)
  );

  function handlePetSelection(index: number) {
    setSelectedPets((prev) => {
      const newSelected = [...prev];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  }

  console.log(selectedPets);
  let infoComplete = date?.to !== undefined && selectedPets.includes(true);

  const from = date?.from?.toLocaleDateString() as string;
  const to = date?.to?.toLocaleDateString() as string;

  const submitForm = requestStay.bind(null, owner, sitter, from, to);

  return (
    <form action={submitForm}>
      <DrawerHeader>
        <DrawerTitle className="mb-4">Request a stay</DrawerTitle>
        <div className="flex flex-col items-center w-full gap-2">
          {/* Render Pet checkboxes */}
          <div className="flex gap-4">
            {pets?.map((pet: any, index: number) => (
              <div className="flex gap-1" key={pet._id}>
                <Checkbox
                  id={pet._id}
                  name={pet._id}
                  className="bg-white"
                  checked={selectedPets[index]}
                  onClick={() => handlePetSelection(index)}
                />
                <label
                  htmlFor={pet._id}
                  className="text-sm font-medium text-brand-bg-950"
                >
                  {pet.name}
                </label>
              </div>
            ))}
          </div>
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
        </div>
      </DrawerHeader>
      {/* Buttons */}
      <DrawerFooter>
        <Button type="submit" disabled={!infoComplete}>
          Submit
        </Button>
        <DrawerClose>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
}
