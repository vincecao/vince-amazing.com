import React, { useMemo, memo, useEffect } from "react";
import type { ReactElement } from "react";
import Prism from "prismjs";
import { format, isValid } from "date-fns";
import marked from "marked";
import { Link, useParams } from "react-router-dom";

import posts from "./posts/*";
import { createPostEntry } from "./helpers/markdown";
import { AnimatedGsapDiv } from "@vincecao/animated-in-view";

const Post = memo(({ postId }: { postId: string }) => {
  const content = useMemo(() => createPostEntry(posts[`${postId}.md`].default), [postId]);
  const date = useMemo(() => (isValid(content.date) ? format(content.date, "Pp") : undefined), []);
  return (
    <>
      <AnimatedGsapDiv type="slide-top-to-bottom" distance={25}><h1 className="text-3xl mb-5">{content.title}</h1></AnimatedGsapDiv>
      <AnimatedGsapDiv type="slide-right-to-left" distance={20} delay={2500}>{date && <p className="italic text-right opacity-50">{date}</p>}</AnimatedGsapDiv>
      <AnimatedGsapDiv type="slide-bottom-to-top" distance={25} delay={700} className="prose prose-sm md:prose-base lg:prose-lg prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:my-8 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h5:font-bold" dangerouslySetInnerHTML={{ __html: marked.parse(content.body) }} />
    </>
  );
});

const BackButton = memo(() => (
  <AnimatedGsapDiv type="slide-left-to-right" distance={25} delay={2500} className="fixed left-5 top-5 link-text">
    <Link to="/blog">
      Back
    </Link>
  </AnimatedGsapDiv>
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
