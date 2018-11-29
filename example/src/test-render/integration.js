import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from '../util'

const { background, line, bar, candlestick, ui, math } = canvas
const {
  linear,
  round,
} = math

const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 15
const Y_MAX = 45

const VOLUME_MIN = 100
const VOLUME_MAX = 1000

let LINE_DATA = []

for (let i = 0; i < 20; i++) {
  LINE_DATA.push({
    x: round(rand(X_MIN, X_MAX)),
    y: round(rand(Y_MIN, Y_MAX))
  })
}

LINE_DATA.sort((a, b) => a.x - b.x)

function generateRandomData (length) {
  let data = []

  for (let i = 0; i < length; i++) {
    const high = rand(Y_MIN, Y_MAX)
    const low = rand(Y_MIN, high)
    const open = rand(low, high)
    const close = rand(low, high)

    data.push({
      high,
      low,
      open,
      close,
      volume: rand(VOLUME_MIN, VOLUME_MAX),
      y: rand(Y_MIN, Y_MAX),
    })
  }

  return data
}

const DATA = generateRandomData(20)

function getTop(top, padding, height, graph) {
  return top  + padding
}

function getLeft(left, padding, width, graph) {
  if (left -padding - width <= graph.left) {
     return left + padding
  }
  return left - padding - width
}

function getTransition(left, padding, width, graph) {
  let transition = ''

  if (left <= graph.left + 2 * (width + padding)) {
    transition = 'left 0.1s'
  }

  return transition
}

