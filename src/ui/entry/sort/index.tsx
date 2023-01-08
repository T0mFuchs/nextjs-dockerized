import React from "react";
import { motion } from "framer-motion";

import css from "./index.module.scss";

export default function Sort({
  open,
  onOpenChange,
  sortPlaceholder,
  setSortPlaceholder,
  setSortKey,
  setSortValue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sortPlaceholder: string;
  setSortPlaceholder: (sortPlaceholder: string) => void;
  setSortKey: (sortKey: string) => void;
  setSortValue: (sortValue: string) => void;
}) {
  return (
    <span className={css.wrapper}>
      {open ? (
        <motion.div
          style={{ display: "inline-flex", gap: 10 }}
          variants={{
            closed: { opacity: 0, scale: 0.3 },
            open: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              },
            },
          }}
          initial="closed"
          animate="open"
        >
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className={
              sortPlaceholder === "descending"
                ? `${css.sortoption} ${css.highlight}`
                : css.sortoption
            }
            onClick={() => {
              if (sortPlaceholder === "descending") {
                onOpenChange(false);
                return;
              }
              setSortKey("_id");
              setSortValue("-1");
              setSortPlaceholder("descending");
              onOpenChange(false);
            }}
          >
            descending
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className={
              sortPlaceholder === "ascending"
                ? `${css.sortoption} ${css.highlight}`
                : css.sortoption
            }
            onClick={() => {
              if (sortPlaceholder === "ascending") {
                onOpenChange(false);
                return;
              }
              setSortKey("_id");
              setSortValue("1");
              setSortPlaceholder("ascending");
              onOpenChange(false);
            }}
          >
            ascending
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className={
              sortPlaceholder === "recently updated"
                ? `${css.sortoption} ${css.highlight}`
                : css.sortoption
            }
            onClick={() => {
              if (sortPlaceholder === "recently updated") {
                onOpenChange(false);
                return;
              }
              setSortKey("updatedAt");
              setSortValue("-1");
              setSortPlaceholder("recently updated");
              onOpenChange(false);
            }}
          >
            recently updated
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          className={css.opensort}
          onClick={() => onOpenChange(true)}
          tabIndex={0}
        >
          {sortPlaceholder}
        </motion.button>
      )}
    </span>
  );
}
