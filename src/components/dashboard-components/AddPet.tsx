import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Button>Add Pet</Button>
    </CardContent>
  </Card>
);

export default AddPet;
