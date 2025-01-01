export function decodeSvgDataUri(dataUri: string) {
  // Remove the "data:image/svg+xml," prefix
  const base64Index = dataUri.indexOf(",");
  const encodedSvg = dataUri.slice(base64Index + 1);

  // Decode the encoded SVG content
  const decodedSvg = decodeURIComponent(encodedSvg);

  return decodedSvg;
}
