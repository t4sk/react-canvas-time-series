// @flow
import type { Props } from './types'
import { toCanvasY, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth,
  getGraphLeft,
  getGraphTop,
} from './util'

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
    left,
    width,
  } = props

  switch (yAxisAt) {
    case 'left':
      return left + yAxisWidth - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return left + width -yAxisWidth + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid yAxisAt ${yAxisAt}`)
  }
}

export function drawYLines (ctx: any, props: Props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.lineWidth = props.yLineWidth
  ctx.strokeStyle = props.yLineColor

  // style labels
  ctx.font = props.yLabelFont
  ctx.fillStyle = props.yLabelColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const width = getGraphWidth(props)
  const height = getGraphHeight(props)

  const left = getGraphLeft(props)
  const top = getGraphTop(props)
  const labelLeft = getLabelLeft(props)

  if (props.showYLine) {
    // draw y line top
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left + width, top)
    ctx.stroke()

    // draw y line bottom
    ctx.beginPath()
    ctx.moveTo(left, top + height)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  }

  const getCanvasY = toCanvasY({ height, top, yMax, yMin, })

  if (props.yInterval > 0) {
    const y0 = nearestStepBelow(yMin, props.yInterval)

    for (let y = y0, i = 0; y <= yMax; y += props.yInterval, i++) {
      const canvasY = getCanvasY(y)

      if (canvasY >= top && canvasY <= top + height) {
        // draw line
        if (props.showYLine) {
          ctx.beginPath()
          ctx.moveTo(left, canvasY)
          ctx.lineTo(left + width, canvasY)
          ctx.stroke()
        }

        // draw text
        if (props.showYLabel) {
          ctx.fillText(props.renderYLabel(y, i), labelLeft, canvasY)
        }
      }
    }
  }
}
