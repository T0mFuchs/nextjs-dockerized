import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

import css from "./index.module.scss";
import { UserType } from "types/User";

export default function Settings({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
  user: UserType;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild onClick={() => onOpenChange(!open)}>
        <Avatar className={css.avatarRoot}>
          <AvatarImage
            //* user image as trigger
            className={css.avatarImage}
            src={user.image}
            alt={user.name}
          />
        </Avatar>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className={css.PopoverContent}>
          <motion.div
            variants={{
              initial: {
                y: -25,
                opacity: 0,
              },
              animate: {
                y: 0,
                opacity: 1,
                transition: {
                  y: {
                    duration: 0.25,
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              },
            }}
            key="modal"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => signOut()}
              className={css.PopoverSignOut}
              autoFocus
            >
              {" "}
              sign out
            </motion.button>
          </motion.div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