class TestRender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mouseX: undefined,
      mouseY: undefined,
      data: undefined,
    }

    this.mouse = {
      x: undefined,
    }
  }

  // onMouseMove = (e, mouse) => {
  //   const {
  //     xMax,
  //     xMin,
  //     graph,
  //   } = this.props.candlestick
  //
  //   this.mouse = {
  //     x: mouse.x,
  //   }
  //
  //   if (
  //     ui.isInsideRect(mouse, graph) ||
  //     ui.isInsideRect(mouse, this.props.volume.graph)
  //   ) {
  //     const x = linear({
  //       dy: xMax - xMin,
  //       dx: graph.width,
  //       y0: xMin,
  //     })(mouse.x - graph.left)
  //
  //     const data = getNearestDataAtX(x, LINE_DATA)
  //
  //     this.setState((state) => ({
  //       mouseX: mouse.x,
  //       mouseY: mouse.y,
  //       data,
  //     }))
  //   } else {
  //     this.setState((state) => ({
  //       mouseX: undefined,
  //       mouseY: undefined,
  //       data: undefined,
  //     }))
  //   }
  // }
  //
  // onMouseOut = (e, mouse) => {
  //   this.setState((state) => ({
  //     mouseX: undefined,
  //     mouseY: undefined,
  //     data: undefined,
  //   }))
  // }

  render () {
    return (
      <div>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          <GraphCanvas
            canvas={this.props.canvas}
            drawBackground={(ctx) => {
              canvas.fill(ctx, this.props.canvas)

              background.draw(ctx, this.props.candlestick.background)
              background.draw(ctx, this.props.bar.background)
            }}
            drawData={(ctx) => {
              line.draw(ctx, this.props.candlestick.line)

              candlestick.draw(ctx, this.props.candlestick.candlestick)

              bar.draw(ctx, this.props.bar.bar)
            }}
            drawUI={(ctx, mouse) => {
              // ui.clear(ctx, {
              //   ...this.props,
              //   mouse,
              // })
              //
              // if (!ui.isInsideRectHorizontal(mouse, {
              //   left: 10,
              //   width: 680,
              // })) {
              //   return
              // }
              //
              // if (!ui.isInsideRectVertical(mouse, {
              //   top: 10,
              //   height: 430,
              // })) {
              //   return
              // }
              //
              // // candlestick
              // if (ui.isInsideRect(mouse, this.props.candlestick.graph)) {
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawYLine(ctx, {
              //     mouse,
              //     ...this.props.candlestick
              //   })
              //
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawYLabel(ctx, {
              //     mouse,
              //     ...this.props.candlestick
              //   })
              // }
              //
              // // // volume
              // if (ui.isInsideRect(mouse, this.props.volume.graph)) {
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawYLine(ctx, {
              //     mouse,
              //     ...this.props.volume
              //   })
              //
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawYLabel(ctx, {
              //     mouse,
              //     ...this.props.volume
              //   })
              // }
              //
              // // x line and x label
              // if (
              //   ui.isInsideRect(mouse, this.props.candlestick.graph) ||
              //   ui.isInsideRect(mouse, this.props.volume.graph)
              // ) {
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawXLine(ctx, {
              //     mouse,
              //     ...this.props.candlestick
              //   })
              //
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawXLine(ctx, {
              //     mouse,
              //     ...this.props.volume
              //   })
              //
              //   // TODO require more explicit props instead of props.candlestick
              //   ui.drawXLabel(ctx, {
              //     mouse,
              //     ...this.props.volume
              //   })
              // }
              //
              // if (this.state.data) {
              //   const {
              //     graph,
              //     xMax,
              //     xMin,
              //     yMax,
              //     yMin
              //   } = this.props.candlestick
              //
              //
              //   // TODO require more explicit props instead of props.candlestick
              //   line.drawPointAt(ctx, {
              //     ...this.props,
              //     graph,
              //     xMax,
              //     xMin,
              //     yMax,
              //     yMin,
              //     x: this.state.data.x,
              //     y: this.state.data.y,
              //     radius: 10,
              //     ambientColor: 'rgba(255, 255, 0, 0.5)',
              //     color: 'orange',
              //     borderColor: 'white',
              //   })
              // }
            }}
            onMouseMove={this.onMouseMove}
            onMouseOut={this.onMouseOut}
          />
          {this.state.data && (
            <div
              style={{
                position: 'absolute',
                width: 40,
                height: 20,
                top: getTop(this.state.mouseY, 10, 20, this.props.candlestick.graph),
                left:getLeft(this.state.mouseX, 10, 40, this.props.candlestick.graph),
                transition: getTransition(this.state.mouseX, 10, 40, this.props.candlestick.graph),
                zIndex: 4,
                border: '1px solid black',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {this.state.data.x}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const BACKGROUND_DEFAULT_PROPS = {
  top: 10,
  left: 20,
  width: 450,
  height: 270,
  backgroundColor: 'lightgrey',

  showYLabel: true,
  showYLine: true,
  yLineWidth: 1,
  yLineColor: 'red',
  yAxisAt: 'left',
  yAxisWidth: 50,
  yLabelFont: '12px Arial',
  yLabelColor: 'black',
  renderYLabel: y => y,
  yInterval: 10,

  showXLabel: true,
  showXLine: true,
  xLineWidth: 1,
  xLineColor: 'blue',
  xAxisAt: 'bottom',
  xAxisHeight: 50,
  xLabelFont: '12px Arial',
  xLabelColor: 'black',
  renderXLabel: x => x,
  xInterval: 15,
}

const UI_DEFAULT_PROPS = {
  showXLine: true,
  showXLabel: true,
  xLineColor: 'blue',
  xLabelAt: 'bottom',
  xLabelWidth: 70,
  xLabelHeight: 20,
  xLabelBackgroundColor: 'green',
  xLabelFont: '12px Arial',
  xLabelColor: 'black',
  renderXLabel: x => Math.round(x),

  showYLine: true,
  showYLabel: true,
  yLineColor: 'green',
  yLabelAt: 'right',
  yLabelWidth: 50,
  yLabelHeight: 20,
  yLabelBackgroundColor: 'black',
  yLabelFont: '12px Arial',
  yLabelColor: 'white',
  renderYLabel: y => y.toFixed(2)
}

TestRender.defaultProps = {
  canvas: {
    width: 700,
    height: 450,
    backgroundColor: "beige",
  },
  candlestick: {
    background: {
      ...BACKGROUND_DEFAULT_PROPS,
      left: 10,
      top: 10,
      width: 680,
      height: 280,
      yInterval: 5,
      showXLabel: false,
      xAxisHeight: 0,

      yMin: Y_MIN,
      yMax: Y_MAX,
      xMin: X_MIN,
      xMax: X_MAX
    },
    line: {
      graph: {
        left: 60,
        top: 10,
        width: 630,
        height: 280
      },
      color: 'orange',
      width: 1,
      data: LINE_DATA,
      xMin: X_MIN,
      xMax: X_MAX,
      yMin: Y_MIN,
      yMax: Y_MAX
    },
    candlestick: {
      graph: {
        left: 60,
        top: 10,
        width: 630,
        height: 280
      },
      wickWidth: 2,
      getWickColor: (d) => d.open <= d.close ? 'green' : 'red',
      lineWidth: 1,
      getLineColor: (d) => d.open <= d.close ? 'green' : 'red',
      getBackgroundColor: (d) => d.open <= d.close ? 'lightgreen' : 'pink',
      data: DATA,
      yMin: Y_MIN,
      yMax: Y_MAX,
    },
    ui: UI_DEFAULT_PROPS,
  },
  bar: {
    background: {
      ...BACKGROUND_DEFAULT_PROPS,
      left: 10,
      top: 310,
      width: 680,
      height: 130,
      yInterval: 300,

      yMin: VOLUME_MIN,
      yMax: VOLUME_MAX,
      xMin: X_MIN,
      xMax: X_MAX
    },
    bar: {
      getBackgroundColor: d => d.open <= d.close ? 'lightgreen' : 'pink',
      getLineColor: d => d.open <= d.close ? 'green' : 'red',
      lineWidth: 1
    },
    bar: {
      graph: {
        left: 60,
        top: 310,
        width: 630,
        height: 80
      },
      getBackgroundColor: d => d.open <= d.close ? 'lightgreen' : 'pink',
      getLineColor: d => d.open <= d.close ? 'green' : 'red',
      lineWidth: 1,
      data: DATA.map(d => ({...d, y: d.volume})),
      yMin: VOLUME_MIN,
      yMax: VOLUME_MAX,
    },
    ui: UI_DEFAULT_PROPS,
  },
}

export default TestRender
