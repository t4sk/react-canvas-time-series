import { CanvasContext, Layout, YAxisAt } from "./types"
import { getCanvasY, stepBelow } from "./math"

const TICK_TEXT_PADDING = 5

interface DrawTickProps {
  yAxisAt: YAxisAt
  yAxisLineColor: string
  yAxisFont: string
  yAxisTextColor: string
  yMax: number
  yMin: number
  yTickLength: number
  renderYTick: (y: number) => string
}

function drawTick(
  ctx: CanvasContext,
  layout: Layout,
  props: DrawTickProps,
  y: number
) {
  const {
    yAxis: { top, left, height, width },
  } = layout

  const {
    yAxisAt,
    yAxisLineColor,
    yAxisFont,
    yAxisTextColor,
    yMax,
    yMin,
    yTickLength,
    renderYTick,
  } = props

  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  ctx.strokeStyle = yAxisLineColor
  ctx.font = yAxisFont
  ctx.fillStyle = yAxisTextColor
  ctx.textAlign = yAxisAt === "left" ? "right" : "left"
  ctx.textBaseline = "middle"

  if (yAxisAt === "left") {
    ctx.beginPath()
    ctx.moveTo(left + width, canvasY)
    ctx.lineTo(left + width - yTickLength, canvasY)
    ctx.stroke()

    ctx.fillText(
      renderYTick(y),
      left + width - yTickLength - TICK_TEXT_PADDING,
      canvasY
    )
  } else if (yAxisAt === "right") {
    ctx.beginPath()
    ctx.moveTo(left, canvasY)
    ctx.lineTo(left + yTickLength, canvasY)
    ctx.stroke()

    ctx.fillText(
      renderYTick(y),
      left + yTickLength + TICK_TEXT_PADDING,
      canvasY
    )
  }
}

interface DrawLineProps {
  yLineColor: string
  yMax: number
  yMin: number
}

function drawLine(
  ctx: CanvasContext,
  layout: Layout,
  props: DrawLineProps,
  y: number
) {
  const {
    graph: { top, left, height, width },
  } = layout

  const { yLineColor, yMax, yMin } = props

  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  ctx.strokeStyle = yLineColor

  ctx.beginPath()
  ctx.moveTo(left, canvasY)
  ctx.lineTo(left + width, canvasY)
  ctx.stroke()
}

interface DrawProps {
  showYLine: boolean
  yAxisAt: YAxisAt
  yAxisLineColor: string
  yTicks: number[]
  yTickInterval: number
  yAxisFont: string
  yAxisTextColor: string
  yMin: number
  yMax: number
  yTickLength: number
  renderYTick: (y: number) => string
  yLineColor: string
}

export function draw(ctx: CanvasContext, layout: Layout, props: DrawProps) {
  const {
    yAxis: { top, left, height, width },
  } = layout

  const {
    showYLine,
    yAxisAt,
    yAxisLineColor,
    yTicks,
    yTickInterval,
    yMin,
    yMax,
  } = props

  // style y axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = yAxisLineColor

  if (yAxisAt === "left") {
    ctx.beginPath()
    ctx.moveTo(left + width, top)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  } else if (yAxisAt === "right") {
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left, top + height)
    ctx.stroke()
  }

  if (yTickInterval > 0) {
    const y0 = stepBelow(yMin, yTickInterval)

    for (let y = y0; y <= yMax; y += yTickInterval) {
      if (y < yMin) {
        continue
      }

      drawTick(ctx, layout, props, y)

      if (showYLine) {
        drawLine(ctx, layout, props, y)
      }
    }
  }

  for (const y of yTicks) {
    if (y < yMin || y > yMax) {
      continue
    }

    drawTick(ctx, layout, props, y)

    if (showYLine) {
      drawLine(ctx, layout, props, y)
    }
  }
}
