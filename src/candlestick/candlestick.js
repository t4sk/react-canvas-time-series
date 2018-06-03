//@flow
import {floor} from './util'

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

export function drawCandlestick(ctx: Canvas, props: Props, metric: Metric, data: Data) {
  const {x, width, yMin, scaleY,} = metric
  const {high, low, open, close} = data

  const y = ctx.canvas.height - scaleY * (Math.max(open, close) - yMin)
  const height = scaleY * Math.abs(open - close)

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
  ctx.lineTo(xCenter, y - scaleY * (high - Math.max(open, close)))
  ctx.stroke()

  // bottom wick
  ctx.beginPath()
  ctx.moveTo(xCenter, y + height)
  ctx.lineTo(xCenter, y + height + scaleY * (Math.min(open, close) - low))
  ctx.stroke()
}

export function drawCandlesticks(ctx: Canvas, props: Props) {
  const xMin = 100
  const xMax = 200
  const yMin = 30
  const yMax = 100

  const scaleX = floor(ctx.canvas.width / (xMax - xMin))
  const scaleY = floor(ctx.canvas.height / (yMax - yMin))

  const x1 = 110
  const x0 = 100
  const width = scaleX * (x1 - x0)

  for (let i = 0; i < DATA.length; i++) {
    drawCandlestick(ctx, props, {
      x: i * width,
      width,
      yMin,
      scaleY,
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
