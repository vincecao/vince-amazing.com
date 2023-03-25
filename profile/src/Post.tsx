import React, { ReactElement, useMemo } from "react";
import { memo } from "react";
import { format } from "date-fns";
import posts from "./posts/*";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { createPostEntry } from "./helpers/markdown";

const Post = memo(({ name }: { name: string }) => {
  const content = useMemo(() => createPostEntry(posts[`${name}.md`].default), [name]);

  return (
    <div className="space-y-3 py-10 w-full">
      <h1 className="text-2xl mb-5">{content.title}</h1>
      <p className="italic text-right opacity-50">{format(content.date, "Pp")}</p>
      <ReactMarkdown className="mx-auto prose prose-zinc dark:prose-invert" children={content.body} />
    </div>
  );
});

function BlogPost(): ReactElement | null {
  const { post } = useParams<{ post: string | undefined }>();
  if (!post) return null;
  return (
    <>
      <Link to="/blog" className="fixed left-5 top-5 link-text">Back</Link>
      <Post name={post} />
    </>
  );
}

export default memo(BlogPost);
