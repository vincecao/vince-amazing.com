export function createPostEntry(str: string): {
  title: string;
  date: Date;
  body;
} {
  let [, meta, ...bodies] = str.split("---");
  const metas = meta.split("\n");
  const body = bodies.join("---").replace(/(<([^>]+)>)/gi, "");
  const title = metas.find((meta) => meta.includes("title"))!.replace("title: ", "");
  const date = new Date(metas.find((meta) => meta.includes("date"))!.replace("date: ", ""));
  return { title, date, body };
}
