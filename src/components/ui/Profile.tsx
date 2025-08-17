import { twMerge } from "tailwind-merge";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface ProfileProps {
  className?: string;
}

export default function Profile({ className }: ProfileProps) {
  const { user } = useAuthenticator((context) => [context.user]);
  const username = user?.signInDetails?.loginId ?? "";
  return (
    <div className={twMerge("mb-3 text-sm font-medium", className)}>
      {username}
    </div>
  );
}
