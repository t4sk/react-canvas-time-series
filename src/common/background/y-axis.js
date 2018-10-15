// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth
} from './common'

function getYAxisTextAlign (props: Props): 'left' | 'right' {
  switch (props.background.y.axis.at) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid y.axis.at ${props.background.y.axis.at}`)
  }
}

function getYLineCanvasXStart (props: Props): number {
  switch (props.background.y.axis.at) {
    case 'left':
      return props.background.y.axis.width + props.margin.left
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid y.axis.at ${props.background.y.axis.at}`)
  }
}

function getYLineCanvasYStart (props: Props): number {
  switch (props.background.x.axis.at) {
    case 'top':
      return props.background.x.axis.height + props.margin.top
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.background.x.axis.at}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getYLabelCanvasX (props: Props): number {
  const width = getGraphWidth(props)

  switch (props.background.y.axis.at) {
    case 'left':
      return props.margin.left + props.background.y.axis.width - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return width + props.margin.left + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid y.axis.at ${props.background.y.axis.at}`)
  }
}

export function drawYLines (ctx: any, props: Props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.lineWidth = 1
  ctx.strokeStyle = props.background.y.line.color

  // style labels
  ctx.font = props.background.y.axis.label.font
  ctx.fillStyle = props.background.y.axis.label.color
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

  const yStart = nearestStepBelow(yMin, props.background.y.interval)

  for (let y = yStart; y <= yMax; y += props.background.y.interval) {
    const canvasY = toCanvasY(y) + yLineCanvasYStart

    if (canvasY >= yLineCanvasYStart && canvasY <= yLineCanvasYStart + height) {
      // draw line
      ctx.beginPath()
      ctx.moveTo(
        round(yLineCanvasXStart), round(canvasY)
      )
      ctx.lineTo(
        round(yLineCanvasXStart + width), round(canvasY)
      )
      ctx.stroke()

      // draw text
      ctx.fillText(
        props.background.y.axis.label.render(y),
        round(labelCanvasX),
        round(canvasY)
      )
    }
  }
}
