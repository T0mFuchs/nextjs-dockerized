import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";
import { ArrowTopSVG } from "ui";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

export function ScrollUp() {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);
  return (
    <>
      {showBtn ? (
        <Suspense>
          <MotionDiv
            className={`${styles.Button} ${css.Position}`}
            onClick={goToTop}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.15,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <MotionDiv
              initial={{
                opacity: 0,
                scale: 0.3,
                position: "relative",
                bottom: -50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                position: "relative",
                bottom: 0,
              }}
              transition={{
                duration: 0.25,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <AccessibleIcon label="go to top button">
                <ArrowTopSVG />
              </AccessibleIcon>
            </MotionDiv>
          </MotionDiv>
        </Suspense>
      ) : null}
    </>
  );
}

function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
