import PropTypes from "prop-types"
import { getCanvasX, stepBelow } from "./math"

const TICK_TEXT_PADDING = 10

const propTypes = {
  at: PropTypes.oneOf(["top", "bottom"]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,

  lineColor: PropTypes.string.isRequired,

  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,

  font: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,

  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  tickInterval: PropTypes.number,
  tickLength: PropTypes.number.isRequired,
  renderTick: PropTypes.func.isRequired,
}

const defaultProps = {
  lineColor: "black",
  font: "",
  textColor: "black",
  ticks: [],
  tickLength: 10,
  renderTick: x => x,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function drawTick(ctx, props) {
  const {
    at,
    width,
    height,
    left,
    top,
    tickLength,
    renderTick,
    xMin,
    xMax,
    x,
  } = props

  const canvasX = getCanvasX(width, left, xMax, xMin, x)

  if (at == "top") {
    ctx.beginPath()
    ctx.moveTo(canvasX, top + height)
    ctx.lineTo(canvasX, top + height - tickLength)
    ctx.stroke()

    ctx.fillText(
      renderTick(x),
      canvasX,
      top + height - tickLength - TICK_TEXT_PADDING
    )
  } else if (at == "bottom") {
    ctx.beginPath()
    ctx.moveTo(canvasX, top)
    ctx.lineTo(canvasX, top + tickLength)
    ctx.stroke()

    ctx.fillText(renderTick(x), canvasX, top + tickLength + TICK_TEXT_PADDING)
  }
}

export function draw(ctx, props) {
  props = setDefaults(props)

  const {
    at,
    width,
    height,
    left,
    top,
    lineColor,
    ticks,
    tickInterval,
    tickLength,
    renderTick,
    font,
    textColor,
    xMin,
    xMax,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "x-axis")

  // style x axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = lineColor

  if (at == "top") {
    ctx.beginPath()
    ctx.moveTo(left, top + height)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  } else if (at == "bottom") {
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left + width, top)
    ctx.stroke()
  }

  // style ticks
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  if (tickInterval) {
    const x0 = stepBelow(xMin, tickInterval)

    for (let x = x0; x <= xMax; x += tickInterval) {
      if (x < xMin) {
        continue
      }

      drawTick(ctx, {
        ...props,
        x,
      })
    }
  }

  for (let x of ticks) {
    if (x < xMin || x > xMax) {
      continue
    }

    drawTick(ctx, {
      ...props,
      x,
    })
  }
}
