import Background from "ui/animated/fallback-card";

import styles from "styles/main.module.scss";

export default function Fallback({
  style,
  maxWidth,
}: {
  style?: React.CSSProperties;
  maxWidth?: string;
}) {
  return (
    <div style={{ padding: "1em" }}>
      <Background style={{ maxWidth: maxWidth }}>
        <div className={styles.Card} style={{ ...style, maxWidth: maxWidth }}>
          <div style={{ fontSize: "1.6em", color: "transparent" }}>...</div>
          <p style={{ color: "transparent" }}>...</p>
          <div style={{ fontSize: ".6em", color: "transparent" }}>...</div>
        </div>
      </Background>
    </div>
  );
}
