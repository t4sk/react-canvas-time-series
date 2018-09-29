// @flow
import { round, linear } from './math'

function getWidth(props) {
  return props.width - props.y.axis.width - (props.margin.left + props.margin.right)
}

function getHeight(props) {
  return props.height - props.x.axis.height - (props.margin.top + props.margin.bottom)
}

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
      return props.y.axis.width + props.margin.left
    case 'right':
      return props.margin.right
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function getXLineCanvasYStart (props) {
  switch (props.x.axis.at) {
    case 'top':
      return props.x.axis.height + props.margin.top
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

const X_LABEL_VERTICAL_PADD = 5

function getXLabelCanvasY(props) {
  switch (props.x.axis.at) {
    case 'top':
      return props.x.axis.height + props.margin.top - X_LABEL_VERTICAL_PADD
    case 'bottom':
      return props.height - props.x.axis.height + props.margin.top - props.margin.bottom + X_LABEL_VERTICAL_PADD
    default:
      throw new Error(`invalid x.axis.at ${props.x.axis.at}`)
  }
}

function drawXLines(ctx, props) {
  const { xMin, xMax } = props

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

function getYLabelCanvasX (props) {
  switch (props.y.axis.at) {
    case 'left':
      return props.y.axis.width - 10 + props.margin.left
    case 'right':
      return props.width - props.y.axis.width + 10 + props.margin.left - props.margin.right
    default:
      throw new Error(`invalid y.axis.at ${props.y.axis.at}`)
  }
}

function drawYLines (ctx, props) {
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

export function draw (ctx, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(
    0, 0,
    props.width,
    props.height
  )

  // style lines
  ctx.lineWidth = 1

  drawXLines(ctx, props)
  drawYLines(ctx, props)
}
