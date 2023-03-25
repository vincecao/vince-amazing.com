import React, { type ReactElement } from "react";
import { memo, useMemo } from "react";
import { format, isValid } from "date-fns";
import { Link, Outlet, useParams } from "react-router-dom";
import { createPostEntry } from "./helpers/markdown";
import posts from "./posts/*";

function Blog(): ReactElement {
  const { post } = useParams<{ post: string | undefined }>();

  const list = useMemo(() => {
    return Object.entries(posts)
      .map(([postPath, postFile]: any) => [postPath.replace('.md', ''), createPostEntry(postFile.default)])
      .sort((p1, p2) => p2[1].date - p1[1].date);
  }, []);

  return (
    <div className="flex flex-col items-start py-32 space-y-3 px-5">
      {!post ? (
        list.map(([postId, postEntry]) => (
          <Link key={postId} to={`/blog/${postId}`} className="link-text w-full flex justify-between space-x-2">
            <span>{postEntry.title}</span>
            <i className="opacity-70 whitespace-nowrap">{isValid(postEntry.date) ? `${format(postEntry.date, "P")}` : ""}</i>
          </Link>
        ))
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default memo(Blog);
