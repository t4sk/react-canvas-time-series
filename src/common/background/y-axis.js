// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import { getHeight, getWidth } from './common'

function getYAxisTextAlign (props: Props): 'left' | 'right' {
  switch (props.y.axis.at) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getYLineCanvasXStart (props: Props): number {
  switch (props.y.axis.at) {
    case 'left':
      return props.y.axis.width + props.margin.left
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getYLineCanvasYStart (props: Props): number {
  switch (props.x.axis.at) {
    case 'top':
      return props.x.axis.height + props.margin.top
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getYLabelCanvasX (props: Props): number {
  const width = getWidth(props)

  switch (props.y.axis.at) {
    case 'left':
      return props.margin.left + props.y.axis.width - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return width + props.margin.left + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

export function drawYLines (ctx: any, props: Props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.strokeStyle = props.y.line.color

  // style labels
  ctx.font = props.y.axis.label.font
  ctx.fillStyle = props.y.axis.label.color
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const width = getWidth(props)
  const height = getHeight(props)

  const toCanvasY = linear({
    dy: -height,
    dx: yMax - yMin,
    y0: height * yMax / (yMax - yMin)
  })

  const yLineCanvasXStart = getYLineCanvasXStart(props)
  const yLineCanvasYStart = getYLineCanvasYStart(props)
  const labelCanvasX = getYLabelCanvasX(props)

  // draw y line top
  ctx.moveTo(yLineCanvasXStart, yLineCanvasYStart)
  ctx.lineTo(yLineCanvasXStart + width, yLineCanvasYStart)
  ctx.stroke()

  // draw y line bottom
  ctx.moveTo(yLineCanvasXStart, yLineCanvasYStart + height)
  ctx.lineTo(yLineCanvasXStart + width, yLineCanvasYStart + height)
  ctx.stroke()

  const yStart = nearestStepBelow(yMin, props.y.interval)

  for (let y = yStart; y <= yMax; y += props.y.interval) {
    const canvasY = round(toCanvasY(y)) + yLineCanvasYStart

    console.log(canvasY)

    if (canvasY >= yLineCanvasYStart && canvasY <= yLineCanvasYStart + height) {
      // draw line
      ctx.moveTo(yLineCanvasXStart, canvasY)
      ctx.lineTo(yLineCanvasXStart + width, canvasY)
      ctx.stroke()

      // draw text
      ctx.fillText(
        props.y.axis.label.render(y),
        labelCanvasX,
        canvasY
      )
    }
  }
}
