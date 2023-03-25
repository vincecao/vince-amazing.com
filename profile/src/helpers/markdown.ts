export type PostElement = [string, PostEntry];

interface PostEntry {
  title: string;
  date: Date;
  body: string;
}

export function createPostEntry(str: string): PostEntry {
  let [, meta, ...bodies] = str.split("---");
  const metas = meta.split("\n");
  const body = bodies.join("---").replace(/(<([^>]+)>)/gi, "");
  const title = metas.find((meta) => meta.startsWith("title: "))!.replace("title: ", "");
  const date = new Date(metas.find((meta) => meta.startsWith("date: "))!.replace("date: ", ""));
  return { title, date, body };
}
