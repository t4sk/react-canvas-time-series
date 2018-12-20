// TODO unexport canvas but export helpers like ui and math
export { default as canvas } from './canvas'
export { default as GraphCanvas } from './graph-canvas'

// TODO flow

// TODO how to pass common props (canvas, graph, min, max,...) to each draw func.
// TODO default props for background, bar, line, candlestick, ui
// TODO pass (ctx, props) to this.props.drawBackground ?
// TODO pass (ctx, props) to this.props.drawData ?
// TODO pass (ctx, mouse, props) to this.props.drawUI ?
// TODO? components for drawing

// TODO? canvas border color
// TODO fix flickering canvas border

// TODO drag example with data
// TODO zoom example with data

// TODO zoomable composable component
// TODO reusable component for drag

// TODO optimizations mentioned in mozilla website
// TODO performance of spread operators when drawing
// TODO highlight column
// TODO draw tick

// TODO pass graph from draw(ctx, props, graph)
// TODO pass getCanvasX, Y from top function
// TODO function arg order (ctx, props, internal stuff...)
// TODO compute barWidth from xStep

// TODO ? set graph canvas size in render()
// TODO remove bar.getBorderColor
// TODO render ui labels near canvas borders
// TODO graph margin
