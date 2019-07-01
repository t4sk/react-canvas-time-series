import React, { Component } from "react"
import TestRenderHistory from "./test-render/history"
import TestRenderAxes from "./test-render/axes"
import TestRenderLabels from "./test-render/labels"
import TestRenderZoom from "./test-render/zoom"
import TestRenderDrag from "./test-render/drag"
import TestRenderBars from "./test-render/bars"
import TestRenderLines from "./test-render/lines"
import TestRenderCandlestick from "./test-render/candlestick"
import TestRenderPoints from "./test-render/points"

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <h3>Lines</h3>
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
