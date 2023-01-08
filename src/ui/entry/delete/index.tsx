import React from "react";
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { motion, AnimatePresence } from "framer-motion";
import { useDeleteOneEntry } from "hooks/entry/deleteOneEntry";
import { CheckSVG, CrossSVG } from "ui";
import type { EntryType } from "types/Entry";

import dialog from "ui/entry/dialog.module.scss";
import styles from "styles/main.module.scss";

export default function DeleteEntry({
  open,
  onOpenChange,
  entry,
  userId,
  callback,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
  entry: EntryType;
  userId: any;
  callback: () => void;
}) {
  const handleSubmit = async () => {
    const data = {
      _id: entry._id as any,
      author: userId,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useDeleteOneEntry(data);
    onOpenChange(false);
    callback();
  };
  return (
    <AnimatePresence>
      {open ? (
        <Dialog //* Delete Entry Dialog //
          open={open}
          onOpenChange={onOpenChange}
        >
          <DialogPortal>
            <DialogOverlay className={`${dialog.overlay}`} />
            <DialogContent className={`${dialog.dialogButton}`}>
              <motion.button
                variants={{
                  initial: {
                    opacity: 0.0,
                    scale: 0.5,
                  },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      scale: {
                        ease: [0.05, 0.1, 0.3, 1.05],
                        duration: 0.1,
                      },
                      opacity: {
                        ease: [0.05, 0.1, 0.3, 1.05],
                        duration: 0.2,
                      },
                    },
                  },
                }}
                initial="initial"
                animate="animate"
                className={styles.Button}
                style={{
                  fontSize: "2em",
                  position: "relative",
                  border: "1px solid currentColor",
                }}
                onClick={() => handleSubmit()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.85 }}
                tabIndex={0}
              >
                delete
              </motion.button>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
}
