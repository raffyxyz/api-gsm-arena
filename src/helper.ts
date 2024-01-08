export function formatSearch(searchValue: string) {
  return encodeURIComponent(searchValue).replace(/%20/g, "+");
}
