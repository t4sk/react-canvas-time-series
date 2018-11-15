// @flow

export function floor (x: number): number {
  return x ^ 0
}

export function round (x: number): number {
  return (x + 0.5) | 0
}

export function nearestStepBelow (x: number, step: number): number {
  return Math.floor(x / step) * step
}

// TODO test
export function findIndexOfNearestData (
  x: number,
  data: Array<{number}>
): {x: number} {
  let low = 0;
  let high = data.length - 1

  if (data.length <= 1) {
    return high
  }

  if (data[low] > data[high]) {
    throw "Data must be sorted in ascending order"
  }

  // binary search
  while (low < high) {
    let mid = (low + high) / 2 >> 0

    if (data[mid] > x) {
      high = mid
    } else {
      low = mid + 1
    }
  }

  if (data[low - 1]) {
    const midX = (data[low] + data[low - 1]) / 2

    if (x < midX) {
      return low - 1
    } else {
      return low
    }
  }

  return low
}

export function getNearestDataAtX (
  x: number,
  data: Array<{x: number}>
): {x: number} {
  console.log("deprecated: getNearestDataAtX, use findIndexOfNearestData")
  let low = 0;
  let high = data.length - 1

  // binary search
  while (low < high) {
    let mid = (low + high) / 2 >> 0

    if (data[mid].x > x) {
      high = mid
    } else {
      low = mid + 1
    }
  }

  if (data[low - 1]) {
    const midX = (data[low].x + data[low - 1].x) / 2

    if (x < midX) {
      return data[low - 1]
    } else {
      return data[low]
    }
  }

  return data[low]
}

type LinearArgs = {
  dx: number,
  dy: number,
  y0: number,
}

export function linear ({ dx, dy, y0 }: LinearArgs): number => number {
  const df = dy / dx
  return x => df * x + y0
}
