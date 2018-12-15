// @flow
import { toCanvasX, toCanvasY } from '../math'
import { getGraphDimensions } from '../background/util'

function drawPoint(ctx: any, canvasX, canvasY, props) {
  const {
    pointColor,
    pointRadius,
    pointAmbientColor,
    pointAmbientRadius,
  } = props

  if (pointAmbientRadius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, pointAmbientRadius, 0, 2 * Math.PI, false)
    ctx.fillStyle = pointAmbientColor
    ctx.fill()
  }

  if (pointRadius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, pointRadius, 0, 2 * Math.PI, false)
    ctx.fillStyle = pointColor
    ctx.fill()
  }
}

export function draw (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    yMin,
    yMax,
    data,
  } = props

  const graph = getGraphDimensions(props)

  const getCanvasX = toCanvasX({
    width: graph.width,
    left: graph.left,
    xMax,
    xMin,
  })

  const getCanvasY = toCanvasY({
    height: graph.height,
    top: graph.top,
    yMax,
    yMin,
  })

  for (let i = 0; i < data.length; i++) {
    drawPoint(
      ctx,
      getCanvasX(data[i].x),
      getCanvasY(data[i].y),
      {...props, ...data[i]}
    )
  }
}
