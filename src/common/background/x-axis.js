// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import { getHeight, getWidth } from './common'

function getXLineCanvasXStart (props: Props): number {
  switch (props.y.axis.at) {
    case 'left':
      return props.margin.left + props.y.axis.width
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getXLineCanvasYStart (props: Props): number {
  switch (props.x.axis.at) {
    case 'top':
      return props.margin.top + props.x.axis.height
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 15

function getXLabelCanvasY (props: Props): number {
  const height = getHeight(props)

  switch (props.x.axis.at) {
    case 'top':
      return props.margin.top + props.x.axis.height - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return height + props.margin.top + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.strokeStyle = props.x.line.color

  // style labels
  ctx.font = props.x.axis.label.font
  ctx.fillStyle = props.x.axis.label.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const width = getWidth(props)
  const height = getHeight(props)

  const toCanvasX = linear({
    dy: width,
    dx: xMax - xMin,
    y0: -width * xMin / (xMax - xMin)
  })

  const xLineCanvasYStart = getXLineCanvasYStart(props)
  const xLineCanvasXStart = getXLineCanvasXStart(props)
  const labelCanvasY = getXLabelCanvasY(props)

  // draw x line at start
  ctx.moveTo(xLineCanvasXStart, xLineCanvasYStart)
  ctx.lineTo(xLineCanvasXStart, xLineCanvasYStart + height)
  ctx.stroke()

  // draw x line at end
  ctx.moveTo(xLineCanvasXStart + width, xLineCanvasYStart)
  ctx.lineTo(xLineCanvasXStart + width, xLineCanvasYStart + height)
  ctx.stroke()

  const xStart = nearestStepBelow(xMin, props.x.interval)

  for (let x = xStart; x <= xMax; x += props.x.interval) {
    const canvasX = round(toCanvasX(x) + xLineCanvasXStart)

    if (canvasX >= xLineCanvasXStart && canvasX <= xLineCanvasXStart + width) {
      // draw line
      ctx.moveTo(canvasX, xLineCanvasYStart)
      ctx.lineTo(canvasX, xLineCanvasYStart + height)
      ctx.stroke()

      // draw text
      ctx.fillText(
        props.x.axis.label.render(x),
        canvasX,
        labelCanvasY
      )
    }
  }
}
