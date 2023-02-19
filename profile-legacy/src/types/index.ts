export type PhotoSrc = {
  h: PhotoSpec;
  l: PhotoSpec;
  c: PhotoSpec;
};

export type PhotoSpec = {
  height: number;
  width: number;
  url: string;
};

export type Link = {
  title: string;
  link: string;
  name: string;
};

export type IndexData = {
  firstname: {
    english: string;
    chinese: string;
  };
  lastname: {
    english: string;
    chinese: string;
  };
  links: Link[];
};
