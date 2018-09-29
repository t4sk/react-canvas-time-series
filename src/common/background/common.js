export function getWidth (props) {
  return props.width - props.y.axis.width - (props.margin.left + props.margin.right)
}

export function getHeight (props) {
  return props.height - props.x.axis.height - (props.margin.top + props.margin.bottom)
}
