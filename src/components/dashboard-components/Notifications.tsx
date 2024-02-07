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
  newNotification: boolean;
  notificationContent: string;
}

const Notifications: React.FC<NotificationsProps> = ({
  notification,
  newNotification,
  notificationContent,
}: NotificationsProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{notification}</CardTitle>
          <CardDescription>
            <p className="relative flex items-center justify-center mt-4"></p>
            {newNotification ? (
              <CardDescription>
                {notificationContent}
                <Button className="w-1/2 mt-4" variant="secondary">
                  Go to Chat
                </Button>
              </CardDescription>
            ) : (
              <p className="font-regular">
                Notifications will appear here
                {/* <span className="font-normal">complete</span> */}
              </p>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Notifications;
