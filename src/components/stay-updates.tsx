'use client';
import {Separator} from '@/components/ui/separator';
import {useState} from 'react';
import {postUpdate} from '@/lib/actions/stay-actions';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import UploadWidget from '@/components/upload-widget';
import Image from 'next/image';
import {Update} from '@/lib/db/models/Update';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/components/ui/use-toast';

export default function StayUpdates({
  stayId,
  updates,
  role,
}: {
  stayId: string;
  updates: Update[];
  role: string;
}) {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const imgUploaded = (result: string) => {
    setImageUrl((prevState) => [...prevState, result]);
  };
  const {toast} = useToast();
  const [textarea, setTextarea] = useState('');

  const postUpdateWithId = postUpdate.bind(null, stayId, imageUrl);

  const postWithToast = (formData: FormData) => {
    postUpdateWithId(formData);
    setTextarea('');
    setImageUrl([]);
    toast({
      title: 'Update sent.',
      duration: 2000,
    });
  };

  // State to store the selected message to view in a modal
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const openImageModal = (update: any, imageUrl?: string) => {
    setSelectedImage(imageUrl || update.mediaUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center rounded-lg">
      {role === 'sitter' && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Add an update about the stay</CardTitle>
          </CardHeader>
          <CardContent>
            <UploadWidget onUploadedSuccess={imgUploaded} />
            <form action={postWithToast}>
              <div className="flex flex-col space-y-1.5">
                <Textarea
                  placeholder="Add your comment"
                  id="comment"
                  name="comment"
                  className="bg-white my-4"
                  value={textarea}
                  onChange={(e) => setTextarea(e.target.value)}
                />
              </div>
              <Button type="submit" variant="outline">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <h1 className="text-2xl text-brand-bg mt-4">Stay Updates</h1>
      <div className="flex flex-col items-center overflow-y-auto">
        {updates &&
          updates.map((update: Update, index) => (
            <div key={index} className="w-full flex justify-center">
              <div className="flex flex-col items-center w-[80%]">
                <div className="flex justify-start items-center -my-2">
                  <Separator
                    orientation="vertical"
                    className="my-4 h-12 bg-brand-bg"
                  />
                  <p className="text-sm text-right text-slate-500 pl-4">
                    {/* {new Date(update.createdAt).toLocaleString()} */}
                    {new Date(update.createdAt).toLocaleString([], {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <Card className="px-2 my-2 w-full bg-brand-bg-50">
                  <div className="flex flex-col justify-between flex-wrap">
                    {/* Render image or text message */}
                    <div className="flex flex-col justify-between">
                      {update?.mediaUrl?.map((url: string, index: number) =>
                        url.includes('video') ? (
                          <video
                            controls
                            key={index}
                            src={url}
                            className="max-w-full h-auto max-h-48 min-w-[60%] rounded-xl mt-2 object-cover"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageModal(update, url);
                            }}
                          />
                        ) : (
                          <img
                            key={index}
                            src={url}
                            alt="updated media"
                            className="max-w-full h-auto max-h-48 min-w-[60%] rounded-xl mt-2 object-cover"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageModal(update, url);
                            }}
                          />
                        )
                      )}
                    </div>
                    <p className="pt-1">{update.comment}</p>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        {/* Render modal */}
        {selectedImage && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={closeImageModal}
          >
            <div className="bg-brand-fg flex justify-center">
              <img src={selectedImage}></img>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
