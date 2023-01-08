export function dateFromObjectId(id: any): Date {
  return new Date(parseInt(id.substring(0, 8), 16) * 1000);
}
