import type { ReactNode } from "react";
import { RequiredAuthProvider, RedirectToLogin } from "@propelauth/react";

const GuardAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RequiredAuthProvider
      authUrl={
        process.env.NEXT_PUBLIC_AUTH_URL ||
        "https://66087564.propelauthtest.com"
      }
      displayIfLoggedOut={<RedirectToLogin />}
    >
      {children}
    </RequiredAuthProvider>
  );
};

export default GuardAuth;
