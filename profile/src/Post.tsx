import React, { ReactElement, useMemo } from "react";
import { memo } from "react";
import { format, isValid } from "date-fns";
import posts from "./posts/*";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { createPostEntry } from "./helpers/markdown";

const Post = memo(({ postId }: { postId: string }) => {
  const content = useMemo(() => createPostEntry(posts[`${postId}.md`].default), [postId]);
  const date = useMemo(() => (isValid(content.date) ? format(content.date, "Pp") : undefined), []);
  return (
    <div className="space-y-3 py-10 px-5 font-['Noto_Serif']" style={{ maxWidth: "100vw" }}>
      <h1 className="text-2xl mb-5">{content.title}</h1>
      {date && <p className="italic text-right opacity-50">{date}</p>}
      <ReactMarkdown className="mx-auto prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert" children={content.body} />
    </div>
  );
});

function BlogPost(): ReactElement | null {
  const { postId } = useParams<{ postId: string | undefined }>();
  if (!postId) return null;
  return (
    <>
      <Link to="/blog" className="fixed left-5 top-5 link-text">
        Back
      </Link>
      <Post postId={postId} />
    </>
  );
}

export default memo(BlogPost);
