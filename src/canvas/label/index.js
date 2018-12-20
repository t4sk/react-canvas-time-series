export function drawXLine (ctx: any, props: DrawXLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.xLineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.canvasX, props.graph.top)
  ctx.lineTo(props.canvasX, props.graph.top + props.graph.height)
  ctx.stroke()

  ctx.setLineDash([])
}

export function drawYLine (ctx: any, props: DrawYLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.yLineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.graph.left, props.canvasY)
  ctx.lineTo(props.graph.left + props.graph.width, props.canvasY)
  ctx.stroke()

  ctx.setLineDash([])
}

function getYLabelTextAlign (props: DrawYLabelAtProps): 'left' | 'right' {
  switch (props.yLabelAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid yLabelAt ${props.yLabelAt}`)
  }
}

function getYLabelLeft (props: DrawYLabelAtProps): number {
  switch (props.yLabelAt) {
    case 'left':
      return props.graph.left - props.yLabelWidth
    case 'right':
      return props.graph.left + props.graph.yLabelWidth
    default:
      throw new Error(`invalid yLabelAt ${props.yLabelAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 5

function getYLabelTextLeft (props: DrawYLabelAtProps): number {
  switch (props.yLabelAt) {
    case 'left':
      return props.graph.left - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return props.graph.left + props.graph.width + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid yLabelAt ${props.yLabelAt}`)
  }
}

export function drawYLabel (ctx: any, props: DrawYLabelAtProps) {
  // label
  ctx.fillStyle = props.yLabelBackgroundColor

  ctx.fillRect(
    getYLabelLeft(props),
    props.yLabelTop - props.yLabelHeight / 2,
    props.yLabelWidth,
    props.yLabelHeight
  )

  // label text
  ctx.font = props.yLabelFont
  ctx.fillStyle = props.yLabelColor
  ctx.textAlign = getYLabelTextAlign(props)
  ctx.textBaseline = 'middle'

  ctx.fillText(
    props.yLabelText,
    getYLabelTextLeft(props),
    props.yLabelTop,
  )
}

function getXLabelTop (props: DrawXLabelAtProps): number {
  switch (props.xLabelAt) {
    case 'top':
      return props.graph.top - props.xLabelHeight
    case 'bottom':
      return props.graph.top + props.graph.height
    default:
      throw new Error(`invalid xLabelAt ${props.xLabelAt}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 10

function getXLabelTextTop (props: DrawXLabelAtProps): number {
  switch (props.xLabelAt) {
    case 'top':
      return props.graph.top - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return props.graph.top + props.graph.height + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid xLabelAt ${props.xLabelAt}`)
  }
}

export function drawXLabel (ctx: any, props: DrawXLabelAtProps) {
  // label
  ctx.fillStyle = props.xLabelBackgroundColor

  // label rect
  ctx.fillRect(
    props.xLabelLeft - props.xLabelWidth / 2,
    getXLabelTop(props),
    props.xLabelWidth,
    props.xLabelHeight,
  )

  // label text
  ctx.font = props.xLabelFont
  ctx.fillStyle = props.xLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillText(
    props.xLabelText,
    props.xLabelLeft,
    getXLabelTextTop(props)
  )
}

export function draw (ctx: any, props: Props) {
}
