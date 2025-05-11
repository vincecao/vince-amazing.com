import { Suspense } from 'react';

import { getPublicPhotos } from '@/shared/helpers/flickr.server';

import PhotoGrids from './_components/PhotoGrids';

async function fetchPhotos() {
  try {
    return await getPublicPhotos();
  } catch (error) {
    return [];
  }
}

export default async function PhotosPage() {
  const photos = await fetchPhotos();
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <Suspense fallback={<div className="font-['Mansalva']">Loading...</div>}>
        <PhotoGrids photos={photos} />
      </Suspense>
    </div>
  );
}
