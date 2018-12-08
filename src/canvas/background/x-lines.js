// @flow
import type { Props } from './types'
import { linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth,
  getGraphLeft,
  getGraphTop,
} from './util'

const X_LABEL_VERTICAL_PADDING = 12

function getLabelTop (props: Props): number {
  const {
    xAxisAt,
    xAxisHeight,
    top,
    height,
  } = props

  switch (xAxisAt) {
    case 'top':
      return top + xAxisHeight - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return top + height - xAxisHeight + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid xAxisAt ${xAxisAt}`)
  }
}

export function drawXLines (ctx: any, props: Props) {
  const {
    xMin,
    xMax
  } = props

  // style line
  ctx.lineWidth = props.xLineWidth
  ctx.strokeStyle = props.xLineColor
  // style labels
  ctx.font = props.xLabelFont
  ctx.fillStyle = props.xLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const width = getGraphWidth(props)
  const height = getGraphHeight(props)

  const toLeft = linear({
    dy: width,
    dx: xMax - xMin,
    y0: -width * xMin / (xMax - xMin)
  })

  const left = getGraphLeft(props)
  const top = getGraphTop(props)
  const labelTop = getLabelTop(props)

  if (props.showXLine) {
    // draw x line at start
    ctx.beginPath()
    ctx.moveTo(left, top)
    ctx.lineTo(left, top + height)
    ctx.stroke()

    // draw x line at end
    ctx.beginPath()
    ctx.moveTo(left + width, top)
    ctx.lineTo(left + width, top + height)
    ctx.stroke()
  }

  if (props.xInterval > 0) {
    const x0 = nearestStepBelow(xMin, props.xInterval)

    let i = 0
    for (let x = x0; x <= xMax; x += props.xInterval) {
      const l = toLeft(x) + left

      if (l >= left && l <= left + width) {
        // draw line
        if (props.showXLine) {
          ctx.beginPath()
          ctx.moveTo(l, top)
          ctx.lineTo(l, top + height)
          ctx.stroke()
        }

        // draw text
        if (props.showXLabel) {
          ctx.fillText(props.renderXLabel(x, i), l, labelTop)
        }
      }

      i++
    }
  }
}
