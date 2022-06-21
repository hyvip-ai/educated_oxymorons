import Head from 'next/head';
import React from 'react';

interface headProps {
  title: string;
  description: string;
}

function SEO(props: headProps) {
  return (
    <Head>
      <title>{props.title} | Educated Oxymorons</title>
      <meta name='description' content={props.description} />
      <meta
        property='og:title'
        content={`${props.title} | Educated Oxymorons`}
      />
      <meta property='og:image' content='/EO.jpeg' />
      <link rel='icon' type='image/x-icon' href='/EO.jpeg'></link>
    </Head>
  );
}

export default SEO;
