import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import dogDummyImg from '@/../public/dogDummy.png';
import catDummyImg from '@/../public/catDummy.png';
import Link from 'next/link';
import {FullStay} from '@/lib/db/models/Stay';
import contactUser from '@/lib/actions/conversation-actions';
import {notFound} from 'next/navigation';

interface PetCardProps {
  petId: string;
  petName: string;
  petImage: string;
  currentStay?: FullStay;
  petType: string;
}

function PetCard({
  petId,
  petName,
  petImage,
  currentStay,
  petType,
}: PetCardProps) {
  const getPetImageUrl = () => {
    if (petImage) {
      return petImage;
    }
    return petType === 'dog' ? dogDummyImg : catDummyImg;
  };

  const petIsHome = currentStay === undefined;

  const contactWithSitter =
    !petIsHome && currentStay.owner._id && currentStay.sitter._id
      ? contactUser.bind(
          null,
          currentStay.owner._id.toString(),
          currentStay.sitter._id.toString()
        )
      : null;

  return (
    <div>
      <Card
        className={`flex flex-row justify-center items-center overflow-hidden border-solid	border-2 ${
          petIsHome ? 'border-green-500' : 'border-yellow-500'
        }`}
      >
        <div className="w-full flex justify-center items-center">
          <Image
            src={getPetImageUrl()}
            alt="Pet"
            width={0}
            height={0}
            sizes="200px"
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
        </div>
        <CardContent className="w-3/5 p-2">
          <CardContent className="flex flex-row justify-between self-center mt-4">
            <CardTitle>{petName}</CardTitle>
            <CardTitle
              className={`${petIsHome ? 'text-green-500' : 'text-yellow-500'}`}
            >
              {petIsHome ? '🟢 Home' : '🟡 Away'}
            </CardTitle>
          </CardContent>
          <CardContent className="flex flex-col justify-center items-center gap-2 h-24 mt-4 p-0">
            {petIsHome ? (
              <>
                <Link href="/owner/stays" className="w-full">
                  <Button className="w-full">Find sitter for {petName}</Button>
                </Link>
                <Link
                  href={`/pet/profile/${petId}`}
                  passHref
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">
                    Preview {petName} Info
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/stays/${currentStay._id}`} className="w-full">
                  <Button className="w-full">{`Check ${petName}'s updates`}</Button>
                </Link>
                {contactWithSitter && (
                  <form action={contactWithSitter}>
                    <Button
                      variant="outline"
                      className="w-full"
                    >{`Contact ${petName}'s sitter`}</Button>
                  </form>
                )}
              </>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}

export default PetCard;
