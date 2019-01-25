import PropTypes from 'prop-types'
import { getCanvasX } from '../math'

const TICK_TEXT_TOP_PADDING = 10

const propTypes = {
  graph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,

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
    graph,
    xAxisColor,
    xMin,
    xMax,
    tickHeight,
    ticks,
    renderTick,
    font,
    textColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, 'prop', 'x-axis')

  // style x axis
  ctx.lineWidth = 1
  ctx.strokeStyle = xAxisColor

  ctx.beginPath()
  ctx.moveTo(0, graph.height)
  ctx.lineTo(graph.width, graph.height)
  ctx.stroke()

  // style ticks
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  for (let tick of ticks) {
    const canvasX = getCanvasX(graph.width, 0, xMax, xMin, tick)

    ctx.beginPath()
    ctx.moveTo(canvasX, graph.height)
    ctx.lineTo(canvasX, graph.height + tickHeight)
    ctx.stroke()

    ctx.fillText(
      renderTick(tick),
      canvasX,
      graph.height + tickHeight + TICK_TEXT_TOP_PADDING
    )
  }
}
