// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth,
  getGraphLeft,
  getGraphTop,
} from './common'

function getYAxisTextAlign (props: Props): 'left' | 'right' {
  switch (props.background.yAxisAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid yAxisAt ${props.background.yAxisAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getLabelLeft (props: Props): number {
  const {
    yAxisAt,
    yAxisWidth,
    left,
    width,
  } = props.background

  switch (yAxisAt) {
    case 'left':
      return left + yAxisWidth - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return left + width -yAxisWidth + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid yAxisAt ${yAxisAt}`)
  }
}

export function drawYLines (ctx: any, props: Props) {
  const {
    yMin,
    yMax
  } = props

  // style line
  ctx.lineWidth = props.background.yLineWidth
  ctx.strokeStyle = props.background.yLineColor

  // style labels
  ctx.font = props.background.yLabelFont
  ctx.fillStyle = props.background.yLabelColor
  ctx.textBaseline = 'middle'
  ctx.textAlign = getYAxisTextAlign(props)

  const width = getGraphWidth(props)
  const height = getGraphHeight(props)

  const toTop = linear({
    dy: -height,
    dx: yMax - yMin,
    y0: height * yMax / (yMax - yMin)
  })

  const left = getGraphLeft(props)
  const top = getGraphTop(props)
  const labelLeft = getLabelLeft(props)

  if (props.background.showYLine) {
    // draw y line top
    ctx.beginPath()
    ctx.moveTo(
      round(left),
      round(top)
    )
    ctx.lineTo(
      round(left + width),
      round(top)
    )
    ctx.stroke()

    // draw y line bottom
    ctx.beginPath()
    ctx.moveTo(
      round(left),
      round(top + height)
    )
    ctx.lineTo(
      round(left + width),
      round(top + height)
    )
    ctx.stroke()
  }

  if (props.background.yInterval > 0) {
    const y0 = nearestStepBelow(yMin, props.background.yInterval)

    for (let y = y0; y <= yMax; y += props.background.yInterval) {
      const t = toTop(y) + top

      if (t >= top && t <= top + height) {
        // draw line
        if (props.background.showYLine) {
          ctx.beginPath()
          ctx.moveTo(
            round(left), round(t)
          )
          ctx.lineTo(
            round(left + width), round(t)
          )
          ctx.stroke()
        }

        // draw text
        if (props.background.showYLabel) {
          ctx.fillText(
            props.background.renderYLabel(y),
            round(labelLeft),
            round(t)
          )
        }
      }
    }
  }
}
