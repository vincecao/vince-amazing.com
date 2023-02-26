import { usePromiseState } from "@vincecao/use-tools";
import React, { useCallback } from "react";
import { memo } from "react";
import useFlickr from "./hooks/useFlickr";

function Photos(): React.ReactElement {
  const photos = useFlickr();
  return (
    <div className="grid grid-cols-4 gap-2 items-center">
      {photos?.slice(0, 10).map((photo) => (
        <img src={photo.l.url} className="w-64 h-64 object-cover" />
      ))}
    </div>
  );
}

export default memo(Photos);
