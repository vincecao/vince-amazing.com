import React from 'react';
import classNames from 'classnames';

export type TextAlignment = 'left' | 'center' | 'right' | undefined;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string | undefined | null;
  textAlignment?: TextAlignment;
};

function Button(props: React.PropsWithChildren<ButtonProps>): React.ReactElement {
  const { text, textAlignment = 'center', children, className, ...otherProps  } = props;

  return (
    <button
      className={classNames('flex items-center', className, {
        'justify-center': textAlignment === 'center',
        'justify-start': textAlignment === 'left',
        'justify-end': textAlignment === 'right',
      })}
      {...otherProps}
    >
      <span className="space-x-2 flex items-center">
        {text && <span className="truncate">{text}</span>}
        {children}
      </span>
    </button>
  );
}

export default React.memo(Button);