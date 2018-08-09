//@flow
import {round, linearTransformer} from './util'

// TODO should be defined in index.js
export const NUM_HORIZONTAL_INTERVALS = 6
export const NUM_VERTICAL_INTERVALS = 6

function drawHorizontalLines(ctx, props, metric) {
  const {yMin, yMax, maxVolume} = metric

  // TODO define candlestick and barchart height in index.js
  const {
    volumeBarChart
  } = props
  const width = ctx.canvas.width - props.background.yAxisPaddRight
  const height = ctx.canvas.height - volumeBarChart.height - props.background.xAxisPaddBottom
  const interval = height / NUM_HORIZONTAL_INTERVALS
  const toY = linearTransformer({
    dy: yMax - yMin,
    dx: height,
    y0: yMin,
  })

  for (let i = 1; i < NUM_HORIZONTAL_INTERVALS; i++) {
    const canvasY = round(i * interval)

    // draw line
    ctx.moveTo(0, canvasY)
    ctx.lineTo(width, canvasY)
    ctx.stroke()

    // draw text
    const y = round(toY((NUM_HORIZONTAL_INTERVALS - i) * interval))
    ctx.fillText(y, width + 10, canvasY)
  }

  // draw max volume line
  const canvasY = round(NUM_HORIZONTAL_INTERVALS * interval)
  ctx.moveTo(0, canvasY)
  ctx.lineTo(width, canvasY)
  ctx.stroke()

  ctx.fillText(maxVolume, width + 10, canvasY)
}

type XMetric = {
  xMin: number,
  xMax: number,
}

function drawVerticalLines(ctx, props, metric) {
  const {xMin, xMax} = metric

  const width = ctx.canvas.width - props.background.yAxisPaddRight
  const height = ctx.canvas.height - props.background.xAxisPaddBottom
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

export function drawBackground(ctx, props, metric) {
  ctx.fillStyle = "lightgrey"
  ctx.fillRect(
    0, 0,
    ctx.canvas.width,
    ctx.canvas.height,
  )

  ctx.fillStyle = "white" || props.background.color
  ctx.fillRect(
    0, 0,
    ctx.canvas.width - props.background.yAxisPaddRight,
    ctx.canvas.height - props.background.xAxisPaddBottom,
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
