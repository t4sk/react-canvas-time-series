import React, { Component } from "react"
import TestRenderHistory from "./test-render/history"
import TestRenderAxesAndLabels from "./test-render/axes-and-labels"
import TestRenderZoom from "./test-render/zoom"
import TestRenderDrag from "./test-render/drag"
import TestRenderBar from "./test-render/bar"
import TestRenderLine from "./test-render/line"
import TestRenderCandlestick from "./test-render/candlestick"

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <TestRenderCandlestick />
        {/*}
        <TestRenderHistory />
        <TestRenderAxesAndLabels />
        <TestRenderDrag />
        <TestRenderZoom />
        <TestRenderLine />
        <TestRenderBar />
        <TestRenderCandlestick />
        */}
      </div>
    )
  }
}
