'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import UploadWidget from '@/components/media-upload/upload-widget';
import { useState } from 'react';
import createUser from '@/lib/actions/actions';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function UserProfile() {
  const [mediaUrl, setMediaUrl] = useState('');

  const imgUploaded = (result: string) => {
    setMediaUrl(result);
  };

  console.log(mediaUrl);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h1>Account Settings</h1>
        {mediaUrl ? (
          <Image
            src={mediaUrl}
            width={120}
            height={120}
            alt="User Picture"
            className="rounded-full mx-auto"
          ></Image>
        ) : (
          <div className="w-[120px] h-[120px] bg-brand-white text-center my-auto pt-10 rounded-full ">
            Please add your photo
          </div>
        )}

        <UploadWidget onUploadedSuccess={imgUploaded} />
        {/* Personal Information */}
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createUser}>
                <div className="grid w-full items-center gap-4">
                  {/* First Name */}
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                      type="text"
                      required
                    />
                  </div>
                  {/* Last Name */}
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="surname"
                      name="surname"
                      placeholder="Surname"
                      type="text"
                      required
                    />
                  </div>
                  {/* <div className="grid w-full items-center gap-4"> */}
                  <div className="flex flex-col space-y-1.5">
                    {/* Mobile Number */}
                    <Label htmlFor="mobileNumber" className="text-xs">
                      Needed so Sitter can reach you quickly
                    </Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                    />
                  </div>

                  <Separator className="bg-brand-bg" />
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-xs">Full Address</h3>
                    <Input name="street" placeholder="Street" />
                    <Input name="city" placeholder="City" />
                    <Input name="postcode" placeholder="Postcode" />
                  </div>
                  {/* </div> */}
                  <Button variant="outline" type="submit">
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
