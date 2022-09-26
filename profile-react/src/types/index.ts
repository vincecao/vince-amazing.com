export type PhotoSrc = string;
export type Link = {
    title: string,
    link: string,
    name: string,
  }
export type IndexData = {
    firstname: {
      english: string;
      chinese: string;
    }
    lastname: {
      english: string;
      chinese: string;
    }
    links: Link[];
}