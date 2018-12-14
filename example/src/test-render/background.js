import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'

class BackgroundTestRender extends Component {
  render () {
    return (
      <div style={{margin: 10}}>
        <h3>Hide X Labels</h3>
        <GraphCanvas
          {...this.props}
          showXLabel={false}
        />

        <h3>Hide X Lines</h3>
        <GraphCanvas
          {...this.props}
          showXLine={false}
        />

        <h3>Hide Y Labels</h3>
        <GraphCanvas
          {...this.props}
          showYLabel={false}
        />

        <h3>Hide Y Lines</h3>
        <GraphCanvas
          {...this.props}
          showYLine={false}
        />

        <h3>X Axis Bottom</h3>
        <GraphCanvas
          {...this.props}
          xAxisAt='bottom'
        />

        <h3>X Axis Top</h3>
        <GraphCanvas
          {...this.props}
          xAxisAt='top'
        />

        <h3>Y Axis Left</h3>
        <GraphCanvas
          {...this.props}
          yAxisAt='left'
        />

        <h3>Y Axis Right</h3>
        <GraphCanvas
          {...this.props}
          yAxisAt='right'
        />
      </div>
    )
  }
}

BackgroundTestRender.defaultProps = {
  backgroundColor: "beige",
  yLineColor: 'red',
  yTickInterval: 10,

  xLineColor: 'blue',
  xTickInterval: 100,

  yMin: 10,
  yMax: 110,
  xMin: 100,
  xMax: 1100,
}

export default BackgroundTestRender
