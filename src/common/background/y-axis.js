// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth
} from './common'

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

function getYLineCanvasXStart (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.background.yAxisWidth + props.margin.left
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

function getYLineCanvasYStart (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.background.xAxisHeight + props.margin.top
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getYLabelCanvasX (props: Props): number {
  const width = getGraphWidth(props)

  switch (props.background.yAxisAt) {
    case 'left':
      return props.margin.left + props.background.yAxisWidth - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return width + props.margin.left + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

export function drawYLines (ctx: any, props: Props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.lineWidth = props.background.yLineWidth
  ctx.strokeStyle = props.background.yLineColor

  // style labels
  ctx.font = props.background.yLabelFont
  ctx.fillStyle = props.background.yLabelColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const width = getGraphWidth(props)
  const height = getGraphHeight(props)

  const toCanvasY = linear({
    dy: -height,
    dx: yMax - yMin,
    y0: height * yMax / (yMax - yMin)
  })

  const yLineCanvasXStart = getYLineCanvasXStart(props)
  const yLineCanvasYStart = getYLineCanvasYStart(props)
  const labelCanvasX = getYLabelCanvasX(props)

  if (props.background.showYLine) {
    // draw y line top
    ctx.beginPath()
    ctx.moveTo(
      round(yLineCanvasXStart),
      round(yLineCanvasYStart)
    )
    ctx.lineTo(
      round(yLineCanvasXStart + width),
      round(yLineCanvasYStart)
    )
    ctx.stroke()

    // draw y line bottom
    ctx.beginPath()
    ctx.moveTo(
      round(yLineCanvasXStart),
      round(yLineCanvasYStart + height)
    )
    ctx.lineTo(
      round(yLineCanvasXStart + width),
      round(yLineCanvasYStart + height)
    )
    ctx.stroke()
  }

  const yStart = nearestStepBelow(yMin, props.background.yInterval)

  for (let y = yStart; y <= yMax; y += props.background.yInterval) {
    const canvasY = toCanvasY(y) + yLineCanvasYStart

    if (canvasY >= yLineCanvasYStart && canvasY <= yLineCanvasYStart + height) {
      // draw line
      if (props.background.showYLine) {
        ctx.beginPath()
        ctx.moveTo(
          round(yLineCanvasXStart), round(canvasY)
        )
        ctx.lineTo(
          round(yLineCanvasXStart + width), round(canvasY)
        )
        ctx.stroke()
      }

      // draw text
      if (props.background.showYLabel) {
        ctx.fillText(
          props.background.yLabelRender(y),
          round(labelCanvasX),
          round(canvasY)
        )
      }
    }
  }
}
