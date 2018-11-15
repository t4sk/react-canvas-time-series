// @flow
import {
  floor,
  round,
  linear,
  nearestStepBelow,
  findIndexOfNearestData,
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

const DATA = [0, 5, 10]

describe("find index of nearest data to x", () => {
  test("should return -1 if data empty", () => {
    expect(findIndexOfNearestData(2, [])).toEqual(-1)
  })

  test("should return 0 if data length == 1", () => {
    expect(findIndexOfNearestData(2, [1])).toEqual(0)
  })

  test("should throw if data not sorted by ascending order", () => {
    expect(() => {
      findIndexOfNearestData(2, [2, 1])
    }).toThrow()
  })

  test("should return index of min", () => {
    expect(findIndexOfNearestData(2, DATA)).toEqual(0)
  })

  test("should return index of mid", () => {
    expect(findIndexOfNearestData(3, DATA)).toEqual(1)
    expect(findIndexOfNearestData(7, DATA)).toEqual(1)
  })

  test("should return index of max", () => {
    expect(findIndexOfNearestData(8, DATA)).toEqual(2)
  })
})
