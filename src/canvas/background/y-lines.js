// @flow
import type { Props } from './types'
import { nearestStepBelow } from '../math'

function getYAxisTextAlign (props: Props): 'left' | 'right' {
  switch (props.background.yAxisAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getLabelLeft (props: Props): number {
  const {
    background: {
      yAxisAt,
      yAxisWidth,
    },
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

export function drawYLines (ctx: any, props: Props, internalProps) {
  const {
    yMin,
    yMax,
    background,
  } = props

  const {
    graph,
    getCanvasY,
  } = internalProps

  // style line
  ctx.lineWidth = background.yLineWidth
  ctx.strokeStyle = background.yLineColor

  // style labels
  ctx.font = background.yTickFont
  ctx.fillStyle = background.yTickBackgroundColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const labelLeft = getLabelLeft(props)

  if (background.showYLine) {
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

  if (background.yTickInterval > 0) {
    const y0 = nearestStepBelow(yMin, background.yTickInterval)

    for (let y = y0, i = 0; y <= yMax; y += background.yTickInterval, i++) {
      const canvasY = getCanvasY(y)

      if (canvasY >= graph.top && canvasY <= graph.top + graph.height) {
        // draw line
        if (background.showYLine) {
          ctx.beginPath()
          ctx.moveTo(graph.left, canvasY)
          ctx.lineTo(graph.left + graph.width, canvasY)
          ctx.stroke()
        }

        // draw text
        // TODO show labels at yMin and yMax?
        if (background.showYTick) {
          ctx.fillText(background.renderYTick(y, i), labelLeft, canvasY)
        }
      }
    }
  }
}
