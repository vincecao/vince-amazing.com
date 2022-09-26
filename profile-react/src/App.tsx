import React, { Fragment, memo, ReactElement, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import { usePromiseState, useShuttle, useTimeout } from '@vincecao/use-tools';
import { INDEX_DATA } from './const';
import { PhotoSrc } from './types';
import { getPublicPhotos } from './utils/flickr';

function useFlickr() {
  return usePromiseState<PhotoSrc[]>(
    useCallback(getPublicPhotos, []),
    useMemo(() => ({ onError: (e) => console.error(e) }), [])
  );
}

export default function App(): ReactElement {
  const [data] = useFlickr();
  const [index, setIndex] = useState<number>(0);

  const images = useShuttle(useMemo(() => data || [], [data]));

  useTimeout(
    useCallback(() => {
      setIndex((i) => (!images || index + 1 === images.length ? 0 : i + 1));
    }, [images, index]),
    10000
  );

  const { firstname, lastname, links } = INDEX_DATA;

  const English = memo(function () {
    return (
      <Fragment>
        {firstname.english}
        <b className="ml-1">{lastname.english}</b>
      </Fragment>
    );
  });

  const ChineseCharacter = memo(function () {
    return (
      <Fragment>
        <b className="mr-1">{lastname.chinese}</b>
        {firstname.chinese}
      </Fragment>
    );
  });

  const [isOpen, toggleOpen] = useCycle(false, true);

  useTimeout(
    useCallback(() => {
      if (!isOpen) toggleOpen();
    }, [isOpen, toggleOpen]),
    200
  );

  return (
    <div className="font-mono grid md:grid-cols-11 h-screen w-screen border-['#E11D48'] border-3 overflow-hidden">
      <div className="col-span-1" />
      <div className="col-span-9 h-full flex justify-center items-center md:space-x-5">
        <motion.button
          className="fixed md:relative top-0 md:top-auto w-full md:w-3/4 h-full md:h-[80vh] border border-[#E11D48] text-[#E11D48] cursor-pointer bg-[#FECDD3]"
          style={{ x: 0, y: 0, boxShadow: '5px 5px 0 #E11D48', z: 1 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } }}
          whileHover={{
            y: 2,
            x: 2,
            transition: { duration: 0.03 },
            boxShadow: '3px 3px #E11D48',
            z: -1,
            opacity: 0.7,
          }}
          whileTap={{
            y: 4.4,
            x: 4.4,
            transition: { duration: 0.03 },
            boxShadow: '1px 1px #E11D48',
            opacity: 0.3,
          }}
          onClick={() => window.open('//flickr.com/photos/saablancias/')}
        >
          <AnimatePresence exitBeforeEnter>
            <motion.img
              key={`image-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="w-full h-full object-cover"
              src={images[index]}
            />
          </AnimatePresence>
          <div className="absolute bottom-0 right-0 m-3">
            <AnimatePresence exitBeforeEnter>
              <motion.p
                key={`text-${index}`}
                className="text-xs p-1 backdrop-blur-sm rounded-lg"
                initial={{ color: '#E11D48' }}
                animate={{ color: '#fff', transition: { duration: 0.5 } }}
                exit={{ color: '#E11D48', transition: { duration: 0.5 } }}
              >
                Flickr @ saablancias
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.button>

        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          className="z-10 fixed md:relative top-0 md:top-auto h-full md:h-auto left-0 md:left-auto w-full md:w-auto m-auto p-5 rounded-lg"
        >
          <div className="hidden md:block text-center mb-8 space-y-5">
            <motion.p
              className="rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
            >
              <English />
            </motion.p>
            <motion.p
              className="text-4xl font-chineseChar rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
            >
              <ChineseCharacter />
            </motion.p>
          </div>

          <motion.div
            className="flex md:hidden p-1 rounded-lg pt-20 text-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
          >
            <motion.p
              key={`text-${index}`}
              className="backdrop-blur-sm"
              initial={{ color: '#000' }}
              animate={{ color: '#fff', transition: { duration: 0.5 } }}
              exit={{ color: '#000', transition: { duration: 0.5 } }}
            >
              <English /> /{' '}
              <span className="font-chineseChar text-2xl">
                <ChineseCharacter />
              </span>
            </motion.p>
          </motion.div>

          <motion.ul
            variants={{
              open: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
              closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
            className=""
          >
            {links.map(({ link, name }) => (
              <motion.li
                key={name}
                className="w-full block border p-2 bg-white border-[#E11D48] text-[#E11D48] text-left cursor-pointer"
                style={{ x: 0, y: 0, boxShadow: '5px 5px 0 #E11D48', z: 1 }}
                variants={{
                  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
                }}
                whileHover={{
                  y: 2,
                  x: 2,
                  transition: { duration: 0.03 },
                  boxShadow: '3px 3px #E11D48',
                  z: -1,
                  backgroundColor: '#FFE4E6',
                }}
                whileTap={{
                  y: 4.4,
                  x: 4.4,
                  transition: { duration: 0.03 },
                  boxShadow: '1px 1px #E11D48',
                  backgroundColor: '#FECDD3',
                }}
                onClick={() => window.open(link)}
              >
                {name}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 m-3 z-20">
        <motion.img
          initial={{ x: -100 }}
          animate={{ x: 0, transition: { delay: 1 } }}
          src="/assets/avatar.png"
          alt="avatar"
          className="rounded-full w-12 h-12 shadow-md"
        />
      </div>
      <div className="absolute bottom-0 left-0 m-3 z-20">
        <motion.p
          className="text-xs backdrop-blur-sm text-white md:text-black p-1"
          initial={{ x: -500 }}
          animate={{ x: 0, transition: { delay: 1.5 } }}
        >
          copyright vincecao @ 2022
        </motion.p>
      </div>
    </div>
  );
}
