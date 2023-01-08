import React from "react";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import styles from "styles/main.module.scss";
import css from "../index.module.scss";

const AlertDialog = dynamic(() => import("ui/radix-ui/alert-dialog/root"), {
  suspense: true,
});
const AlertDialogPortal = dynamic(
  () => import("ui/radix-ui/alert-dialog/portal"),
  { suspense: true }
);
const AlertDialogContent = dynamic(
  () => import("ui/radix-ui/alert-dialog/content"),
  { suspense: true }
);
const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});
const MotionButton = dynamic(() => import("ui/framer-motion/button"), {
  suspense: true,
});

//! this page triggers hydration error ((the dialog component))

export default function SignIn() {
  const [openCookieAlert, setOpenCookieAlert] = React.useState(true);
  const [acceptCookies, setAcceptCookies] = React.useState(false);
  const { data: session } = useSession();
  const { push } = useRouter();

  function handleSignIn(provider: string) {
    if (!acceptCookies) {
      setOpenCookieAlert(true);
    } else {
      signIn(provider);
    }
  }

  if (session) {
    setTimeout(() => {
      push("/");
    }, 1500);
    return (
      <React.Suspense>
        <Head>
          <title>redirecting...</title>
        </Head>
        <MotionDiv
          className={css.md}
          style={{ position: "fixed", top: "45%" }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 1.5 }}
        />
      </React.Suspense>
    );
  }
  if (!session) {
    return (
      <React.Suspense>
        <Head>
          <title>3rd party signin</title>
        </Head>
        <h2 style={{ paddingTop: "6em" }}>
          <div>
            <MotionButton
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSignIn("github")}
              className={styles.Button}
            >
              <GithubSVG /> sign in with Github
            </MotionButton>
          </div>
          <div style={{ paddingTop: 20 }}>
            <MotionButton
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSignIn("google")}
              className={styles.Button}
            >
              <GoogleSVG /> sign in with Google
            </MotionButton>
          </div>
        </h2>
        <AlertDialog open={openCookieAlert} onOpenChange={setOpenCookieAlert}>
          <AlertDialogPortal>
            <AlertDialogContent style={{ width: 285, margin: "auto" }}>
              <div
                className={styles.Button}
                style={{ padding: "0 15px", lineHeight: 2.5 }}
              >
                <div style={{ position: "relative", top: -4 }}>
                  <span
                    style={{
                      position: "relative",
                      top: ".7em",
                      right: ".25em",
                    }}
                  >
                    <CookieSVG />
                  </span>
                  <MotionButton
                    style={{ all: "unset" }}
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setAcceptCookies(true);
                      setOpenCookieAlert(false);
                    }}
                    autoFocus
                  >
                    accept cookies to continue
                  </MotionButton>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
      </React.Suspense>
    );
  }
}

function GoogleSVG() {
  return (
    <svg
      style={{ position: "relative", top: ".15em", right: ".2em" }}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25.59"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 262"
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}

function GithubSVG() {
  return (
    <svg
      style={{ position: "relative", top: ".15rem", right: ".3rem" }}
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="25.48"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1536 1504"
    >
      <path
        fill="currentColor"
        d="M768 0q209 0 385.5 103T1433 382.5T1536 768q0 251-146.5 451.5T1011 1497q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142q57-6 102.5-18t94-39t81-66.5t53-105T1258 728q0-119-79-206q37-91-8-204q-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27T450 331.5T365 318q-45 113-8 204q-79 87-79 206q0 85 20.5 150T351 983t80.5 67t94 39t102.5 18q-39 36-49 103q-21 10-45 15t-57 5t-65.5-21.5T356 1146q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5t9 14t13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30t69.5 7t55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5T0 768q0-209 103-385.5T382.5 103T768 0zM291 1103q3-7-7-12q-10-3-13 2q-3 7 7 12q9 6 13-2zm31 34q7-5-2-16q-10-9-16-3q-7 5 2 16q10 10 16 3zm30 45q9-7 0-19q-8-13-17-6q-9 5 0 18t17 7zm42 42q8-8-4-19q-12-12-20-3q-9 8 4 19q12 12 20 3zm57 25q3-11-13-16q-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11q-16 0-16 11q0 13 17 11q16 0 16-11zm58-10q-2-11-18-9q-16 3-14 15t18 8t14-14z"
      />
    </svg>
  );
}

function CookieSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10.5 10q.625 0 1.062-.438Q12 9.125 12 8.5t-.438-1.062Q11.125 7 10.5 7t-1.062.438Q9 7.875 9 8.5t.438 1.062Q9.875 10 10.5 10Zm-2 5q.625 0 1.062-.438Q10 14.125 10 13.5t-.438-1.062Q9.125 12 8.5 12t-1.062.438Q7 12.875 7 13.5t.438 1.062Q7.875 15 8.5 15Zm6.5 1q.425 0 .713-.288Q16 15.425 16 15t-.287-.713Q15.425 14 15 14t-.712.287Q14 14.575 14 15t.288.712Q14.575 16 15 16Zm-3 6q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12q0-2.025.838-3.938Q3.675 6.15 5.163 4.7Q6.65 3.25 8.7 2.5q2.05-.75 4.5-.45q.375.05.575.312q.2.263.225.713q.05 1.6 1.188 2.737Q16.325 6.95 17.9 7q.525.025.8.3q.275.275.3.85q.05 1.05.638 1.725q.587.675 1.637 1.025q.35.125.537.362q.188.238.188.588q.05 2.075-.725 3.925q-.775 1.85-2.125 3.237q-1.35 1.388-3.2 2.188q-1.85.8-3.95.8Z"
      />
    </svg>
  );
}
