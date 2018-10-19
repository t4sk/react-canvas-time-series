// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth
} from './common'

function getXLineCanvasXStart (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.margin.left + props.background.yAxisWidth
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

function getXLineCanvasYStart (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.margin.top + props.background.xAxisHeight
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 12

function getXLabelCanvasY (props: Props): number {
  const height = getGraphHeight(props)

  switch (props.background.xAxisAt) {
    case 'top':
      return props.margin.top + props.background.xAxisHeight - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return height + props.margin.top + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.lineWidth = props.background.xLineWidth
  ctx.strokeStyle = props.background.xLineColor
  // style labels
  ctx.font = props.background.xLabelFont
  ctx.fillStyle = props.background.xLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const width = getGraphWidth(props)
  const height = getGraphHeight(props)

  const toCanvasX = linear({
    dy: width,
    dx: xMax - xMin,
    y0: -width * xMin / (xMax - xMin)
  })

  const xLineCanvasYStart = getXLineCanvasYStart(props)
  const xLineCanvasXStart = getXLineCanvasXStart(props)
  const labelCanvasY = getXLabelCanvasY(props)

  if (props.background.showXLine) {
    // draw x line at start
    ctx.beginPath()
    ctx.moveTo(
      round(xLineCanvasXStart),
      round(xLineCanvasYStart)
    )
    ctx.lineTo(
      round(xLineCanvasXStart),
      round(xLineCanvasYStart + height)
    )
    ctx.stroke()

    // draw x line at end
    ctx.beginPath()
    ctx.moveTo(
      round(xLineCanvasXStart + width),
      round(xLineCanvasYStart)
    )
    ctx.lineTo(
      round(xLineCanvasXStart + width),
      round(xLineCanvasYStart + height)
    )
    ctx.stroke()
  }

  const xStart = nearestStepBelow(xMin, props.background.xInterval)

  for (let x = xStart; x <= xMax; x += props.background.xInterval) {
    const canvasX = toCanvasX(x) + xLineCanvasXStart

    if (canvasX >= xLineCanvasXStart && canvasX <= xLineCanvasXStart + width) {
      // draw line
      if (props.background.showXLine) {
        ctx.beginPath()
        ctx.moveTo(
          round(canvasX), round(xLineCanvasYStart)
        )
        ctx.lineTo(
          round(canvasX), round(xLineCanvasYStart + height)
        )
        ctx.stroke()
      }

      // draw text
      if (props.background.showXLabel) {
        ctx.fillText(
          props.background.renderXLabel(x),
          round(canvasX),
          round(labelCanvasY)
        )
      }
    }
  }
}
