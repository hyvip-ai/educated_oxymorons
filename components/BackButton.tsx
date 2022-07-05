import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function BackButton() {
  const router = useRouter();
  return (
    <div className='position-fixed back_button_container'>
      <button onClick={() => router.back()} className="previous">
        <Image
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2GbbM3xctZfw6nF5_AvpX_aRRDVyaHMpMXycjmUJS18RuqNvJzVGBw1tICblyF1t23-I&usqp=CAU'
          alt='back_arrow'
          layout='fill'
          className='rounded-circle'
          objectFit='contain'
          priority={true}
        />
      </button>
    </div>
  );
}

export default BackButton;
