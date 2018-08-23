import {round, linearTransformer} from '../util'

function drawHorizontalLines(ctx, props) {
  const {
    yMin,
    yMax,
  } = props

  const width = ctx.canvas.width - props.background.yAxisPaddRight
  const height = ctx.canvas.height - props.background.xAxisPaddBottom
  const interval = height / props.background.numHorizontalIntervals
  const toY = linearTransformer({
    dy: yMax - yMin,
    dx: height,
    y0: yMin,
  })

  for (let i = 1; i < props.background.numHorizontalIntervals; i++) {
    const canvasY = round(i * interval)

    // draw line
    ctx.moveTo(0, canvasY)
    ctx.lineTo(width, canvasY)
    ctx.stroke()

    // draw text
    const y = round(toY((props.background.numHorizontalIntervals - i) * interval))
    ctx.fillText(y, width + 10, canvasY)
  }
}

function drawVerticalLines(ctx, props) {
  const {xMin, xMax} = props

  const width = ctx.canvas.width - props.background.yAxisPaddRight
  const height = ctx.canvas.height - props.background.xAxisPaddBottom
  const interval = width / props.background.numVerticalIntervals
  const toX = linearTransformer({
    dy: xMax - xMin,
    dx: width,
    y0: xMin,
  })

  for (let i = 0; i <= props.background.numVerticalIntervals; i++) {
    const canvasX = round(i * interval)

    // draw line
    ctx.moveTo(canvasX, 0)
    ctx.lineTo(canvasX, height)
    ctx.stroke()

    // draw text
    const x = round(toX(canvasX))
    const date = new Date(x)
    ctx.fillText(
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      canvasX,
      height + 10
    )
  }
}

export function drawBackground(ctx, props) {
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

  drawHorizontalLines(ctx, props)
  drawVerticalLines(ctx, props)
}
