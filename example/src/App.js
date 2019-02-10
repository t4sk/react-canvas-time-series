import React, { Component } from 'react'
import TestRenderHistory from './test-render/history'
import TestRenderAxes from './test-render/axes'
import TestRenderBar from './test-render/bar'
import TestRenderLine from './test-render/line'

export default class App extends Component {
  render () {
    return (
      <div style={{margin: 20}}>
        <TestRenderBar />
        {/*}
        <TestRenderLine />
        <TestRenderHistory />
        <TestRenderAxes />
        */}
      </div>
    )
  }
}
