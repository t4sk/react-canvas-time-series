import { getCanvasY, stepBelow } from "./math"

const TICK_TEXT_PADDING = 5

function drawTick(ctx, layout, props, y) {
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
  ctx.textAlign = yAxisAt == "left" ? "right" : "left"
  ctx.textBaseline = "middle"

  if (yAxisAt == "left") {
    ctx.beginPath()
    ctx.moveTo(left + width, canvasY)
    ctx.lineTo(left + width - yTickLength, canvasY)
    ctx.stroke()

    ctx.fillText(
      renderYTick(y),
      left + width - yTickLength - TICK_TEXT_PADDING,
      canvasY
    )
  } else if (yAxisAt == "right") {
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

function drawLine(ctx, layout, props, y) {
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

export function draw(ctx, layout, props) {
  const {
    yAxis: { top, left, height, width },
  } = layout

  const {
    showYLine,
    yAxisAt,
    yAxisLineColor,
    yTicks,
    yTickInterval,
    yAxisFont,
    yAxisTextColor,
    yMin,
    yMax,
  } = props

  // style y axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = yAxisLineColor

  if (yAxisAt == "left") {
    ctx.beginPath()
    ctx.moveTo(left + width, top)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  } else if (yAxisAt == "right") {
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

  for (let y of yTicks) {
    if (y < yMin || y > yMax) {
      continue
    }

    drawTick(ctx, layout, props, y)

    if (showYLine) {
      drawLine(ctx, layout, props, y)
    }
  }
}
