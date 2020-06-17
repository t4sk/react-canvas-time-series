import React from "react"
import "./App.css"
import Labels from "./examples/Labels"
import Bars from "./examples/Bars"
import Axes from "./examples/Axes"
import Points from "./examples/Points"
import Lines from "./examples/Lines"
import Candlesticks from "./examples/Candlesticks"
import Frames from "./examples/Frames"

function App() {
  return (
    <div className="App">
      {/*}
        <h3>History</h3>
        <TestRenderHistory />

        <h3>Zoom</h3>
        <TestRenderZoom />

        <h3>Drag</h3>
        <TestRenderDrag />

      <h3>Frames</h3>
      <Frames />

        <h3>Crosshair</h3>
        <TestRenderCrosshair />

  */}
      <h3>Candlesticks</h3>
      <Candlesticks />

      <h3>Bars</h3>
      <Bars />

      <h3>Lines</h3>
      <Lines />

      <h3>Points</h3>
      <Points />

      <h3>Label</h3>
      <Labels />

      <h3>Axes</h3>
      <Axes />
    </div>
  )
}

export default App
