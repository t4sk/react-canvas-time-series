import PropTypes from "prop-types"
import { getCanvasY, stepBelow } from "./math"

const TICK_TEXT_PADDING = 5

const propTypes = {
  at: PropTypes.oneOf(["left", "right"]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,

  lineColor: PropTypes.string.isRequired,

  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,

  font: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,

  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  tickInterval: PropTypes.number.isRequired,
  tickLength: PropTypes.number.isRequired,
  renderTick: PropTypes.func.isRequired,
}

const defaultProps = {
  lineColor: "black",
  font: "",
  textColor: "black",
  ticks: [],
  tickInterval: 1,
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
    top,
    left,
    height,
    width,
    yMax,
    yMin,
    y,
    tickLength,
    renderTick,
  } = props

  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  if (at == "left") {
    ctx.beginPath()
    ctx.moveTo(left + width, canvasY)
    ctx.lineTo(left + width - tickLength, canvasY)
    ctx.stroke()

    ctx.fillText(
      renderTick(y),
      left + width - tickLength - TICK_TEXT_PADDING,
      canvasY
    )
  } else if (at == "right") {
    ctx.beginPath()
    ctx.moveTo(left, canvasY)
    ctx.lineTo(left + tickLength, canvasY)
    ctx.stroke()

    ctx.fillText(renderTick(y), left + tickLength + TICK_TEXT_PADDING, canvasY)
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
    font,
    textColor,
    yMin,
    yMax,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "y-axis")

  // style y axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = lineColor

  if (at == "left") {
    ctx.beginPath()
    ctx.moveTo(left + width, top)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  } else if (at == "right") {
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left, top + height)
    ctx.stroke()
  }

  // style ticks
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = at == "left" ? "right" : "left"
  ctx.textBaseline = "middle"

  const y0 = stepBelow(yMin, tickInterval)

  for (let y = y0; y <= yMax; y += tickInterval) {
    if (y < yMin) {
      continue
    }

    drawTick(ctx, {
      ...props,
      y,
    })
  }

  for (let y of ticks) {
    if (y < yMin || y > yMax) {
      continue
    }

    drawTick(ctx, {
      ...props,
      y,
    })
  }
}
