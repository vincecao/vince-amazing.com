'use client';

import Button from '@/components/Button';
import Grid from './_grid';
import { PhotoSrc } from '@/helpers/flickr.server';
import { useState, useMemo, memo } from 'react';
import useShuffle from '@/hooks/use-shuffle';

function Grids({ photos }: { photos: PhotoSrc[] }) {
  const [shuffleVariant, setShuffleVariant] = useState(0);
  const loadedPhotos = photos; // Use the photos from the loader directly

  const shuffledPhotos = useShuffle(
    useMemo(() => (loadedPhotos ? [...loadedPhotos] : []), [loadedPhotos, shuffleVariant])
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        {shuffledPhotos.slice(0, 16).map(({ id, l: { url } }) => (
          <Grid key={id} id={id} url={url} />
        ))}
      </div>
      <Button
        className="font-['Mansalva'] m-6 link-text"
        text="Shuffle Photos"
        onClick={() => setShuffleVariant(Math.random())}
      />
    </>
  );
}

export default memo(Grids);
