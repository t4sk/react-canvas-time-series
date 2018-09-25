// @flow
import {floor, round, linear} from './math'

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
