// @flow
import { round, linear } from '../math'
import type {
  Props,
  Mouse,
  Graph,
  DrawYLineAtProps,
  DrawYLabelAtProps,
  DrawXLineAtProps,
  DrawXLabelAtProps,
} from './types'

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

// TODO move to math.js
// TODO test
export function getNearestDataAtX (
  x: number,
  data: Array<{x: number}>
): {x: number} {
  let low = 0;
  let high = data.length - 1

  // binary search
  while (low < high) {
    let mid = (low + high) / 2 >> 0

    if (data[mid].x > x) {
      high = mid
    } else {
      low = mid + 1
    }
  }

  if (data[low - 1]) {
    const midX = (data[low].x + data[low - 1].x) / 2

    if (x < midX) {
      return data[low - 1]
    } else {
      return data[low]
    }
  }

  return data[low]
}

export function drawYLineAt (ctx: any, props: DrawYLineAtProps) {
  // line
  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.graph.x, props.canvasY)
  ctx.lineTo(props.graph.x + props.graph.width, props.canvasY)
  ctx.stroke()
  ctx.closePath()
}

function getYLabelTextAlign (props: DrawYLabelAtProps): 'left' | 'right' {
  switch (props.labelAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

function getYLabelCanvasX (props: DrawYLabelAtProps): number {
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

function getYLabelTextCanvasX (props: DrawYLabelAtProps): number {
  switch (props.labelAt) {
    case 'left':
      return props.graph.x - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return props.graph.x + props.graph.width + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

export function drawYLabelAt (ctx: any, props: DrawYLabelAtProps) {
  // label
  ctx.fillStyle = props.backgroundColor

  ctx.fillRect(
    getYLabelCanvasX(props),
    props.canvasY - round(props.height / 2),
    props.width,
    props.height
  )

  // label text
  ctx.font = props.font
  ctx.fillStyle = props.color
  ctx.textAlign = getYLabelTextAlign(props)
  ctx.textBaseline = 'middle'

  ctx.fillText(
    props.text,
    getYLabelTextCanvasX(props),
    props.canvasY
  )
}

export function drawXLineAt (ctx: any, props: DrawXLineAtProps) {
  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.beginPath()
  ctx.moveTo(props.canvasX, props.graph.y)
  ctx.lineTo(props.canvasX, props.graph.y + props.graph.height)
  ctx.stroke()
  ctx.closePath()
}

function getXLabelCanvasY (props: DrawXLabelAtProps): number {
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

function getXLabelTextCanvasY (props: DrawXLabelAtProps): number {
  switch (props.labelAt) {
    case 'top':
      return props.graph.y - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return props.graph.y + props.graph.height + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

export function drawXLabelAt (ctx: any, props: DrawXLabelAtProps) {
  // label
  ctx.fillStyle = props.backgroundColor

  // label rect
  ctx.fillRect(
    round(props.canvasX - props.width / 2),
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
    props.text,
    round(props.canvasX),
    round(getXLabelTextCanvasY(props))
  )
}

function drawXLine (ctx: any, props: Props) {
  const {
    graph,
    mouse,
    ui
  } = props

  drawXLineAt(ctx, {
    ...props,
    lineColor: ui.xLineColor,
    canvasX: mouse.x
  })

  const canvasX = mouse.isDragging ? mouse.dragStartCanvasX : mouse.x
  const xMax = mouse.isDragging ? mouse.dragStartXMax : props.xMax
  const xMin = mouse.isDragging ? mouse.dragStartXMin : props.xMin

  const x = linear({
    dy: xMax - xMin,
    dx: graph.width,
    y0: xMin
  })(canvasX - graph.x)

  drawXLabelAt(ctx, {
    ...props,
    canvasX: mouse.x,
    text: ui.renderXLabel(x),
    height: ui.xLabelHeight,
    width: ui.xLabelWidth,
    labelAt: ui.xLabelAt,
    backgroundColor: ui.xLabelBackgroundColor,
    font: ui.xLabelFont,
    color: ui.xLabelColor
  })
}

function drawYLine (ctx: any, props: Props) {
  const {
    graph,
    mouse,
    ui
  } = props

  drawYLineAt(ctx, {
    ...props,
    lineColor: ui.yLineColor,
    canvasY: mouse.y
  })

  const y = linear({
    dy: props.yMax - props.yMin,
    dx: graph.height,
    y0: props.yMin
  })(graph.height - mouse.y + graph.y)

  drawYLabelAt(ctx, {
    ...props,
    canvasY: mouse.y,
    text: ui.renderYLabel(y),
    height: ui.yLabelHeight,
    width: ui.yLabelWidth,
    labelAt: ui.yLabelAt,
    backgroundColor: ui.yLabelBackgroundColor,
    font: ui.yLabelFont,
    color: ui.yLabelColor
  })
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

  // TODO renderNearestData()
}
