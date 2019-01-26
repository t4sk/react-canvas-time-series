// TODO unexport canvas but export helpers like ui and math
import canvas from './canvas'
import GraphCanvas from './graph-canvas'
import draggable from './draggable'
import zoomable from './zoomable'

import Graphs from './graphs'
import History from './history'

export { default as canvas } from './canvas'
export { default as GraphCanvas } from './graph-canvas'
export { default as draggable } from './draggable'
export { default as zoomable } from './zoomable'

export { default as History } from './history'
export { default as Graphs } from './graphs'

const ReactCanvasTimeSeries = {
  canvas,
  GraphCanvas,
  draggable,
  zoomable,
  History,
  Graphs,
}

export default ReactCanvasTimeSeries

// TODO flow
// TODO custom graph canvases for stock price / volume

// TODO optimizations mentioned in mozilla website

// TODO compute barWidth from xStep

// TODO render ui labels near canvas borders
// TODO sometimes x tick on the edges is not drawn
// TODO option to show / hide xMin, xMax, yMin, yMax

// TODO ui label padding
// TODO web worker
