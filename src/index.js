export { default as canvas } from './canvas'
export { default as GraphCanvas } from './graph-canvas'

// TODO
// xMin: Number.POSITIVE_INFINITY
// xMax: Number.NEGATIVE_INFINITY
//
// yMin: Number.POSITIVE_INFINITY
// yMax: Number.NEGATIVE_INFINITY

// TODO flat props for background? difficult to pass background props like xInterval, yInterval
// TODO specify x interval (example 2018-11-11 6:00, 2018-11-11 12:00, ...)
// TODO specify y interval (100, 200, ...)
// TODO pass (ctx, props) to this.props.drawBackground ?
// TODO pass (ctx, props) to this.props.drawData ?
// TODO pass (ctx, mouse, props) to this.props.drawUI ?

// TODO clear canvas context before drawing multiple ambient color

// TODO flow

// TODO how to pass common props (canvas, graph, min, max,...) to each draw func.
// TODO default props for background, bar, line, candlestick, ui
// TODO canvas border color

// TODO margin between background label and graph
// TODO margin between UI label and graph`

// TODO rename x, y interval to x, y step
// TODO reusable component for drag
// TODO render data in test drag and clear data
// TODO? clear canvas before drawing data?
// TODO canvas clear method
// TODO? dont draw data outside graph
// TODO performance of spread operators when drawing
// TODO zoomable composable component
// TODO realistic zoom example with data
// TODO components for drawing
