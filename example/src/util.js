export function rand(min, max) {
  return Math.random() * (max - min) + min
}

export function getRandomData(xStep, xMin, xMax, yMin, yMax) {
  const x0 = Math.round(xMin / xStep) * xStep

  let data = []
  for (let x = x0; x <= xMax; x += xStep) {
    data.push({
      x,
      y: rand(yMin, yMax),
    })
  }

  data.sort((a, b) => a.x - b.x)

  return data
}

export function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export async function fetch(cache, { xMin, xMax }, opts = {}) {
  const { ms = 1000, yMin = 0, yMax = 5000, xStep = 3600 * 6 } = opts

  await timeout(ms)

  if (xMin >= cache.xMin && xMax <= cache.xMax) {
    return Object.values(cache.data)
      .filter(d => d.x >= xMin && d.x <= xMax)
      .sort((a, b) => a.x - b.x)
  }

  const data = getRandomData(xStep, xMin, xMax, yMin, yMax)

  cache.xMin = Math.min(cache.xMin, xMin)
  cache.xMax = Math.max(cache.xMax, xMax)

  for (let d of data) {
    if (!cache.data[d.x]) {
      cache.data[d.x] = d
    }
  }

  return Object.values(cache.data)
    .filter(d => d.x >= xMin && d.x <= xMax)
    .sort((a, b) => a.x - b.x)
}

export function getRandomCandlestickData(xStep, xMin, xMax, yMin, yMax) {
  let data = []

  const length = Math.round((xMax - xMin) / xStep)

  let high = rand(yMin, yMax)
  let low = rand(yMin, high)

  for (let i = 0; i < length; i++) {
    if (Math.random() > 0.5) {
      high += rand(0, (yMax - yMin) * 0.1)
      low += rand(0, (yMax - yMin) * 0.1)

      high = Math.min(high, yMax)
      low = Math.min(low, yMax)
    } else {
      high -= rand(0, (yMax - yMin) * 0.1)
      low -= rand(0, (yMax - yMin) * 0.1)

      high = Math.max(high, yMin)
      low = Math.max(low, yMin)
    }

    const open = rand(low, high)
    const close = rand(low, high)

    data.push({
      high,
      low,
      open,
      close,
      volume: rand(0, yMax),
      timestamp: xMin + xStep * i,
    })
  }

  return data
}
