export function stepBelow(x, step) {
  return x - (x % step)
}

export function findNearestIndex(arr, x) {
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

export function isInsideRect(rect, { x, y }) {
  if (!x || x < rect.left || x > rect.left + rect.width) {
    return false
  }

  if (!y || y < rect.top || y > rect.top + rect.height) {
    return false
  }

  return true
}

function linear(dy, dx, x, y0) {
  return (dy / dx) * x + y0
}

export function getCanvasX(width, left, xMax, xMin, x) {
  const dx = xMax - xMin

  return linear(width, dx, x, left - (width * xMin) / dx)
}

export function getCanvasY(height, top, yMax, yMin, y) {
  const dy = yMax - yMin

  return linear(-height, dy, y, top + (height * yMax) / dy)
}

export function getX(width, left, xMax, xMin, canvasX) {
  const dx = xMax - xMin

  return linear(dx, width, canvasX, xMin - (dx / width) * left)
}

export function getY(height, top, yMax, yMin, canvasY) {
  const dy = yMax - yMin

  return linear(-dy, height, canvasY, yMax + (dy / height) * top)
}
