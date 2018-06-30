//@flow
import {round, linearTransformer} from './util'

export const SCALE_Y_WIDTH = 50
export const SCALE_X_HEIGHT = 50

export const NUM_HORIZONTAL_INTERVALS = 8
export const NUM_VERTICAL_INTERVALS = 6

type Canvas = any
type Props = {
  backgroundColor: string
}

type YMetric = {
  yMin: number,
  yMax: number,
}

function drawHorizontalLines(ctx: Canvas, props: Props, metric: YMetric) {
  const {yMin, yMax} = metric

  const width = ctx.canvas.width - SCALE_Y_WIDTH
  const height = ctx.canvas.height - SCALE_X_HEIGHT
  const interval = height / NUM_HORIZONTAL_INTERVALS
  const toY = linearTransformer({
    dy: yMax - yMin,
    dx: height,
    y0: yMin,
  })

  // skip last 2 lines where bar chart is rendered
  for (let i = 0; i <= NUM_HORIZONTAL_INTERVALS - 2; i++) {
    const canvasY = round(i * interval)

    // draw line
    ctx.moveTo(0, canvasY)
    ctx.lineTo(width, canvasY)
    ctx.stroke()

    // draw text
    const y = round(toY((NUM_HORIZONTAL_INTERVALS - i) * interval))
    ctx.fillText(y, width + 10, canvasY)
  }
}

type XMetric = {
  xMin: number,
  xMax: number,
}

function drawVerticalLines(ctx: Canvas, props: Props, metric: XMetric) {
  const {xMin, xMax} = metric

  const width = ctx.canvas.width - SCALE_Y_WIDTH
  const height = ctx.canvas.height - SCALE_X_HEIGHT
  const interval = width / NUM_VERTICAL_INTERVALS
  const toX = linearTransformer({
    dy: xMax - xMin,
    dx: width,
    y0: xMin,
  })

  for (let i = 0; i <= NUM_VERTICAL_INTERVALS; i++) {
    const canvasX = round(i * interval)

    // draw line
    ctx.moveTo(canvasX, 0)
    ctx.lineTo(canvasX, height)
    ctx.stroke()

    // draw text
    const x = round(toX(canvasX))
    ctx.fillText(x, canvasX, height + 10)
  }
}

type Metric = {
  xMin: number,
  xMax: number,
  xInterval: number,
  yMin: number,
  yMax: number,
}

export function drawBackground(ctx: Canvas, props: Props, metric: Metric) {
  ctx.fillStyle = "lightgrey"
  ctx.fillRect(
    0, 0,
    ctx.canvas.width,
    ctx.canvas.height,
  )

  ctx.fillStyle = "white" || props.backgroundColor
  ctx.fillRect(
    0, 0,
    ctx.canvas.width - SCALE_Y_WIDTH,
    ctx.canvas.height - SCALE_X_HEIGHT,
  )

  // style lines
  ctx.lineWidth = 1
  ctx.strokeStyle = "lightgrey"

  // style labels
  ctx.font = "12px Arial"
  ctx.fillStyle = "black"
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"

  drawHorizontalLines(ctx, props, metric)
  drawVerticalLines(ctx, props, metric)
}
