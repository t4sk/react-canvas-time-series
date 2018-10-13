// @flow
import type { Props } from './types'

export function getGraphWidth (props: Props): number {
  return (
    props.canvas.width
    - props.background.y.axis.width
    - (props.margin.left + props.margin.right)
  )
}

export function getGraphHeight (props: Props): number {
  return (
    props.canvas.height
    - props.background.x.axis.height
    - (props.margin.top + props.margin.bottom)
  )
}
