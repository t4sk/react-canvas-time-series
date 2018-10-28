// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth
} from './common'

function getLeft (props: Props): number {
  switch (props.background.yAxisAt) {
    case 'left':
      return props.margin.left + props.background.yAxisWidth
    case 'right':
      return props.margin.left
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

function getTop (props: Props): number {
  switch (props.background.xAxisAt) {
    case 'top':
      return props.margin.top + props.background.xAxisHeight
    case 'bottom':
      return props.margin.top
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 12

function getLabelTop (props: Props): number {
  const height = getGraphHeight(props)

  switch (props.background.xAxisAt) {
    case 'top':
      return props.margin.top + props.background.xAxisHeight - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return height + props.margin.top + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid xAxisAt ${props.background.xAxisAt}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.lineWidth = props.background.xLineWidth
  ctx.strokeStyle = props.background.xLineColor
  // style labels
  ctx.font = props.background.xLabelFont
  ctx.fillStyle = props.background.xLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const width = getGraphWidth(props)
  const height = getGraphHeight(props)

  const toLeft = linear({
    dy: width,
    dx: xMax - xMin,
    y0: -width * xMin / (xMax - xMin)
  })

  const top = getTop(props)
  const left = getLeft(props)
  const labelTop = getLabelTop(props)

  if (props.background.showXLine) {
    // draw x line at start
    ctx.beginPath()
    ctx.moveTo(
      round(left),
      round(top)
    )
    ctx.lineTo(
      round(left),
      round(top + height)
    )
    ctx.stroke()

    // draw x line at end
    ctx.beginPath()
    ctx.moveTo(
      round(left + width),
      round(top)
    )
    ctx.lineTo(
      round(left + width),
      round(top + height)
    )
    ctx.stroke()
  }

  if (props.background.xInterval > 0) {
    const x0 = nearestStepBelow(xMin, props.background.xInterval)

    for (let x = x0; x <= xMax; x += props.background.xInterval) {
      const l = toLeft(x) + left

      if (l >= left && l <= left + width) {
        // draw line
        if (props.background.showXLine) {
          ctx.beginPath()
          ctx.moveTo(
            round(l), round(top)
          )
          ctx.lineTo(
            round(l), round(top + height)
          )
          ctx.stroke()
        }

        // draw text
        if (props.background.showXLabel) {
          ctx.fillText(
            props.background.renderXLabel(x),
            round(l),
            round(labelTop)
          )
        }
      }
    }
  }
}
