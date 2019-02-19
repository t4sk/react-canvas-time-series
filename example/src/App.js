import React, { Component } from "react"
import TestRenderHistory from "./test-render/history"
import TestRenderAxes from "./test-render/axes"
import TestRenderBar from "./test-render/bar"
import TestRenderLine from "./test-render/line"

export default class App extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <h3>Line</h3>
        <TestRenderLine />

        {/*}
        <h3>Bar</h3>
        <TestRenderBar />

        <h3>History</h3>
        <TestRenderHistory />

        <h3>Axes</h3>
        <TestRenderAxes />
        */}
      </div>
    )
  }
}
