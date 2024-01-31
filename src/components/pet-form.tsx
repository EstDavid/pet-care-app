'use client';

import {Label} from '@/components/ui/label';
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
import UploadWidget from '@/components/media-upload/upload-widget';
import {useState} from 'react';
import Image from 'next/image';

export function PetForm() {
  const [mediaUrl, setMediaUrl] = useState('');
  const imgUploaded = (result: string) => {
    setMediaUrl(result);
  };

  console.log(mediaUrl);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-brand-bg font-semibold">Your pet</h1>
        {mediaUrl ? (
          <Image
            src={mediaUrl}
            width={120}
            height={120}
            alt="User Picture"
            className="rounded-full mx-auto"
          ></Image>
        ) : (
          <div className="w-[120px] h-[120px] bg-white text-center my-auto pt-8 rounded-full ">
            Please add your pet&apos;s photo
          </div>
        )}

        <UploadWidget onUploadedSuccess={imgUploaded} />
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="space-y-2">
                    <Select required>
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
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="age"
                      name="age"
                      placeholder="Age"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="breed"
                      name="breed"
                      placeholder="Breed"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="gender"
                      name="gender"
                      placeholder="Gender"
                      type="text"
                    />
                  </div>

                  <Separator className="bg-brand-bg" />
                  <h3 className="font-semibold">Health Information</h3>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="medication"
                      name="medication"
                      placeholder="Medication / Supplements (if any)"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="allergies"
                      name="allergies"
                      placeholder="Allergies / Health Conditions (if any)"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="vaccinations"
                      name="vaccinations"
                      placeholder="Vaccinations"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Sprayed/ neutered
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    {/* <Label htmlFor="message">Behavior Notes</Label> */}
                    <Textarea
                      className="min-h-[100px]"
                      id="notes"
                      name="notes"
                      placeholder="Behavior Notes"
                    />
                  </div>
                  <Separator className="bg-brand-bg" />
                  <h3 className="font-semibold">Emergency Information</h3>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="emergency-instructions"
                      name="emergency-instructions"
                      placeholder="Instructions (if any)"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="vet-name"
                      name="vet-name"
                      placeholder="Vet Name"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="vet-address"
                      name="vet-address"
                      placeholder="Vet Address"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="vet-phone"
                      name="vet-phone"
                      placeholder="Vet Phone Number"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="insurance"
                      name="insurance"
                      placeholder="Insurance Number"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="microchip"
                      name="microchip"
                      placeholder="Microchip Number"
                      type="text"
                    />
                  </div>
                  <Button className="bg-brand-cta text-white" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
