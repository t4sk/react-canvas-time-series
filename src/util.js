export function compose(...funcs) {
  return val => funcs.slice().reverse().reduce((v, f) => {
    return f(v)
  }, val)
}
