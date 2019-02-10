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

export async function fetch(cache, { xMin, xMax }, opts = {}) {
  const {
    ms = 1000,
    length = 10000,
    yMin = 0,
    yMax = 5000,
  } = opts

  await timeout(ms)

  if (xMin >= cache.xMin && xMax <= cache.xMax) {
    return Object.values(cache.data)
      .filter(d => d.x >= xMin && d.x <= xMax)
      .sort((a, b) => a.x - b.x)
  }

  const data = getRandomData(length, xMin, xMax, yMin, yMax)

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

export function getRandomCandlestickData (xStep, xMin, xMax, yMin, yMax) {
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

export function debounce(func, time) {
  let timeout
  return function(...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), time)
  }
}

export function takeEvery(step = 1, data = []) {
  let arr = []

  for (let i = 0; i < data.length; i += step) {
    arr.push(data[i])
  }
  
  return arr
}
