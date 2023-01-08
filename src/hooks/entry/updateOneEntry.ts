import type { EntryType } from "types/Entry";

export async function useUpdateOneEntry(entry: EntryType) {
  await fetch("/api/entry/updateOne", {
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
}
