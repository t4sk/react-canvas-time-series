export function stepBelow(x: number, step: number): number {
  return x - (x % step)
}

export function findNearestIndex(arr: number[], x: number): number {
  let low = 0
  let high = arr.length - 1

  if (arr.length <= 1) {
    return high
  }

  if (arr[low] > arr[high]) {
    throw "Data must be sorted in ascending order"
  }

  // binary search
  while (low < high) {
    let mid = ((low + high) / 2) >> 0

    if (arr[mid] > x) {
      high = mid
    } else {
      low = mid + 1
    }
  }

  if (arr[low - 1] !== undefined) {
    const midX = (arr[low] + arr[low - 1]) / 2

    if (x < midX) {
      return low - 1
    } else {
      return low
    }
  }

  return low
}

interface Rectangle {
  top: number
  left: number
  width: number
  height: number
}

export function isInside(
  rect: Rectangle,
  point: { x: number; y: number }
): boolean {
  const { x, y } = point

  if (!x || x < rect.left || x > rect.left + rect.width) {
    return false
  }

  if (!y || y < rect.top || y > rect.top + rect.height) {
    return false
  }

  return true
}

export function linear(dy: number, dx: number, x: number, y0: number): number {
  return (dy / dx) * x + y0
}

export function getCanvasX(
  width: number,
  left: number,
  xMax: number,
  xMin: number,
  x: number
): number {
  const dx = xMax - xMin

  return linear(width, dx, x, left - (width * xMin) / dx)
}

export function getCanvasY(
  height: number,
  top: number,
  yMax: number,
  yMin: number,
  y: number
): number {
  const dy = yMax - yMin

  return linear(-height, dy, y, top + (height * yMax) / dy)
}

export function getX(
  width: number,
  left: number,
  xMax: number,
  xMin: number,
  canvasX: number
): number {
  const dx = xMax - xMin

  return linear(dx, width, canvasX, xMin - (dx / width) * left)
}

export function getY(
  height: number,
  top: number,
  yMax: number,
  yMin: number,
  canvasY: number
): number {
  const dy = yMax - yMin

  return linear(-dy, height, canvasY, yMax + (dy / height) * top)
}
