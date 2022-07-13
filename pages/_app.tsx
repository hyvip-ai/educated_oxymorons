import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color='#f1c40f' />
      <Component {...pageProps} />
      <ToastContainer theme='colored' autoClose={3000} />
    </>
  );
}

export default MyApp;
