import React from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { EntryType } from "types/Entry";
import { Observe } from "lib/observer-toggle-visibility";
import { dateFromObjectId } from "lib/dateFromObjectId";

import Fallback from "ui/entry/fallback";
import Error from "ui/entry/error";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const Sort = dynamic(() => import("ui/entry/sort"), { suspense: true });
const Search = dynamic(() => import("ui/entry/search"), { suspense: true });
const SearchFallback = dynamic(() => import("ui/entry/search/fallback"), {
  suspense: true,
});

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [openSort, setOpenSort] = React.useState(false);
  const [sortKey, setSortKey] = React.useState("_id");
  const [sortValue, setSortValue] = React.useState("-1");
  const [sortPlaceholder, setSortPlaceholder] = React.useState("descending");

  const { data: allPublicEntries } = useSWR("/api/entries", fetcher);
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/entries/${index * 6}/${(index + 1) * 6}/${sortKey}/${sortValue}`,
    fetcher
  );

  const entries = data ? [].concat(...data) : [];

  React.useEffect(() => {
    Observe();
    const elem = document.querySelectorAll("#end")[0];
    const observer = new IntersectionObserver(
      async (n) => {
        const last = n[0];
        if (last.isIntersecting) {
          if (entries.length > (size + 1) * 6) {
            return 0;
          }
          setSize(size + 1);
          observer.unobserve(last.target);
        }
      },
      { threshold: 0 }
    );
    if (elem && !isValidating) {
      observer.observe(elem);
    }
  });

  if (error) return <Error />;
  if (!data) return <PageFallback />;
  return (
    <>
      <Head>
        {data ? <title>entries</title> : <title>loading entries...</title>}
      </Head>
      <>
        <div
          style={{
            gap: 10,
          }}
        >
          <React.Suspense>
            <Sort
              open={openSort}
              onOpenChange={setOpenSort}
              sortPlaceholder={sortPlaceholder}
              setSortPlaceholder={setSortPlaceholder}
              setSortKey={setSortKey}
              setSortValue={setSortValue}
            />
          </React.Suspense>
        </div>
        {allPublicEntries ? (
          <React.Suspense>
            <Search data={allPublicEntries} route={`/entry/`} />
          </React.Suspense>
        ) : null}

        <div className={css.entries}>
          {entries ? (
            entries.map((entry: EntryType) => (
              <div key={entry.title} style={{ padding: "1em" }}>
                {/* `hidden` for lib/observer-toggle-visibility */}
                <div className={`${styles.Card} hidden`}>
                  <div
                    className={styles.H2}
                    style={{ fontSize: "2em", position: "relative", bottom: 7 }}
                  >
                    <Link
                      prefetch={false}
                      href={`entry/${entry.title}`}
                      className={styles.Link}
                    >
                      {entry.title}
                    </Link>
                  </div>
                  <p className={css.limiter}>{entry.body}</p>
                  <div
                    style={{ fontSize: ".6em", position: "relative", top: 9 }}
                  >
                    {dateFromObjectId(entry._id).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <DataFallback />
          )}
          {isValidating ? (
            <RefetchFallback />
          ) : (
            <div aria-hidden id="end" style={{ height: 100 }} />
          )}
        </div>
      </>
    </>
  );
}

function DataFallback() {
  return (
    <React.Suspense>
      <div className={css.entries}>
        <Fallback maxWidth="600px" />
        <Fallback maxWidth="600px" />
        <Fallback maxWidth="600px" />
        <Fallback maxWidth="600px" />
        <Fallback maxWidth="600px" />
        <Fallback maxWidth="600px" />
      </div>
    </React.Suspense>
  );
}

function PageFallback() {
  return (
    <React.Suspense>
      <div style={{ paddingTop: 10 }} />
      <button className={css.sortoption} style={{ height: 23, width: 78 }} />
      <SearchFallback />
      <DataFallback />
      <DataFallback />
      <DataFallback />
    </React.Suspense>
  );
}

function RefetchFallback() {
  return (
    <React.Suspense>
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
    </React.Suspense>
  );
}
