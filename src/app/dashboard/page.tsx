"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { use, useEffect, useState } from "react";

export default function Page() {
  const [profileComplete, setProfileComplete] = useState(false);
  const [petAdded, setPetAdded] = useState(false);
  const [accountReady, setAccountReady] = useState(false);
  const [percentage, setPercentage] = useState(33);

  useEffect(() => {
    if (profileComplete && petAdded) {
      setAccountReady(true);
    }

    if (profileComplete || petAdded) {
      setPercentage(66);
    }
  }, [profileComplete, petAdded, accountReady]);

  return (
    <div className="flex flex-col text-center gap-y-4">
      {!accountReady && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                In order to use your account you must complete your profile
              </CardTitle>
              <CardDescription>
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
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
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
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold">
                Current Account Status
                {/* <span className="font-normal">complete</span> */}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      {!profileComplete && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Manage Profile</Button>
            </CardContent>
          </Card>
        </div>
      )}
      {!petAdded && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>You haven’t added any Pet yet</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Add Pet</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
