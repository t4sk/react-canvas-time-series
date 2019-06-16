import PropTypes from "prop-types"

const propTypes = {
  graph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  mask: PropTypes.shape({
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  maskColor: PropTypes.string.isRequired,
}

export function draw(ctx, props) {
  const { graph, mask, maskColor } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "mask")

  ctx.fillStyle = maskColor
  ctx.fillRect(mask.left, 0, mask.width, graph.height)
}
