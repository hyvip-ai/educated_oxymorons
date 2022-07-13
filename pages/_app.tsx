import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../utils/supabase';

function MyApp({ Component, pageProps }: AppProps) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('This is Executing');
    fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  });
  return (
    <>
      <NextNProgress color='#f1c40f' />
      <Component {...pageProps} />
      <ToastContainer theme='colored' autoClose={3000} />
    </>
  );
}

export default MyApp;
