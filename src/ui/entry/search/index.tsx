// @ts-nocheck
import React from "react";
import Link from "next/link";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CrossSVG, SearchSVG } from "ui";
import type { EntryType } from "types/Entry";

import css from "./index.module.scss";

export default function Search({ data, route }: { data: EntryType[], route: string }) {
  const [current, setCurrent] = React.useState("");
  const [show, setShow]: any = React.useState([]);
  const [filtered, setFiltered]: any = React.useState([]);

  const includesCaseInsensitive = (searched: string, searchString: string) => {
    return new RegExp(searchString, "i").test(searched); // setting "i" flag to ignore case sensitivity
  };

  const handleInput = (event: any) => {
    const current = event.target.value;
    setCurrent(current);
    const filteredTitle = data.filter((entry: EntryType) => {
      return includesCaseInsensitive(entry.title, current);
    });
    const filteredBody = data.filter((entry: EntryType) => {
      return includesCaseInsensitive(entry.body, current);
    });
    if (current === "") {
      setFiltered([]);
      setShow([]);
    } else {
      setFiltered(filteredTitle);
      setShow(filteredBody);
    }
  };

  return (
    <span className={css.span}>
      <div className={css.wrapper}>
        <>
          <input
            onChange={handleInput}
            className={css.input}
            type="text"
            value={current}
            placeholder="search all entries"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setCurrent("");
                setShow([]);
                setFiltered([]);
              }
            }}
          />
          <button
            className={css.current}
            onClick={() => {
              setCurrent("");
              setShow([]);
              setFiltered([]);
            }}
          >
            {current === "" ? <SearchIcon /> : <CloseIcon />}
          </button>
        </>
        {filtered.length !== 0 ? (
          <div className={css.output}>
            {filtered.map((entry: EntryType) => (
              <div key={entry.title} style={{ padding: "1em 1.5em 0 1em" }}>
                <div className={css.Card}>
                  <Link
                    href={`${route}${entry.title}`}
                    prefetch={false}
                    className={`${css.item}`}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          current.length > 0
                            ? entry.title.replace(
                                new RegExp(current, "gi"),
                                (match) => {
                                  return `<span class="${css.highlight}">${match}</span>`;
                                }
                              )
                            : entry.title,
                      }}
                    />
                  </Link>
                  {show.length !== 0 ? (
                    <div
                      className={css.body}
                      dangerouslySetInnerHTML={{
                        __html:
                          current.length > 0
                            ? entry.body.replace(
                                new RegExp(current, "gi"),
                                (match) => {
                                  return `<span class="${css.highlight}">${match}</span>`;
                                }
                              )
                            : entry.body,
                      }}
                    />
                  ) : null}
                  <span className={css.span}>
                    {dateFromObjectId(entry._id).toLocaleDateString()}
                  </span>
                  <div style={{ paddingBottom: 7 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </span>
  );
}

function SearchIcon() {
  return (
    <div className={css.icon}>
      <SearchSVG />
    </div>
  );
}

function CloseIcon() {
  return (
    <div className={css.icon} style={{ top: -3, left: -15 }}>
      <CrossSVG />
    </div>
  );
}
