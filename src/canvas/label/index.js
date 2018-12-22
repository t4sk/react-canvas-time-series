export function drawXLine (ctx: any, props: DrawXLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.label.xLineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.label.canvasX, props.graph.top)
  ctx.lineTo(props.label.canvasX, props.graph.top + props.graph.height)
  ctx.stroke()

  ctx.setLineDash([])
}

export function drawYLine (ctx: any, props: DrawYLineAtProps) {
  ctx.beginPath()

  ctx.strokeStyle = props.label.yLineColor
  ctx.setLineDash([5, 5])

  ctx.moveTo(props.graph.left, props.label.canvasY)
  ctx.lineTo(props.graph.left + props.graph.width, props.label.canvasY)
  ctx.stroke()

  ctx.setLineDash([])
}

function getYLabelTextAlign (props: DrawYLabelAtProps): 'left' | 'right' {
  switch (props.label.yLabelAt) {
    case 'left':
      return 'right'
    case 'right':
      return 'left'
    default:
      throw new Error(`invalid yLabelAt ${props.label.yLabelAt}`)
  }
}

function getYLabelLeft (props: DrawYLabelAtProps): number {
  switch (props.label.yLabelAt) {
    case 'left':
      return props.graph.left - props.label.yLabelWidth
    case 'right':
      return props.graph.left + props.graph.width
    default:
      throw new Error(`invalid yLabelAt ${props.label.yLabelAt}`)
  }
}

const Y_LABEL_HORIZONTAL_PADDING = 5

function getYLabelTextLeft (props: DrawYLabelAtProps): number {
  switch (props.label.yLabelAt) {
    case 'left':
      return props.graph.left - Y_LABEL_HORIZONTAL_PADDING
    case 'right':
      return props.graph.left + props.graph.width + Y_LABEL_HORIZONTAL_PADDING
    default:
      throw new Error(`invalid yLabelAt ${props.label.yLabelAt}`)
  }
}

export function drawYLabel (ctx: any, props: DrawYLabelAtProps) {
  // label
  ctx.fillStyle = props.label.yLabelBackgroundColor

  ctx.fillRect(
    getYLabelLeft(props),
    props.label.canvasY - props.label.yLabelHeight / 2,
    props.label.yLabelWidth,
    props.label.yLabelHeight
  )

  // label text
  ctx.font = props.label.yLabelFont
  ctx.fillStyle = props.label.yLabelColor
  ctx.textAlign = getYLabelTextAlign(props)
  ctx.textBaseline = 'middle'

  ctx.fillText(
    props.label.yLabelText,
    getYLabelTextLeft(props),
    props.label.canvasY,
  )
}

function getXLabelTop (props: DrawXLabelAtProps): number {
  switch (props.label.xLabelAt) {
    case 'top':
      return props.graph.top - props.label.xLabelHeight
    case 'bottom':
      return props.graph.top + props.graph.height
    default:
      throw new Error(`invalid xLabelAt ${props.label.xLabelAt}`)
  }
}

const X_LABEL_VERTICAL_PADDING = 10

function getXLabelTextTop (props: DrawXLabelAtProps): number {
  switch (props.label.xLabelAt) {
    case 'top':
      return props.graph.top - X_LABEL_VERTICAL_PADDING
    case 'bottom':
      return props.graph.top + props.graph.height + X_LABEL_VERTICAL_PADDING
    default:
      throw new Error(`invalid xLabelAt ${props.label.xLabelAt}`)
  }
}

export function drawXLabel (ctx: any, props: DrawXLabelAtProps) {
  // label
  ctx.fillStyle = props.label.xLabelBackgroundColor

  // label rect
  ctx.fillRect(
    props.label.canvasX - props.label.xLabelWidth / 2,
    getXLabelTop(props),
    props.label.xLabelWidth,
    props.label.xLabelHeight,
  )

  // label text
  ctx.font = props.label.xLabelFont
  ctx.fillStyle = props.label.xLabelColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillText(
    props.label.xLabelText,
    props.label.canvasX,
    getXLabelTextTop(props)
  )
}

export function draw (ctx: any, props: Props) {
  if (props.label.showXLine) {
    drawXLine(ctx, props)
  }

  if (props.label.showXLabel) {
    drawXLabel(ctx, props)
  }

  if (props.label.showYLine) {
    drawYLine(ctx, props)
  }

  if (props.label.showYLabel) {
    drawYLabel(ctx, props)
  }
}
