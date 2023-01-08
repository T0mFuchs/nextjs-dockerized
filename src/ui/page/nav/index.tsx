import Link from "next/link";
import dynamic from "next/dynamic";
import AccessibleIconRoot from "ui/radix-ui/accessible-icon/root";

import styles from "./index.module.scss";

const BorderRadius = dynamic(() => import("ui/animated/border-radius"));

const ScrollYProgress = dynamic(
  () => import("ui/framer-motion/scrollYProgress")
);

export function Nav() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles["navbar-nav"]}>
          <li className={styles["nav-item"]}>
            <Link
              href="/"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <AccessibleIconRoot label="home link">
                <IconSVG />
              </AccessibleIconRoot>
              <span className={styles["link-text"]}>Home</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link
              href="/entries"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <AccessibleIconRoot label="entries link">
                <ViewListSVG />
              </AccessibleIconRoot>
              <span className={styles["link-text"]}>Entries</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link
              href="/about"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit", paddingLeft: ".1em" }}
            >
              <AccessibleIconRoot label="about link">
                <QuestionSVG />
              </AccessibleIconRoot>
              <span className={styles["link-text"]}>About</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <a
              href="https://github.com/T0mFuchs/nextssr"
              className={styles["nav-link"]}
              style={{ color: "inherit", paddingLeft: ".15em" }}
            >
              <AccessibleIconRoot label="github link">
                <GithubSVG />
              </AccessibleIconRoot>
              <span
                className={styles["link-text"]}
                style={{ paddingLeft: ".2em" }}
              >
                Github
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <BorderRadius style={{ position: "fixed" }} className={styles.border} />
      <ScrollYProgress />
    </>
  );
}

function IconSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="-1.5 0 17.5 16"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.75 5.75v7.5h8.5v-7.5m-10.5 1.5L8 1.75l6.25 5.5"
      />
    </svg>
  );
}

function QuestionSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="55%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="4 0 320 512"
    >
      <path
        fill="currentColor"
        d="M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32c0-53 43-96 96-96h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5V320c0 17.7-14.3 32-32 32s-32-14.3-32-32v-18.1c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z"
      />
    </svg>
  );
}

function GithubSVG() {
  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      width="1.85em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="-1 0 25 24"
    >
      <g fill="none">
        <g clipPath="url(#svgIDa)">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="svgIDa">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}

function ViewListSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2.25em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M7 13h7q.425 0 .713-.288Q15 12.425 15 12t-.287-.713Q14.425 11 14 11H7q-.425 0-.713.287Q6 11.575 6 12t.287.712Q6.575 13 7 13Zm0-3h7q.425 0 .713-.288Q15 9.425 15 9t-.287-.713Q14.425 8 14 8H7q-.425 0-.713.287Q6 8.575 6 9t.287.712Q6.575 10 7 10ZM4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h16q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20Zm0-2V6v12Zm0 0h16V6H4v12Z"
      />
    </svg>
  );
}
