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
  x: number,
  width: number,
  yMin: number,
  scaleY: number,
}

type Data = {
  high: number,
  low: number,
  open: number,
  close: number,
}

// TODO fix flow
export function drawCandlestick(ctx: Canvas, props: Props, metric: Metric, data: Data) {
  const {xMin, xMax, yMin, yMax, xInterval, toCanvasX, toCanvasY} = metric
  const {high, low, open, close, timestamp} = data

  const x = floor(toCanvasX(timestamp))
  const y = floor(toCanvasY(Math.max(open, close)))

  const scaleX = ctx.canvas.width / (xMin - xMax)
  const scaleY = ctx.canvas.height / (yMax - yMin)
  const width = floor(scaleX * xInterval)
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

export function drawCandlesticks(ctx: Canvas, props: Props) {
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

  for (let i = 0; i < DATA.length; i++) {
    drawCandlestick(ctx, props, {
      xMin,
      xMax,
      xInterval,
      yMin,
      yMax,
      toCanvasX,
      toCanvasY,
    }, DATA[i])
  }
}

const DATA = [{
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 100
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 110,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 120
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 130,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 140
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 150,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 160
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 170,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 180
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 190,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 200
}]
