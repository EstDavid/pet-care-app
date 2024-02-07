'use client';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export default function OwnerUpdates({}: // updates,
// conversationId,
// dbUser,
{
  // messages: IMessage[];
  // conversationId: string;
  // dbUser: string;
}) {
  const updates = [
    {
      mediaUrl: [
        'https://via.placeholder.com/500',
        'https://via.placeholder.com/200',
      ],
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      mediaUrl: 'https://via.placeholder.com/500',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  // State to store the selected message to view in a modal
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const openImageModal = (update: any, imageUrl?: string) => {
    setSelectedImage(imageUrl || update.mediaUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-brand-bg">Stay Updates Media</h1>
      <div className="flex flex-col items-center overflow-y-auto">
        {updates &&
          updates.map((update: any, index) => (
            <div key={index} className="w-full flex justify-center">
              <Card className="px-2 my-2 w-[80%] bg-brand-bg-50">
                <div className="flex flex-col justify-between flex-wrap">
                  {/* Render image or text message */}
                  {Array.isArray(update.mediaUrl) ? (
                    <div className="flex flex-col justify-between">
                      {update.mediaUrl.map((url: string, index: number) => (
                        <img
                          key={index}
                          src={url}
                          alt=""
                          className="max-w-full h-auto max-h-48 rounded-xl mt-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageModal(update, url);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={update.mediaUrl}
                      alt=""
                      className="max-w-full h-auto max-h-48 rounded-xl mt-2"
                      onClick={() => openImageModal(update)}
                    />
                  )}
                  <p className="pt-1">{update.comment}</p>
                  {/* Render date */}
                  <p className="text-[0.6rem] text-right text-slate-500 self-end w-full">
                    {new Date(update.createdAt).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </Card>
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
