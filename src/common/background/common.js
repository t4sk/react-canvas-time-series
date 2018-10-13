// @flow
import type { Props } from './types'

export function getGraphWidth (props: Props): number {
  return (
    props.canvas.width -
    props.background.y.axis.width -
    (props.margin.left + props.margin.right)
  )
}

export function getGraphHeight (props: Props): number {
  return (
    props.canvas.height -
    props.background.x.axis.height -
    (props.margin.top + props.margin.bottom)
  )
}

export function getGraphX (props: Props): number {
  switch (props.background.y.axis.at) {
    case 'left':
      return props.margin.left + props.background.y.axis.width
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid y.axis.at ${props.background.y.axis.at}`)
  }
}

export function getGraphY (props: Props): number {
  switch (props.background.x.axis.at) {
    case 'top':
      return props.margin.top + props.background.x.axis.height
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid x.axis.at ${props.background.x.axis.at}`)
  }
}
