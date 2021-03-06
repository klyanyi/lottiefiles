import React from 'react';

const Icon = function (props: { icon: string; fillColor?: string }) {
  const { icon, fillColor } = props;

  // TODO: simple map - use better type-checks
  const ICONS: any = {
    search: (
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path
          fill={fillColor}
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
      </svg>
    ),
    convert: (
      <svg
        viewBox="0 0 6 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="6"
      >
        <path
          d="M11.99 1.154a.988.988 0 01-1.123.833c-.44-.065-1.004.223-1.659.903-.717.743-1.505 1.916-2.333 3.494-1.004 1.912-1.967 3.32-2.918 4.246-1.002.977-2.01 1.438-3.041 1.362a.988.988 0 11.145-1.971c.458.034 1.04-.29 1.71-1.003.726-.772 1.52-1.966 2.354-3.553 1.01-1.922 1.98-3.321 2.94-4.223C9.081.29 10.11-.123 11.156.032c.54.08.913.582.833 1.122z"
          fill={fillColor}
        />
      </svg>
    ),
    preview: (
      <svg viewBox="0 0 25 25" width="16" height="16">
        <path
          d="M23.936 12.784C23.753 12.507 19.392 6 12.5 6 6.586 6 1.308 12.479 1.086 12.754a.393.393 0 000 .492C1.308 13.52 6.586 20 12.5 20s11.192-6.479 11.414-6.754a.395.395 0 00.021-.462zM12.5 16.889c-2.114 0-3.834-1.745-3.834-3.889 0-2.144 1.72-3.889 3.834-3.889s3.833 1.745 3.833 3.889c0 2.144-1.72 3.889-3.833 3.889z"
          fill={fillColor}
        />
      </svg>
    ),
  };

  return <div className="lf-icon w-full h-full">{ICONS[icon]}</div>;
};

export default Icon;
