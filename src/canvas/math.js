// @flow

export function nearestStepBelow (x: number, step: number): number {
  return Math.floor(x / step) * step
}

export function findNearestIndex (
  arr: Array<number>,
  x: number
): {x: number} {
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
    let mid = (low + high) / 2 >> 0

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

type LinearArgs = {
  dx: number,
  dy: number,
  y0: number,
}

export function linear ({ dx, dy, y0 }: LinearArgs): number => number {
  const df = dy / dx
  return x => df * x + y0
}

export function toCanvasX({ width = 0, left = 0, xMin = 0, xMax = 0 }) {
  return linear({
    dy: width,
    dx: xMax - xMin,
    y0: left - width * xMin / (xMax - xMin)
  })
}

export function toCanvasY({ height = 0, top = 0, yMin = 0, yMax = 0 }) {
  return linear({
    dy: -height,
    dx: yMax - yMin,
    y0: top + height * yMax / (yMax - yMin)
  })
}

export function toX({ width = 0, left = 0, xMin = 0, xMax = 0}) {
  return linear({
    dy: xMax - xMin,
    dx: width,
    y0: xMin - (xMax - xMin) / width * left
  })
}

export function toY({ height = 0, top = 0, yMin = 0, yMax = 0 }) {
  return linear({
    dy: yMin - yMax,
    dx: height,
    y0: yMax - (yMin - yMax) / height * top
  })
}

export function isInsideRect(rect, { x, y }) {
  if (!x || x < rect.left || x > rect.left + rect.width) {
    return false
  }

  if (!y || y < rect.top || y > rect.top + rect.height) {
    return false
  }

  return true
}

// TODO rename linear
function _linear(dy, dx, x, y0) {
  return dy / dx * x + y0
}

export function getCanvasX(width, left, xMax, xMin, x) {
  const dx = xMax - xMin

  return _linear(width, dx, x, left - width * xMin / dx)
}

export function getCanvasY(height, top, yMax, yMin, y) {
  const dy = yMax - yMin

  return _linear(-height, dy, y, top + height * yMax / dy)
}

export function getX(width, left, xMax, xMin, canvasX) {
  const dx = xMax - xMin

  return _linear(dx, width, canvasX, xMin - dx / width * left)
}

export function getY(height, top, yMax, yMin, canvasY) {
  const dy = yMax - yMin

  return _linear(-dy, height, canvasY, yMax + dy / height * top)
}
