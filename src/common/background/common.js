// @flow
import type { Props } from './types'

export function getWidth (props: Props): number {
  return props.canvas.width - props.background.y.axis.width - (props.margin.left + props.margin.right)
}

export function getHeight (props: Props): number {
  return props.canvas.height - props.background.x.axis.height - (props.margin.top + props.margin.bottom)
}
