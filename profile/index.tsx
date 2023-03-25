import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Post from "./src/Post";
import Blog from "./src/Blog";
import Photos from "./src/Photos";
import Root from "./src/Root";
import Welcome from "./src/Welcome";

const container = document.getElementById("root");
const root = createRoot(container!);

const rootChildrenRoutes = [
  {
    path: "",
    element: <Welcome />,
  },
  {
    path: "photos",
    element: <Photos />,
  },
  {
    path: "blog",
    children: [{ path: ":post", element: <Post /> }],
    element: <Blog />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: rootChildrenRoutes,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
