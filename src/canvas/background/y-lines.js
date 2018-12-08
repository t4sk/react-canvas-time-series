// @flow
import type { Props } from './types'
import { round, linear, nearestStepBelow } from '../math'
import {
  getGraphHeight,
  getGraphWidth,
  getGraphLeft,
  getGraphTop,
} from './util'

function getYAxisTextAlign (props: Props): 'left' | 'right' {
  switch (props.yAxisAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid yAxisAt ${props.yAxisAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 10

function getLabelLeft (props: Props): number {
  const {
    yAxisAt,
    yAxisWidth,
    left,
    width,
  } = props

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
  ctx.lineWidth = props.yLineWidth
  ctx.strokeStyle = props.yLineColor

  // style labels
  ctx.font = props.yLabelFont
  ctx.fillStyle = props.yLabelColor
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

  if (props.showYLine) {
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

  if (props.yInterval > 0) {
    const y0 = nearestStepBelow(yMin, props.yInterval)

    let i = 0
    for (let y = y0; y <= yMax; y += props.yInterval) {
      const t = round(toTop(y) + top)

      if (t >= top && t <= top + height) {
        // draw line
        if (props.showYLine) {
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
        if (props.showYLabel) {
          ctx.fillText(
            props.renderYLabel(y, i),
            round(labelLeft),
            round(t)
          )
        }
      }

      i++
    }
  }
}
