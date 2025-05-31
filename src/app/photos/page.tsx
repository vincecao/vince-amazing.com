import { type ReactElement, Suspense } from 'react';

import { Grids, PhotosContainer } from '@/features/photos';

export default async function PhotosPage(): Promise<ReactElement> {
  const photosContainer = PhotosContainer.getInstance();
  const getPhotosUseCase = photosContainer.getPhotosUseCase();
  const photos = await getPhotosUseCase.execute();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <Suspense fallback={<div className="font-['Mansalva']">Loading...</div>}>
        <Grids photos={photos} />
      </Suspense>
    </div>
  );
}
