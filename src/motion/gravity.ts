export interface Point { x: number; y: number }
export interface AttractionVector { x: number; y: number; distance: number; angle: number }

export function attractionVector(origin: Point, target: Point): AttractionVector {
  const x = target.x - origin.x;
  const y = target.y - origin.y;
  return {
    x,
    y,
    distance: Math.hypot(x, y),
    angle: Math.atan2(y, x) * (180 / Math.PI),
  };
}

export function rectCenter(rect: DOMRect): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}
