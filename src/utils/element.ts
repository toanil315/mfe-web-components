export function getTarget(value: string | Element): Element | null {
  if (typeof value === "string") {
    return document.getElementById(value) as Element;
  } else if (value instanceof Element) {
    return value;
  }

  return null;
}
