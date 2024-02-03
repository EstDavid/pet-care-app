'use client';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import UploadWidget from '@/components/upload-widget';
import {useState} from 'react';
import editUser from '@/lib/actions/user-actions';
import {Separator} from '@/components/ui/separator';
import Image from 'next/image';
import {useUser} from '@clerk/nextjs';

export default function UserForm({role}: {role: string}) {
  const [imageUrl, setImageUrl] = useState('');
  const {isSignedIn, user} = useUser();
  if (!isSignedIn) {
    return null;
  }

  const imgUploaded = (result: string) => {
    setImageUrl(result);
  };

  const editUserWithImg = editUser.bind(null, imageUrl);

  return (
    <div className="flex flex-col items-center gap-4">
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={120}
          height={120}
          alt="User Picture"
          className="rounded-full mx-auto"
        ></Image>
      ) : (
        <div className="w-[120px] h-[120px] bg-white text-center rounded-full flex items-center">
          Please add your photo
        </div>
      )}

      <UploadWidget onUploadedSuccess={imgUploaded} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={editUserWithImg}>
            <div className="grid w-full items-center gap-4">
              {/* <div className="flex flex-col space-y-1.5">
                First name: {user.firstName}
              </div> */}
              {/* <div className="flex flex-col space-y-1.5">
                Last name: {user.lastName}
              </div> */}
              <Input value={user.firstName || ''} disabled />
              <Input value={user.lastName || ''} disabled />
              <Input
                value={user.primaryEmailAddress?.emailAddress || ''}
                disabled
              />
              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Contact Information</h3>
              <Input
                name="mobileNumber"
                placeholder="Mobile Number"
                type="number"
              />
              <Input name="street" placeholder="Street" />
              <Input name="city" placeholder="City" />
              <Input name="postcode" placeholder="Postcode" />
              <Input name="country" placeholder="Country" />
              {/* additional sitter specific fields */}
              {role === 'sitter' && (
                <>
                  <Separator className="bg-brand-bg" />
                  <h3 className="font-semibold">Pet sitting</h3>
                  <Textarea
                    className="min-h-[100px]"
                    name="sitterDescription"
                    placeholder="Please describe yourself and your experience with pets"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox name="sitsDogs" value="true" />
                    <label
                      htmlFor="sitsDogs"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept sitting dogs 🐶
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox name="sitsCats" value="true" />
                    <label
                      htmlFor="sitsCats"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept sitting cats 😸
                    </label>
                  </div>
                  <Input
                    name="maxPets"
                    placeholder="Maximum pets you can look after"
                    type="number"
                  />
                  <Input name="qualifications" placeholder="Qualifications" />
                  <Input name="first-aid" placeholder="First aid experience" />
                  <Input
                    name="insuranceDetails"
                    placeholder="Insurance details"
                  />
                </>
              )}
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
