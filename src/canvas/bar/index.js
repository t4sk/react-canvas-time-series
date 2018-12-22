// @flow
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    getCanvasX,
    getCanvasY,
    data,
    width,
  } = props

  const canvasY0 = getCanvasY(0)

  // TODO render only part of bar that is inside graph
  for (let i = 0; i < data.length; i++) {
    const bar = data[i]

    const canvasX = getCanvasX(bar.x)
    const canvasY = getCanvasY(bar.y)

    // const barHeight = graph.top + graph.height - canvasY
    const barHeight = canvasY0 - canvasY

    ctx.fillStyle = props.getColor(bar)
    ctx.fillRect(
      canvasX - width / 2,
      canvasY,
      width,
      barHeight
    )
  }
}
