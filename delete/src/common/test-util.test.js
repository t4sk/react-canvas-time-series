// @flow
import {merge} from './test-util'

test("merge", () => {
  expect(merge({
    a: 1,
    b: 2,
    d: {
      e: 3,
      f: 4,
      g: 5,
      i: {
        j: 6,
        k: 7,
      }
    },
  }, {
    a: 10,
    c: 11,
    d: {
      e: 12,
      g: 13,
      h: 14,
      i: {
        j: 15,
        l: 16,
      }
    },
  })).toEqual({
    a: 10,
    b: 2,
    c: 11,
    d: {
      e: 12,
      f: 4,
      g: 13,
      h: 14,
      i: {
        j: 15,
        k: 7,
        l: 16,
      }
    }
  })
})
