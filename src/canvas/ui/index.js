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

export function isInsideRectHorizontal (cursor: Mouse, rect: Graph): boolean {
  if (
    !cursor.x ||
    cursor.x < rect.left ||
    cursor.x > rect.left + rect.width
  ) {
    return false
  }

  return true
}

export function isInsideRectVertical (cursor: Mouse, rect: Graph): boolean {
  if (
    !cursor.y ||
    cursor.y < rect.top ||
    cursor.y > rect.top + rect.height
  ) {
    return false
  }

  return true
}

export function isInsideRect (cursor: Mouse, rect: Graph): boolean {
  return (
    isInsideRectHorizontal(cursor, rect) &&
    isInsideRectVertical(cursor, rect)
  )
}

export function draw (ctx: any, props: Props) {
  const {
    graph,
    ui,
    cursor,
    xMax,
    xMin,
    yMax,
    yMin,
    shouldDraw,
  } = props

  ctx.clearRect(0, 0, props.width, props.height)

  if (!shouldDraw(cursor, graph)) {
    return
  }

  // TODO pass from props
  const x = toX({
    width: graph.width,
    left: graph.left,
    xMax,
    xMin,
  })(cursor.x)

  // TODO pass from props
  const y = toY({
    height: graph.height,
    top: graph.top,
    yMin,
    yMax,
  })(cursor.y)

  label.draw(ctx, {
    graph,
    label: {
      showXLine: cursor.x >= 0,
      showXLabel: cursor.x >= 0,
      showYLine: cursor.y >= 0,
      showYLabel: cursor.y >= 0,
      ...ui,
      xLabelText: ui.renderXLabel(x),
      yLabelText: ui.renderYLabel(y),
      canvasX: cursor.x,
      canvasY: cursor.y,
    },
  })
}
