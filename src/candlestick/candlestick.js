//@flow
import {floor, linear, linearTransformer} from './util'

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

  const x = floor(toCanvasX(timestamp))
  const y = floor(toCanvasY(Math.max(open, close)))

  const height = floor(scaleY * Math.abs(open - close))

  if (open <= close) {
    ctx.strokeStyle = props.candlestick.bull.color
    ctx.fillStyle = props.candlestick.bull.color
    ctx.fillRect(x, y, width, height)
  } else {
    ctx.strokeStyle = props.candlestick.bear.color
    ctx.fillStyle = props.candlestick.bear.color
    ctx.fillRect(x, y, width, height)
  }

  const xCenter = x + floor(width / 2)
  // top wick
  ctx.beginPath()
  ctx.moveTo(xCenter, y)
  ctx.lineTo(xCenter, floor(toCanvasY(high)))
  ctx.stroke()

  // bottom wick
  ctx.beginPath()
  ctx.moveTo(xCenter, y + height)
  ctx.lineTo(xCenter, floor(toCanvasY(low)))
  ctx.stroke()
}

export function drawCandlesticks(ctx: Canvas, props: Props, data: Array<Data>) {
  const xMin = 100
  const xMax = 200
  const xInterval = 10
  const yMin = 30
  const yMax = 100

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
  const width = floor(scaleX * xInterval)

  for (let i = 0; i < data.length; i++) {
    drawCandlestick(ctx, props, {
      width,
      scaleY,
      toCanvasX,
      toCanvasY,
    }, data[i])
  }
}
