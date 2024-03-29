import { useShuffle } from "@vincecao/use-tools";
import React, { ReactElement, useMemo, useState } from "react";
import { memo } from "react";
import Button from "./commons/Button";
import useFlickr, { PhotoSrc } from "./hooks/useFlickr";

function Photos(): ReactElement {
  const [photos, { status }] = useFlickr();
  const [shuffleVariant, setShuffleVariant] = useState(0);
  const shuffledPhotos = useShuffle(useMemo(() => (photos ? [...photos] : []), [photos, shuffleVariant]));

  return (
    <div className="flex flex-col items-center self-center">
      {status === "pending" ? (
        <div className="font-['Mansalva']">Loading...</div>
      ) : (
        <>
          <PhotoGrid shuffledPhotos={shuffledPhotos} />
          <Button className="font-['Mansalva'] m-6 link-text" text="Shuffle Photos" onClick={() => setShuffleVariant(Math.random())} />
        </>
      )}
    </div>
  );
}

const PhotoGrid = memo(({ shuffledPhotos }: { shuffledPhotos: PhotoSrc[] }) => {
  /*
  const [hoverHash, setHoverHash] = useState<string>();
  const hashMaps = useRef<Map<string, string>>(new Map());
  useEffect(() => {
    (async () => {
      const hashes = await Promise.all(shuffledPhotos.map(async ({ id, c: { url } }) => ({ id, hash: await encodeImageHash(url) })));
      for (const { id, hash } of hashes) {
        hashMaps.current.set(id, hash);
      }
    })();
  }, [shuffledPhotos]);
  */

  const [hoverUrl, setHoverUrl] = useState<string>();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* {hoverHash && <BlurhashBackground hash={hoverHash} />} */}
      {hoverUrl && <BlurBackground url={hoverUrl} />}
      {shuffledPhotos.slice(0, 16).map(({ id, l: { url } }) => (
        <a className="md:hover:z-10 z-0" href={`//www.flickr.com/photos/saablancias/${id}/in/dateposted-public/`} target="_blank">
          <img
            onMouseEnter={() => {
              setHoverUrl(url);
              // setHoverHash(hashMaps.current.get(id));
            }}
            onMouseLeave={() => {
              setHoverUrl(undefined);
              // setHoverHash(undefined);
            }}
            key={id}
            src={url}
            className="w-[12rem] h-[12rem] object-cover transition ease-in-out duration-75 brightness-75 saturate-50 hover:brightness-100 hover:saturate-100 md:hover:scale-125"
          />
        </a>
      ))}
    </div>
  );
});

/*
const BlurhashBackground = memo(({ hash }: { hash: string }) => {
  useWindowsDimensions();
  const [innerWidth, innerHeight] = useWindows((s) => [s.innerWidth, s.innerHeight], shallow);
  return <div className="fixed top-0 bottom-0 left-0 right-0 z-[-1]">{hash && <Blurhash hash={hash} width={innerWidth} height={innerHeight} resolutionX={100} resolutionY={100} punch={1} />}</div>;
});
*/

export const BlurBackground = memo(({ url }: { url?: string }) => {
  return <div className="transition-all duration-300 fixed top-0 bottom-0 left-0 right-0 z-[-1] bg-no-repeat bg-cover blur-[80px] bg-center" style={{ backgroundImage: url ? `url(${url})` : "none" }}></div>;
});

export default memo(Photos);
