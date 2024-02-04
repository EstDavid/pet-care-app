import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NotificationsProps {
  notification: string;
}

const Notifications: React.FC<NotificationsProps> = ({ notification }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{notification}</CardTitle>
          <CardDescription>
            <div className="relative flex items-center justify-center mt-4"></div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold">
            Notifications should appear here when you have new ones
            {/* <span className="font-normal">complete</span> */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
