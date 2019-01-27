import PropTypes from 'prop-types'
import { getCanvasX } from './math'

const TICK_TEXT_PADDING = 10

const propTypes = {
  at: PropTypes.oneOf(['top', 'bottom']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,

  lineWidth: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,

  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,

  font: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,

  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  tickHeight: PropTypes.number.isRequired,
  tickLineWidth: PropTypes.number.isRequired,
  tickLineColor: PropTypes.string.isRequired,
  renderTick: PropTypes.func.isRequired,
}

const defaultProps = {
  lineWidth: 1,
  lineColor: '',
  font: '',
  textColor: '',
  ticks: [],
  tickHeight: 10,
  tickLineWidth: 1,
  tickLineColor: '',
  renderTick: x => x,
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
    lineWidth,
    lineColor,
    ticks,
    tickLineWidth,
    tickLineColor,
    tickHeight,
    renderTick,
    font,
    textColor,
    xMin,
    xMax,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'x-axis')

  // style x axis line
  ctx.lineWidth = lineWidth
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
  ctx.lineWidth = tickLineWidth
  ctx.strokeStyle = tickLineColor
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let tick of ticks) {
    const canvasX = getCanvasX(width, left, xMax, xMin, tick)

    if (at == 'top') {
      ctx.beginPath()
      ctx.moveTo(canvasX, top + height)
      ctx.lineTo(canvasX, top + height - tickHeight)
      ctx.stroke()

      ctx.fillText(
        renderTick(tick),
        canvasX,
        top + height - tickHeight - TICK_TEXT_PADDING
      )
    }
    else if (at == 'bottom') {
      ctx.beginPath()
      ctx.moveTo(canvasX, top)
      ctx.lineTo(canvasX, top + tickHeight)
      ctx.stroke()

      ctx.fillText(
        renderTick(tick),
        canvasX,
        top + tickHeight + TICK_TEXT_PADDING
      )
    }
  }
}
