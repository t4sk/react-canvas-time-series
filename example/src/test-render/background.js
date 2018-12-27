import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'

class BackgroundTestRender extends Component {
  render () {
    return (
      <div style={{margin: 10}}>
        <h3>Hide X Ticks</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            showXTick: false
          }}
        />

        <h3>Hide X Lines</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            showXLine: false
          }}
        />

        <h3>Hide Y Ticks</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            showYTick: false,
          }}
        />

        <h3>Hide Y Lines</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            showYLine: false,
          }}
        />

        <h3>X Axis Bottom</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            xAxisAt: 'bottom',
          }}
        />

        <h3>X Axis Top</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            xAxisAt: 'top',
          }}
        />

        <h3>Y Axis Left</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            yAxisAt: 'left'
          }}
        />

        <h3>Y Axis Right</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            yAxisAt: 'right'
          }}
        />
      </div>
    )
  }
}

BackgroundTestRender.defaultProps = {
  background: {
    color: "beige",
    yLineColor: 'red',
    yTickInterval: 10,
    xLineColor: 'blue',
    xTickInterval: 100,
  },
  yMin: 10,
  yMax: 110,
  xMin: 100,
  xMax: 1100,
}

export default BackgroundTestRender
