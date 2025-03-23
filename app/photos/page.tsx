import { Suspense } from 'react';
import Grids from './_grids';
import { getPublicPhotos } from '@/helpers/flickr.server';

async function loader() {
  try {
    return await getPublicPhotos();
  } catch (error) {
    return [];
  }
}

async function Photos() {
  const photos = await loader();
  return (
    <div className="flex flex-col w-full items-center self-center">
      <Suspense fallback={<div className="font-['Mansalva']">Loading...</div>}>
        <Grids photos={photos} />
      </Suspense>
    </div>
  );
}

export default Photos;
