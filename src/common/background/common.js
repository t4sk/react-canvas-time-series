// @flow
import type { Props } from './types'

export function getGraphWidth (props: Props): number {
  return (
    props.canvas.width -
    props.background.yAxisWidth -
    (props.margin.left + props.margin.right)
  )
}

export function getGraphHeight (props: Props): number {
  return (
    props.canvas.height -
    props.background.xAxisHeight -
    (props.margin.top + props.margin.bottom)
  )
}

export function getGraphLeft (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.margin.left + props.background.yAxisWidth
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

export function getGraphTop (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.margin.top + props.background.xAxisHeight
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}
