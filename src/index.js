import canvas from "./canvas"
import Graphs from "./graphs"
import History from "./history"
import draggable from "./draggable"
import zoomable from "./zoomable"

export { default as canvas } from "./canvas"
export { default as History } from "./history"
export { default as Graphs } from "./graphs"
export { default as draggable } from "./draggable"
export { default as zoomable } from "./zoomable"

const ReactCanvasTimeSeries = {
  canvas,
  History,
  Graphs,
  draggable,
  zoomable,
}

export default ReactCanvasTimeSeries
