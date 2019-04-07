import React, { Component } from "react"
import TestRenderHistory from "./test-render/history"
import TestRenderAxesAndLabels from "./test-render/axes-and-labels"
import TestRenderBar from "./test-render/bar"
import TestRenderLine from "./test-render/line"

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <TestRenderAxesAndLabels />
        {/*}
        <TestRenderHistory />
        <TestRenderBar />
        */}
      </div>
    )
  }
}
