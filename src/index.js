// TODO unexport canvas but export helpers like ui and math
import canvas from './canvas'
import GraphCanvas from './graph-canvas'
import draggable from './draggable'
import zoomable from './zoomable'

export { default as canvas } from './canvas'
export { default as GraphCanvas } from './graph-canvas'
export { default as draggable } from './draggable'
export { default as zoomable } from './zoomable'

const ReactCanvasTimeSeries = {
  canvas,
  GraphCanvas,
  draggable,
  zoomable,
}

export default ReactCanvasTimeSeries

// TODO flow

// TODO fix flickering canvas border

// TODO drag example with data
// TODO zoom example with data

// TODO zoomable composable component
// TODO reusable component for drag

// TODO optimizations mentioned in mozilla website

// TODO compute barWidth from xStep

// TODO ? set graph canvas size in render()
// TODO render ui labels near canvas borders
