import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecommendationProps {
  notification: string;
  notificationContent: string;
}

const Recommendation: React.FC<RecommendationProps> = ({
  notification,
  notificationContent,
}: RecommendationProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{notification}</CardTitle>
          <CardDescription>
            <p className="relative flex items-center justify-center mt-4"></p>
            <p className="font-regular">{notificationContent}</p>
          </CardDescription>
        </CardHeader>
        <Link href="/user-profile/edit">
          <Button className="mb-6" variant="secondary">
            Go to profile and add description
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Recommendation;
