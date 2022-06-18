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
    </Head>
  );
}

export default SEO;
