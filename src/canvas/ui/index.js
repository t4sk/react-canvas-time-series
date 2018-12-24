// @flow
import { toX, toY } from '../math'
import * as label from '../label'

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

export function draw (ctx: any, props: Props) {
  const {
    graph,
    ui,
    mouse,
    xMax,
    xMin,
    yMax,
    yMin,
  } = props

  ctx.clearRect(0, 0, props.width, props.height)

  if (!isInsideRect(mouse, graph)) {
    return
  }

  // TODO pass from props
  const x = toX({
    width: graph.width,
    left: graph.left,
    xMax,
    xMin,
  })(mouse.x)

  // TODO pass from props
  const y = toY({
    height: graph.height,
    top: graph.top,
    yMin,
    yMax,
  })(mouse.y)

  label.draw(ctx, {
    graph,
    label: {
      ...ui,
      xLabelText: ui.renderXLabel(x),
      yLabelText: ui.renderYLabel(y),
      canvasX: mouse.x,
      canvasY: mouse.y,
    },
  })
}
