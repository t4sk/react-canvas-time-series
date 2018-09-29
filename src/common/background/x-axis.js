// @flow
import { round, linear } from '../math'
import {getHeight, getWidth} from './common'

function getXAxisTextAlign (props) {
  switch (props.x.axis.at) {
    case 'top':
      return 'bottom'
    case 'bottom':
      return 'top'
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

function getXLineCanvasXStart (props) {
  switch (props.y.axis.at) {
    case 'left':
      return props.margin.left + props.y.axis.width
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getXLineCanvasYStart (props) {
  switch (props.x.axis.at) {
    case 'top':
      return props.margin.top + props.x.axis.height
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 10

function getXLabelCanvasY(props) {
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

export function drawXLines(ctx, props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.strokeStyle = props.x.line.color

  // style labels
  ctx.font = props.x.axis.label.font
  ctx.fillStyle = props.x.axis.label.color
  ctx.textBaseline = getXAxisTextAlign(props)
  ctx.textAlign = 'center'

  const width = getWidth(props)
  const height = getHeight(props)
  const interval = width / props.x.intervals
  const toX = linear({
    dy: xMax - xMin,
    dx: width,
    y0: xMin
  })

  const xLineCanvasYStart = getXLineCanvasYStart(props)
  const xLineCanvasXStart = getXLineCanvasXStart(props)
  const labelCanvasY = getXLabelCanvasY(props)

  for (let i = 0; i <= props.x.intervals; i++) {
    const canvasX = round(i * interval) + xLineCanvasXStart

    // draw line
    ctx.moveTo(canvasX, xLineCanvasYStart)
    ctx.lineTo(canvasX, xLineCanvasYStart + height)
    ctx.stroke()

    // draw text
    const x = round(toX(i * interval))

    ctx.fillText(
      props.x.axis.label.render(x),
      canvasX,
      labelCanvasY
    )
  }
}
