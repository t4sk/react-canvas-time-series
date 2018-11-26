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
