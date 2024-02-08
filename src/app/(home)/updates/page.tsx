'use client';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {postUpdate} from '@/lib/actions/stay-actions';
import {useState} from 'react';
import UploadWidget from '@/components/upload-widget';
import Image from 'next/image';

export default function Page() {
  const [imageUrl, setImageUrl] = useState('');
  const imgUploaded = (result: string) => {
    setImageUrl(result);
  };
  return (
    <div>
      <h1>Updates</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Send an update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-brand-fg">
          <DialogHeader>
            <DialogTitle>Share an update with the owner</DialogTitle>
            <DialogDescription>
              Add an image/ video and a comment and click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form action={postUpdate}>
              <div className="flex flex-col items-center gap-1 relative">
                <div className="relative w-[120px] h-[120px]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Media content"
                      fill={true}
                      sizes="120px"
                      priority={true}
                      style={{
                        objectFit: 'cover',
                      }}
                    ></Image>
                  ) : (
                    <div className="w-[120px] h-[120px] bg-white text-center rounded-md flex items-center">
                      Upload an image
                    </div>
                  )}
                </div>

                <UploadWidget onUploadedSuccess={imgUploaded} />
              </div>

              <Textarea
                placeholder="Add your comment"
                id="comment"
                name="comment"
                className="bg-white mt-4"
              />
            </form>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
