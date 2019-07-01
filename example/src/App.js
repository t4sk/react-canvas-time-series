import React, { Component } from "react"
import TestRenderAxes from "./test-render/axes"
import TestRenderLabels from "./test-render/labels"
import TestRenderPoints from "./test-render/points"
import TestRenderLines from "./test-render/lines"
import TestRenderBars from "./test-render/bars"
import TestRenderCandlesticks from "./test-render/candlesticks"
// UI
import TestRenderFrames from "./test-render/frames"
import TestRenderZoom from "./test-render/zoom"
import TestRenderDrag from "./test-render/drag"
// History
import TestRenderHistory from "./test-render/history"

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <h3>Frames</h3>
        <TestRenderFrames />

        <h3>Candlesticks</h3>
        <TestRenderCandlesticks />

        <h3>Bars</h3>
        <TestRenderBars />

        <h3>Lines</h3>
        <TestRenderLines />

        <h3>Points</h3>
        <TestRenderPoints />

        <h3>Labels</h3>
        <TestRenderLabels />

        <h3>Axes</h3>
        <TestRenderAxes />
        {/*}
        <TestRenderCandlestick />
        <TestRenderHistory />
        <TestRenderDrag />
        <TestRenderZoom />
        <TestRenderLine />
        <TestRenderBar />
        */}
      </div>
    )
  }
}
