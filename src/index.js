export { default as canvas } from './canvas'
export { default as GraphCanvas } from './graph-canvas'

// TODO specify x interval (example 2018-11-11 6:00, 2018-11-11 12:00, ...)
// TODO specify y interval (100, 200, ...)
// TODO? background.numYLines background.numXLines options

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
// TODO candlestick render at x
