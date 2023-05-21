import React, { ReactElement, useMemo, memo, useEffect } from "react";
import Prism from "prismjs";
import { format, isValid } from "date-fns";
import posts from "./posts/*";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { createPostEntry } from "./helpers/markdown";

const Post = memo(({ postId }: { postId: string }) => {
  const content = useMemo(() => createPostEntry(posts[`${postId}.md`].default), [postId]);
  const date = useMemo(() => (isValid(content.date) ? format(content.date, "Pp") : undefined), []);
  return (
    <>
      <h1 className="text-2xl mb-5">{content.title}</h1>
      {date && <p className="italic text-right opacity-50">{date}</p>}
      <ReactMarkdown className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h5:font-bold" children={content.body} />
    </>
  );
});

const BackButton = memo(() => (
  <Link to="/blog" className="fixed left-5 top-5 link-text">
    Back
  </Link>
));

function BlogPost(): ReactElement | null {
  const { postId } = useParams<{ postId: string | undefined }>();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  if (!postId) return null;
  return (
    <>
      <BackButton />
      <Post postId={postId} />
    </>
  );
}

export default memo(BlogPost);
