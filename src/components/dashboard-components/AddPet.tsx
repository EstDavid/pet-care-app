import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface AddPetProps {
  petAdded: boolean;
}

const AddPet = ({ petAdded }: AddPetProps) => (
  <Card>
    <CardHeader>
      {petAdded ? (
        <CardTitle>Have another Pet?</CardTitle>
      ) : (
        <CardTitle>You haven’t added any Pet yet</CardTitle>
      )}
    </CardHeader>
    <CardContent>
      <Link href="/pet/edit">
        <Button>Add Pet</Button>
      </Link>
    </CardContent>
  </Card>
);

export default AddPet;
