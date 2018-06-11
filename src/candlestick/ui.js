//@flow
import {floor, linear} from './util'
import {
  SCALE_X_HEIGHT,
  SCALE_Y_WIDTH,
  NUM_HORIZONTAL_INTERVALS,
} from './background'

type Canvas = any

type Metric = {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}

type Data = {
  high: number,
  low: number,
  open: number,
  close: number,
  timestamp: number,
  // generic array propertis and methods
  length: number,
  map: any,
}

type MouseEvent = {
  clientX: number,
  clientY: number,
}

type Mouse = {
  canvasX: number,
  canvasY: number,
}

// TODO render mouseY -> price (reactive to changing with data)
// TODO render mouseX -> timestamp (reactive to changing with data)

export function drawUI(e: MouseEvent, ctx: Canvas, data: Data) {
  // TODO pass min / max data as input
  const minLow = Math.min(...data.map(d => d.low))
  const maxHigh = Math.max(...data.map(d => d.high))
  // // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
  const yInterval = Math.ceil((maxHigh - minLow) / (NUM_HORIZONTAL_INTERVALS - 2))

  const metric = {
    xMin: data[0].timestamp,
    xMax: data[data.length - 1].timestamp,
    yMin: minLow - yInterval,
    yMax: maxHigh + yInterval,
  }

  const rect = ctx.canvas.getBoundingClientRect()

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const mouse = {
    canvasX: e.clientX - rect.left,
    canvasY: e.clientY - rect.top,
  }

  // dont draw if mouse not inside data layer
  if (mouse.canvasX <= 0 || mouse.canvasX > ctx.canvas.width - SCALE_Y_WIDTH) {
    return
  }

  if (mouse.canvasY <= 0 || mouse.canvasY > ctx.canvas.height - SCALE_X_HEIGHT) {
    return
  }

  drawPriceLine(ctx, mouse, metric)
  drawTimestampLine(ctx, mouse, metric)
}

function drawPriceLine(ctx: Canvas, mouse: Mouse, metric: Metric) {
  const {canvasY} = mouse
  const {yMin, yMax} = metric

  // price line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(0, canvasY)
  ctx.lineTo(ctx.canvas.width - SCALE_Y_WIDTH, canvasY)
  ctx.stroke()

  // label
  ctx.fillStyle = "black"

  const labelHeight = 20
  const labelWidth = SCALE_Y_WIDTH

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    ctx.canvas.width - SCALE_Y_WIDTH - 5,
    canvasY,
  )
  ctx.lineTo(
    ctx.canvas.width - SCALE_Y_WIDTH,
    canvasY - floor(labelHeight / 2),
  )
  ctx.lineTo(
    ctx.canvas.width - SCALE_Y_WIDTH,
    canvasY + floor(labelHeight / 2),
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    ctx.canvas.width - SCALE_Y_WIDTH,
    canvasY - floor(labelHeight / 2),
    labelWidth, labelHeight
  )

  // label text
  ctx.font = "12px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"

  const y = linear({
    dy: yMax - yMin,
    dx: ctx.canvas.height - SCALE_X_HEIGHT,
    x: ctx.canvas.height - SCALE_X_HEIGHT - canvasY,
    y0: yMin,
  })

  ctx.fillText(
    y.toFixed(2),
    ctx.canvas.width - SCALE_Y_WIDTH + 10,
    canvasY,
  )
}

function drawTimestampLine(ctx: Canvas, mouse: Mouse, metric: Metric) {
  const {canvasX} = mouse
  const {xMin, xMax} = metric

  // timestamp line
  ctx.strokeStyle = "black"
  ctx.setLineDash([5, 5])

  ctx.moveTo(canvasX, 0)
  ctx.lineTo(canvasX, ctx.canvas.height - SCALE_X_HEIGHT)
  ctx.stroke()

  // label
  ctx.fillStyle = "black"

  const xLabelHeight = 20
  const xLabelWidth = 80

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    canvasX,
    ctx.canvas.height - SCALE_X_HEIGHT - 5,
  )
  ctx.lineTo(
    canvasX - 5,
    ctx.canvas.height - SCALE_X_HEIGHT,
  )
  ctx.lineTo(
    canvasX + 5,
    ctx.canvas.height - SCALE_X_HEIGHT,
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    canvasX - floor(xLabelWidth / 2),
    ctx.canvas.height - SCALE_X_HEIGHT,
    xLabelWidth,
    xLabelHeight,
  )

  //label text
  ctx.font = "12px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "center"

  const x = linear({
    dy: xMax - xMin,
    dx: ctx.canvas.width - SCALE_Y_WIDTH,
    x: canvasX,
    y0: xMin,
  })

  ctx.fillText(
    x.toFixed(1),
    canvasX,
    ctx.canvas.height - SCALE_X_HEIGHT + 10,
  )
}
