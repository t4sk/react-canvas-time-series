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

// TODO draw point width optional ambient color
// TODO clear canvas context before drawing multiple ambient color
// TODO rename radius to amibientRadius

// TODO flow
