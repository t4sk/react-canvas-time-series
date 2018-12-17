// @flow
import type { Props } from './types'
import { toCanvasY, nearestStepBelow } from '../math'

function getYAxisTextAlign (props: Props): 'left' | 'right' {
  switch (props.yAxisAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid yAxisAt ${props.yAxisAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getLabelLeft (props: Props): number {
  const {
    yAxisAt,
    yAxisWidth,
    width,
  } = props

  switch (yAxisAt) {
    case 'left':
      return yAxisWidth - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return width -yAxisWidth + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid yAxisAt ${yAxisAt}`)
  }
}

export function drawYLines (ctx: any, graph: any, props: Props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.lineWidth = props.yLineWidth
  ctx.strokeStyle = props.yLineColor

  // style labels
  ctx.font = props.yTickFont
  ctx.fillStyle = props.yTickBackgroundColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const labelLeft = getLabelLeft(props)

  if (props.showYLine) {
    // draw y line top
    ctx.beginPath()
    ctx.moveTo(graph.left, graph.top)
    ctx.lineTo(graph.left + graph.width, graph.top)
    ctx.stroke()

    // draw y line bottom
    ctx.beginPath()
    ctx.moveTo(graph.left, graph.top + graph.height)
    ctx.lineTo(graph.left + graph.width, graph.top + graph.height)
    ctx.stroke()
  }

  const getCanvasY = toCanvasY({
    height: graph.height,
    top: graph.top,
    yMax,
    yMin
  })

  if (props.yTickInterval > 0) {
    const y0 = nearestStepBelow(yMin, props.yTickInterval)

    for (let y = y0, i = 0; y <= yMax; y += props.yTickInterval, i++) {
      const canvasY = getCanvasY(y)

      if (canvasY >= graph.top && canvasY <= graph.top + graph.height) {
        // draw line
        if (props.showYLine) {
          ctx.beginPath()
          ctx.moveTo(graph.left, canvasY)
          ctx.lineTo(graph.left + graph.width, canvasY)
          ctx.stroke()
        }

        // draw text
        // TODO show labels at yMin and yMax?
        if (props.showYTick) {
          ctx.fillText(props.renderYTick(y, i), labelLeft, canvasY)
        }
      }
    }
  }
}
