import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import AddPet from './AddPet';
import { string } from 'zod';

interface AccountReadyProps {
  percentage: number;
  profileComplete: boolean;
  petAdded: boolean;
  accountReady: boolean;
  userRole: string;
}

const AccountReady = ({
  percentage = 33,
  profileComplete = false,
  petAdded = false,
  accountReady = false,
  userRole = ''
}) => {
  return (
    <div className="flex flex-col text-center gap-y-4">
      {!accountReady && (
        <div className="shadow-md bg-white rounded-lg p-4 border">
          <h3>In order to use your account you must complete your profile</h3>
          <h1>
            <div className="relative flex items-center justify-center mt-4">
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {percentage}%
              </div>
              <div className="relative flex items-center justify-center">
                <svg
                  width="160"
                  height="160"
                  viewBox="0 0 36 36"
                  className="circular-chart"
                >
                  <path
                    className="circle-bg"
                    d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="4"
                  />
                  <path
                    className="circle"
                    stroke="#4C9993"
                    strokeWidth="4"
                    strokeDasharray="113.097, 113.097" // Approx circumference = 2 * Math.PI * 18
                    strokeDashoffset="113.097" // Initially full length
                    d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    style={{
                      transition: 'stroke-dashoffset 2s ease-out',
                      strokeDashoffset: `calc(113.097 - (113.097 * ${percentage} / 113.097))` // Animate to percentage of the circumference
                    }}
                  />
                  <text
                    x="18"
                    y="20.35"
                    className="percentage"
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize="6"
                    fill="#333"
                  ></text>
                </svg>
              </div>
            </div>
          </h1>
          <div>
            <p className="font-bold">
              Current Account Status
              {/* <span className="font-normal">complete</span> */}
            </p>
          </div>
        </div>
      )}
      {!profileComplete && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/user-profile/edit">
                <Button>Manage Profile</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
      {!petAdded && userRole === 'owner' && <AddPet petAdded={petAdded} />}
    </div>
  );
};

export default AccountReady;
