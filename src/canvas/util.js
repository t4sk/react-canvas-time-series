// @flow
function getGraphWidth (props: Props): number {
  return props.width - props.background.yAxisWidth
}

function getGraphHeight (props: Props): number {
  return props.height - props.background.xAxisHeight
}

function getGraphLeft (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.background.yAxisWidth
    case 'right':
      return 0
    default:
      throw new Error(`invalid background.yAxisAt ${props.background.yAxisAt}`)
  }
}

function getGraphTop (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.background.xAxisHeight
    case 'bottom':
      return 0
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
