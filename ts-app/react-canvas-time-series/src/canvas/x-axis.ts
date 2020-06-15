import { CanvasContext, Layout, XAxisAt } from "./types"
import { getCanvasX, stepBelow } from "./math"

const TICK_TEXT_PADDING = 10

interface DrawTickProps {
  xAxisAt: XAxisAt
  xAxisFont: string
  xAxisLineColor: string
  xAxisTextColor: string
  xTickLength: number
  renderXTick: (x: number) => string
  xMin: number
  xMax: number
}

function drawTick(
  ctx: CanvasContext,
  layout: Layout,
  props: DrawTickProps,
  x: number
) {
  const {
    xAxis: { top, left, width, height },
  } = layout

  const {
    xAxisAt,
    xAxisFont,
    xAxisLineColor,
    xAxisTextColor,
    xTickLength,
    renderXTick,
    xMin,
    xMax,
  } = props

  const canvasX = getCanvasX(width, left, xMax, xMin, x)

  ctx.font = xAxisFont
  ctx.fillStyle = xAxisTextColor
  ctx.strokeStyle = xAxisLineColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  if (xAxisAt === "top") {
    ctx.beginPath()
    ctx.moveTo(canvasX, top + height)
    ctx.lineTo(canvasX, top + height - xTickLength)
    ctx.stroke()

    ctx.fillText(
      renderXTick(x),
      canvasX,
      top + height - xTickLength - TICK_TEXT_PADDING
    )
  } else if (xAxisAt === "bottom") {
    ctx.beginPath()
    ctx.moveTo(canvasX, top)
    ctx.lineTo(canvasX, top + xTickLength)
    ctx.stroke()

    ctx.fillText(renderXTick(x), canvasX, top + xTickLength + TICK_TEXT_PADDING)
  }
}

interface DrawLineProps {
  xLineColor: string
  xMax: number
  xMin: number
}

function drawLine(
  ctx: CanvasContext,
  layout: Layout,
  props: DrawLineProps,
  x: number
) {
  const {
    graph: { left, top, width, height },
  } = layout

  const { xLineColor, xMax, xMin } = props

  const canvasX = getCanvasX(width, left, xMax, xMin, x)

  ctx.strokeStyle = xLineColor

  ctx.beginPath()
  ctx.moveTo(canvasX, top)
  ctx.lineTo(canvasX, top + height)
  ctx.stroke()
}

interface DrawProps {
  xAxisAt: XAxisAt
  xAxisLineColor: string
  xTicks: number[]
  xTickInterval: number
  showXLine: boolean
  xMin: number
  xMax: number
  xAxisFont: string
  xAxisTextColor: string
  xTickLength: number
  renderXTick: (x: number) => string
  xLineColor: string
}

export function draw(ctx: CanvasContext, layout: Layout, props: DrawProps) {
  const {
    xAxis: { top, left, width, height },
  } = layout

  const {
    xAxisAt,
    xAxisLineColor,
    xTicks,
    xTickInterval,
    showXLine,
    xMin,
    xMax,
  } = props

  // style x axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = xAxisLineColor

  if (xAxisAt === "top") {
    ctx.beginPath()
    ctx.moveTo(left, top + height)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  } else if (xAxisAt === "bottom") {
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left + width, top)
    ctx.stroke()
  }

  if (xTickInterval > 0) {
    const x0 = stepBelow(xMin, xTickInterval)

    for (let x = x0; x <= xMax; x += xTickInterval) {
      if (x < xMin) {
        continue
      }

      drawTick(ctx, layout, props, x)

      if (showXLine) {
        drawLine(ctx, layout, props, x)
      }
    }
  }

  for (let x of xTicks) {
    if (x < xMin || x > xMax) {
      continue
    }

    drawTick(ctx, layout, props, x)

    if (showXLine) {
      drawLine(ctx, layout, props, x)
    }
  }
}
