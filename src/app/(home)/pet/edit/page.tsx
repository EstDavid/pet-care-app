import {PetForm} from '@/components/pet-form';

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center pb-5">
        Your pet
      </h1>

      <PetForm />
    </>
  );
}
