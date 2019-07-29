import { getCanvasX, stepBelow } from "./math"

const TICK_TEXT_PADDING = 10

function drawTick(ctx, layout, props, x) {
  const {
    xAxis: { top, left, width, height },
  } = layout

  const { xAxisAt, xTickLength, renderXTick, xMin, xMax } = props

  const canvasX = getCanvasX(width, left, xMax, xMin, x)

  if (xAxisAt == "top") {
    ctx.beginPath()
    ctx.moveTo(canvasX, top + height)
    ctx.lineTo(canvasX, top + height - xTickLength)
    ctx.stroke()

    ctx.fillText(
      renderXTick(x),
      canvasX,
      top + height - xTickLength - TICK_TEXT_PADDING
    )
  } else if (xAxisAt == "bottom") {
    ctx.beginPath()
    ctx.moveTo(canvasX, top)
    ctx.lineTo(canvasX, top + xTickLength)
    ctx.stroke()

    ctx.fillText(renderXTick(x), canvasX, top + xTickLength + TICK_TEXT_PADDING)
  }
}

export function draw(ctx, layout, props) {
  const {
    xAxis: { top, left, width, height },
  } = layout

  const {
    xAxisAt,
    xAxisLineColor,
    xTicks,
    xTickInterval,
    xAxisFont,
    xAxisTextColor,
    xMin,
    xMax,
  } = props

  // style x axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = xAxisLineColor

  if (xAxisAt == "top") {
    ctx.beginPath()
    ctx.moveTo(left, top + height)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  } else if (xAxisAt == "bottom") {
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left + width, top)
    ctx.stroke()
  }

  // style xTicks
  ctx.font = xAxisFont
  ctx.fillStyle = xAxisTextColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  if (xTickInterval) {
    const x0 = stepBelow(xMin, xTickInterval)

    for (let x = x0; x <= xMax; x += xTickInterval) {
      if (x < xMin) {
        continue
      }

      drawTick(ctx, layout, props, x)
    }
  }

  for (let x of xTicks) {
    if (x < xMin || x > xMax) {
      continue
    }

    drawTick(ctx, layout, props, x)
  }
}
