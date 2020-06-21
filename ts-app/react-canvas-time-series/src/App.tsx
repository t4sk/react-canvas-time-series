import React from "react"
import "./App.css"
import Labels from "./examples/Labels"
import Bars from "./examples/Bars"
import Axes from "./examples/Axes"
import Points from "./examples/Points"
import Lines from "./examples/Lines"
import Candlesticks from "./examples/Candlesticks"
import Crosshair from "./examples/Crosshair"
import Frames from "./examples/Frames"
import Drag from "./examples/Drag"
import Zoom from "./examples/Zoom"

function App() {
  return (
    <div className="App">
      {/*}
        <h3>History</h3>
        <TestRenderHistory />

  */}
      <h3>Zoom</h3>
      <Zoom />

      <h3>Drag</h3>
      <Drag />

      <h3>Frames</h3>
      <Frames />

      <h3>Crosshair</h3>
      <Crosshair />

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
