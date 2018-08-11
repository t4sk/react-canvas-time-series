export function floor(x) {
  return x ^ 0
}

export function round(x) {
  return (x + 0.5) | 0
}

export function linear({dx, dy, x, y0}) {
  return dy / dx * x + y0
}

export function linearTransformer({dx, dy, y0}) {
  const df = dy / dx
  return x => df * x + y0
}
