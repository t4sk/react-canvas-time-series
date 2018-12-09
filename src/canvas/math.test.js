// @flow
import {
  linear,
  toCanvasX,
  toCanvasY,
  toX,
  toY,
  nearestStepBelow,
  nearestIndexOf,
} from './math'

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

test("to canvas x", () => {
  const getCanvasX = toCanvasX({
    width: 100,
    left: 10,
    xMin: 0,
    xMax: 10
  })

  expect(getCanvasX(0)).toEqual(10)
  expect(getCanvasX(5)).toEqual(60)
  expect(getCanvasX(10)).toEqual(110)
})

test("to canvas y", () => {
  const getCanvasY = toCanvasY({
    height: 100,
    top: 10,
    yMin: 0,
    yMax: 10
  })

  expect(getCanvasY(0)).toEqual(110)
  expect(getCanvasY(5)).toEqual(60)
  expect(getCanvasY(10)).toEqual(10)
})

test("to x", () => {
  const getX = toX({
    width: 100,
    left: 10,
    xMin: 0,
    xMax: 10
  })

  expect(getX(10)).toEqual(0)
  expect(getX(60)).toEqual(5)
  expect(getX(110)).toEqual(10)
})

test("to y", () => {
  const getY = toY({
    height: 100,
    top: 10,
    yMin: 0,
    yMax: 10
  })

  expect(getY(10)).toEqual(10)
  expect(getY(60)).toEqual(5)
  expect(getY(110)).toEqual(0)
})

test("nearest step", () => {
  expect(nearestStepBelow(1901, 5)).toEqual(1900)
  expect(nearestStepBelow(1904, 5)).toEqual(1900)
  expect(nearestStepBelow(1905, 5)).toEqual(1905)
})

const DATA = [0, 5, 10]

describe("find index of nearest data to x", () => {
  test("should return -1 if data empty", () => {
    expect(nearestIndexOf(2, [])).toEqual(-1)
  })

  test("should return 0 if data length == 1", () => {
    expect(nearestIndexOf(2, [1])).toEqual(0)
  })

  test("should throw if data not sorted by ascending order", () => {
    expect(() => {
      nearestIndexOf(2, [2, 1])
    }).toThrow()
  })

  test("should return index of min", () => {
    expect(nearestIndexOf(2, DATA)).toEqual(0)
  })

  test("should return index of mid", () => {
    expect(nearestIndexOf(3, DATA)).toEqual(1)
    expect(nearestIndexOf(7, DATA)).toEqual(1)
  })

  test("should return index of max", () => {
    expect(nearestIndexOf(8, DATA)).toEqual(2)
  })
})
