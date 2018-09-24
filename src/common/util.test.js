// @flow
import {floor, round, linear, linearTransformer} from './util'

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
  // y max
  expect(floor(linear({
    dy: 100,
    dx: 250,
    x: 250,
    y0: 10,
  }))).toEqual(110)

  // y min
  expect(floor(linear({
    dy: 100,
    dx: 250,
    x: 0,
    y0: 10,
  }))).toEqual(10)

  // between y min and max
  expect(floor(linear({
    dy: 100,
    dx: 250,
    x: 125,
    y0: 10,
  }))).toEqual(60)
})

test("linear transformer", () => {
  const toY = linearTransformer({
    dy: 100,
    dx: 250,
    y0: 10,
  })

  expect(toY(250)).toEqual(110)
  expect(toY(0)).toEqual(10)
  expect(toY(125)).toEqual(60)
})
