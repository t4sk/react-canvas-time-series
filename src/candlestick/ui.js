import {round, linear} from './util'
// TODO remove num horizontal intervals
import {
  NUM_HORIZONTAL_INTERVALS,
} from './background'

const Y_LABEL_WIDTH = 50
const Y_LABEL_HEIGHT = 20

export function getNearestPriceAtX(x, delta, data) {
  let low = 0, high = data.length - 1

  // binary search
  while (low < high) {
    let mid = (low + high) / 2 >> 0

    if (data[mid].timestamp > x + delta) {
      high = mid
    } else if (data[mid].timestamp < x - delta) {
      low = mid + 1
    } else {
      // Math.abs(data[mid].timestamp - x) <= delta
      return data[mid]
    }
  }

  return data[low]
}

export function drawUI(ctx, props, mouse, data) {
  // TODO pass min / max data as input
  const minTimestamp = data[0].timestamp
  const maxTimestamp = data[data.length - 1].timestamp
  const xInterval = Math.ceil((maxTimestamp - minTimestamp) / (data.length - 1))
  const maxVolume = Math.max(...data.map(d => d.volume))
  const minLow = Math.min(...data.map(d => d.low))
  const maxHigh = Math.max(...data.map(d => d.high))
  // // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
  const yInterval = Math.ceil((maxHigh - minLow) / (NUM_HORIZONTAL_INTERVALS - 2))

  // TODO put metric inside data
  const metric = {
    maxVolume,
    xMin: minTimestamp - round(xInterval / 2),
    xMax: maxTimestamp + round(xInterval / 2),
    yMin: minLow - yInterval,
    yMax: maxHigh + yInterval,
    xInterval,
    yInterval,
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  drawLatestPriceLabel(ctx, props, metric, data[data.length - 1])

  // dont draw if mouse not inside data layer
  if (
    !mouse.canvasX ||
    mouse.canvasX <= 0 ||
    mouse.canvasX > ctx.canvas.width - props.background.yAxisPaddRight
  ) {
    return
  }

  if (
    !mouse.canvasY ||
    mouse.canvasY <= 0 ||
    mouse.canvasY > ctx.canvas.height - props.background.xAxisPaddBottom
  ) {
    return
  }

  // TODO pass data layer size as input from index.js
  const BAR_CHART_HEIGHT = 73
  // TODO remove me
  // dataLayer does not make sense?
  const dataLayer = {
    width: ctx.canvas.width - props.background.yAxisPaddRight,
    height: ctx.canvas.height - BAR_CHART_HEIGHT - props.background.xAxisPaddBottom
  }

  drawDataAtMouseX(ctx, dataLayer, mouse, metric, data)

  if (mouse.canvasY < ctx.canvas.height - BAR_CHART_HEIGHT - props.background.xAxisPaddBottom) {
    drawPriceLine(ctx, dataLayer, mouse, metric)
  } else {
    drawVolumeLine(ctx, dataLayer, mouse, metric)
  }

  drawTimestampLine(ctx, props, dataLayer, mouse, metric)
}

function drawDataAtMouseX(ctx, dataLayer, mouse, metric, data) {
  const xAtMouse = linear({
    dy: metric.xMax - metric.xMin,
    dx: dataLayer.width,
    x: mouse.canvasX,
    y0: metric.xMin,
  })

  const price = getNearestPriceAtX(xAtMouse, round(metric.xInterval / 2), data)

  const {open, high, low, close, volume} = price
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

  x += numWidth

  // volume
  ctx.fillStyle = "black"
  ctx.fillText("Volume:", x, y)

  x += ctx.measureText("Volume:").width + margin

  ctx.fillStyle = color
  ctx.fillText(volume, x, y)
}

function drawYLabel(ctx, dataLayer, props) {
  const {
    canvasY,
    y,
    fillStyle,
  } = props

  // label
  ctx.fillStyle = fillStyle || "black"

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    dataLayer.width - 5,
    canvasY,
  )
  ctx.lineTo(
    dataLayer.width,
    canvasY - round(Y_LABEL_HEIGHT / 2),
  )
  ctx.lineTo(
    dataLayer.width,
    canvasY + round(Y_LABEL_HEIGHT / 2),
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    dataLayer.width,
    canvasY - round(Y_LABEL_HEIGHT / 2),
    Y_LABEL_WIDTH, Y_LABEL_HEIGHT
  )

  // label text
  ctx.font = "12px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"

  ctx.fillText(
    y.toFixed(2),
    dataLayer.width + 10,
    canvasY,
  )
}

function drawLatestPriceLabel(ctx, props, metric, price) {
  const {open, close} = price

  // TODO move bar chart height up
  const BAR_CHART_HEIGHT = 73
  const dataLayer = {
    width: ctx.canvas.width - props.background.yAxisPaddRight,
    height: ctx.canvas.height - BAR_CHART_HEIGHT - props.background.xAxisPaddBottom,
  }

  const {yMin, yMax} = metric
  const canvasY = linear({
    dy: dataLayer.height,
    dx: yMax - yMin,
    x: yMax - close,
    y0: 0,
  })

  drawYLabel(ctx, dataLayer, {
    canvasY,
    y: close,
    fillStyle: open <= close ? props.ui.latestPriceLabel.bull.color : props.ui.latestPriceLabel.bear.color,
  })
}

function drawPriceLine(ctx, dataLayer, mouse, metric) {
  const {canvasY} = mouse
  const {yMin, yMax} = metric

  // line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(0, canvasY)
  ctx.lineTo(dataLayer.width, canvasY)
  ctx.stroke()

  const y = linear({
    dy: yMax - yMin,
    dx: dataLayer.height,
    x: dataLayer.height - canvasY,
    y0: yMin,
  })

  drawYLabel(ctx, dataLayer, {
    canvasY,
    y,
  })
}

function drawVolumeLine(ctx, dataLayer, mouse, metric) {
  const {canvasY} = mouse
  const {maxVolume} = metric

  // line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(0, canvasY)
  ctx.lineTo(dataLayer.width, canvasY)
  ctx.stroke()

  // TODO get bar chart height from inde.js
  const barChartHeight = 73
  const y = linear({
    dy: maxVolume,
    dx: barChartHeight,
    x: dataLayer.height - canvasY,
    y0: maxVolume,
  })

  drawYLabel(ctx, dataLayer, {
    canvasY,
    y,
  })
}

function drawTimestampLine(ctx, props, dataLayer, mouse, metric) {
  // TODO height from input
  const height = ctx.canvas.height - props.background.xAxisPaddBottom

  const {canvasX} = mouse
  const {xMin, xMax} = metric

  // timestamp line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(canvasX, 0)
  ctx.lineTo(canvasX, height)
  ctx.stroke()

  // label
  ctx.fillStyle = "black"

  const X_LABEL_HEIGHT = 20
  const X_LABEL_WIDTH = 80

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    canvasX,
    height - 5,
  )
  ctx.lineTo(
    canvasX - 5,
    height,
  )
  ctx.lineTo(
    canvasX + 5,
    height,
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    canvasX - round(X_LABEL_WIDTH / 2),
    height,
    X_LABEL_WIDTH,
    X_LABEL_HEIGHT,
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
    height + 10,
  )
}
