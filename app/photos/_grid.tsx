import { useBackgroundActions } from '@/helpers/background-store';
import { memo } from 'react';

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
        className="w-auto md:w-[12rem] aspect-square object-cover transition ease-in-out duration-75 brightness-75 saturate-50 hover:brightness-100 hover:saturate-100 md:hover:scale-125"
      />
    </a>
  );
};

export default memo(Grid);
