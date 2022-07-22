import { AppProps } from 'next/app';
import Head from 'next/head';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import '../styles.css';

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  // @ts-ignore
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>
          Zalter Identity + Next.js example app
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <AuthConsumer>
          {({ isLoading }) => (
            isLoading
              ? null
              : getLayout(<Component {...pageProps} />)
          )}
        </AuthConsumer>
      </AuthProvider>
    </>
  );
};

export default App;
