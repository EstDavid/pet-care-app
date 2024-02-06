import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import dogDummyImg from "@/../public/dogDummy.png";
import catDummyImg from "@/../public/catDummy.png";
import Link from "next/link";

interface PetCardProps {
  petId: string;
  petName: string;
  petImage: string;
  petIsHome: boolean;
  petType: string;
}

function PetCard({
  petId,
  petName,
  petImage,
  petIsHome,
  petType,
}: PetCardProps) {
  const getPetImageUrl = () => {
    if (petImage) {
      return petImage;
    }
    return petType === "dog" ? dogDummyImg : catDummyImg;
  };

  return (
    <div>
      <Card
        className={`flex flex-row justify-center items-center overflow-hidden border-solid	border-2 ${
          petIsHome ? "border-green-500" : "border-yellow-500"
        }`}
      >
        <Image
          src={getPetImageUrl()}
          alt="Pet"
          width={200}
          height={200}
          className="w-2/5 h-48 object-cover"
        />
        <CardContent className="w-3/5 ">
          <CardContent className="flex flex-row justify-between self-center mt-4">
            <CardTitle>{petName}</CardTitle>
            <CardTitle
              className={`${petIsHome ? "text-green-500" : "text-yellow-500"}`}
            >
              {petIsHome ? "🟢 Home" : "🟡 Away"}
            </CardTitle>
          </CardContent>
          <CardContent className="flex flex-col justify-center items-center gap-2 h-24 mt-4">
            {petIsHome ? (
              <>
                <Button className="w-52">Find sitter for {petName}</Button>
                <Link href={`/pet/profile/${petId}`} passHref>
                  <Button className="w-52">Preview {petName} Info</Button>
                </Link>
              </>
            ) : (
              <>
                <Button className="w-52">Check {petName} updates</Button>
                <Button className="w-52">Contact {petName} Sitter</Button>
              </>
            )}
            <Button className="w-52">Stays</Button>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}

export default PetCard;
