//@flow
import {round, linear} from './util'
import {
  SCALE_X_HEIGHT,
  SCALE_Y_WIDTH,
  NUM_HORIZONTAL_INTERVALS,
} from './background'

type Canvas = any

type Props = {

}

type DataLayer = {
  width: number,
  height: number,
}

type Metric = {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}

type Price = {
  high: number,
  low: number,
  open: number,
  close: number,
  timestamp: number,
}

type Mouse = {
  canvasX: number,
  canvasY: number,
}

// TODO render open, high, low, close at mouse x

export function drawUI(ctx: Canvas, props: Props, mouse: Mouse, data: Array<Price>) {
  // TODO pass min / max data as input
  const minTimestamp = data[0].timestamp
  const maxTimestamp = data[data.length - 1].timestamp
  const xInterval = Math.ceil((maxTimestamp - minTimestamp) / (data.length - 1))
  const minLow = Math.min(...data.map(d => d.low))
  const maxHigh = Math.max(...data.map(d => d.high))
  // // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
  const yInterval = Math.ceil((maxHigh - minLow) / (NUM_HORIZONTAL_INTERVALS - 2))

  const metric = {
    xMin: minTimestamp - round(xInterval / 2),
    xMax: maxTimestamp + round(xInterval / 2),
    yMin: minLow - yInterval,
    yMax: maxHigh + yInterval,
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  drawLatestPriceLabel(
    ctx,
    props.latestPriceLabel,
    metric,
    data[data.length - 1]
  )

  // dont draw if mouse not inside data layer
  if (!mouse.canvasX || mouse.canvasX <= 0 || mouse.canvasX > ctx.canvas.width - SCALE_Y_WIDTH) {
    return
  }

  if (!mouse.canvasY || mouse.canvasY <= 0 || mouse.canvasY > ctx.canvas.height - SCALE_X_HEIGHT) {
    return
  }

  // TODO pass data layer size as input
  const dataLayer = {
    width: ctx.canvas.width - SCALE_Y_WIDTH,
    height: ctx.canvas.height - SCALE_X_HEIGHT,
  }

  drawDataAtMouseX(ctx, data[0])
  drawPriceLine(ctx, dataLayer, mouse, metric)
  drawTimestampLine(ctx, dataLayer, mouse, metric)
}

// TODO draw price at mouse
// TODO render color from props
function drawDataAtMouseX(ctx: Canvas, price: Price) {
  const {open, high, low, close} = price
  const color = open <= close ? "green" : "red"
  const margin = 5
  const numWidth = ctx.measureText("9999.99").width
  let x = 5
  const y = 15

  // open
  ctx.fillStyle = "black"
  ctx.fillText("Open:", x, y)

  x += ctx.measureText("Open:").width + margin

  ctx.fillStyle = color
  ctx.fillText(open.toFixed(2), x, y)

  x += numWidth

  // high
  ctx.fillStyle = "black"
  ctx.fillText("High:", x, y)

  x += ctx.measureText("High:").width + margin

  ctx.fillStyle = color
  ctx.fillText(high.toFixed(2), x, y)

  x += numWidth

  // low
  ctx.fillStyle = "black"
  ctx.fillText("Low:", x, y)

  x += ctx.measureText("Low:").width + margin

  ctx.fillStyle = color
  ctx.fillText(low.toFixed(2), x, y)

  x += numWidth

  // close
  ctx.fillStyle = "black"
  ctx.fillText("Close:", x, y)

  x += ctx.measureText("Close:").width + margin

  ctx.fillStyle = color
  ctx.fillText(close.toFixed(2), x, y)
}

function drawPriceLine(ctx: Canvas, dataLayer: DataLayer, mouse: Mouse, metric: Metric) {
  const {canvasY} = mouse
  const {yMin, yMax} = metric

  // price line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(0, canvasY)
  ctx.lineTo(dataLayer.width, canvasY)
  ctx.stroke()

  // label
  ctx.fillStyle = "black"

  const labelHeight = 20
  const labelWidth = SCALE_Y_WIDTH

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    dataLayer.width - 5,
    canvasY,
  )
  ctx.lineTo(
    dataLayer.width,
    canvasY - round(labelHeight / 2),
  )
  ctx.lineTo(
    dataLayer.width,
    canvasY + round(labelHeight / 2),
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    dataLayer.width,
    canvasY - round(labelHeight / 2),
    labelWidth, labelHeight
  )

  // label text
  ctx.font = "12px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"

  const y = linear({
    dy: yMax - yMin,
    dx: dataLayer.height,
    x: dataLayer.height - canvasY,
    y0: yMin,
  })

  ctx.fillText(
    y.toFixed(2),
    dataLayer.width + 10,
    canvasY,
  )
}

type YMetric = {
  yMin: number,
  yMax: number,
}

type LatestPriceLabelProps = {
  bull: {
    color: string,
  },
  bear: {
    color: string,
  },
}

export function drawLatestPriceLabel(
  ctx: Canvas, props: LatestPriceLabelProps, metric: YMetric, price: Price
) {
  const {open, close} = price

  const dataLayer = {
    width: ctx.canvas.width - SCALE_Y_WIDTH,
    height: ctx.canvas.height - SCALE_X_HEIGHT,
  }

  const {yMin, yMax} = metric
  const canvasY = linear({
    dy: dataLayer.height,
    dx: yMax - yMin,
    x: yMax - close,
    y0: 0,
  })

  ctx.fillStyle = open <= close ? props.bull.color : props.bear.color

  const labelHeight = 20
  const labelWidth = SCALE_Y_WIDTH

  // tip
  ctx.beginPath()
  ctx.moveTo(
    dataLayer.width - 5,
    canvasY,
  )
  ctx.lineTo(
    dataLayer.width,
    canvasY - round(labelHeight / 2),
  )
  ctx.lineTo(
    dataLayer.width,
    canvasY + round(labelHeight / 2),
  )
  ctx.fill()

  // rect
  ctx.fillRect(
    dataLayer.width,
    canvasY - round(labelHeight / 2),
    labelWidth, labelHeight
  )

  // text
  ctx.font = "12px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"

  ctx.fillText(
    close.toFixed(2),
    dataLayer.width + 10,
    canvasY,
  )
}

function drawTimestampLine(ctx: Canvas, dataLayer: DataLayer, mouse: Mouse, metric: Metric) {
  const {canvasX} = mouse
  const {xMin, xMax} = metric

  // timestamp line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(canvasX, 0)
  ctx.lineTo(canvasX, dataLayer.height)
  ctx.stroke()

  // label
  ctx.fillStyle = "black"

  const xLabelHeight = 20
  const xLabelWidth = 80

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    canvasX,
    dataLayer.height - 5,
  )
  ctx.lineTo(
    canvasX - 5,
    dataLayer.height,
  )
  ctx.lineTo(
    canvasX + 5,
    dataLayer.height,
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    canvasX - round(xLabelWidth / 2),
    dataLayer.height,
    xLabelWidth,
    xLabelHeight,
  )

  //label text
  ctx.font = "12px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "center"

  const x = linear({
    dy: xMax - xMin,
    dx: dataLayer.width,
    x: canvasX,
    y0: xMin,
  })

  ctx.fillText(
    x.toFixed(1),
    canvasX,
    dataLayer.height + 10,
  )
}
