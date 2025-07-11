'use client';

import { memo, useMemo, useState } from 'react';

import Button from '@/shared/components/ui/Button';
import useShuffle from '@/shared/hooks/use-shuffle';

import { type Photo } from '../../domain/entities/Photo';
import Grid from './Grid';

function Grids({ photos }: { photos: Photo[] }) {
  const [shuffleVariant, setShuffleVariant] = useState(0);
  const loadedPhotos = photos;

  const shuffledPhotos = useShuffle(
    useMemo(() => (loadedPhotos ? [...loadedPhotos] : []), [loadedPhotos, shuffleVariant])
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto md:mt-12">
        {shuffledPhotos.slice(0, 16).map(({ id, c: { url } }) => (
          <Grid key={id} id={id} url={url} />
        ))}
      </div>
      <Button
        className="font-['Mansalva'] my-6 link-text mix-blend-difference text-white text-invert mx-auto"
        text="Shuffle"
        onClick={() => setShuffleVariant(Math.random())}
      />
    </>
  );
}

export default memo(Grids);
