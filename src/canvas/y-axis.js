import PropTypes from "prop-types"
import { getCanvasY, stepBelow } from "./math"
import * as yLabel from "./y-label"

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

  tickInterval: PropTypes.number.isRequired,
  tickLength: PropTypes.number.isRequired,
  renderTick: PropTypes.func.isRequired,

  labels: PropTypes.arrayOf(
    PropTypes.shape({
      y: PropTypes.number,
    })
  ).isRequired,
}

const defaultProps = {
  lineColor: "black",
  font: "",
  textColor: "black",
  tickInterval: 1,
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
    tickLength,
    renderTick,
    font,
    textColor,
    yMin,
    yMax,
    labels,
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

      ctx.fillText(
        renderTick(y),
        left + tickLength + TICK_TEXT_PADDING,
        canvasY
      )
    }
  }

  for (let label of labels) {
    if (label.y === undefined) {
      return
    }

    if (at == "left") {
      yLabel.draw(ctx, {
        axisAt: at,
        rect: {
          top,
          left,
          height,
          width: width - tickLength,
        },
        yMin,
        yMax,
        ...label,
      })
    } else if (at == "right") {
      yLabel.draw(ctx, {
        axisAt: at,
        rect: {
          top,
          left: left + tickLength,
          height,
          width: width - tickLength,
        },
        yMin,
        yMax,
        ...label,
      })
    }
  }
}
