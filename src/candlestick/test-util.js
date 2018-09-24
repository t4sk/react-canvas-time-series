export function rand (min, max) {
  return Math.random() * (max - min) + min
}

export function randInt (min, max) {
  return Math.floor(rand(min, max))
}
