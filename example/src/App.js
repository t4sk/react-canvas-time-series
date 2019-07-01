import React, { Component } from "react"
import TestRenderHistory from "./test-render/history"
import TestRenderAxes from "./test-render/axes"
import TestRenderLabels from "./test-render/labels"
import TestRenderZoom from "./test-render/zoom"
import TestRenderDrag from "./test-render/drag"
import TestRenderBar from "./test-render/bar"
import TestRenderLine from "./test-render/line"
import TestRenderCandlestick from "./test-render/candlestick"
import TestRenderPointsAndLines from "./test-render/points-and-lines"

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <h3>Labels</h3>
        <TestRenderLabels />

        <h3>Axes</h3>
        <TestRenderAxes />
        {/*}
        <TestRenderPointsAndLines />
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
