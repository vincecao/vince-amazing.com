import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { usePromiseState, useShuttle, useTimeout } from '@vincecao/use-tools';
import { getPublicPhotos } from './utils/flickr';
import { INDEX_DATA } from './const';
import { PhotoSrc } from './types';

export default function App(): ReactElement {
  const [source, setSource] = useState<PhotoSrc[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);

  usePromiseState<PhotoSrc[]>(
    useCallback(getPublicPhotos, []),
    useMemo(
      () => ({
        onError: (e) => {
          console.error(e);
        },
        onSuccess: (data) => {
          setSource(data);
        },
      }),
      []
    )
  );

  const imgData = useShuttle(source);

  useTimeout(
    useCallback(() => {
      if (imgData.length > 0) {
        if (index + 1 === imgData.length) {
          setIndex(0);
        } else {
          setIndex((i) => i + 1);
        }
      }
    }, [index, imgData]),
    7000
  );

  const { firstname, lastname, fullname, links } = INDEX_DATA;

  return (
    <div className="relative h-screen">
      <AnimatePresence exitBeforeEnter>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9, transition: { duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          key={`image-${index}`}
          src={imgData[index]}
          className="absolute h-screen min-w-full object-cover"
        />
      </AnimatePresence>
      <div
        className={classNames('absolute top-0 bottom-0 left-0 right-0 border-4 border-white', {
          'backdrop-blur': isHover,
        })}
      />
      <div className="absolute w-full h-screen">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={`text-${index}`}
            initial={{ color: '#000000' }}
            animate={{
              color: '#ffffff',
              transition: { duration: 1 },
            }}
            exit={{
              color: '#000000',
              transition: { duration: 1 },
            }}
            className="text-shadow w-full h-full font-index p-6 antialiased leading-10 tracking-widest"
          >
            <div className="mt-20 mx-auto text-center mb-10">
              <p className="">
                {firstname} {lastname}
              </p>
              <p className=""> / </p>
              <p className="text-4xl font-body">{fullname}</p>
            </div>
            <div className="flex flex-col md:flex-row w-full text-center m-auto justify-center items-center">
              {links.map((link, index) => (
                <div key={link.link}>
                  <motion.div
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                  >
                    <p className="inline italic">/</p>
                    <a
                      className="mr-5 italic"
                      title={link.title}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute top-0 mt-5 left-0 ml-5">
        <motion.img
          initial={{ x: -100 }}
          animate={{
            x: 0,
            transition: {
              delay: 1,
            },
          }}
          src="/assets/avatar.png"
          alt="avatar"
          className="rounded-full w-12 h-12 shadow-md"
        />
      </div>
    </div>
  );
}
