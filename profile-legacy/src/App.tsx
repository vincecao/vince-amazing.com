import React, {
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { stone, zinc, white, black } from 'tailwindcss/colors';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import {
  Appearance,
  useAppearance,
  UsePromiseState,
  usePromiseState,
  useShuttle,
  useTimeout,
} from '@vincecao/use-tools';
import { INDEX_DATA } from './constants';
import { PhotoSrc } from './types';
import { getPublicPhotos } from './utils/flickr';
import { encodeImageToBlurhash } from './utils/blurhash';
import { Blurhash } from 'react-blurhash';

const nextIndex = (i: number, total: number) => (i + 1 === total ? 0 : i + 1);

function useFlickr(): UsePromiseState<PhotoSrc[]> {
  return usePromiseState<PhotoSrc[]>(
    useCallback(getPublicPhotos, []),
    useMemo(() => ({ onError: (e) => console.error(e) }), [])
  );
}

function useBlurHash(): [string | undefined, (url: string | undefined) => Promise<void>] {
  const [blurHash, setBlurHash] = useState<string>();
  async function updateBlurHash(url: string | undefined) {
    setBlurHash(undefined);
    if (url) {
      const hash = await encodeImageToBlurhash(url);
      setBlurHash(hash);
    }
  }
  return [blurHash, updateBlurHash];
}

function useStyles() {
  const { osAppearance } = useAppearance();
  const isDark = osAppearance !== Appearance.LIGHT;
  const PRIMARY = isDark ? zinc : stone;
  const BOX_SHADOW = {
    INITIAL: `5px 5px 0 ${PRIMARY[600]}`,
    HOVER: `3px 3px ${PRIMARY[600]}`,
    TAP: `1px 1px ${PRIMARY[600]}`,
  };
  return useMemo(
    () => ({
      shadow: BOX_SHADOW,
      primaryTone: PRIMARY,
      isDark,
    }),
    [osAppearance]
  );
}

const UnorderedList = memo(({ children }: { children: ReactNode }) => (
  <motion.ul
    variants={{
      open: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
      closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
    }}
  >
    {children}
  </motion.ul>
));

const Link = memo(({ className, name, link }: { className?: string; name: string; link: string }) => {
  const { shadow, isDark, primaryTone } = useStyles();
  return (
    <motion.li
      key={name}
      className={className}
      style={{ x: 0, y: 0, z: 1, boxShadow: shadow.INITIAL }}
      variants={{
        open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
        closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
      }}
      whileHover={{
        x: 2,
        y: 2,
        z: -1,
        boxShadow: shadow.HOVER,
        backgroundColor: isDark ? primaryTone[800] : primaryTone[200],
        transition: { duration: 0.03 },
      }}
      whileTap={{
        x: 4.4,
        y: 4.4,
        boxShadow: shadow.TAP,
        backgroundColor: isDark ? primaryTone[700] : primaryTone[300],
        transition: { duration: 0.03 },
      }}
      onClick={() => window.open(link)}
    >
      {name}
    </motion.li>
  );
});

const CopyRight = memo(({ className }: { className?: string }) => (
  <motion.p
    className={className}
    style={{ z: 20 }}
    initial={{ x: -500 }}
    animate={{ x: 0, transition: { delay: 1.5 } }}
  >
    © 2022 LINENG (VINCE) CAO
  </motion.p>
));

const Avatar = memo(({ className }: { className?: string }) => {
  const { shadow } = useStyles();
  return (
    <motion.button
      initial={{ x: -100 }}
      style={{ z: 20, boxShadow: shadow.INITIAL }}
      animate={{ x: 0, transition: { delay: 1 } }}
      whileHover={{ x: 2, y: 2, z: -1, boxShadow: shadow.HOVER, transition: { duration: 0.03 } }}
      whileTap={{ x: 4.4, y: 4.4, boxShadow: shadow.TAP, transition: { duration: 0.03 } }}
      className={className}
    >
      <img src="/assets/avatar.png" alt="avatar" className="w-full h-full rounded-full" />
    </motion.button>
  );
});

const Image = memo(({ index, className, images }: { index: number; className?: string; images: PhotoSrc[] }) => {
  const [loading, setLoading] = useState(true);
  const [flickrBlurHash, updateFlickrBlurHash] = useBlurHash();

  const imageDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLoading(true);
  }, [index]);

  useEffect(() => {
    // first time page loads
    if (!images.length) updateFlickrBlurHash(images[0]?.c.url);
  }, [!images.length]);

  return (
    <motion.div
      ref={imageDivRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={className}
    >
      {loading && flickrBlurHash && (
        <div className="w-full h-full">
          <Blurhash
            hash={flickrBlurHash}
            width={imageDivRef.current?.clientWidth}
            height={imageDivRef.current?.clientHeight}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}

      <img
        className={classNames('w-full h-full object-cover', {
          hidden: loading,
        })}
        src={images[index]?.l.url}
        onLoad={() => {
          setLoading(false);
          updateFlickrBlurHash(images[nextIndex(index, images.length)]?.c.url);
        }}
      />
    </motion.div>
  );
});

const ImageWaterMark = memo(({ className }: { className?: string }) => {
  const { primaryTone } = useStyles();
  return (
    <motion.p
      className={className}
      initial={{ color: primaryTone[600] }}
      animate={{ color: white, transition: { duration: 0.5 } }}
      exit={{ color: primaryTone[600], transition: { duration: 0.5 } }}
    >
      saablancias | Flickr
    </motion.p>
  );
});

const ImageButton = memo(
  ({ className, children, animateOpacity }: { className?: string; children: ReactNode; animateOpacity: number }) => {
    const { shadow } = useStyles();
    return (
      <motion.button
        className={className}
        style={{ x: 0, y: 0, z: 1, boxShadow: shadow.INITIAL }}
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: animateOpacity,
          transition: { y: { stiffness: 1000, velocity: -100 } },
        }}
        whileHover={{ x: 2, y: 2, z: -1, opacity: 0.7, boxShadow: shadow.HOVER, transition: { duration: 0.03 } }}
        whileTap={{ x: 4.4, y: 4.4, opacity: 0.3, boxShadow: shadow.TAP, transition: { duration: 0.03 } }}
        onClick={() => window.open('//flickr.com/photos/saablancias/')}
      >
        {children}
      </motion.button>
    );
  }
);

