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

  ctx.strokeStyle = props.color
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.canvasX, props.graph.top)
  ctx.lineTo(props.canvasX, props.graph.top + props.graph.height)
  ctx.stroke()

  ctx.setLineDash([])
}

export function drawYLine (ctx: any, props: DrawYLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.color
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
  const {
    graph,
    ui,
    mouse,
  } = props

  ctx.clearRect(0, 0, props.width, props.height)

  if (!isInsideRect(mouse, graph)) {
    return
  }

  if (ui.showXLine) {
    drawXLine(ctx, {
      color: ui.xLineColor,
      graph,
      canvasX: mouse.x
    })
  }
  if (ui.showXLabel) {
    const {
      xMax,
      xMin
    } = props

    // TODO pass from props
    const x = toX({
      width: graph.width,
      left: graph.left,
      xMax,
      xMin,
    })(mouse.x)

    drawXLabel(ctx, {
      graph,
      left: mouse.x,
      height: ui.xLabelHeight,
      width: ui.xLabelWidth,
      text: ui.renderXLabel(x),
      labelAt: ui.xLabelAt,
      backgroundColor: ui.xLabelBackgroundColor,
      font: ui.xLabelFont,
      color: ui.xLabelColor
    })
  }
  if (ui.showYLine) {
    drawYLine(ctx, {
      color: ui.yLineColor,
      graph,
      canvasY: mouse.y
    })
  }
  if (ui.showYLabel) {
    // TODO pass from props
    const y = toY({
      height: graph.height,
      top: graph.top,
      yMin: props.yMin,
      yMax: props.yMax
    })(mouse.y)

    drawYLabel(ctx, {
      graph,
      top: mouse.y,
      width: ui.yLabelWidth,
      height: ui.yLabelHeight,
      labelAt: ui.yLabelAt,
      text: ui.renderYLabel(y),
      backgroundColor: ui.yLabelBackgroundColor,
      font: ui.yLabelFont,
      color: ui.yLabelColor
    })
  }
}
