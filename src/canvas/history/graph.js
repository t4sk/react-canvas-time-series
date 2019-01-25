import PropTypes from 'prop-types'
import {
  getCanvasX,
  getCanvasY
} from '../math'

const propTypes = {
  graph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  lineColor: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
}

export function draw(ctx, props) {
  const {
    graph,
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    lineColor,
    lineWidth,
    step = 1,
  } = props

  PropTypes.checkPropTypes(propTypes, props, 'prop', 'graph')

  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  for (let i = 0; i < data.length; i += step) {
    const { x, y } = data[i]

    const canvasX = getCanvasX(graph.width, xMax, xMin, x)
    const canvasY = getCanvasY(graph.height, yMax, yMin, y)

    ctx.lineTo(canvasX, canvasY)
  }
  ctx.stroke()
}
