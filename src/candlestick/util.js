// @flow
export function floor(x: number): number {
  return x ^ 0
}

type LinearArgs = {
  dx: number,
  dy: number,
  x: number,
  y0: number,
}

export function linear({dx, dy, x, y0}: LinearArgs): number {
  return dy / dx * x + y0
}

// TODO flow
// TODO test
export function linearTransformer({dx, dy, y0}) {
  const df = dy / dx
  return x => df * x + y0
}
