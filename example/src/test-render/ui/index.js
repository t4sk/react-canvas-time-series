import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
// import TestZoom from './test-zoom'
// import TestNearest from './test-nearest'
// import TestDrag from './test-drag'
// import TestUpdateProps from './test-update-props'

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

        {/*}
        <h3>Update Canvas Props</h3>
        <TestUpdateProps {...this.props} />

        <h3>X Drag</h3>
        <TestDrag {...this.props} />

        <h3>Scroll to Zoom</h3>
        <TestZoom {...this.props} />

        <h3>Get Nearest Data at X</h3>
        <TestNearest {...this.props} />
        */}

        {/*}
        <h3>X Label Fixed</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, this.props)
          }}
          drawData={(ctx) => {
            ui.drawXLine(ctx, {
              graph: this.props.ui.graph,
              lineColor: 'orange',
              left: 275
            })

            ui.drawXLabel(ctx, {
              graph: this.props.ui.graph,
              left: 275,
              text: 'Here',
              height: this.props.ui.xLabelHeight,
              width: this.props.ui.xLabelWidth,
              labelAt: this.props.ui.xLabelAt,
              backgroundColor: 'orange',
              font: this.props.ui.xLabelFont,
              color: 'white'
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
            })
          }}
        />

        <h3>Y Label Fixed</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, this.props)
          }}
          drawData={(ctx) => {
            ui.drawYLine(ctx, {
              graph: this.props.ui.graph,
              lineColor: 'orange',
              top: 150
            })

            ui.drawYLabel(ctx, {
              graph: this.props.ui.graph,
              top: 150,
              height: this.props.ui.yLabelHeight,
              width: this.props.ui.yLabelWidth,
              labelAt: this.props.ui.yLabelAt,
              text: 'Here',
              backgroundColor: 'orange',
              font: this.props.ui.yLabelFont,
              color: 'white'
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
            })
          }}
        />
        */}
      </div>
    )
  }
}

UITestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 100,
  },

  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,

  showUI: true,
  ui: {
    renderXLabel: x => Math.round(x),
    renderYLabel: y => y.toFixed(2),
  },
}

export default UITestRender
