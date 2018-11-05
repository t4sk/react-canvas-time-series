// @flow
import type { Props } from './types'

export function getGraphWidth (props: Props): number {
  return props.background.width - props.background.yAxisWidth
}

export function getGraphHeight (props: Props): number {
  return props.background.height - props.background.xAxisHeight
}

export function getGraphLeft (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.padding.left + props.background.yAxisWidth
    case 'right':
      return props.padding.left
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

export function getGraphTop (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.padding.top + props.background.xAxisHeight
    case 'bottom':
      return props.padding.top
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}
