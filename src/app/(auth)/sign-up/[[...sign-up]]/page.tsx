import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center h-lvh items-center bg-brand-bg">
      <SignUp afterSignUpUrl="/choose-role" />
    </div>
  );
}
