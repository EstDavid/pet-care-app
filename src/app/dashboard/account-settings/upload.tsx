import {revalidatePath} from 'next/cache';

'use client';

import {useState} from 'react';
import UploadWidget from '../../../components/media-upload/upload-widget';
import {printUrl} from '@/lib/actions/printUrl';

export type UploadResult = {
  info: {
    public_id: string;
    secure_url: string;
  };
  event: 'success';
};

// uploadPreset="n7j1dejh"

export default function MediaUpload() {
  const [mediaUrl, setMediaUrl] = useState('');

  const uploaded = (result: string) => {
    console.log('finally');
    setMediaUrl(result);
    alert('ready bitch');
    printUrl(result);

    revalidatePath ('/account-settings')
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadWidget onUploadedSuccess={uploaded} />
    </main>
  );
}
