export { default as canvas } from './canvas'
export { default as GraphCanvas } from './graph-canvas'

// TODO xMin: Number.POSITIVE_INFINITY
// TODO xMax: Number.NEGATIVE_INFINITY
// TODO yMin: Number.POSITIVE_INFINITY
// TODO yMax: Number.NEGATIVE_INFINITY

// TODO specify x interval (example 2018-11-11 6:00, 2018-11-11 12:00, ...)
// TODO specify y interval (100, 200, ...)

// TODO flow

// TODO how to pass common props (canvas, graph, min, max,...) to each draw func.
// TODO default props for background, bar, line, candlestick, ui
// TODO pass (ctx, props) to this.props.drawBackground ?
// TODO pass (ctx, props) to this.props.drawData ?
// TODO pass (ctx, mouse, props) to this.props.drawUI ?

// TODO canvas border color
// TODO canvas clear method

// TODO margin between background label and graph
// TODO margin between UI label and graph`
// TODO rename x, y interval to x, y step
// TODO dont draw data outside graph? (data.x >= xMax or data.x <= xMin)
// TODO performance of spread operators when drawing

// TODO drag example with data
// TODO zoom example with data

// TODO zoomable composable component
// TODO components for drawing
// TODO reusable component for drag
