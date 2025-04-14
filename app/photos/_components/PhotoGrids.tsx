'use client';

import { memo, useMemo, useState } from 'react';

import Button from '@/shared/components/Button';
import { PhotoSrc } from '@/shared/helpers/flickr.server';
import useShuffle from '@/shared/hooks/use-shuffle';

import PhotoGrid from './PhotoGrid';

function Grids({ photos }: { photos: PhotoSrc[] }) {
  const [shuffleVariant, setShuffleVariant] = useState(0);
  const loadedPhotos = photos;

  const shuffledPhotos = useShuffle(
    useMemo(() => (loadedPhotos ? [...loadedPhotos] : []), [loadedPhotos, shuffleVariant])
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        {shuffledPhotos.slice(0, 16).map(({ id, l: { url } }) => (
          <PhotoGrid key={id} id={id} url={url} />
        ))}
      </div>
      <Button
        className="font-['Mansalva'] m-6 link-text mix-blend-difference dark:text-white text-black text-invert"
        text="Shuffle"
        onClick={() => setShuffleVariant(Math.random())}
      />
    </>
  );
}

export default memo(Grids);
