export function getLayout(props) {
  const {
    padding,
    width,
    height,
    xAxisAt,
    xAxisHeight = 0,
    yAxisAt,
    yAxisWidth = 0,
  } = props

  const xAxis = {
    top: xAxisAt == "top" ? padding : height - padding - xAxisHeight,
    left: yAxisAt == "left" ? padding + yAxisWidth : padding,
    width: width - 2 * padding - yAxisWidth,
    height: xAxisHeight,
  }

  const yAxis = {
    top: xAxisAt == "top" ? padding + xAxisHeight : padding,
    left: yAxisAt == "left" ? padding : width - padding - yAxisWidth,
    width: yAxisWidth,
    height: height - 2 * padding - xAxisHeight,
  }

  const graph = {
    top: xAxisAt == "top" ? padding + xAxisHeight : padding,
    left: yAxisAt == "left" ? padding + yAxisWidth : padding,
    width: width - 2 * padding - yAxisWidth,
    height: height - 2 * padding - xAxisHeight,
  }

  return {
    graph,
    xAxis,
    yAxis,
  }
}
