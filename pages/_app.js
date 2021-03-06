import "../styles/globals.css";

import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

import Layout from "../components/layouts/Layout";

import Head from "next/head";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
