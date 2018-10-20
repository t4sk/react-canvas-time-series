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

// TODO drawYLineAt props
export function drawYLineAt(ctx: any, props) {
  // line
  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.graph.x, props.canvasY)
  ctx.lineTo(props.graph.x + props.graph.width, props.canvasY)
  ctx.stroke()
  ctx.closePath()
}

// TODO use drawYLabelAt props
function getYLabelTextAlign (props: Props): 'left' | 'right' {
  switch (props.labelAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

// TODO use drawYLabelAt props
function getYLabelCanvasX (props: Props): number {
  switch (props.labelAt) {
    case 'left':
      return props.graph.x - props.width
    case 'right':
      return props.graph.x + props.graph.width
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 5

// TODO use drawYLabelAt props
function getYLabelTextCanvasX (props: Props): number {
  switch (props.labelAt) {
    case 'left':
      return props.graph.x - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return props.graph.x + props.graph.width + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

// TODO use drawYLabelAt props
export function drawYLabelAt (ctx: any, props: Props) {
  const {
    canvasY,
    yMax,
    yMin
  } = props

  // label
  ctx.fillStyle = props.backgroundColor

  ctx.fillRect(
    getYLabelCanvasX(props),
    canvasY - round(props.height / 2),
    props.width,
    props.height
  )

  // label text
  ctx.font = props.font
  ctx.fillStyle = props.color
  ctx.textAlign = getYLabelTextAlign(props)
  ctx.textBaseline = 'middle'

  const y = linear({
    dy: yMax - yMin,
    dx: props.graph.height,
    y0: yMin
  })(props.graph.height - canvasY + props.graph.y)

  ctx.fillText(
    props.renderYLabel(y),
    getYLabelTextCanvasX(props),
    canvasY
  )
}

// TODO drawXLineAt props
export function drawXLineAt(ctx: any, props) {
  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.canvasX, props.graph.y)
  ctx.lineTo(props.canvasX, props.graph.y + props.graph.height)
  ctx.stroke()
  ctx.closePath()
}

// TODO drawXLabelAt props
function getXLabelCanvasY (props: Props): number {
  switch (props.labelAt) {
    case 'top':
      return props.graph.y - props.height
    case 'bottom':
      return props.graph.y + props.graph.height
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 10

// TODO drawXLabelAt props
function getXLabelTextCanvasY (props: Props): number {
  switch (props.labelAt) {
    case 'top':
      return props.graph.y - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return props.graph.y + props.graph.height + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

// TODO drawXLabelAt props
export function drawXLabelAt (ctx: any, props: Props) {
  const {
    x,
    canvasX
  } = props

  // label
  ctx.fillStyle = props.backgroundColor

  // label rect
  ctx.fillRect(
    round(canvasX - props.width / 2),
    round(getXLabelCanvasY(props)),
    props.width,
    props.height
  )

  // label text
  ctx.font = props.font
  ctx.fillStyle = props.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillText(
    props.renderXLabel(x),
    round(canvasX),
    round(getXLabelTextCanvasY(props))
  )
}

export function draw (ctx: any, props: Props) {
  const {
    mouse
  } = props

  ctx.clearRect(
    0, 0,
    props.canvas.width,
    props.canvas.height,
  )

  if (!isInsideGraph(mouse, props.graph)) {
    return
  }

  // draw x libe and label
  drawXLineAt(ctx, {
    ...props,
    lineColor: props.ui.xLineColor,
    canvasX: mouse.x,
  })

  const canvasX = mouse.isDragging ? mouse.dragStartCanvasX : mouse.x
  const xMax = mouse.isDragging ? mouse.dragStartXMax : props.xMax
  const xMin = mouse.isDragging ? mouse.dragStartXMin : props.xMin

  const x = linear({
    dy: xMax - xMin,
    dx: props.graph.width,
    y0: xMin
  })(canvasX - props.graph.x)

  drawXLabelAt(ctx, {
    ...props,
    canvasX: mouse.x,
    x,
    height: props.ui.xLabelHeight,
    width: props.ui.xLabelWidth,
    labelAt: props.ui.xLabelAt,
    backgroundColor: props.ui.xLabelBackgroundColor,
    font: props.ui.xLabelFont,
    color: props.ui.xLabelColor,
    renderXLabel: props.ui.renderXLabel,
  })

  // draw y line and label
  drawYLineAt(ctx, {
    ...props,
    lineColor: props.ui.yLineColor,
    canvasY: mouse.y
  })

  drawYLabelAt(ctx, {
    ...props,
    canvasY: mouse.y,
    height: props.ui.yLabelHeight,
    width: props.ui.yLabelWidth,
    labelAt: props.ui.yLabelAt,
    backgroundColor: props.ui.yLabelBackgroundColor,
    font: props.ui.yLabelFont,
    color: props.ui.yLabelColor,
    renderYLabel: props.ui.renderYLabel,
  })
}
