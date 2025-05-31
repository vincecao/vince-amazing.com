import { memo } from 'react';

import { useBackgroundActions } from '@/shared/helpers/background-store';

const Grid = ({ id, url }: { id: string; url: string }) => {
  const { setBackground } = useBackgroundActions();

  return (
    <a
      className="md:hover:z-10 z-0"
      href={`//www.flickr.com/photos/saablancias/${id}/in/dateposted-public/`}
      target="_blank"
    >
      <img
        onMouseEnter={() => setBackground(url)}
        onMouseLeave={() => setBackground(null)}
        src={url}
        className="w-auto h-[50vw] md:w-[12rem] md:h-[12rem] object-cover transition ease-in-out duration-75 brightness-75 saturate-50 hover:brightness-100 hover:saturate-100 md:hover:scale-125"
        style={{ aspectRatio: '1/1' }}
      />
    </a>
  );
};

export default memo(Grid);
