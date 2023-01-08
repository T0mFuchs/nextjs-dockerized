import { motion, useScroll } from "framer-motion";

import css from "./progress.module.scss";

const ScrollYProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className={css["progress-bar"]}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollYProgress;
