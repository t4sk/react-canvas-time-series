//@flow
import {round, linear} from './util'

function getYAxisTextAlign(props) {
  switch(props.y.axis.at) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getYAxisCanvasX(props) {
  switch(props.y.axis.at) {
    case 'left':
      return props.y.axis.width
    case 'right':
      return 0
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function drawYLines(ctx, props) {
  const {
    yMin,
    yMax,
  } = props

  // style line
  ctx.strokeStyle = props.y.line.color

  // style labels
  ctx.font = props.y.axis.label.font
  ctx.fillStyle = props.y.axis.label.color
  ctx.textBaseline = "middle"
  ctx.textAlign = getYAxisTextAlign(props)

  const width = ctx.canvas.width - props.y.axis.width
  const height = ctx.canvas.height - props.x.axis.height
  const interval = height / props.y.intervals
  const toY = linear({
    dy: yMax - yMin,
    dx: height,
    y0: yMin,
  })

  const canvasX = getYAxisCanvasX(props)

  for (let i = 0; i <= props.y.intervals; i++) {
    const canvasY = round(i * interval)

    // draw line
    ctx.moveTo(canvasX, canvasY)
    ctx.lineTo(canvasX + width, canvasY)
    ctx.stroke()

    // draw text
    const y = round(toY((props.y.intervals - i) * interval))
    ctx.fillText(props.y.axis.label.render(y), canvasX - 10, canvasY)
  }
}

export function draw(ctx, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(
    0, 0,
    ctx.canvas.width,
    ctx.canvas.height,
  )

  // style lines
  ctx.lineWidth = 1

  drawYLines(ctx, props)
}
