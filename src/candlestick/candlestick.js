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

export default function draw(ctx: Canvas, props: Props, metric: Metric, data: Data) {
  const {x, width, yMin, scaleY,} = metric
  const {high, low, open, close} = data

  const y = ctx.canvas.height - scaleY * (Math.max(open, close) - yMin)
  const height = scaleY * Math.abs(open - close)

  if (open <= close) {
    ctx.strokeStyle = props.candlestick.bull.color
    ctx.strokeRect(x, y, width, height)
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
