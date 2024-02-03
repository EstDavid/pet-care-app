'use client';

import Image, { StaticImageData } from 'next/image';
import photo1 from '@/../public/owner-photo.jpg';

const RoleButton = function ({
  title,
  photo
}: {
  title: string;
  photo: StaticImageData;
}) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.form?.requestSubmit();
  };

  const imageStyle = {
    borderRadius: '10px'
  };

  return (
    <button onClick={handleClick} className="w-full shadow-md relative">
      <Image
        objectFit="contain"
        src={photo}
        alt="Person with her pets"
        style={imageStyle}
      />
      <h2 className="text-brand-fg text-2xl font-bold absolute left-0 right-0 bottom-[10%] m-auto">
        {title}
      </h2>
    </button>
  );
};

export default RoleButton;
