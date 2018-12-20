// @flow
import { toX, toY } from '../math'
import {
  drawXLine,
  drawXLabel,
  drawYLine,
  drawYLabel
} from '../label'

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
  } = props

  ctx.clearRect(0, 0, props.width, props.height)

  if (!isInsideRect(mouse, graph)) {
    return
  }

  if (ui.showXLine) {
    drawXLine(ctx, {
      xLineColor: ui.xLineColor,
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
      xLabelLeft: mouse.x,
      xLabelHeight: ui.xLabelHeight,
      xLabelWidth: ui.xLabelWidth,
      xLabelText: ui.renderXLabel(x),
      xLabelAt: ui.xLabelAt,
      xLabelBackgroundColor: ui.xLabelBackgroundColor,
      xLabelFont: ui.xLabelFont,
      xLabelColor: ui.xLabelColor
    })
  }
  if (ui.showYLine) {
    drawYLine(ctx, {
      yLineColor: ui.yLineColor,
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
      yLabelTop: mouse.y,
      yLabelWidth: ui.yLabelWidth,
      yLabelHeight: ui.yLabelHeight,
      yLabelAt: ui.yLabelAt,
      yLabelText: ui.renderYLabel(y),
      yLabelBackgroundColor: ui.yLabelBackgroundColor,
      yLabelFont: ui.yLabelFont,
      yLabelColor: ui.yLabelColor
    })
  }
}
