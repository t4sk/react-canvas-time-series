// @flow
import { toX, toY } from '../math'
import type {
  Props,
  Mouse,
  Graph,
  DrawYLineAtProps,
  DrawYLabelAtProps,
  DrawXLineAtProps,
  DrawXLabelAtProps,
} from './types'

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

export function isInsideRect (mouse: Mouse, rect: Graph): boolean {
  return (
    isInsideRectHorizontal(mouse, rect) &&
    isInsideRectVertical(mouse, rect)
  )
}

export function drawXLine (ctx: any, props: DrawXLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.canvasX, props.graph.top)
  ctx.lineTo(props.canvasX, props.graph.top + props.graph.height)
  ctx.stroke()

  ctx.setLineDash([])
}

export function drawYLine (ctx: any, props: DrawYLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.lineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.graph.left, props.canvasY)
  ctx.lineTo(props.graph.left + props.graph.width, props.canvasY)
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

export function drawYLabel (ctx: any, props: DrawYLabelAtProps) {
  // label
  ctx.fillStyle = props.backgroundColor

  ctx.fillRect(
    getYLabelLeft(props),
    props.top - props.height / 2,
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

export function drawXLabel (ctx: any, props: DrawXLabelAtProps) {
  // label
  ctx.fillStyle = props.backgroundColor

  // label rect
  ctx.fillRect(
    props.left - props.width / 2,
    getXLabelTop(props),
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
    props.left,
    getXLabelTextTop(props)
  )
}

export function draw (ctx: any, props: Props) {
  ctx.clearRect(0, 0, props.canvas.width, props.canvas.height)

  if (!isInsideRect(props.mouse, props.graph)) {
    return
  }

  if (props.showXLine) {
    drawXLine(ctx, {
      lineColor: props.xLineColor,
      graph: props.graph,
      canvasX: props.mouse.x
    })
  }
  if (props.showXLabel) {
    // TODO remove isDragging
    const canvasX = props.mouse.isDragging ? props.mouse.dragStartCanvasX : props.mouse.x
    const xMax = props.mouse.isDragging ? props.mouse.dragStartXMax : props.xMax
    const xMin = props.mouse.isDragging ? props.mouse.dragStartXMin : props.xMin

    const x = toX({
      width: props.graph.width,
      left: props.graph.left,
      xMax,
      xMin,
    })(canvasX)

    drawXLabel(ctx, {
      graph: props.graph,
      left: props.mouse.x,
      height: props.xLabelHeight,
      width: props.xLabelWidth,
      text: props.renderXLabel(x),
      labelAt: props.xLabelAt,
      backgroundColor: props.xLabelBackgroundColor,
      font: props.xLabelFont,
      color: props.xLabelColor
    })
  }
  if (props.showYLine) {
    drawYLine(ctx, {
      lineColor: props.yLineColor,
      graph: props.graph,
      canvasY: props.mouse.y
    })
  }
  if (props.showYLabel) {
    const y = toY({
      height: props.graph.height,
      top: props.graph.top,
      yMin: props.yMin,
      yMax: props.yMax
    })(props.mouse.y)

    drawYLabel(ctx, {
      graph: props.graph,
      top: props.mouse.y,
      width: props.yLabelWidth,
      height: props.yLabelHeight,
      labelAt: props.yLabelAt,
      text: props.renderYLabel(y),
      backgroundColor: props.yLabelBackgroundColor,
      font: props.yLabelFont,
      color: props.yLabelColor
    })
  }
}
