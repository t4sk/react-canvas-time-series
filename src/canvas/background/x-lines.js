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

function getTickTop(props) {
  const {
    background: {
      xAxisAt,
      xTickHeight,
    },
    graph,
  } = props

  switch (xAxisAt) {
    case 'top':
      return graph.top - xTickHeight
    case 'bottom':
      return graph.top + graph.height
    default:
      throw new Error(`invalid xAxisAt ${xAxisAt}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    graph,
    getCanvasX
  } = props

  // style labels
  ctx.font = props.background.xTickLabelFont
  ctx.fillStyle = props.background.xTickLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const labelTop = getLabelTop(props)
  const tickTop = getTickTop(props)

  if (props.background.showXLine) {
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

  if (props.background.xTickInterval > 0) {
    const x0 = nearestStepBelow(xMin, props.background.xTickInterval)

    for (let x = x0, i = 0; x <= xMax; x += props.background.xTickInterval, i++) {
      const canvasX = getCanvasX(x)

      if (canvasX >= graph.left && canvasX <= graph.left + graph.width) {
        // draw line
        if (props.background.showXLine) {
          ctx.lineWidth = props.background.xLineWidth
          ctx.strokeStyle = props.background.xLineColor

          ctx.beginPath()
          ctx.moveTo(canvasX, graph.top)
          ctx.lineTo(canvasX, graph.top + graph.height)
          ctx.stroke()

          ctx.lineWidth = 1
          ctx.strokeStyle = props.background.xTickColor

          ctx.beginPath()
          ctx.moveTo(canvasX, tickTop)
          ctx.lineTo(canvasX, tickTop + props.background.xTickHeight)
          ctx.stroke()
        }

        // draw text
        // TODO show x labels at xMin and xMax?
        if (props.background.showXTick) {
          ctx.fillText(props.background.renderXTickLabel(x, i), canvasX, labelTop)
        }
      }
    }
  }
}
