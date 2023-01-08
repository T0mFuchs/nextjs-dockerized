import React from "react";

import css from "./index.module.scss";

export default function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={css.animated} style={{ ...style }}>
      {children}
    </div>
  );
}
