import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { dateFromObjectId } from "lib/dateFromObjectId";
import Fallback from "ui/entry/fallback";

import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Fetcher } from "swr";
import type { UserType } from "types/User";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const UpdateEntry = dynamic(() => import("ui/entry/update"), {
  suspense: true,
});

const DeleteEntry = dynamic(() => import("ui/entry/delete"), {
  suspense: true,
});

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const title: string = context.query.title as string;
  const userId: string = context.query.user as string;
  return { props: { userId, title } };
};

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

const userFetcher: Fetcher<UserType, string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page({
  userId,
  title,
}: {
  userId: string;
  title: string;
}) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  //? set current entry
  const [update, setUpdate]: any = React.useState();
  const [visibility, setVisibility] = React.useState(false);

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`/api/user/with-session`, userFetcher);
  const { data: entry, mutate } = useSWR(
    user && user._id === userId ? `/api/${user._id}/entry/${title}` : null,
    fetcher
  );
  const { data: compareAllEntries } = useSWR(
    user && update && openUpdate ? `/api/${user._id}/entries` : null,
    fetcher
  );

  const { push } = useRouter();

  const refresh = () => {
    if (visibility) {
      push("/entries");
    }
    mutate();
  };

  if ((user && user._id !== userId) || error) return <>not authorized</>; // todo : add not authorized page
  return (
    <>
      <Head>
        <title>/user/entry/{title}</title>
      </Head>
      <React.Suspense>
        {!isLoading && entry ? (
          <div className={css.p1}>
            <MotionDiv className={styles.Card}>
              <h2
                className={styles.H2}
                style={{ fontSize: "2.5em", position: "relative", bottom: 5 }}
                aria-label="entry title"
              >
                {entry.title}
              </h2>
              <p aria-label="entry body" className={``}>
                {entry.body}
              </p>
              <div aria-label="entry date" className={css.Body}>
                {dateFromObjectId(entry._id).getDate()}
                {" / "}
                {dateFromObjectId(entry._id).getMonth() + 1}
                {" / "}
                {dateFromObjectId(entry._id).getFullYear()}
                <span style={{ padding: "0 9px" }}>{"|"}</span>
                {dateFromObjectId(entry._id).getHours()}
                {" : "}
                {dateFromObjectId(entry._id).getMinutes() < 9
                  ? "0" + dateFromObjectId(entry._id).getMinutes()
                  : dateFromObjectId(entry._id).getMinutes()}
                {" : "}
                {dateFromObjectId(entry._id).getSeconds() < 9
                  ? "0" + dateFromObjectId(entry._id).getSeconds()
                  : dateFromObjectId(entry._id).getSeconds()}
              </div>
            </MotionDiv>
          </div>
        ) : (
          <Fallback maxWidth={"600px"} />
        )}
        <span style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <button
            className={styles.Button}
            onClick={() => {
              setUpdate(Object(entry));
              setOpenDelete(true);
            }}
          >
            delete
          </button>
          <button
            className={styles.Button}
            onClick={() => {
              setUpdate(Object(entry));
              setOpenUpdate(true);
            }}
          >
            update
          </button>
          <React.Suspense>
            <UpdateEntry
              open={openUpdate}
              onOpenChange={setOpenUpdate}
              visibility={visibility}
              setVisibility={setVisibility}
              userId={userId}
              entry={update}
              allEntries={compareAllEntries}
              callback={refresh}
            />

            <DeleteEntry
              open={openDelete}
              onOpenChange={setOpenDelete}
              userId={userId}
              entry={update}
              callback={refresh}
            />
          </React.Suspense>
        </span>
        <div aria-hidden className={css.p1} />
      </React.Suspense>
    </>
  );
}
