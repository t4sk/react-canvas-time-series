//@flow
import {round, linear, linearTransformer} from './util'

type Canvas = any

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

type Data = {
  high: number,
  low: number,
  open: number,
  close: number,
  timestamp: number,
}

export function drawCandlestick(ctx: Canvas, props: Props, metric: Metric, data: Data) {
  const {width, scaleY, toCanvasX, toCanvasY} = metric
  const {high, low, open, close, timestamp} = data

  const x = round(toCanvasX(timestamp))
  const y = round(toCanvasY(Math.max(open, close)))

  const height = round(scaleY * Math.abs(open - close))
  const halfWidth = round(width / 2)

  ctx.strokeStyle ="black"
  if (open <= close) {
    //TODO google function to fill and stroke at once?
    ctx.fillStyle = props.candlestick.bull.color
    ctx.fillRect(x - halfWidth, y, width, height)
    ctx.strokeRect(x - halfWidth, y, width, height)
  } else {
    ctx.fillStyle = props.candlestick.bear.color
    ctx.fillRect(x - halfWidth, y, width, height)
    ctx.strokeRect(x - halfWidth, y, width, height)
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

type GlobalMetric = {
  xMin: number,
  xMax: number,
  xInterval: number,
  yMin: number,
  yMax: number,
}

export function drawCandlesticks(ctx: Canvas, props: Props, metric: GlobalMetric, data: Array<Data>) {
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
