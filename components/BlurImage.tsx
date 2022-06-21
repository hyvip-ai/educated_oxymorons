import Image from 'next/image';
import { useState } from 'react';

interface Image {
  src: string;
  alt: string;
  layout: 'fill' | 'responsive';
  objectFit: 'cover' | 'contain';
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function BlurImage(props: Image) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      src={props.src}
      alt={props.alt}
      layout={props.layout}
      objectFit={props.objectFit}
      className={cn(
        'duration-700 ease-in-out group-hover:opacity-75',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}

BlurImage.defaultProps = {
  alt: '',
};

export default BlurImage;
