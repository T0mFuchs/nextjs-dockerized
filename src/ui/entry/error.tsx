import Separator from "ui/radix-ui/separator";
import Animated from "ui/animated/fallback-card";

import styles from "styles/main.module.scss";

export default function Error() {
  return (
    <>
      <div style={{ paddingTop: "15vh", margin: "auto" }}>
        <Animated style={{ maxWidth: 400 }}>
          <div className={styles.Card} style={{ maxWidth: 400 }}>
            <h1>db error ¯\_(ツ)_/¯</h1>
            <Separator />
            <div style={{ maxWidth: "22vh", margin: "auto" }}>
              <DBErrorSVG />
            </div>
            <div style={{ padding: 8 }} />
          </div>
        </Animated>
      </div>
    </>
  );
}
function DBErrorSVG() {
  // https://icon-sets.iconify.design/iconoir/db-error/
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "relative" }}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      >
        <path d="m17.121 21.364l2.122-2.121m2.121-2.122l-2.121 2.122m0 0L17.12 17.12m2.122 2.122l2.121 2.121M4 6v6s0 3 7 3s7-3 7-3V6" />
        <path d="M11 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Zm0 18c-7 0-7-3-7-3v-6" />
      </g>
    </svg>
  );
}
