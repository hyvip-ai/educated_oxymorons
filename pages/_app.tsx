import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color='#f1c40f' />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
