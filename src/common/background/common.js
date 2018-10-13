// @flow
import type { Props } from './types'

export function getWidth (props: Props): number {
  return props.canvas.width - props.y.axis.width - (props.margin.left + props.margin.right)
}

export function getHeight (props: Props): number {
  return props.canvas.height - props.x.axis.height - (props.margin.top + props.margin.bottom)
}
