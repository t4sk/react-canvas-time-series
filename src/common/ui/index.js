// @flow
import { round, linear } from '../math'
import type { Props, Mouse, Graph } from './types'

export function isInsideGraph (mouse: Mouse, graph: Graph): boolean {
  if (
    !mouse.x ||
    mouse.x < graph.x ||
    mouse.x > graph.x + graph.width
  ) {
    return false
  }

  if (
    !mouse.y ||
    mouse.y < graph.y ||
    mouse.y > graph.y + graph.height
  ) {
    return false
  }

  return true
}

export function draw (ctx: any, props: Props) {
  ctx.clearRect(
    0, 0,
    props.canvas.width,
    props.canvas.height
  )

  if (!isInsideGraph(props.mouse, props.graph)) {
    return
  }

  drawXLine(ctx, props)
  drawYLine(ctx, props)
}

function drawYLine (ctx: any, props: Props) {
  // line
  ctx.strokeStyle = props.ui.y.line.color
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.graph.x, props.mouse.y)
  ctx.lineTo(props.graph.x + props.graph.width, props.mouse.y)
  ctx.stroke()
  ctx.closePath()

  drawYLabel(ctx, props)
}

function getYLabelTextAlign (props: Props): 'left' | 'right' {
  switch (props.ui.y.label.at) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid y.label.at ${props.ui.y.label.at}`)
  }
}

function getYLabelCanvasX (props: Props): number {
  switch (props.ui.y.label.at) {
    case 'left':
      return props.graph.x - props.ui.y.label.width
    case 'right':
      return props.graph.x + props.graph.width
    default:
      throw new Error(`invalid y.label.at ${props.ui.y.label.at}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 5

function getYLabelTextCanvasX (props: Props): number {
  switch (props.ui.y.label.at) {
    case 'left':
      return props.graph.x - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return props.graph.x + props.graph.width + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid y.label.at ${props.ui.y.label.at}`)
  }
}

function drawYLabel (ctx: any, props: Props) {
  const {
    mouse,
    yMax,
    yMin
  } = props

  // label
  ctx.fillStyle = props.ui.y.label.backgroundColor

  ctx.fillRect(
    getYLabelCanvasX(props),
    mouse.y - round(props.ui.y.label.height / 2),
    props.ui.y.label.width,
    props.ui.y.label.height
  )

  // label text
  ctx.font = props.ui.y.label.font
  ctx.fillStyle = props.ui.y.label.color
  ctx.textAlign = getYLabelTextAlign(props)
  ctx.textBaseline = 'middle'

  const y = linear({
    dy: yMax - yMin,
    dx: props.graph.height,
    y0: yMin
  })(props.graph.height - mouse.y + props.graph.y)

  ctx.fillText(
    props.ui.y.label.render(y),
    getYLabelTextCanvasX(props),
    mouse.y
  )
}

function drawXLine (ctx: any, props: Props) {
  // line
  ctx.strokeStyle = props.ui.x.line.color
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.mouse.x, props.graph.y)
  ctx.lineTo(props.mouse.x, props.graph.y + props.graph.height)
  ctx.stroke()
  ctx.closePath()

  drawXLabel(ctx, props)
}

function getXLabelCanvasY (props: Props): number {
  switch (props.ui.x.label.at) {
    case 'top':
      return props.graph.y - props.ui.x.label.height
    case 'bottom':
      return props.graph.y + props.graph.height
    default:
      throw new Error(`invalid x.label.at ${props.ui.x.label.at}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 10

function getXLabelTextCanvasY (props: Props): number {
  switch (props.ui.x.label.at) {
    case 'top':
      return props.graph.y - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return props.graph.y + props.graph.height + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid x.label.at ${props.ui.x.label.at}`)
  }
}

function drawXLabel (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    mouse
  } = props

  // label
  ctx.fillStyle = props.ui.x.label.backgroundColor

  // label rect
  ctx.fillRect(
    round(mouse.x - props.ui.x.label.width / 2),
    round(getXLabelCanvasY(props)),
    props.ui.x.label.width,
    props.ui.x.label.height
  )

  // label text
  ctx.font = props.ui.x.label.font
  ctx.fillStyle = props.ui.x.label.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const canvasX = mouse.isDragging ? mouse.mouseDownX : mouse.x
  const x = linear({
    dy: xMax - xMin,
    dx: props.graph.width,
    y0: xMin
  })(canvasX - props.graph.x)

  ctx.fillText(
    props.ui.x.label.render(x),
    round(mouse.x),
    round(getXLabelTextCanvasY(props))
  )
}

export function getNearestDataAtX (
  x: number,
  delta: number,
  data: Array<{x: number}>
): {x: number} {
  let low = 0; let high = data.length - 1

  // binary search
  while (low < high) {
    let mid = (low + high) / 2 >> 0

    if (data[mid].x > x + delta) {
      high = mid
    } else if (data[mid].x < x - delta) {
      low = mid + 1
    } else {
      // Math.abs(data[mid].timestamp - x) <= delta
      return data[mid]
    }
  }

  return data[low]
}
