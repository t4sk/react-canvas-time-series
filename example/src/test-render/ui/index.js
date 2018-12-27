import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
import TestZoom from './test-zoom'
import TestDrag from './test-drag'

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

class UITestRender extends Component {
  render () {
    return (
      <div>
        <h3>X Label Bottom</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            xAxisAt: 'bottom',
          }}
          ui={{
            ...this.props.ui,
            xLabelAt: 'bottom'
          }}
        />

        <h3>X Label Top</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            xAxisAt: 'top',
          }}
          ui={{
            ...this.props.ui,
            xLabelAt: 'top'
          }}
        />

        <h3>Y Label Left</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            yAxisAt: 'left',
          }}
          ui={{
            ...this.props.ui,
            yLabelAt: 'left'
          }}
        />

        <h3>Y Label Right</h3>
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            yAxisAt: 'right',
          }}
          ui={{
            ...this.props.ui,
            yLabelAt: 'right'
          }}
        />

        <h3>Hide X Label</h3>
        <GraphCanvas
          {...this.props}
          ui={{
            ...this.props.ui,
            showXLabel: false
          }}
        />

        <h3>Hide X Line</h3>
        <GraphCanvas
          {...this.props}
          ui={{
            ...this.props.ui,
            showXLine: false,
          }}
        />

        <h3>Hide Y Label</h3>
        <GraphCanvas
          {...this.props}
          ui={{
            ...this.props.ui,
            showYLabel: false,
          }}
        />

        <h3>Hide Y Line</h3>
        <GraphCanvas
          {...this.props}
          ui={{
            ...this.props.ui,
            showYLine: false,
          }}
        />

        <h3>X Drag</h3>
        <TestDrag {...this.props} />

        <h3>Scroll to Zoom</h3>
        <TestZoom {...this.props} />
      </div>
    )
  }
}

UITestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 100,
    renderXTickLabel: x => Math.round(x),
    renderYTickLabel: y => Math.round(y),
  },

  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,

  showUI: true,
  ui: {
    renderXLabel: x => Math.round(x),
    renderYLabel: y => Math.round(y),
  },
}

export default UITestRender
