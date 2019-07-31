import canvas from "./canvas"
import Graph from "./graph"
import History from "./history"
import layout from "./layout"
import draggable from "./draggable"
import zoomable from "./zoomable"

export { default as canvas } from "./canvas"
export { default as History } from "./history"
export { default as Graph } from "./graph"
export { default as layout } from "./layout"
export { default as draggable } from "./draggable"
export { default as zoomable } from "./zoomable"

const ReactCanvasTimeSeries = {
  canvas,
  History,
  Graph,
  layout,
  draggable,
  zoomable,
}

export default ReactCanvasTimeSeries
