// @flow
import type { Props } from './types'
import { toCanvasX, nearestStepBelow } from '../math'

const X_LABEL_VERTICAL_PADDING = 12

function getLabelTop (props: Props): number {
  const {
    xAxisAt,
    xAxisHeight,
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

export function drawXLines (ctx: any, graph: any, props: Props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.lineWidth = props.xLineWidth
  ctx.strokeStyle = props.xLineColor
  // style labels
  ctx.font = props.xLabelFont
  ctx.fillStyle = props.xLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const labelTop = getLabelTop(props)

  if (props.showXLine) {
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

  const getCanvasX = toCanvasX({
    width: graph.width,
    left: graph.left,
    xMax,
    xMin
  })

  if (props.xTickInterval > 0) {
    const x0 = nearestStepBelow(xMin, props.xTickInterval)

    for (let x = x0, i = 0; x <= xMax; x += props.xTickInterval, i++) {
      const canvasX = getCanvasX(x)

      if (canvasX >= graph.left && canvasX <= graph.left + graph.width) {
        // draw line
        if (props.showXLine) {
          ctx.beginPath()
          ctx.moveTo(canvasX, graph.top)
          ctx.lineTo(canvasX, graph.top + graph.height)
          ctx.stroke()
        }

        // draw text
        // TODO show x labels at xMin and xMax?
        if (props.showXLabel) {
          ctx.fillText(props.renderXLabel(x, i), canvasX, labelTop)
        }
      }
    }
  }
}
