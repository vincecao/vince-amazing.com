import { useShuffle } from "@vincecao/use-tools";
import React, { ReactElement, useMemo, useState } from "react";
import { memo } from "react";
import Button from "./commons/Button";
import useFlickr, { PhotoSrc } from "./hooks/useFlickr";
import { motion, AnimatePresence } from "framer-motion";
import { useBackground, useBackgroundActions, useBackgroundLoading } from "./stores/background-store";

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
  const { setBackground } = useBackgroundActions();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <BlurBackground />
      {shuffledPhotos.slice(0, 16).map(({ id, l: { url } }) => (
        <a key={id} className="md:hover:z-10 z-0" href={`//www.flickr.com/photos/saablancias/${id}/in/dateposted-public/`} target="_blank">
          <img onMouseEnter={() => setBackground(url)} onMouseLeave={() => setBackground(null)} src={url} className="w-[12rem] h-[12rem] object-cover transition ease-in-out duration-75 brightness-75 saturate-50 hover:brightness-100 hover:saturate-100 md:hover:scale-125" />
        </a>
      ))}
    </div>
  );
});

export const BlurBackground = memo(() => {
  const background = useBackground();
  const isLoading = useBackgroundLoading();

  return (
    <div className="fixed inset-0 z-[-1]">
      <AnimatePresence mode="wait">{background && <motion.div key={background} className="absolute inset-0 bg-no-repeat bg-cover blur-[80px] bg-center" style={{ backgroundImage: `url(${background})` }} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />}</AnimatePresence>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/50 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

export default memo(Photos);
