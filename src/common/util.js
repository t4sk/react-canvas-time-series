//@flow

export function floor(x: number): number {
  return x ^ 0
}

export function round(x: number): number {
  return (x + 0.5) | 0
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

type LinearTransformerArgs = {
  dx: number,
  dy: number,
  y0: number,
}

export function linearTransformer(
  {dx, dy, y0}: LinearTransformerArgs
): (x: number) => number {
  const df = dy / dx
  return x => df * x + y0
}
