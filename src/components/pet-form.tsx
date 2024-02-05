'use client';
import {Input} from '@/components/ui/input';
import {
  SelectValue,
  SelectTrigger,
  SelectLabel,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {CardContent, Card, CardHeader, CardTitle} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import {Separator} from '@/components/ui/separator';
import UploadWidget from '@/components/upload-widget';
import {useState} from 'react';
import Image from 'next/image';
import {createPet} from '@/lib/actions/pet-actions';
import {Pet} from '@/lib/db/models/Pet';

export default function PetForm({pet}: {pet: Pet | {}}) {
  const [imageUrl, setImageUrl] = useState('');
  const [newImgUploaded, setNewImgUploaded] = useState(false);

  // upload widget callback
  const imgUploaded = (result: string) => {
    setImageUrl(result);
    setNewImgUploaded(true);
  };

  // use url from the DB or the newly uploaded one
  const imgSrc = newImgUploaded ? imageUrl : (pet as Pet)?.pfpUrl || imageUrl;

  // edit pet with the actual url
  const createPetWithImg = createPet.bind(null, imgSrc);
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative w-[120px] h-[120px]">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt="Your pet's picture"
            fill={true}
            sizes="120px"
            priority={true}
            style={{
              objectFit: 'cover',
            }}
          ></Image>
        ) : (
          <div className="w-[120px] h-[120px] bg-white text-center rounded-md flex items-center">
            Please add your pet&apos;s photo
          </div>
        )}
      </div>

      <UploadWidget onUploadedSuccess={imgUploaded} />

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPetWithImg}>
            <div className="grid w-full items-center gap-4">
              <div className="space-y-2">
                <Select
                  name="species"
                  defaultValue={(pet as Pet)?.species || ''}
                  required
                >
                  <SelectTrigger aria-label="Species">
                    <SelectValue placeholder="Species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Species</SelectLabel>
                      <SelectItem value="dog">🐶 Dog</SelectItem>
                      <SelectItem value="cat">😸 Cat</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="name"
                  placeholder="Name"
                  type="text"
                  defaultValue={(pet as Pet)?.name || ''}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="age"
                  placeholder="Age"
                  type="number"
                  defaultValue={(pet as Pet)?.age || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="breed"
                  placeholder="Breed"
                  type="text"
                  defaultValue={(pet as Pet)?.breed}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Select name="sex" defaultValue={(pet as Pet)?.sex || ''}>
                  <SelectTrigger aria-label="Sex">
                    <SelectValue placeholder="Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sex</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Health Information</h3>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name="sprayed"
                    value="true"
                    defaultChecked={(pet as Pet)?.sprayed || false}
                  />
                  <label
                    htmlFor="sprayed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sprayed/ neutered
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="medication"
                  placeholder="Medication / Supplements (if any)"
                  type="text"
                  defaultValue={(pet as Pet)?.medication || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="allergies"
                  placeholder="Allergies / Health Conditions (if any)"
                  type="text"
                  defaultValue={(pet as Pet)?.allergies || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="vaccinations"
                  placeholder="Vaccinations"
                  type="text"
                  defaultValue={(pet as Pet)?.vaccinations || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Textarea
                  className="min-h-[100px]"
                  name="notes"
                  placeholder="Please describe your pet's behavior and habits"
                  defaultValue={(pet as Pet)?.notes || ''}
                />
              </div>
              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Emergency Information</h3>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="emergencyInstructions"
                  placeholder="Instructions (if any)"
                  type="text"
                  defaultValue={(pet as Pet)?.emergencyInstructions || ''}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="vetName"
                  placeholder="Vet Name"
                  type="text"
                  defaultValue={(pet as Pet)?.vet?.name}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="vetPhone"
                  placeholder="Vet Phone Number"
                  type="text"
                  defaultValue={(pet as Pet)?.vet?.phone}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="vetAddress"
                  placeholder="Vet Address"
                  type="text"
                  defaultValue={(pet as Pet)?.vet?.street}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="insurance"
                  placeholder="Insurance Number"
                  type="text"
                  defaultValue={(pet as Pet)?.insurance}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="microchip"
                  placeholder="Microchip Number"
                  type="text"
                  defaultValue={(pet as Pet)?.microchip}
                />
              </div>
              <Button variant="default" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
