import { Suspense, type ReactElement } from 'react';
import { PhotoService } from '../../src/presentation/services/PhotoService';

// Import existing components that will be updated later
import PhotoGrids from './_components/PhotoGrids';

export default async function PhotosPage(): Promise<ReactElement> {
  const photoService = new PhotoService();
  const photos = await photoService.getPhotos();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <Suspense fallback={<div className="font-['Mansalva']">Loading...</div>}>
        <PhotoGrids photos={photos} />
      </Suspense>
    </div>
  );
}
