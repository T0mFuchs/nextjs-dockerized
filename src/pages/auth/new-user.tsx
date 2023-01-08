import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import Separator from "ui/radix-ui/separator";

import type { Fetcher } from "swr";
import type { UserType } from "types/User";

import styles from "styles/main.module.scss";
import css from "../index.module.scss";

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

const userFetcher: Fetcher<UserType, string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Event() {
  const { data: user, error, isLoading } = useSWR(`/api/user/with-session`, userFetcher);
  const { push } = useRouter();

  if (isLoading) return <></>;
  if (error) {
    setTimeout(() => push("/"), 1000);
    return (
      <>
        <Head>
          <title>redirecting...</title>
        </Head>
        <React.Suspense>
          <MotionDiv
            className={css.ToastBar}
            style={{ position: "fixed", top: "45%" }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 1 }}
          />
        </React.Suspense>
      </>
    );
  }
  if (user && user.emailVerified !== true) {
    return (
      <>
        <Head>
          <title>Welcome {user.name}</title>
        </Head>
        <div
          style={{
            paddingTop: "7em",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ padding: ".3em" }}>🥳 Welcome {user.name}</p>
          <Separator
            style={{ maxWidth: "90%", margin: "auto" }}
            orientation="horizontal"
          />
          <div style={{ padding: ".8em" }} />
          <button
            className={styles.Button}
            onClick={async () => {
              console.log(user._id);
              await fetch(`/api/${user._id}/nodemailer/new-user`, {
                body: JSON.stringify({
                  email: user.email,
                  name: user.name,
                }),
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                method: "POST",
              });
              push("/");
            }}
          >
            get verification email
          </button>
        </div>
      </>
    );
  } else {
    setTimeout(() => push("/"), 1500);
    return (
      <>
        <Head>
          <title>redirecting...</title>
        </Head>
        <React.Suspense>
          <MotionDiv
            className={css.ToastBar}
            style={{ position: "fixed", top: "45%" }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 1.5 }}
          />
        </React.Suspense>
      </>
    );
  }
}
