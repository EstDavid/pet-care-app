'use client';

import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export type UploadResult = {
  info: {
    secure_url: string;
  };
  event: 'success';
};

type Props = {
  onUploadedSuccess: (mediaUrl: string) => void;
};

export default function UploadWidget({ onUploadedSuccess }: Props) {
  return (
    <CldUploadWidget
      uploadPreset="n7j1dejh"
      options={{
        sources: ['local', 'camera', 'google_drive'],
        folder: 'pet-app',
        maxFiles: 3,
      }}
      onSuccess={(result) => {
        if (typeof result.info === 'string' || !result.info?.secure_url) {
          console.error('Unkown error while uploading image', result);
          throw new Error('Unkown error while uploading image');
        }
        onUploadedSuccess(result.info?.secure_url);
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <Button
            className="bg-blue-400"
            variant="outline"
            onClick={handleOnClick}
          >
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
