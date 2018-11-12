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

// TODO flow Graph -> Rect
export function isInsideRectHorizontal (mouse: Mouse, rect: Graph): boolean {
  if (
    !mouse.x ||
    mouse.x < rect.left ||
    mouse.x > rect.left + rect.width
  ) {
    return false
  }

  return true
}

// TODO flow Graph -> Rect
export function isInsideRectVertical (mouse: Mouse, rect: Graph): boolean {
  if (
    !mouse.y ||
    mouse.y < rect.top ||
    mouse.y > rect.top + rect.height
  ) {
    return false
  }

  return true
}

// TODO flow Graph -> Rect
export function isInsideRect (mouse: Mouse, rect: Graph): boolean {
  return (
    isInsideRectHorizontal(mouse, rect) &&
    isInsideRectVertical(mouse, rect)
  )
}

export function drawYLineAt (ctx: any, props: DrawYLineAtProps) {
  // line
  ctx.beginPath()

  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.graph.left, props.top)
  ctx.lineTo(props.graph.left + props.graph.width, props.top)
  ctx.stroke()

  ctx.setLineDash([])
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

function getYLabelLeft (props: DrawYLabelAtProps): number {
  switch (props.labelAt) {
    case 'left':
      return props.graph.left - props.width
    case 'right':
      return props.graph.left + props.graph.width
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 5

function getYLabelTextLeft (props: DrawYLabelAtProps): number {
  switch (props.labelAt) {
    case 'left':
      return props.graph.left - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return props.graph.left + props.graph.width + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

export function drawYLabelAt (ctx: any, props: DrawYLabelAtProps) {
  // label
  ctx.fillStyle = props.backgroundColor

  ctx.fillRect(
    getYLabelLeft(props),
    props.top - round(props.height / 2),
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
    getYLabelTextLeft(props),
    props.top
  )
}

export function drawXLineAt (ctx: any, props: DrawXLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.left, props.graph.top)
  ctx.lineTo(props.left, props.graph.top + props.graph.height)
  ctx.stroke()

  ctx.setLineDash([])
}

function getXLabelTop (props: DrawXLabelAtProps): number {
  switch (props.labelAt) {
    case 'top':
      return props.graph.top - props.height
    case 'bottom':
      return props.graph.top + props.graph.height
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 10

function getXLabelTextTop (props: DrawXLabelAtProps): number {
  switch (props.labelAt) {
    case 'top':
      return props.graph.top - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return props.graph.top + props.graph.height + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid labelAt ${props.labelAt}`)
  }
}

export function drawXLabelAt (ctx: any, props: DrawXLabelAtProps) {
  // label
  ctx.fillStyle = props.backgroundColor

  // label rect
  ctx.fillRect(
    round(props.left - props.width / 2),
    round(getXLabelTop(props)),
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
    round(props.left),
    round(getXLabelTextTop(props))
  )
}

export function drawXLine (ctx: any, props: Props) {
  const {
    mouse,
    ui
  } = props

  drawXLineAt(ctx, {
    ...props,
    lineColor: ui.xLineColor,
    left: mouse.x
  })
}

export function drawXLabel (ctx: any, props: Props) {
  const {
    graph,
    mouse,
    ui
  } = props

  const left = mouse.isDragging ? mouse.dragStartLeft : mouse.x
  const xMax = mouse.isDragging ? mouse.dragStartXMax : props.xMax
  const xMin = mouse.isDragging ? mouse.dragStartXMin : props.xMin

  const x = linear({
    dy: xMax - xMin,
    dx: graph.width,
    y0: xMin
  })(left - graph.left)

  drawXLabelAt(ctx, {
    ...props,
    left: mouse.x,
    text: ui.renderXLabel(x),
    height: ui.xLabelHeight,
    width: ui.xLabelWidth,
    labelAt: ui.xLabelAt,
    backgroundColor: ui.xLabelBackgroundColor,
    font: ui.xLabelFont,
    color: ui.xLabelColor
  })
}

export function drawYLine (ctx: any, props: Props) {
  const {
    mouse,
    ui
  } = props

  drawYLineAt(ctx, {
    ...props,
    lineColor: ui.yLineColor,
    top: mouse.y
  })
}

export function drawYLabel (ctx: any, props: Props) {
  const {
    graph,
    mouse,
    ui
  } = props

  const y = linear({
    dy: props.yMax - props.yMin,
    dx: graph.height,
    y0: props.yMin
  })(graph.height - mouse.y + graph.top)

  drawYLabelAt(ctx, {
    ...props,
    top: mouse.y,
    text: ui.renderYLabel(y),
    height: ui.yLabelHeight,
    width: ui.yLabelWidth,
    labelAt: ui.yLabelAt,
    backgroundColor: ui.yLabelBackgroundColor,
    font: ui.yLabelFont,
    color: ui.yLabelColor
  })
}

export function clear(ctx: any, props: Props) {
  ctx.clearRect(
    0, 0,
    props.canvas.width,
    props.canvas.height
  )
}

export function draw (ctx: any, props: Props) {
  clear(ctx, props)

  if (!isInsideRect(props.mouse, props.graph)) {
    return
  }

  if (props.ui.showXLine) {
    drawXLine(ctx, props)
  }
  if (props.ui.showXLabel) {
    drawXLabel(ctx, props)
  }
  if (props.ui.showYLine) {
    drawYLine(ctx, props)
  }
  if (props.ui.showYLabel) {
    drawYLabel(ctx, props)
  }
}
