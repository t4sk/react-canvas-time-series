export function getCanvasX(width, xMax, xMin, x) {
  const dx = xMax - xMin
  const y0 = - width * xMin / dx

  return width / dx * x  + y0
}

export function getCanvasY(height, yMax, yMin, y) {
  const dy = yMax - yMin
  const y0 = height * yMax / dy

  return - height / dy * y  + y0
}
