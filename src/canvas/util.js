// @flow
function getGraphWidth (props: Props): number {
  return props.width - props.background.yAxisWidth - (props.padding.left + props.padding.right)
}

function getGraphHeight (props: Props): number {
  return props.height - props.background.xAxisHeight - (props.padding.top + props.padding.bottom)
}

function getGraphLeft (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.padding.left + props.background.yAxisWidth
    case 'right':
      return props.padding.left
    default:
      throw new Error(`invalid background.yAxisAt ${props.background.yAxisAt}`)
  }
}

function getGraphTop (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.padding.top + props.background.xAxisHeight
    case 'bottom':
      return props.padding.top
    default:
      throw new Error(`invalid background.xAxisAt ${props.background.xAxisAt}`)
  }
}

export function getGraphDimensions(props) {
  return {
    left: getGraphLeft(props),
    top: getGraphTop(props),
    width: getGraphWidth(props),
    height: getGraphHeight(props),
  }
}
