import { useShuffle } from "@vincecao/use-tools";
import React, { ReactElement, useMemo, useState } from "react";
import { memo } from "react";
import Button from "./commons/Button";
import useFlickr from "./hooks/useFlickr";

function Photos(): ReactElement {
  const [photos, { status }] = useFlickr();
  const [shuffleVariant, setShuffleVariant] = useState(0);
  const shuffledPhotos = useShuffle(useMemo(() => (photos ? [...photos] : []), [photos, shuffleVariant]));

  if (status === "pending") return <div className="font-['Mansalva']">Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        {shuffledPhotos.slice(0, 16).map(({ id, l: { url } }) => (
          <a className="hover:z-10 z-0" href={`//www.flickr.com/photos/saablancias/${id}/in/dateposted-public/`} target="_blank">
            <img key={id} src={url} className="w-[12rem] h-[12rem] object-cover transition ease-in-out duration-75 brightness-75 saturate-50 hover:brightness-100 hover:saturate-100 hover:scale-125" />
          </a>
        ))}
      </div>
      <Button className="font-['Mansalva'] m-6 link-text" text="Shuffle Photos" onClick={() => setShuffleVariant(Math.random())} />
    </div>
  );
}

export default memo(Photos);
