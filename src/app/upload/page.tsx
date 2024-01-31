// import {revalidatePath} from 'next/cache';
// import {v2 as cloudinary} from 'cloudinary';
// import dbConnect from '@/lib/db/dbConnect';

// const NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'cw-app';

// cloudinary.config({
//   cloud_name: 'cw-app',
//   api_key: '675663953536253',
//   api_secret: 'Axixu2W7QTbnw8EpQLIbcDtafHM',
// });

// type CloudinaryUpload = {
//   public_id: string;
//   secure_url: string;
//   signature: string;
// };

// export default async function uploadPage() {
//   const {resources: images} = await cloudinary.api.resources_by_asset_folder(
//     'pet-app',
//     {tags: true}
//   );

//   async function uploadImage(formData: FormData) {
//     'use server';
//     const file = formData.get('image') as File;
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);

//     let uploadRes = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({folder: 'pet-app'}, function (error, result) {
//           if (error) {
//             reject(error);
//             return;
//           }
//           resolve(result);
//           console.log(result);
//         })
//         .end(buffer);
//     });

//     const {public_id: publicId, secure_url: secureUrl} =
//       uploadRes as CloudinaryUpload;

//     revalidatePath('/upload');
//   }

//   // export async function saveToDatabase (result: uploadedImage) {
//   //   await dbConnect();
//   //   const newImage = new Message()

//   //  }

//   return (
//     <div className="w-full max-w-7xl my-0 mx-auto px-5">
//       <h1 className="text-3xl font-bold">Upload</h1>
//       <form
//         action={uploadImage}
//         className='className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6"'
//       >
//         <label htmlFor="image" className="block font-semibold text-sm mb-2">
//           Upload an image
//         </label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="video/*,image/*"
//           multiple
//           className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         <button type="submit" className="bg-blue-300 p-1 mt-4">
//           Upload
//         </button>
//       </form>

//       {images.map((image) => {
//         return (
//           <div
//             key={image.public_id}
//             className="rounded overflow-hidden bg-white dark:bg-slate-700"
//           >
//             <img width={800} height={600} src={image.public_id} alt={'image'} />
//           </div>
//         );
//       })}

//       <video width="320" height="240" controls preload="none">
//         <source
//           src="https://res.cloudinary.com/cw-app/video/upload/v1706545557/samples/elephants.mp4"
//           type="video/mp4"
//         />
//         Your browser does not support the video tag.
//       </video>
//       {/* <video src="https://res.cloudinary.com/cw-app/video/upload/v1706545557/samples/elephants.mp4"></video> */}
//     </div>
//   );
// }

'use client';

import {CldImage, CldVideoPlayer} from 'next-cloudinary';
import {CldUploadButton} from 'next-cloudinary';
import {CldUploadWidget} from 'next-cloudinary';
import {useState} from 'react';
import UploadWidget from './upload-widget';
// import { printUrl } from './actions';
import {printUrl} from '@/lib/actions/printUrl';

export type UploadResult = {
  info: {
    public_id: string;
    secure_url: string;
  };
  event: 'success';
};

// uploadPreset="n7j1dejh"

export default function Home() {
  const [mediaUrl, setMediaUrl] = useState('');

  const uploaded = (result: string) => {
    console.log('finally');
    setMediaUrl(result);
    alert('ready bitch');
    printUrl(result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadWidget onUploadedSuccess={uploaded} />
    </main>
  );
}
