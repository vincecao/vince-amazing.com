import { encode } from 'blurhash';
import invariant from 'tiny-invariant';

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });
}

function getImageData(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  invariant(context, 'Expected valid canvas context');
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
}

export async function encodeImageHash(imageUrl: string): Promise<string> {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  invariant(imageData, 'Expected valid imageData');
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
}
