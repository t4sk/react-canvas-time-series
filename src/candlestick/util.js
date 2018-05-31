// @flow
export function floor(x: number): number {
  return x ^ 0
}

type ToYArgs = {
  canvasHeight: number,
  canvasY: number,
  yMin: number,
  yMax: number,
}

// convert canvas y to data point y
export function toY({canvasHeight, canvasY, yMin, yMax}: ToYArgs): number {
  return (yMax - yMin) / canvasHeight * canvasY + yMin
}
