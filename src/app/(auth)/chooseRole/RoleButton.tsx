'use client';
import Image, { StaticImageData } from 'next/image';

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

  return (
    <div className="w-full relative bg-gradient-to-b from-brand-fg-200 rounded-xl p-0">
      <button onClick={handleClick}>
        <Image
          src={photo}
          alt="Person with her pets"
          className="w-full h-full mix-blend-multiply rounded-xl"
        />
        <h2 className="text-brand-fg text-2xl font-bold absolute left-0 right-0 bottom-[10%] m-auto">
          {title}
        </h2>
      </button>
    </div>
  );
};

export default RoleButton;
