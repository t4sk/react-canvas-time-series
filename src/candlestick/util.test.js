import {floor, linear} from './util'

test("floor", () => {
  expect(floor(1.9)).toEqual(1)
})

test("convert canvas Y to data point Y", () => {
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
