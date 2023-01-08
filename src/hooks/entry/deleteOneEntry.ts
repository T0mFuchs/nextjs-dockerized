import { EntryType } from "types/Entry";

export async function useDeleteOneEntry(entry: EntryType) {
  await fetch("/api/entry/deleteOne", {
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
}
