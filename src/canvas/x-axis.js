import PropTypes from 'prop-types'
import * as xLabel from './x-label'
import { getCanvasX } from './math'

const TICK_TEXT_PADDING = 10

const propTypes = {
  at: PropTypes.oneOf(['top', 'bottom']).isRequired,
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
  tickLength: PropTypes.number.isRequired,
  renderTick: PropTypes.func.isRequired,

  labels: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number
  })).isRequired,
}

const defaultProps = {
  lineColor: '',
  font: '',
  textColor: '',
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

export function draw(ctx, props) {
  const {
    at,
    width,
    height,
    left,
    top,
    lineColor,
    ticks,
    tickLength,
    renderTick,
    font,
    textColor,
    xMin,
    xMax,
    labels,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'x-axis')

  // style x axis line
  ctx.lineWidth = 1
  ctx.strokeStyle = lineColor

  if (at == 'top') {
    ctx.beginPath()
    ctx.moveTo(left, top + height)
    ctx.lineTo(width, top + height)
    ctx.stroke()
  }
  else if (at == 'bottom') {
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(width, top)
    ctx.stroke()
  }

  // style ticks
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let tick of ticks) {
    const canvasX = getCanvasX(width, left, xMax, xMin, tick)

    if (at == 'top') {
      ctx.beginPath()
      ctx.moveTo(canvasX, top + height)
      ctx.lineTo(canvasX, top + height - tickLength)
      ctx.stroke()

      ctx.fillText(
        renderTick(tick),
        canvasX,
        top + height - tickLength - TICK_TEXT_PADDING
      )
    }
    else if (at == 'bottom') {
      ctx.beginPath()
      ctx.moveTo(canvasX, top)
      ctx.lineTo(canvasX, top + tickLength)
      ctx.stroke()

      ctx.fillText(
        renderTick(tick),
        canvasX,
        top + tickLength + TICK_TEXT_PADDING
      )
    }
  }

  for (let label of labels) {
    if (!label.x) {
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
    }
    else if (at == "bottom") {
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
