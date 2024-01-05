import type { CanvasElement } from "$lib/store";

export function getBounds(elements: CanvasElement[]) {
  if (elements.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  if (elements.length === 1) {
    return elements[0].rect;
  }
  let x = Math.min(...elements.map((element) => element.bounds.x), Infinity);
  let y = Math.min(...elements.map((element) => element.bounds.y), Infinity);
  let width =
    Math.max(...elements.map((element) => element.bounds.x + element.bounds.width), -Infinity) -
    x;
  let height =
    Math.max(...elements.map((element) => element.bounds.y + element.bounds.height), -Infinity) -
    y;

  return { x, y, width, height };
}