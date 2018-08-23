import {round, linearTransformer} from '../util'

function drawLineGraph(ctx, props, data) {
  const {
    xMin,
    xMax,
    xInterval,
    yMin,
    yMax,
  } = props
  const height = ctx.canvas.height

  const toCanvasX = linearTransformer({
    dy: ctx.canvas.width,
    dx: xMax - xMin,
    y0: -ctx.canvas.width * xMin / (xMax - xMin),
  })

  const toCanvasY = linearTransformer({
    dy: -height,
    dx: yMax - yMin,
    y0: height * yMax / (yMax - yMin)
  })

  ctx.strokeStyle = props.priceLine.color

  for (let i = 1; i < data.length; i++) {
    const {unixTime, close} = data[i]

    const x0 = round(toCanvasX(data[i - 1].unixTime))
    const y0 = round(toCanvasY(data[i - 1].close))

    const x = round(toCanvasX(unixTime))
    const y = round(toCanvasY(close))

    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

export function drawData(ctx, props, data) {
  drawLineGraph(ctx, props, data)
}
