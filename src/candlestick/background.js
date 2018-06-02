//@flow
import {floor, linear} from './util'

export const SCALE_Y_WIDTH = 50
export const SCALE_X_HEIGHT = 50

const NUM_HORIZONTAL_INTERVALS = 6
const NUM_VERTICAL_INTERVALS = 6

type Canvas = any
type Props = {}

type YMetric = {
  yMin: number,
  yMax: number,
}

export function drawHorizontalLines(ctx: Canvas, props: Props, metric: YMetric) {
  const {yMin, yMax} = metric

  const width = ctx.canvas.width - SCALE_Y_WIDTH
  const height = ctx.canvas.height - SCALE_X_HEIGHT
  const interval = floor(height / NUM_HORIZONTAL_INTERVALS)

  for (let i = 0; i <= NUM_HORIZONTAL_INTERVALS; i++) {
    // draw line
    ctx.moveTo(0, i * interval)
    ctx.lineTo(width, i * interval)
    ctx.stroke()

    // draw text
    const y = floor(linear({
      dy: yMax - yMin,
      dx: height,
      x: (NUM_HORIZONTAL_INTERVALS - i) * interval,
      y0: yMin,
    }))
    ctx.fillText(y, width + 10, i * interval)
  }
}

type XMetric = {
  xMin: number,
  xMax: number,
}

export function drawVerticalLines(ctx: Canvas, props: Props, metric: XMetric) {
  const {xMin, xMax} = metric

  const width = ctx.canvas.width - SCALE_Y_WIDTH
  const height = ctx.canvas.height - SCALE_X_HEIGHT
  const interval = floor(width / NUM_VERTICAL_INTERVALS)

  for (let i = 0; i <= NUM_VERTICAL_INTERVALS; i++) {
    // draw line
    ctx.moveTo(i * interval, 0)
    ctx.lineTo(i * interval, height)
    ctx.stroke()

    // draw text
    const x = floor(linear({
      dy: xMax - xMin,
      dx: width,
      x: i * interval,
      y0: xMin,
    }))
    ctx.fillText(x, i * interval, height + 10)
  }
}
