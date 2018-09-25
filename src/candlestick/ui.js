import { round, linear } from '../common/math'

// min mouse x y to render ui
const MOUSE_X_MIN = 2
const MOUSE_Y_MIN = 2

const Y_LABEL_WIDTH = 50
const Y_LABEL_HEIGHT = 20

const X_LABEL_HEIGHT = 20
const X_LABEL_WIDTH = 80

export function getNearestPriceAtX (x, delta, data) {
  let low = 0; let high = data.length - 1

  // binary search
  while (low < high) {
    let mid = (low + high) / 2 >> 0

    if (data[mid].timestamp > x + delta) {
      high = mid
    } else if (data[mid].timestamp < x - delta) {
      low = mid + 1
    } else {
      // Math.abs(data[mid].timestamp - x) <= delta
      return data[mid]
    }
  }

  return data[low]
}

export function drawUI (ctx, props, mouse, data) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  const candlestickChart = {
    width: ctx.canvas.width - props.background.yAxisPaddRight,
    height: ctx.canvas.height - props.volumeBarChart.height - props.background.xAxisPaddBottom
  }

  drawLatestPriceLabel(ctx, {
    ...props,
    candlestickChart
  }, data[data.length - 1])

  // dont draw if mouse not inside data layer
  if (
    !mouse.canvasX ||
    mouse.canvasX <= MOUSE_X_MIN ||
    mouse.canvasX > ctx.canvas.width - props.background.yAxisPaddRight
  ) {
    return
  }

  if (
    !mouse.canvasY ||
    mouse.canvasY <= MOUSE_Y_MIN ||
    mouse.canvasY > ctx.canvas.height - props.background.xAxisPaddBottom
  ) {
    return
  }

  drawDataAtMouseX(ctx, {
    ...props,
    candlestickChart
  }, mouse, data)

  if (mouse.canvasY < ctx.canvas.height - props.volumeBarChart.height - props.background.xAxisPaddBottom) {
    drawPriceLine(ctx, {
      ...props,
      candlestickChart
    }, mouse)
  } else {
    drawVolumeLine(ctx, {
      ...props,
      candlestickChart
    }, mouse)
  }

  drawTimestampLine(ctx, {
    ...props,
    candlestickChart
  }, mouse)
}

function drawDataAtMouseX (ctx, props, mouse, data) {
  const {
    xMax, xMin, xInterval, candlestickChart
  } = props

  const xAtMouse = linear({
    dy: xMax - xMin,
    dx: candlestickChart.width,
    x: mouse.canvasX,
    y0: xMin
  })

  const price = getNearestPriceAtX(xAtMouse, round(xInterval / 2), data)

  const { open, high, low, close, volume } = price
  const color = open <= close ? 'green' : 'red'
  const margin = 5
  const numWidth = ctx.measureText('9999.99').width
  let x = 5
  const y = 15

  // open
  ctx.fillStyle = 'black'
  ctx.fillText('Open:', x, y)

  x += ctx.measureText('Open:').width + margin

  ctx.fillStyle = color
  ctx.fillText(open.toFixed(2), x, y)

  x += numWidth

  // high
  ctx.fillStyle = 'black'
  ctx.fillText('High:', x, y)

  x += ctx.measureText('High:').width + margin

  ctx.fillStyle = color
  ctx.fillText(high.toFixed(2), x, y)

  x += numWidth

  // low
  ctx.fillStyle = 'black'
  ctx.fillText('Low:', x, y)

  x += ctx.measureText('Low:').width + margin

  ctx.fillStyle = color
  ctx.fillText(low.toFixed(2), x, y)

  x += numWidth

  // close
  ctx.fillStyle = 'black'
  ctx.fillText('Close:', x, y)

  x += ctx.measureText('Close:').width + margin

  ctx.fillStyle = color
  ctx.fillText(close.toFixed(2), x, y)

  x += numWidth

  // volume
  ctx.fillStyle = 'black'
  ctx.fillText('Volume:', x, y)

  x += ctx.measureText('Volume:').width + margin

  ctx.fillStyle = color
  ctx.fillText(volume, x, y)
}

