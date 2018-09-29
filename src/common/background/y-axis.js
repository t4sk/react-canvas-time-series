// @flow
import { round, linear } from '../math'
import {getHeight, getWidth} from './common'

function getYAxisTextAlign (props) {
  switch (props.y.axis.at) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getYLineCanvasXStart (props) {
  switch (props.y.axis.at) {
    case 'left':
      return props.y.axis.width + props.margin.left
    case 'right':
      return props.margin.right
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getYLineCanvasYStart (props) {
  switch (props.x.axis.at) {
    case 'top':
      return props.x.axis.height
    case 'bottom':
      return 0
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getYLabelCanvasX (props) {
  switch (props.y.axis.at) {
    case 'left':
      return props.y.axis.width - Y_LABEL_HORIZONTAL_PADDING + props.margin.left
    case 'right':
      return props.width - props.y.axis.width + Y_LABEL_HORIZONTAL_PADDING + props.margin.left - props.margin.right
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

export function drawYLines (ctx, props) {
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
  const interval = height / props.y.intervals
  const toY = linear({
    dy: yMax - yMin,
    dx: height,
    y0: yMin
  })

  const yLineCanvasXStart = getYLineCanvasXStart(props)
  const yLineCanvasYStart = getYLineCanvasYStart(props)
  const labelCanvasX = getYLabelCanvasX(props)

  for (let i = 0; i <= props.y.intervals; i++) {
    const canvasY = round(i * interval) + props.margin.top + yLineCanvasYStart

    // draw line
    ctx.moveTo(yLineCanvasXStart, canvasY)
    ctx.lineTo(yLineCanvasXStart + width, canvasY)
    ctx.stroke()

    // draw text
    const y = round(toY((props.y.intervals - i) * interval))
    ctx.fillText(props.y.axis.label.render(y), labelCanvasX, canvasY)
  }
}
