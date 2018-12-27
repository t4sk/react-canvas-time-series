export function merge (obj1 = {}, obj2 = {}) {
  const keys1 = new Set(Object.keys(obj1))
  const keys2 = new Set(Object.keys(obj2))

  const intersection = [...new Set([...keys1].filter(k => keys2.has(k))).keys()]
    .filter(k => obj2[k] !== null && typeof obj2[k] === 'object')

  return {
    ...obj1,
    ...obj2,
    ...intersection.reduce((merged, k) => {
      merged[k] = merge(obj1[k], obj2[k])
      return merged
    }, {})
  }
}

export function rand (min, max) {
  return Math.random() * (max - min) + min
}

export function randInt (min, max) {
  return Math.floor(rand(min, max))
}

export function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export async function fakeFetch(data, ms) {
  await timeout(ms)
  return data
}

export function getRandomData(length, xMin, xMax, yMin, yMax) {
  let data = []
  for (let i = 0; i < length; i++) {
    data.push({
      x: rand(xMin, xMax),
      y: rand(yMin, yMax)
    })
  }

  data.sort((a, b) => a.x - b.x)

  return data
}

export function generateRandomCandlestickData (length, xMin, xMax, yMin, yMax) {
  let data = []

  const xStep = (xMax - xMin) / length

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
      timestamp: xStep * i,
    })
  }

  return data
}

export function debounce(func, time) {
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), time)
  }
}
