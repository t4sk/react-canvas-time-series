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

function getTickLeft(props) {
  const {
    background: {
      yAxisAt,
      yTickWidth,
    },
    graph,
  } = props

  switch (yAxisAt) {
    case 'left':
      return graph.left - yTickWidth
    case 'right':
      return graph.left + graph.width
    default:
      throw new Error(`invalid yAxisAt ${yAxisAt}`)
  }
}

export function drawYLines (ctx: any, props: Props) {
  const {
    yMin,
    yMax,
    graph,
    getCanvasY,
  } = props

  // style labels
  ctx.font = props.background.yTickLabelFont
  ctx.fillStyle = props.background.yTickLabelColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const labelLeft = getLabelLeft(props)
  const tickLeft = getTickLeft(props)

  if (props.background.showYLine) {
    ctx.lineWidth = props.background.yLineWidth
    ctx.strokeStyle = props.background.yLineColor

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

  if (props.background.yTickInterval > 0) {
    const y0 = nearestStepBelow(yMin, props.background.yTickInterval)

    for (let y = y0, i = 0; y <= yMax; y += props.background.yTickInterval, i++) {
      const canvasY = getCanvasY(y)

      if (canvasY >= graph.top && canvasY <= graph.top + graph.height) {
        // draw line
        if (props.background.showYLine) {
          ctx.lineWidth = props.background.yLineWidth
          ctx.strokeStyle = props.background.yLineColor

          ctx.beginPath()
          ctx.moveTo(graph.left, canvasY)
          ctx.lineTo(graph.left + graph.width, canvasY)
          ctx.stroke()
        }

        // draw text
        if (props.background.showYTick) {
          ctx.lineWidth = 1
          ctx.strokeStyle = props.background.yTickColor

          ctx.beginPath()
          ctx.moveTo(tickLeft, canvasY)
          ctx.lineTo(tickLeft + props.background.yTickWidth, canvasY)
          ctx.stroke()
          
          ctx.fillText(props.background.renderYTickLabel(y, i), labelLeft, canvasY)
        }
      }
    }
  }
}
