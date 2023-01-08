import * as S from "@radix-ui/react-separator";

import css from "./index.module.scss";

export default function Separator({
  className,
  style,
  orientation,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <S.Root
      className={`${css.root} ${className}`}
      style={{ ...style }}
      {...props}
    />
  );
}
