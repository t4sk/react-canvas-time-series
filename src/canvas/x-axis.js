import PropTypes from "prop-types"
import { getCanvasX, stepBelow } from "./math"
import * as xLabel from "./x-label"

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

  tickInterval: PropTypes.number,
  ticks: PropTypes.arrayOf(PropTypes.number),
  tickLength: PropTypes.number.isRequired,
  renderTick: PropTypes.func.isRequired,

  labels: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
    })
  ).isRequired,
}

const defaultProps = {
  lineColor: "black",
  font: "",
  textColor: "black",
  ticks: [],
  tickLength: 10,
  renderTick: x => x,
  labels: [],
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
    tickInterval,
    ticks,
    tickLength,
    renderTick,
    font,
    textColor,
    xMin,
    xMax,
    labels,
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

  for (let tick of ticks) {
    if (tick < xMin || tick > xMax) {
      continue
    }

    drawTick(ctx, {
      ...props,
      x: tick,
    })
  }

  for (let label of labels) {
    if (label.x === undefined) {
      return
    }

    if (at == "top") {
      xLabel.draw(ctx, {
        axisAt: at,
        rect: {
          top,
          left,
          height: height - tickLength,
          width,
        },
        xMin,
        xMax,
        ...label,
      })
    } else if (at == "bottom") {
      xLabel.draw(ctx, {
        axisAt: at,
        rect: {
          top: top + tickLength,
          left,
          height: height - tickLength,
          width,
        },
        xMin,
        xMax,
        ...label,
      })
    }
  }
}
