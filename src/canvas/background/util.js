// @flow
function getGraphWidth (props: Props): number {
  return props.width - props.yAxisWidth
}

function getGraphHeight (props: Props): number {
  return props.height - props.xAxisHeight
}

function getGraphLeft (props: Props): number {
  switch (props.yAxisAt) {
    case 'left':
      return props.yAxisWidth
    case 'right':
      return 0
    default:
      throw new Error(`invalid yAxisAt ${props.yAxisAt}`)
  }
}

function getGraphTop (props: Props): number {
  switch (props.xAxisAt) {
    case 'top':
      return props.xAxisHeight
    case 'bottom':
      return 0
    default:
      throw new Error(`invalid xAxisAt ${props.xAxisAt}`)
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
