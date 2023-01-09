import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";

import { useRouter } from "next/router";
import { dateFromObjectId } from "lib/dateFromObjectId";
import Fallback from "ui/entry/fallback";

import type { Fetcher } from "swr";
import type { EntryType } from "types/Entry";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";
import { UserType } from "types/User";

const Flicker = dynamic(() => import("ui/animated/flicker"), {
  suspense: true,
});

const UpdateEntry = dynamic(() => import("ui/entry/update"), {
  suspense: true,
});

const DeleteEntry = dynamic(() => import("ui/entry/delete"), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  return { props: { title } };
};

// todo :: fix page initial loading fallback background is off

const userFetcher: Fetcher<UserType, string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

const entryFetcher: Fetcher<EntryType, string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

const entriesFetcher: Fetcher<EntryType[], string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page({ title }: { title: string }) {
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  //? set current entry
  const [update, setUpdate]: any = React.useState();
  const [visibility, setVisibility] = React.useState(true);

  const { push } = useRouter();

  const {
    data: entry,
    mutate,
    error,
  } = useSWR(`/api/entry/${title}`, entryFetcher);
  const { data: compareAllEntries } = useSWR(
    update ? "/api/entries" : null,
    entriesFetcher
  );
  const { data: user, isLoading } = useSWR(
    "/api/user/with-session",
    userFetcher
  );

  const refresh = () => {
    if (visibility) {
      push("/entries");
    }
    mutate();
  };

  if (error) return <>error</>;
  return (
    <>
      <Head>
        <title>entry/{title}</title>
      </Head>
      <>
        {entry ? (
          <div className={css.p1}>
            <div className={styles.Card}>
              <h2
                className={`${styles.H2} ${css.Title}`}
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
            </div>
          </div>
        ) : (
          <Fallback maxWidth={"600px"} />
        )}
        {user && entry && user._id === entry.author ? (
          <>
            <span
              style={{ display: "flex", justifyContent: "center", gap: 10 }}
            >
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
              {compareAllEntries ? (
                <React.Suspense>
                  <UpdateEntry
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    userId={user._id}
                    entry={update}
                    allEntries={compareAllEntries}
                    callback={refresh}
                  />

                  <DeleteEntry
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    userId={user._id}
                    entry={update}
                    callback={refresh}
                  />
                </React.Suspense>
              ) : null}
            </span>
          </>
        ) : null}
        {!user && !isLoading ? ( //* user is not signed in //
          <React.Suspense>
            <Flicker style={{}} text="sign in">
              <Link
                prefetch={false}
                href="/auth/signin"
                className={styles.Link}
                style={{ textDecoration: "none" }}
                title="sign in"
              >
                sign in
              </Link>
            </Flicker>
          </React.Suspense>
        ) : null}
        <div aria-hidden className={css.p1} />
      </>
    </>
  );
}
