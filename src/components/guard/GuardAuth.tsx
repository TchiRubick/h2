import type { ReactNode } from "react";
import { RequiredAuthProvider, RedirectToLogin } from "@propelauth/react";
import { Watch } from "react-loader-spinner";

const GuardAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RequiredAuthProvider
      authUrl={
        process.env.NEXT_PUBLIC_AUTH_URL ||
        "https://66087564.propelauthtest.com"
      }
      displayWhileLoading={
        <div className='h-screen w-screen absolute top-1/2 left-1/2'>
          <Watch
            height="80"
            width="80"
            radius="48"
            color="#fdb485"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      }
      displayIfLoggedOut={<RedirectToLogin />}
    >
      {children}
    </RequiredAuthProvider>
  );
};

export default GuardAuth;
