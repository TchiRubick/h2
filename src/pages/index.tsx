import { type NextPage } from 'next';
import Head from 'next/head';
import { useLogoutFunction } from '@propelauth/react';

const Home: NextPage = () => {
  const logoutFn: (redirectOnLogout: boolean) => Promise<void> = useLogoutFunction();

  const handleLogoutClick = () => {
    logoutFn(true)
      .then((value: void) => value)
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Head>
        <title>Havoana</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
        <button onClick={handleLogoutClick}>Logout</button>
      </main>
    </>
  );
};

export default Home;
