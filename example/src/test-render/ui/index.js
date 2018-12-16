import React, { Component } from 'react'
import { GraphCanvas} from 'react-canvas-time-series'
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
        />

        {/*}
        <h3>X Label Top</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                xAxisAt: 'top'
              }
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              graph: {
                ...this.props.ui.graph,
                top: 60,
              },
              xLabelAt: 'top'
            })
          }}
        />

        <h3>Y Label Left</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                yAxisAt: 'left'
              }
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              yLabelAt: 'left',
            })
          }}
        />

        <h3>Y Label Right</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                yAxisAt: 'right'
              }
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              graph: {
                ...this.props.ui.graph,
                left: 20,
              },
              yLabelAt: 'right'
            })
          }}
        />
        */}

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
        <h3>Hide X Label</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, this.props)
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              showXLabel: false,
            })
          }}
        />

        <h3>Hide X Line</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, this.props)
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              showXLine: false,
            })
          }}
        />

        <h3>Hide Y Label</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, this.props)
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              showYLabel: false,
            })
          }}
        />

        <h3>Hide Y Line</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, this.props)
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
              showYLine: false,
            })
          }}
        />
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
  backgroundColor: 'beige',
  yTickInterval: 10,
  xTickInterval: 100,

  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,

  ui: {
    canvas: {
      width: 500,
      height: 300,
    },
    graph: {
      left: 70,
      top: 10,
      width: 400,
      height: 220
    },
    showXLabel: true,
    showXLine: true,
    xLineColor: 'blue',
    xLabelAt: 'bottom',
    xLabelWidth: 70,
    xLabelHeight: 20,
    xLabelBackgroundColor: 'green',
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => Math.round(x),

    showYLabel: true,
    showYLine: true,
    yLineColor: 'green',
    yLabelAt: 'left',
    yLabelWidth: 50,
    yLabelHeight: 20,
    yLabelBackgroundColor: 'black',
    yLabelFont: '12px Arial',
    yLabelColor: 'white',
    renderYLabel: y => y.toFixed(2),

    yMin: Y_MIN,
    yMax: Y_MAX,
    xMin: X_MIN,
    xMax: X_MAX
  },
}

export default UITestRender
