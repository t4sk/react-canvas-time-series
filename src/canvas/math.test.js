// @flow
import {
  floor,
  round,
  linear,
  nearestStepBelow,
  getNearestDataAtX,
} from './math'

test("floor", () => {
  expect(floor(1.9)).toEqual(1)
})

describe("round", () => {
  test("up", () => {
    expect(round(1.5)).toEqual(2)
  })

  test("down", () => {
    expect(round(1.4)).toEqual(1)
  })
})

test("linear", () => {
  const toY = linear({
    dy: 100,
    dx: 250,
    y0: 10,
  })

  expect(toY(250)).toEqual(110)
  expect(toY(0)).toEqual(10)
  expect(toY(125)).toEqual(60)
})

test("nearest step", () => {
  expect(nearestStepBelow(1901, 5)).toEqual(1900)
  expect(nearestStepBelow(1904, 5)).toEqual(1900)
  expect(nearestStepBelow(1905, 5)).toEqual(1905)
})

const DATA = [{
  x: 0
}, {
  x: 5
}, {
  x: 10
}]

describe("get nearest data at x", () => {
  test("should return min", () => {
    expect(getNearestDataAtX(2, DATA)).toEqual({x: 0})
  })

  test("should return mid", () => {
    expect(getNearestDataAtX(3, DATA)).toEqual({x: 5})
    expect(getNearestDataAtX(7, DATA)).toEqual({x: 5})
  })

  test("should return max", () => {
    expect(getNearestDataAtX(8, DATA)).toEqual({x: 10})
  })
})
