import { encode } from 'blurhash';

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  })
}
  ;

function getImageData(image: HTMLImageElement): ImageData | undefined {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0);
  return context?.getImageData(0, 0, image.width, image.height);
}

export async function encodeImageToBlurhash(imageUrl: string): Promise<string | undefined> {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  if (!imageData) return undefined;
  return encode(imageData.data, imageData.width, imageData.height, 4, 4);
};
