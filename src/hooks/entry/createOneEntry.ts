import type { EntryType } from "types/Entry";

export async function useCreateOneEntry(entry: EntryType) {
  await fetch(`/api/entry/createOne`, {
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}
