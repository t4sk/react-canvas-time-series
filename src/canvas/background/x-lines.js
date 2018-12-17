// @flow
import type { Props } from './types'
import { nearestStepBelow } from '../math'

const X_LABEL_VERTICAL_PADDING = 12

function getLabelTop (props: Props): number {
  const {
    background: {
      xAxisAt,
      xAxisHeight,
    },
    height,
  } = props

  switch (xAxisAt) {
    case 'top':
      return xAxisHeight - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return height - xAxisHeight + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid xAxisAt ${xAxisAt}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    graph,
    getCanvasX,
    background
  } = props

  // style line
  ctx.lineWidth = background.xLineWidth
  ctx.strokeStyle = background.xLineColor
  // style labels
  ctx.font = background.xTickFont
  ctx.fillStyle = background.xTickBackgroundColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const labelTop = getLabelTop(props)

  if (background.showXLine) {
    // draw x line at start
    ctx.beginPath()
    ctx.moveTo(graph.left, graph.top)
    ctx.lineTo(graph.left, graph.top + graph.height)
    ctx.stroke()

    // draw x line at end
    ctx.beginPath()
    ctx.moveTo(graph.left + graph.width, graph.top)
    ctx.lineTo(graph.left + graph.width, graph.top + graph.height)
    ctx.stroke()
  }

  if (background.xTickInterval > 0) {
    const x0 = nearestStepBelow(xMin, background.xTickInterval)

    for (let x = x0, i = 0; x <= xMax; x += background.xTickInterval, i++) {
      const canvasX = getCanvasX(x)

      if (canvasX >= graph.left && canvasX <= graph.left + graph.width) {
        // draw line
        if (background.showXLine) {
          ctx.beginPath()
          ctx.moveTo(canvasX, graph.top)
          ctx.lineTo(canvasX, graph.top + graph.height)
          ctx.stroke()
        }

        // draw text
        // TODO show x labels at xMin and xMax?
        if (background.showXTick) {
          ctx.fillText(background.renderXTick(x, i), canvasX, labelTop)
        }
      }
    }
  }
}
