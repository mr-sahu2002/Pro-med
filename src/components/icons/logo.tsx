import Image from 'next/image';
import * as React from 'react';
import promedLogo from './promed_logo.png';

export function Logo(props: React.ComponentProps<typeof Image>) {
  return (
    <Image
      src={promedLogo}
      alt="ProMed Devices Logo" {...props}
      width={props.width || 50}
      height={props.height || 50}
    />
  );
}