const EnglishName = memo(function () {
  const { firstname, lastname } = INDEX_DATA;
  return (
    <Fragment>
      {firstname.english}
      <b className="ml-1">{lastname.english}</b>
    </Fragment>
  );
});

const ChineseName = memo(function () {
  const { firstname, lastname } = INDEX_DATA;
  return (
    <Fragment>
      <b className="mr-1">{lastname.chinese}</b>
      {firstname.chinese}
    </Fragment>
  );
});

const Names = memo(
  ({
    desktopClassName,
    mobileClassName,
    nameKey,
  }: {
    desktopClassName?: string;
    mobileClassName?: string;
    nameKey: string;
  }) => (
    <>
      <div className={desktopClassName}>
        <motion.p
          className="rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
        >
          <EnglishName />
        </motion.p>
        <motion.p
          className="text-4xl font-chineseChar rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
        >
          <ChineseName />
        </motion.p>
      </div>

      <motion.div
        className={mobileClassName}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
      >
        <motion.p
          key={nameKey}
          className="backdrop-blur-sm p-1 rounded-lg"
          initial={{ color: black }}
          animate={{ color: white, transition: { duration: 0.5 } }}
          exit={{ color: black, transition: { duration: 0.5 } }}
        >
          <EnglishName />
          <span className="font-chineseChar text-2xl">
            <ChineseName />
          </span>
        </motion.p>
      </motion.div>
    </>
  )
);

export default function App(): ReactElement {
  const [data] = useFlickr();
  const images = useShuttle(useMemo(() => data || [], [data]));
  const [index, setIndex] = useState<number>(0);
  const { links } = INDEX_DATA;

  useTimeout(
    useCallback(() => {
      setIndex((i) => nextIndex(i, images.length));
    }, [images, index]),
    10000,
    !images.length
  );

  const [isOpen, toggleOpen] = useCycle(false, true);

  useTimeout(
    useCallback(() => {
      if (!isOpen) toggleOpen();
    }, [isOpen, toggleOpen]),
    200
  );

  return (
    <div
      className={classNames(
        'font-mono grid md:grid-cols-11 h-screen overflow-hidden antialiased',
        'bg-white dark:bg-zinc-800'
      )}
    >
      <div className="hidden md:block col-span-1" />
      <div className="col-span-9 h-full flex justify-center items-center md:space-x-5">
        <ImageButton
          className={classNames(
            'fixed md:relative top-0 md:top-auto w-full md:w-3/4 bottom-0 md:bottom-auto md:h-[80vh] cursor-pointer',
            'text-stone-600 dark:text-zinc-600 bg-stone-200 dark:bg-zinc-900'
          )}
          animateOpacity={images.length !== 0 ? 1 : 0}
        >
          <AnimatePresence exitBeforeEnter>
            <Image
              index={index}
              images={images}
              className={classNames('w-full h-full grayscale dark:brightness-90 transition-opacity')}
            />
          </AnimatePresence>
          <div className="absolute bottom-0 right-0 m-3">
            <AnimatePresence exitBeforeEnter>
              <ImageWaterMark key={`text-${index}`} className="text-xs p-1 backdrop-blur-sm rounded-lg" />
            </AnimatePresence>
          </div>
        </ImageButton>

        {/* make a mask for mobile */}
        <div className="block md:hidden fixed top-0 bottom-0 left-0 right-0 z-10" />

        <motion.div
          initial={false}
          style={{ z: 20 }}
          animate={isOpen ? 'open' : 'closed'}
          className="absolute z-20 pb-26 md:relative top-0 md:top-auto md:h-auto left-0 md:left-auto w-full md:w-auto m-auto p-5 rounded-lg"
        >
          <Names
            desktopClassName={classNames(
              'hidden md:block text-center mb-8 space-y-5 text-shadow',
              'text-zinc-600 dark:text-zinc-200'
            )}
            nameKey={`text-${index}`}
            mobileClassName="flex md:hidden p-1 rounded-lg pt-20 text-xl"
          />
          <UnorderedList>
            {links.map(({ link, name }, i) => (
              <Link
                className={classNames(
                  'w-full block border pl-3 pr-6 py-2 text-left cursor-pointer text-sm',
                  'bg-stone-100 dark:bg-zinc-900 border-stone-600 dark:border-zinc-500 text-stone-600 dark:text-zinc-300',
                  { 'rounded-t': i === 0, 'rounded-b': i === links.length - 1 }
                )}
                name={name}
                link={link}
              />
            ))}
          </UnorderedList>
        </motion.div>
      </div>
      <Avatar className="fixed top-0 left-0 m-5 w-12 h-12 rounded-full shadow-md" />
      <CopyRight
        className={classNames(
          'fixed bottom-0 left-0 m-3 text-xs backdrop-blur-sm p-1 rounded-lg',
          'text-white md:text-black dark:md:text-white'
        )}
      />
    </div>
  );
}
