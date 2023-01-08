import React from "react";

import animate from "./animate.module.scss";

export default function Flicker({
  children,
  text,
  className,
  style,
  ...props
}: {
  children: React.ReactNode;
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`${animate.flicker} ${className}`}
      style={{ ...style }}
      data-text={text}
      {...props}
    >
      {children}
    </div>
  );
}
