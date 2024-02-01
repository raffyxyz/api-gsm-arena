export function formatSearch(searchValue: string) {
  return encodeURIComponent(searchValue).replace(/%20/g, "+");
}

export function formatIdImage(id: string) {
  // Find the index of the last hyphen (-) in the filename
  const hyphenIndex = id.lastIndexOf("-");

  // Extract the base filename (before the last hyphen) and the extension
  const baseFilename = id.substring(0, hyphenIndex);
  const extension = id.substring(hyphenIndex + 1);

  // Concatenate the parts to create the new filename with "pictures" added
  const newFilename = `${baseFilename}-pictures-${extension}`;

  return newFilename;
}
