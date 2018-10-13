// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth
} from './common'

function getXLineCanvasXStart (props: Props): number {
  switch (props.background.y.axis.at) {
    case 'left':
      return props.margin.left + props.background.y.axis.width
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid y.axis.at ${props.background.y.axis.at}`)
  }
}

function getXLineCanvasYStart (props: Props): number {
  switch (props.background.x.axis.at) {
    case 'top':
      return props.margin.top + props.background.x.axis.height
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.background.x.axis.at}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 12

function getXLabelCanvasY (props: Props): number {
  const height = getGraphHeight(props)

  switch (props.background.x.axis.at) {
    case 'top':
      return props.margin.top + props.background.x.axis.height - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return height + props.margin.top + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid x.axis.at ${props.background.x.axis.at}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.lineWidth = 1
  ctx.strokeStyle = props.background.x.line.color

  // style labels
  ctx.font = props.background.x.axis.label.font
  ctx.fillStyle = props.background.x.axis.label.color
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

  // draw x line at start
  ctx.beginPath()
  ctx.moveTo(xLineCanvasXStart, xLineCanvasYStart)
  ctx.lineTo(xLineCanvasXStart, xLineCanvasYStart + height)
  ctx.stroke()

  // draw x line at end
  ctx.beginPath()
  ctx.moveTo(xLineCanvasXStart + width, xLineCanvasYStart)
  ctx.lineTo(xLineCanvasXStart + width, xLineCanvasYStart + height)
  ctx.stroke()

  const xStart = nearestStepBelow(xMin, props.background.x.interval)

  for (let x = xStart; x <= xMax; x += props.background.x.interval) {
    const canvasX = round(toCanvasX(x) + xLineCanvasXStart)

    if (canvasX >= xLineCanvasXStart && canvasX <= xLineCanvasXStart + width) {
      // draw line
      ctx.beginPath()
      ctx.moveTo(canvasX, xLineCanvasYStart)
      ctx.lineTo(canvasX, xLineCanvasYStart + height)
      ctx.stroke()

      // draw text
      ctx.fillText(
        props.background.x.axis.label.render(x),
        canvasX,
        labelCanvasY
      )
    }
  }
}
