import { useShuffle } from "@vincecao/use-tools";
import React, { ReactElement, useMemo, useState } from "react";
import { memo } from "react";
import Button from "./commons/Button";
import useFlickr from "./hooks/useFlickr";

const Image = memo(({ src }: { src: string }) => <img src={src} className="w-[12rem] h-[12rem] object-cover transition ease-in-out duration-75 brightness-75 saturate-50 hover:brightness-100 hover:saturate-100 hover:scale-125 hover:z-10 z-0" />);

function Photos(): ReactElement {
  const [photos, { status }] = useFlickr();
  const [shuffleVariant, setShuffleVariant] = useState(0);
  const shuffledPhotos = useShuffle(useMemo(() => (photos ? [...photos].slice(0, 16) : []), [photos, shuffleVariant]));

  if (status === "pending") return <div className="font-['Mansalva']">Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        {shuffledPhotos.map(({ l: { url } }) => (
          <Image key={url} src={url} />
        ))}
      </div>
      <Button className="font-['Mansalva'] m-6 link-text" text="Shuffle Photos" onClick={() => setShuffleVariant(Math.random())} />
    </div>
  );
}

export default memo(Photos);
