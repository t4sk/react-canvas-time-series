//@flow
import {round, floor, linear, linearTransformer} from './util'
import {NUM_HORIZONTAL_INTERVALS} from './background'

type Canvas = any

type BarChart = {
  height: number,
}

type Props = {
  candlestick: {
    bull: {
      color: string,
    },
    bear: {
      color: string,
    },
  },
}

type Metric = {
  width: number,
  scaleY: number,
  toCanvasX: number => number,
  toCanvasY: number => number,
}

type Price = {
  high: number,
  low: number,
  open: number,
  close: number,
  timestamp: number,
}

type GlobalMetric = {
  xMin: number,
  xMax: number,
  xInterval: number,
  yMin: number,
  yMax: number,
}

function drawCandlestick(ctx: Canvas, props: Props, metric: Metric, price: Price) {
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

function drawCandlesticks(ctx: Canvas, props: Props, metric: GlobalMetric, data: Array<Price>) {
  // TODO move computation to drawData
  const {xMin, xMax, xInterval, yMin, yMax} = metric

  const toCanvasX = linearTransformer({
    dy: ctx.canvas.width,
    dx: xMax - xMin,
    y0: -ctx.canvas.width * xMin / (xMax - xMin),
  })

  const toCanvasY = linearTransformer({
    dy: -ctx.canvas.height,
    dx: yMax - yMin,
    y0: ctx.canvas.height * yMax / (yMax - yMin)
  })

  const scaleX = ctx.canvas.width / (xMin - xMax)
  const scaleY = ctx.canvas.height / (yMax - yMin)
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

function drawVolumesBarChart(ctx: Canvas, barChart: BarChart, props: Props, metric: GlobalMetric, data: Array<Price>) {
  // TODO move computation to drawData
  const {xMin, xMax, yInterval, xInterval} = metric

  const toCanvasX = linearTransformer({
    dy: ctx.canvas.width,
    dx: xMax - xMin,
    y0: -ctx.canvas.width * xMin / (xMax - xMin),
  })

  const maxVolume = Math.max(...data.map(price => price.volume))

  const toCanvasHeight = linearTransformer({
    dy: barChart.height,
    dx: maxVolume,
    y0: 0,
  })

  // draw line at max volume
  ctx.strokeStyle = "lightgrey"
  const canvasYMax = ctx.canvas.height - toCanvasHeight(maxVolume)
  ctx.moveTo(0, canvasYMax + 0.5)
  ctx.lineTo(ctx.canvas.width, canvasYMax + 0.5)
  ctx.stroke()

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

const BAR_CHART_MARGIN_TOP = 10

export function drawData(ctx: Canvas, props: Props, metric: GlobalMetric, data: Array<Price>) {
  drawCandlesticks(ctx, props, metric, data)

  const barChartHeight = floor(
     2 * ctx.canvas.height / NUM_HORIZONTAL_INTERVALS
  ) - BAR_CHART_MARGIN_TOP

  const barChart = {
    height: barChartHeight,
  }

  drawVolumesBarChart(ctx, barChart, props, metric, data)
}
