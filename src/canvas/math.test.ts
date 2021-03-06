import {
  getCanvasX,
  getCanvasY,
  getX,
  getY,
  stepBelow,
  findNearestIndex,
  isInside,
} from "./math"

test("isInside", () => {
  const rect = {
    top: 10,
    left: 20,
    width: 100,
    height: 200,
  }

  expect(isInside(rect, { x: 20, y: 10 })).toBe(true)
  expect(isInside(rect, { x: 120, y: 10 })).toBe(true)
  expect(isInside(rect, { x: 20, y: 210 })).toBe(true)
  expect(isInside(rect, { x: 120, y: 210 })).toBe(true)
  expect(isInside(rect, { x: 70, y: 110 })).toBe(true)

  // test invalid data
  // @ts-ignore
  expect(isInside(rect, {})).toBe(false)
  expect(isInside(rect, { x: 19, y: 10 })).toBe(false)
  expect(isInside(rect, { x: 121, y: 10 })).toBe(false)
  expect(isInside(rect, { x: 20, y: 9 })).toBe(false)
  expect(isInside(rect, { x: 120, y: 211 })).toBe(false)
})

test("get canvas x", () => {
  const width = 100
  const left = 10
  const xMin = 0
  const xMax = 10

  expect(getCanvasX(width, left, xMax, xMin, 0)).toEqual(10)
  expect(getCanvasX(width, left, xMax, xMin, 5)).toEqual(60)
  expect(getCanvasX(width, left, xMax, xMin, 10)).toEqual(110)
})

test("get canvas y", () => {
  const height = 100
  const top = 10
  const yMin = 0
  const yMax = 10

  expect(getCanvasY(height, top, yMax, yMin, 0)).toEqual(110)
  expect(getCanvasY(height, top, yMax, yMin, 5)).toEqual(60)
  expect(getCanvasY(height, top, yMax, yMin, 10)).toEqual(10)
})

test("to x", () => {
  const width = 100
  const left = 10
  const xMin = 0
  const xMax = 10

  expect(getX(width, left, xMax, xMin, 10)).toEqual(0)
  expect(getX(width, left, xMax, xMin, 60)).toEqual(5)
  expect(getX(width, left, xMax, xMin, 110)).toEqual(10)
})

test("to y", () => {
  const height = 100
  const top = 10
  const yMin = 0
  const yMax = 10

  expect(getY(height, top, yMax, yMin, 10)).toEqual(10)
  expect(getY(height, top, yMax, yMin, 60)).toEqual(5)
  expect(getY(height, top, yMax, yMin, 110)).toEqual(0)
})

test("step below", () => {
  expect(stepBelow(1901, 5)).toEqual(1900)
  expect(stepBelow(1904, 5)).toEqual(1900)
  expect(stepBelow(1905, 5)).toEqual(1905)
})

const DATA = [0, 5, 10]

describe("find index of nearest data to x", () => {
  test("should return -1 if data empty", () => {
    expect(findNearestIndex([], 2)).toEqual(-1)
  })

  test("should return 0 if data length == 1", () => {
    expect(findNearestIndex([1], 2)).toEqual(0)
  })

  test("should throw if data not sorted by ascending order", () => {
    expect(() => {
      findNearestIndex([2, 1], 2)
    }).toThrow()
  })

  test("should return index of min", () => {
    expect(findNearestIndex(DATA, 2)).toEqual(0)
  })

  test("should return index of mid", () => {
    expect(findNearestIndex(DATA, 3)).toEqual(1)
    expect(findNearestIndex(DATA, 7)).toEqual(1)
  })

  test("should return index of max", () => {
    expect(findNearestIndex(DATA, 8)).toEqual(2)
  })
})
