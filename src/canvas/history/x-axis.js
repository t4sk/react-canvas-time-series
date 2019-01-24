import PropTypes from 'prop-types'
import { getCanvasX } from './math'

const TICK_TEXT_TOP_PADDING = 10

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,

  xAxisHeight: PropTypes.number.isRequired,
  xAxisColor: PropTypes.string.isRequired,

  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,

  tickHeight: PropTypes.number.isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  renderTick: PropTypes.func.isRequired,
  font: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
}

export function draw(ctx, props) {
  const {
    width,
    height,
    xAxisHeight,
    xAxisColor,
    xMin,
    xMax,
    tickHeight,
    ticks,
    renderTick,
    font,
    textColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, 'prop', 'drawAxes')

  // style x axis
  ctx.lineWidth = 1
  ctx.strokeStyle = xAxisColor

  const graphHeight = height - xAxisHeight

  ctx.beginPath()
  ctx.moveTo(0, graphHeight)
  ctx.lineTo(width, graphHeight)
  ctx.stroke()

  // style ticks
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let tick of ticks) {
    const canvasX = getCanvasX(width, xMax, xMin, tick)

    ctx.beginPath()
    ctx.moveTo(canvasX, graphHeight)
    ctx.lineTo(canvasX, graphHeight + tickHeight)
    ctx.stroke()

    ctx.fillText(
      renderTick(tick),
      canvasX,
      graphHeight + tickHeight + TICK_TEXT_TOP_PADDING
    )
  }
}
