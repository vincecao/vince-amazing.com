import React, { type ReactElement } from "react";
import { memo, useMemo } from "react";
import { format, isValid } from "date-fns";
import { Link as RouterLink, Outlet, useParams } from "react-router-dom";
import { createPostEntry, type PostElement } from "./helpers/markdown";
import posts from "./posts/*";

const Link = memo(({ element: [postId, postEntry] }: { element: PostElement }) => {
  const link = useMemo(() => `/blog/${postId}`, [postId]);
  const date = useMemo(() => (isValid(postEntry.date) ? `${format(postEntry.date, "P")}` : undefined), [postEntry]);
  return (
    <RouterLink to={link} className="link-text w-full flex justify-between space-x-2">
      <span>{postEntry.title}</span>
      {date && <i className="opacity-70 whitespace-nowrap hidden md:block">{date}</i>}
    </RouterLink>
  );
});

function Blog(): ReactElement {
  const { postId } = useParams<{ postId: string | undefined }>();

  const list = useMemo<PostElement[]>(() => {
    return Object.entries(posts)
      .map(([postPath, postFile]: any) => [postPath.replace(".md", ""), createPostEntry(postFile.default)] as PostElement)
      .sort(([, { date: dateOne, title: titleOne }], [, { date: dateTwo, title: titleTwo }]) => dateTwo.getTime() - dateOne.getTime() || titleOne.localeCompare(titleTwo));
  }, []);

  return (
    <div className="p-10 pr-16 font-sans font-extralight w-full">
      <div className="w-full md:w-2/3 space-y-3 mx-auto">
        {!postId ? (
          <>
            {list.map((element) => (
              <Link key={element[0]} element={element} />
            ))}
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default memo(Blog);
