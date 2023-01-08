import React from "react";
import {
  Dialog,
  DialogPortal,
  DialogContent,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { EntryType } from "types/Entry";
import { useRouter } from "next/router";
import { useUpdateOneEntry } from "hooks/entry/updateOneEntry";
import TextareaAutosize from "react-textarea-autosize";
import { CheckSVG, CrossSVG } from "ui";

import form from "ui/entry/form.module.scss";
import dialog from "ui/entry/dialog.module.scss";
import styles from "styles/main.module.scss";
import css from "./index.module.scss";

export default function UpdateEntry({
  open,
  onOpenChange,
  visibility,
  setVisibility,
  userId,
  entry,
  allEntries,
  callback,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
  userId: any;
  entry: EntryType;
  allEntries: EntryType[];
  callback: () => void;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const updatedEntry = {
      _id: entry._id as any,
      title: data.title,
      body: data.body,
      visibility: visibility,
      author: userId,
    };
    if (
      allEntries.find((someEntry: EntryType) => someEntry.title === data.title)
    ) {
      if (data.title !== entry.title) {
        window.alert("title already exists");
        return 0;
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useUpdateOneEntry(updatedEntry);
    onOpenChange(false);
    if (visibility) {
      push("/entries");
    }
    callback();
  };

  React.useEffect(() => {
    if (entry) {
      setValue("title", entry.title);
      setValue("body", entry.body);
    }
  }, [entry, setValue]);
  return (
    <>
      <AnimatePresence>
        {open ? (
          <Dialog //* Edit Entry Popup //
            open={open}
            onOpenChange={onOpenChange}
          >
            <DialogPortal>
              <DialogOverlay className={`${dialog.overlay}`} />
              <DialogContent className={`${dialog.dialogCard}`}>
                <motion.div
                  className={`${styles.Card}`}
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
                    <legend className={form.legend}>
                      entry: {entry.title}
                    </legend>
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
                          message: "atleast 3 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "maximum 20 characters",
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
                    />

                    <div className={form.checkboxwrapper}>
                      <Checkbox
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
                            <Label className={form.checkboxlabel}>
                              private
                            </Label>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <button
                      onClick={() => handleSubmit(onSubmit)}
                      className={form.submit}
                      tabIndex={0}
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
              </DialogContent>
            </DialogPortal>
          </Dialog>
        ) : null}
      </AnimatePresence>
    </>
  );
}
