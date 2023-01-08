import React from "react";

import css from "./index.module.scss";

// this component needs style overrides to work properly
// ! override height & width
// optional: change position

export default function BorderRadius({
  children,
  className,
  style,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className={`${css.border} ${className}`}
      style={{ ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
