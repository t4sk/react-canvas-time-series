import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

class LabelTestRender extends Component {
  render () {
    return (
      <div>
        <h3>Label</h3>
        <GraphCanvas
          {...this.props}
          labels={[{
            showXLine: true,
            showXLabel: true,
            canvasX: 250,
            xLabelText: 'x0',
            xLabelBackgroundColor: 'yellowgreen',
            xLineColor: 'yellowgreen',

            showYLine: true,
            showYLabel: true,
            canvasY: 110,
            yLabelText: 'y0',
            yLabelBackgroundColor: 'yellowgreen',
            yLineColor: 'yellowgreen',
          }, {
            showXLine: true,
            showXLabel: true,
            canvasX: 150,
            xLabelText: 'x1',
            xLabelBackgroundColor: 'deeppink',
            xLineColor: 'deeppink',

            showYLine: true,
            showYLabel: true,
            canvasY: 160,
            yLabelText: 'y1',
            yLabelBackgroundColor: 'deeppink',
            yLineColor: 'deeppink',
          }]}
        />
      </div>
    )
  }
}

LabelTestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 100,
  },
  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default LabelTestRender
