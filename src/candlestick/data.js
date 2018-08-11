import {round, floor, linear, linearTransformer} from './util'

// TODO put metric inside data
function drawCandlestick(ctx, props, metric, price) {
  const {width, scaleY, toCanvasX, toCanvasY} = metric
  const {high, low, open, close, timestamp} = price

  const x = round(toCanvasX(timestamp))
  const y = round(toCanvasY(Math.max(open, close)))

  const height = round(scaleY * Math.abs(open - close))
  const halfWidth = round(width / 2)

  if (open <= close) {
    ctx.strokeStyle = props.candlestick.bull.color
  } else {
    ctx.strokeStyle = props.candlestick.bear.color
  }

  if (open <= close) {
    ctx.fillStyle = props.candlestick.bull.color
    ctx.fillRect(x - halfWidth, y, width, height)
  } else {
    ctx.fillStyle = props.candlestick.bear.color
    ctx.fillRect(x - halfWidth, y, width, height)
  }

  // top wick
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, round(toCanvasY(high)))
  ctx.stroke()

  // bottom wick
  ctx.beginPath()
  ctx.moveTo(x, y + height)
  ctx.lineTo(x, round(toCanvasY(low)))
  ctx.stroke()
}

function drawCandlesticks(ctx, props, metric, data) {
  // TODO move computation to drawData
  const {xMin, xMax, xInterval, yMin, yMax} = metric

  const {
    volumeBarChart
  } = props
  const height = ctx.canvas.height - volumeBarChart.height

  const toCanvasX = linearTransformer({
    dy: ctx.canvas.width,
    dx: xMax - xMin,
    y0: -ctx.canvas.width * xMin / (xMax - xMin),
  })

  const toCanvasY = linearTransformer({
    dy: -height,
    dx: yMax - yMin,
    y0: height * yMax / (yMax - yMin)
  })

  const scaleX = ctx.canvas.width / (xMin - xMax)
  const scaleY = height / (yMax - yMin)
  // width of each candle
  const width = round(scaleX * xInterval)

  for (let i = 0; i < data.length; i++) {
    drawCandlestick(ctx, props, {
      width,
      scaleY,
      toCanvasX,
      toCanvasY,
    }, data[i])
  }
}

function drawVolumesBarChart(ctx, props, metric, data) {
  // TODO move computation to drawData
  const {xMin, xMax, yInterval, xInterval} = metric
  const {
    volumeBarChart
  } = props

  const toCanvasX = linearTransformer({
    dy: ctx.canvas.width,
    dx: xMax - xMin,
    y0: -ctx.canvas.width * xMin / (xMax - xMin),
  })

  const maxVolume = Math.max(...data.map(price => price.volume))

  const toCanvasHeight = linearTransformer({
    dy: volumeBarChart.height,
    dx: maxVolume,
    y0: 0,
  })

  const scaleX = ctx.canvas.width / (xMin - xMax)
  // width of each bar
  const width = round(scaleX * xInterval)
  const halfWidth = round(width / 2)

  for (let i = 0; i < data.length; i++) {
    const price = data[i]
    const {open, close, timestamp, volume} = price

    const height = round(toCanvasHeight(volume))
    const x = round(toCanvasX(timestamp))
    const y = ctx.canvas.height - height

    if (open <= close) {
      ctx.fillStyle = props.candlestick.bull.color
      ctx.fillRect(x - halfWidth, y, width, height)
    } else {
      ctx.fillStyle = props.candlestick.bear.color
      ctx.fillRect(x - halfWidth, y, width, height)
    }
  }
}

export function drawData(ctx, props, metric, data) {
  drawCandlesticks(ctx, props, metric, data)
  drawVolumesBarChart(ctx, props, metric, data)
}
