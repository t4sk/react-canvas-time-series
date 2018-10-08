import {getNearestDataAtX} from './index'

const DATA = [{
  x: 0
}, {
  x: 5
}, {
  x: 10
}]

describe("get nearest data at x", () => {
  test("should return min", () => {
    expect(getNearestDataAtX(2, 2, DATA)).toEqual({x: 0})
  })

  test("should return mid", () => {
    expect(getNearestDataAtX(4, 2, DATA)).toEqual({x: 5})
  })

  test("should return max", () => {
    expect(getNearestDataAtX(8, 2, DATA)).toEqual({x: 10})
  })
})
