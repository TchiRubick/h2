import { type AppType } from 'next/app';
import { Layout, GuardAuth } from '~/components';
import { api } from '~/utils/api';

import '~/styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => (
  <GuardAuth>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </GuardAuth>
);

export default api.withTRPC(MyApp);
