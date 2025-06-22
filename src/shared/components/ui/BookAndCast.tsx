import React, { memo } from 'react';
import type { ReactElement } from 'react';

function BookAndCast({ height = 32, className }: { height?: number, className?: string }): ReactElement {
  return (
    <svg viewBox="0 0 100 32" height={height} xmlns="http://www.w3.org/2000/svg">
      <text
        x="0"
        y="26"
        fontFamily="'Shadows Into Light', sans-serif"
        fontSize="28"
        fill="currentColor"
      >
        Book&Cast
      </text>
    </svg>
  );
}

export default memo(BookAndCast); 