import {floor, toY} from './util'

test("floor", () => {
  expect(floor(1.9)).toEqual(1)
})

test("convert canvas Y to data point Y", () => {
  // y max
  expect(floor(toY({
    canvasHeight: 250,
    canvasY: 250,
    yMin: 10,
    yMax: 110
  }))).toEqual(110)

  // y min
  expect(floor(toY({
    canvasHeight: 250,
    canvasY: 0,
    yMin: 10,
    yMax: 110
  }))).toEqual(10)

  // between y min and max
  expect(floor(toY({
    canvasHeight: 250,
    canvasY: 125,
    yMin: 10,
    yMax: 110
  }))).toEqual(60)
})
