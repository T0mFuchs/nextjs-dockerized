import React from "react";
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@radix-ui/react-alert-dialog";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { EntryType } from "types/Entry";
import { useCreateOneEntry } from "hooks/entry/createOneEntry";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "ui";

import form from "ui/entry/form.module.scss";
import dialog from "ui/entry/dialog.module.scss";
import styles from "styles/main.module.scss";
import css from "./index.module.scss";

export default function CreateEntry({
  open,
  onOpenChange,
  visibility,
  setVisibility,
  userId,
  allEntries,
  callback,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
  setVisibility: (visibility: boolean) => void;
  visibility: boolean;
  userId: any;
  allEntries: EntryType[];
  callback: () => void;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const obj: EntryType = {
      title: data.title,
      body: data.body,
      visibility: visibility,
      author: userId,
    };
    if (
      allEntries.find((someEntry: EntryType) => someEntry.title === data.title)
    ) {
      window.alert("title already exists");
      return 0;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useCreateOneEntry(obj);
    onOpenChange(false);
    if (visibility) {
      push("/entries");
    }
    callback();
  };

  return (
    <>
      <AnimatePresence>
        <AlertDialog //* Create Entry Popup //
          open={open}
          onOpenChange={onOpenChange}
        >
          <AlertDialogPortal>
            <AlertDialogOverlay className={`${dialog.overlay}`} />
            <AlertDialogContent className={`${dialog.dialogCard}`}>
              <motion.div
                className={`${styles.Card} `}
                style={{ padding: 0 }}
                variants={{
                  initial: {
                    opacity: 0,
                    y: "-25vh",
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      y: {
                        ease: [0.05, 0.1, 0.3, 1.05],
                        duration: 0.35,
                      },
                      opacity: {
                        ease: [0.05, 0.1, 0.3, 1.05],
                        duration: 0.45,
                      },
                    },
                  },
                }}
                initial="initial"
                animate="animate"
              >
                <form className={form.form} onSubmit={handleSubmit(onSubmit)}>
                  <legend className={form.legend}>new Entry</legend>
                  <button
                    className={form.cancel}
                    onClick={() => onOpenChange(false)}
                  >
                    <AccessibleIcon label="cancel">
                      <div className={css.cancelicon}>
                        <CrossSVG />
                      </div>
                    </AccessibleIcon>
                  </button>
                  <Label htmlFor="title" />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <div className={css.errormsg}>{message}</div>
                    )}
                  />
                  <input
                    {...register("title", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "min-length: 3",
                      },
                      maxLength: {
                        value: 20,
                        message: "max-length: 20",
                      },
                      pattern: {
                        // https://www.debuggex.com/
                        value: /^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s=?!%./\\]*$/,
                        message: "remove special characters",
                      },
                    })}
                    className={form.input}
                    name="title"
                    type="text"
                    placeholder="title"
                  />
                  <Label htmlFor="body" />
                  <ErrorMessage
                    errors={errors}
                    name="body"
                    render={({ message }) => (
                      <div className={css.errormsg}>{message}</div>
                    )}
                  />
                  <TextareaAutosize
                    {...register("body", {
                      required: true,
                      minLength: {
                        value: 5,
                        message: "atleast 5 characters",
                      },
                      maxLength: {
                        value: 2000,
                        message: "maxmium 2000 characters",
                      },
                    })}
                    minRows={10}
                    maxRows={20}
                    className={form.textarea}
                    name="body"
                    placeholder="body"
                  />

                  <div className={form.checkboxwrapper}>
                    <Checkbox
                      checked={visibility}
                      className={form.checkboxroot}
                      onClick={() => setVisibility(!visibility)}
                    >
                      <CheckboxIndicator>
                        <CheckSVG />
                      </CheckboxIndicator>
                    </Checkbox>
                    <AnimatePresence initial={false} mode="wait">
                      {visibility ? (
                        <motion.div
                          className={css.public}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => setVisibility(!visibility)}
                        >
                          <Label className={form.checkboxlabel}>public</Label>
                        </motion.div>
                      ) : (
                        <motion.div
                          className={css.private}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => setVisibility(!visibility)}
                        >
                          <Label className={form.checkboxlabel}>private</Label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={() => handleSubmit(onSubmit)}
                    className={form.submit}
                    type="submit"
                  >
                    save & close
                    <span style={{ paddingLeft: 4 }}>
                      <AccessibleIcon label="save">
                        <span className={css.submiticon}>
                          <CheckSVG />
                        </span>
                      </AccessibleIcon>
                    </span>
                  </button>
                </form>
              </motion.div>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </AnimatePresence>
    </>
  );
}
