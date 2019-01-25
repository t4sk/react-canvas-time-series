import PropTypes from 'prop-types'

const propTypes = {
  graph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  window: PropTypes.shape({
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
  }).isRequired,
  windowColor: PropTypes.string.isRequired,
}

export function draw(ctx, props) {
  const {
    graph,
    window,
    windowColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, 'prop', 'window')

  ctx.fillStyle = windowColor
  ctx.fillRect(
    window.left,
    0,
    window.right - window.left,
    graph.height,
  )
}
