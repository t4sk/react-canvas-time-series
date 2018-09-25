import { round, linear } from './util'

function getYAxisTextAlign (props) {
  switch (props.y.axis.at) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getYAxisCanvasX (props) {
  switch (props.y.axis.at) {
    case 'left':
      return props.y.axis.width
    case 'right':
      return 0
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getLabelCanvasX (props) {
  switch (props.y.axis.at) {
    case 'left':
      return props.y.axis.width - 10
    case 'right':
      return props.width - props.y.axis.width + 10
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function drawYLines (ctx, props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.strokeStyle = props.y.line.color

  // style labels
  ctx.font = props.y.axis.label.font
  ctx.fillStyle = props.y.axis.label.color
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const width = props.width - props.y.axis.width
  const height = props.height - props.x.axis.height - (props.margin.top + props.margin.bottom)
  const interval = height / props.y.intervals
  const toY = linear({
    dy: yMax - yMin,
    dx: height,
    y0: yMin
  })

  const yAxisCanvasX = getYAxisCanvasX(props)
  const labelCanvasX = getLabelCanvasX(props)

  for (let i = 0; i <= props.y.intervals; i++) {
    const canvasY = round(i * interval) + props.margin.top

    // draw line
    ctx.moveTo(yAxisCanvasX, canvasY)
    ctx.lineTo(yAxisCanvasX + width, canvasY)
    ctx.stroke()

    // draw text
    const y = round(toY((props.y.intervals - i) * interval))
    ctx.fillText(props.y.axis.label.render(y), labelCanvasX, canvasY)
  }
}

export function draw (ctx, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(
    0, 0,
    ctx.canvas.width,
    ctx.canvas.height
  )

  // style lines
  ctx.lineWidth = 1

  drawYLines(ctx, props)
}
