import { type ReactElement, Suspense } from 'react';

import { Grids } from '@/presentation/components/photo';
import PhotoService from '@/presentation/services/PhotoService';

export default async function PhotosPage(): Promise<ReactElement> {
  const photoService = new PhotoService();
  const photos = await photoService.getPhotos();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <Suspense fallback={<div className="font-['Mansalva']">Loading...</div>}>
        <Grids photos={photos} />
      </Suspense>
    </div>
  );
}
