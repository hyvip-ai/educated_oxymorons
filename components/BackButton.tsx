import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface backButtonPros {
  href?: string;
}

function BackButton(props: backButtonPros) {
  return (
    <div className='position-fixed back_button_container'>
      <Link href={props.href ? props.href : '/'}>
        <a className='previous position-relative'>
          <Image
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2GbbM3xctZfw6nF5_AvpX_aRRDVyaHMpMXycjmUJS18RuqNvJzVGBw1tICblyF1t23-I&usqp=CAU'
            alt='back_arrow'
            layout='fill'
            className='rounded-circle'
            objectFit='contain'
            priority={true}
          />
        </a>
      </Link>
    </div>
  );
}

export default BackButton;
