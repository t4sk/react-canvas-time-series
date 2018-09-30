// @flow
import { round, linear } from '../math'
import type { Props } from './types'

export function draw(ctx: any, props: Props) {
  ctx.clearRect(
    0, 0,
    props.canvas.width,
    props.canvas.height
  )

  // dont draw if mouse not inside graph
  if (
    !props.mouse.x ||
    props.mouse.x < props.graph.x ||
    props.mouse.x > props.graph.x + props.graph.width
  ) {
    return
  }

  if (
    !props.mouse.y ||
    props.mouse.y < props.graph.y ||
    props.mouse.y > props.graph.y + props.graph.height
  ) {
    return
  }

  drawXLine(ctx, props)
  drawYLine(ctx, props)
}

function drawYLine (ctx: any, props: Props) {
  // line
  ctx.strokeStyle = props.y.line.color
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.graph.x, props.mouse.y)
  ctx.lineTo(props.graph.x + props.graph.width, props.mouse.y)
  ctx.stroke()
  ctx.closePath()

  drawYLabel(ctx, props)
}

const Y_LABEL_HORIZONTAL_PADDING = 5

function drawYLabel (ctx, props) {
  const {
    mouse,
    yMax,
    yMin
  } = props

  // label
  ctx.fillStyle = props.y.label.backgroundColor

  ctx.fillRect(
    props.graph.x - props.y.label.width,
    mouse.y - round(props.y.label.height / 2),
    props.y.label.width,
    props.y.label.height
  )

  // label text
  ctx.font = props.y.label.font
  ctx.fillStyle = props.y.label.color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'

  const y = linear({
    dy: yMax - yMin,
    dx: props.graph.height,
    y0: yMin
  })(props.graph.height - mouse.y + props.graph.y)

  ctx.fillText(
    props.y.label.render(y),
    props.graph.x - props.y.label.width + 10,
    mouse.y
  )
}

function drawXLine (ctx: any, props: Props) {
  // line
  ctx.strokeStyle = props.x.line.color
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.mouse.x, props.graph.y)
  ctx.lineTo(props.mouse.x, props.graph.y + props.graph.height)
  ctx.stroke()
  ctx.closePath()

  drawXLabel(ctx, props)
}

const X_LABEL_VERTICAL_PADDING = 10

function drawXLabel (ctx, props) {
  const {
    xMin,
    xMax,
    mouse
  } = props

  // label
  ctx.fillStyle = props.x.label.backgroundColor

  // label rect
  ctx.fillRect(
    mouse.x - round(props.x.label.width / 2),
    props.graph.y + props.graph.height,
    props.x.label.width,
    props.x.label.height
  )

  // label text
  ctx.font = props.x.label.font
  ctx.fillStyle = props.x.label.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const x = linear({
    dy: xMax - xMin,
    dx: props.graph.width,
    y0: xMin
  })(mouse.x - props.graph.x)

  ctx.fillText(
    props.x.label.render(x),
    mouse.x,
    props.graph.y + props.graph.height + X_LABEL_VERTICAL_PADDING,
  )
}