function drawYLabel (ctx, props) {
  const {
    canvasY,
    y,
    fillStyle,
    candlestickChart
  } = props

  // label
  ctx.fillStyle = fillStyle || 'black'

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    candlestickChart.width - 5,
    canvasY
  )
  ctx.lineTo(
    candlestickChart.width,
    canvasY - round(Y_LABEL_HEIGHT / 2)
  )
  ctx.lineTo(
    candlestickChart.width,
    canvasY + round(Y_LABEL_HEIGHT / 2)
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    candlestickChart.width,
    canvasY - round(Y_LABEL_HEIGHT / 2),
    Y_LABEL_WIDTH, Y_LABEL_HEIGHT
  )

  // label text
  ctx.font = '12px Arial'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'

  ctx.fillText(
    y.toFixed(2),
    candlestickChart.width + 10,
    canvasY
  )
}

function drawLatestPriceLabel (ctx, props, price) {
  const { yMin, yMax, candlestickChart } = props
  const { open, close } = price

  const canvasY = linear({
    dy: candlestickChart.height,
    dx: yMax - yMin,
    x: yMax - close,
    y0: 0
  })

  drawYLabel(ctx, {
    canvasY,
    y: close,
    fillStyle: open <= close ? props.ui.latestPriceLabel.bull.color : props.ui.latestPriceLabel.bear.color,
    candlestickChart
  })
}

function drawPriceLine (ctx, props, mouse) {
  const { yMin, yMax, candlestickChart } = props
  const { canvasY } = mouse

  // line
  ctx.strokeStyle = 'black'
  ctx.setLineDash([5, 5])

  ctx.moveTo(0, canvasY)
  ctx.lineTo(candlestickChart.width, canvasY)
  ctx.stroke()

  const y = linear({
    dy: yMax - yMin,
    dx: candlestickChart.height,
    x: candlestickChart.height - canvasY,
    y0: yMin
  })

  drawYLabel(ctx, {
    canvasY,
    y,
    candlestickChart
  })
}

function drawVolumeLine (ctx, props, mouse) {
  const { canvasY } = mouse
  const { maxVolume, volumeBarChart, candlestickChart } = props

  // line
  ctx.strokeStyle = 'black'
  ctx.setLineDash([5, 5])

  ctx.moveTo(0, canvasY)
  ctx.lineTo(candlestickChart.width, canvasY)
  ctx.stroke()

  const y = linear({
    dy: maxVolume,
    dx: volumeBarChart.height,
    x: candlestickChart.height - canvasY,
    y0: maxVolume
  })

  drawYLabel(ctx, {
    canvasY,
    y,
    candlestickChart
  })
}

function drawTimestampLine (ctx, props, mouse) {
  const height = ctx.canvas.height - props.background.xAxisPaddBottom

  const { canvasX } = mouse
  const { xMin, xMax, candlestickChart } = props

  // timestamp line
  ctx.strokeStyle = 'black'
  ctx.setLineDash([5, 5])

  ctx.moveTo(canvasX, 0)
  ctx.lineTo(canvasX, height)
  ctx.stroke()

  // label
  ctx.fillStyle = 'black'

  // label tip
  ctx.beginPath()
  ctx.moveTo(
    canvasX,
    height - 5
  )
  ctx.lineTo(
    canvasX - 5,
    height
  )
  ctx.lineTo(
    canvasX + 5,
    height
  )
  ctx.fill()

  // label rect
  ctx.fillRect(
    canvasX - round(X_LABEL_WIDTH / 2),
    height,
    X_LABEL_WIDTH,
    X_LABEL_HEIGHT
  )

  // label text
  ctx.font = '12px Arial'
  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'

  const x = linear({
    dy: xMax - xMin,
    dx: candlestickChart.width,
    x: canvasX,
    y0: xMin
  })

  ctx.fillText(
    x.toFixed(1),
    canvasX,
    height + 10
  )
}
