import React, { Component } from 'react'
import { rand } from './test-util'
import TestCanvas from './test-canvas'
import { linear, round, getNearestDataAtX } from './math'
import * as background from './background'
import * as candlestick from './candlestick'
import * as line from './line'
import * as bar from './bar'
import * as ui from './ui'

const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 15
const Y_MAX = 45

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
  }

  onMouseMoveTestGetNearestData = mouse => {
    const {
      xMax,
      xMin,
      graph,
    } = this.props

    if (ui.isInsideGraph(mouse, graph)) {
      const x = linear({
        dy: xMax - xMin,
        dx: graph.width,
        y0: xMin,
      })(mouse.x - graph.left)

      const data = getNearestDataAtX(x, LINE_DATA)

      this.setState((state) => ({
        mouseX: mouse.x,
        mouseY: mouse.y,
        data,
      }))
    } else {
      this.setState((state) => ({
        mouseX: undefined,
        mouseY: undefined,
        data: undefined,
      }))
    }
  }

  onMouseOutTestGetNearestData = () => {
    this.setState((state) => ({
      mouseX: undefined,
      mouseY: undefined,
      data: undefined,
    }))
  }

  render () {
    return (
      <div>
        <h3>Integration</h3>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          <TestCanvas
            {...{
              ...this.props,
              canvas: {
                width: 700,
                height: 300
              },
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10
              },
              graph: {
                left: 10,
                top: 10,
                width: 630,
                height: 280
              },
              background: {
                ...this.props.background,
                yAxisAt: 'right',
                showXLabel: false,
              },
              ui: {
                ...this.props.ui,
                showXLabel: false,
                showXLine: false
              }
            }}
            drawBackground={background.draw}
            drawData={(ctx, props) => {
              line.draw(ctx, {
                ...props,
                data: LINE_DATA,
                line: {
                  color: 'orange',
                  width: 1
                }
              })

              candlestick.draw(ctx, {
                ...props,
                candlestick: {
                  wickWidth: 2,
                  getWickColor: (d) => d.open <= d.close ? 'green' : 'red',
                  lineWidth: 1,
                  getLineColor: (d) => d.open <= d.close ? 'green' : 'red',
                  getBackgroundColor: (d) => d.open <= d.close ? 'lightgreen' : 'pink'
                },
                data: DATA
              })
            }}
            drawUI={(ctx, props) => {
              ui.draw(ctx, props)

              if (this.state.data) {
                // TODO line.drawPointAt
                const centerX = linear({
                  dy: props.graph.width,
                  dx: props.xMax - props.xMin,
                  y0: props.graph.left - props.graph.width / (props.xMax - props.xMin) * props.xMin
                })(this.state.data.x)

                const centerY = linear({
                  dy: -props.graph.height,
                  dx: props.yMax - props.yMin,
                  y0: props.graph.top + props.graph.height + props.graph.height / (props.yMax - props.yMin) * props.yMin
                })(this.state.data.y)

                const radius = 10

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = "orange"
                ctx.fillRect(centerX - 5, centerY - 5, 10, 10)

                ctx.beginPath();
                ctx.lineWidth = 2
                ctx.strokeStyle = "white"
                ctx.rect(centerX - 5, centerY - 5, 10, 10)
                ctx.stroke()
              }
            }}
            onMouseMove={this.onMouseMoveTestGetNearestData}
            onMouseOut={this.onMouseOutTestGetNearestData}
          />
          {this.state.data && (
            <div
              style={{
                position: 'absolute',
                width: 40,
                height: 20,
                top: getTop(this.state.mouseY, 10, 20, this.props.graph),
                left:getLeft(this.state.mouseX, 10, 40, this.props.graph),
                transition: getTransition(this.state.mouseX, 10, 40, this.props.graph),
                zIndex: 4,
                border: '1px solid black',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              {this.state.data.x}
            </div>
          )}
        </div>

        <TestCanvas
          {...{
            ...this.props,
            canvas: {
              width: 700,
              height: 150,
            },
            padding: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            },
            graph: {
              left: 10,
              top: 10,
              width: 630,
              height: 80
            },
            background: {
              ...this.props.background,
              yAxisAt: 'right',
              yInterval: 15,
              showXLabel: true,
              xAxisHeight: 50
            },
            bar: {
              getBackgroundColor: d => d.open <= d.close ? 'lightgreen' : 'pink',
              getLineColor: d => d.open <= d.close ? 'green' : 'red',
              lineWidth: 1
            },
            ui: {
              ...this.props.ui,
              showXLabel: false,
              showXLine: false
            }
          }}
          getRefs={console.log}
          drawData={(ctx, props) => {
            bar.draw(ctx, {
              ...props,
              data: DATA
            })
          }}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
  canvas: {
    width: 700,
    height: 400
  },
  padding: {
    top: 10,
    bottom: 0,
    left: 10,
    right: 10
  },
  graph: {
    left: 10,
    top: 10,
    width: 630,
    height: 340
  },
  background: {
    backgroundColor: 'white',

    showYLabel: true,
    showYLine: true,
    yLineWidth: 1,
    yLineColor: 'lightgrey',
    yAxisAt: 'right',
    yAxisWidth: 50,
    yLabelFont: '12px Arial',
    yLabelColor: 'black',
    renderYLabel: y => y,
    yInterval: 5,

    showXLabel: false,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'lightgrey',
    xAxisAt: 'bottom',
    xAxisHeight: 0,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => x,
    xInterval: 15
  },
  ui: {
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
  },
  yMin: Y_MIN,
  yMax: Y_MAX,
  xMin: X_MIN,
  xMax: X_MAX
}

export default TestRender
