import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CheckSVG, CreateSVG, CrossSVG, UpdateSVG } from "ui";

import type { Fetcher } from "swr";
import type { UserType } from "types/User";
import type { EntryType } from "types/Entry";
import type { PanInfo } from "framer-motion";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const Flicker = dynamic(() => import("ui/animated/flicker"), {
  suspense: true,
});

const Separator = dynamic(() => import("ui/radix-ui/separator"), {
  suspense: true,
});

const Fallback = dynamic(() => import("ui/entry/fallback"), {
  suspense: true,
});

const Settings = dynamic(() => import("ui/page/settings"), {
  suspense: true,
});

const Sort = dynamic(() => import("ui/entry/sort"), {
  suspense: true,
});

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  ssr: false,
});

const CreateEntry = dynamic(() => import("ui/entry/create"), {
  suspense: true,
});

const UpdateEntry = dynamic(() => import("ui/entry/update"), {
  suspense: true,
});

const DeleteEntry = dynamic(() => import("ui/entry/delete"), {
  suspense: true,
});

const Search = dynamic(() => import("ui/entry/search"), { suspense: true });

const SearchFallback = dynamic(() => import("ui/entry/search/fallback"), {
  suspense: true,
});

const entriesFetcher: Fetcher<EntryType[], string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

const userFetcher: Fetcher<UserType, string> = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [sortKey, setSortKey] = React.useState("_id");
  const [sortValue, setSortValue] = React.useState("-1");
  const [sortPlaceholder, setSortPlaceholder] = React.useState("descending");
  const [openSort, setOpenSort] = React.useState(false);

  //? set current entry
  const [update, setUpdate]: any = React.useState(null);
  const [visibility, setVisibility] = React.useState(false);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [openSettings, setOpenSettings] = React.useState(false);

  const { push } = useRouter();

  const { data: user } = useSWR(
    `/api/user/with-session`,
    userFetcher,
    {
      loadingTimeout: 1500,
      onLoadingSlow: () => <div className={css.center}>cluster starting...</div>,
    }
  );
  const {
    data: entries,
    mutate,
    isValidating,
  } = useSWR(
    user ? `/api/${user._id}/entries/${sortKey}/${sortValue}` : null,
    entriesFetcher
  );

  if (user && !user.emailVerified) {
    setTimeout(() => push("/auth/new-user"), 1500);
    return (
      <React.Suspense>
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

  return (
    <>
      <Head>
        {user ? (
          <title>Hello, {user.name}</title>
        ) : (
          <title>not signed in</title>
        )}
      </Head>
      <>
        {user ? (
          <React.Suspense>
            <div className={css.wrapper}>
              <div style={{ paddingTop: "1em" }}>Hello, {user.name}</div>
              <div className={css.topright}>
                <Settings
                  open={openSettings}
                  onOpenChange={setOpenSettings}
                  user={user}
                />
              </div>
              <Separator orientation="horizontal" />
              <button
                className={styles.Button}
                style={{ padding: "0 6px" }}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                <div style={{ position: "relative", top: 4, fontSize: 40 }}>
                  <CreateSVG />
                </div>
              </button>
            </div>
            <div style={{ maxWidth: 350, margin: "auto", paddingTop: 15 }}>
              <Separator
                orientation="horizontal"
                style={{ margin: "1em auto" }}
              />
              {!isValidating && entries ? (
                <React.Suspense>
                  <CreateEntry
                    open={openCreate}
                    onOpenChange={setOpenCreate}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    userId={user._id}
                    allEntries={entries}
                    callback={mutate}
                  />

                  <DeleteEntry
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    entry={update}
                    userId={user._id}
                    callback={mutate}
                  />

                  <UpdateEntry
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    userId={user._id}
                    entry={update}
                    allEntries={entries}
                    callback={mutate}
                  />

                  <span>
                    <Sort
                      open={openSort}
                      onOpenChange={setOpenSort}
                      sortPlaceholder={sortPlaceholder}
                      setSortPlaceholder={setSortPlaceholder}
                      setSortKey={setSortKey}
                      setSortValue={setSortValue}
                    />

                    <Search data={entries} />
                  </span>

                  {entries.map((entry: EntryType) => (
                    <div key={entry.title} style={{ padding: "1em" }}>
                      <React.Suspense>
                        {!isValidating ? (
                          <>
                            <div
                              aria-label="drag action icon delete"
                              style={{
                                position: "absolute",
                                fontSize: "4em",
                                paddingTop: 14,
                                paddingLeft: 200,
                                zIndex: -1,
                              }}
                            >
                              <CrossSVG />
                            </div>
                            <div
                              aria-label="drag action icon edit"
                              style={{
                                position: "absolute",
                                fontSize: "4.5em",
                                paddingTop: 19,
                                paddingLeft: 50,
                                zIndex: -1,
                              }}
                            >
                              <UpdateSVG />
                            </div>
                          </>
                        ) : null}
                        <MotionDiv
                          className={styles.Card}
                          drag="x"
                          dragConstraints={{
                            left: -100,
                            right: 100,
                          }}
                          dragElastic={0.1}
                          dragSnapToOrigin
                          onDragEnd={(event: any, info: PanInfo) => {
                            if (info.offset.x > 200) {
                              setUpdate(entry);
                              setOpenUpdate(true);
                            }
                            if (info.offset.x < -200) {
                              setUpdate(entry);
                              setOpenDelete(true);
                            }
                          }}
                        >
                          <div
                            className={styles.H2}
                            style={{
                              fontSize: "2em",
                              position: "relative",
                              bottom: 7,
                            }}
                            aria-label="entry title"
                          >
                            <Link
                              prefetch={false}
                              href={`/${user._id}/entry/${entry.title}`}
                              className={styles.Link}
                              title={entry.title}
                            >
                              {entry.title}
                            </Link>
                          </div>
                          <p aria-label="entry body" className={css.limiter}>
                            {entry.body}
                          </p>
                          <div
                            aria-label="entry date"
                            style={{
                              fontSize: ".6em",
                              position: "relative",
                              top: 9,
                            }}
                          >
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
                      </React.Suspense>
                    </div>
                  ))}
                </React.Suspense>
              ) : (
                <React.Suspense>
                  <div style={{ paddingTop: 15, paddingBottom: 10 }}>
                    <button className={css.sortoption} disabled>
                      descending
                    </button>
                  </div>
                  <SearchFallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                </React.Suspense>
              )}
            </div>
            <div aria-hidden style={{ padding: "1em" }} />
          </React.Suspense>
        ) : (
          <React.Suspense>
            <Flicker className={css.center} text="sign in for more">
              <Link
                prefetch={false}
                href="/auth/signin"
                className={styles.Link}
                style={{ textDecoration: "none" }}
                title="sign in"
              >
                sign in for more
              </Link>
            </Flicker>
          </React.Suspense>
        )}
      </>
    </>
  );
}
