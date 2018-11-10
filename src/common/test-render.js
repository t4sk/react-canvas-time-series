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

  onMouseMove = (e, mouse) => {
    const {
      xMax,
      xMin,
      graph,
    } = this.props

    this.mouse = {
      x: mouse.x,
    }

    if (ui.isInsideRect(mouse, graph)) {
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

  onMouseOut = (e, mouse) => {
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
            {...this.props}
            drawBackground={(ctx, props) => {
              background.fillCanvas(ctx, props)

              background.draw(ctx, {
                ...props,
                background: {
                  ...props.background,
                  left: 10,
                  top: 10,
                  width: 680,
                  height: 280,
                  yAxisAt: 'right',
                  showXLabel: false,
                  xAxisHeight: 0,
                },
                graph: {
                  left: 10,
                  top: 10,
                  width: 630,
                  height: 280
                },
                yMin: Y_MIN,
                yMax: Y_MAX,
              })

              background.draw(ctx, {
                ...props,
                background: {
                  ...props.background,
                  left: 10,
                  top: 310,
                  width: 680,
                  height: 130,
                  yAxisAt: 'right',
                  yInterval: 300,
                },
                graph: {
                  left: 10,
                  top: 310,
                  width: 630,
                  height: 80
                },
                yMin: VOLUME_MIN,
                yMax: VOLUME_MAX,
              })
            }}
            drawData={(ctx, props) => {
              line.draw(ctx, {
                ...props,
                background: {
                  ...props.background,
                  left: 10,
                  top: 10,
                  width: 680,
                  height: 280,
                  yAxisAt: 'right',
                  showXLabel: false,
                  xAxisHeight: 0,
                },
                graph: {
                  left: 10,
                  top: 10,
                  width: 630,
                  height: 280
                },
                yMin: Y_MIN,
                yMax: Y_MAX,
                data: LINE_DATA,
                line: {
                  color: 'orange',
                  width: 1
                }
              })

              candlestick.draw(ctx, {
                ...props,
                background: {
                  ...props.background,
                  left: 10,
                  top: 10,
                  width: 680,
                  height: 280,
                  yAxisAt: 'right',
                  showXLabel: false,
                  xAxisHeight: 0,
                },
                graph: {
                  left: 10,
                  top: 10,
                  width: 630,
                  height: 280
                },
                yMin: Y_MIN,
                yMax: Y_MAX,
                candlestick: {
                  wickWidth: 2,
                  getWickColor: (d) => d.open <= d.close ? 'green' : 'red',
                  lineWidth: 1,
                  getLineColor: (d) => d.open <= d.close ? 'green' : 'red',
                  getBackgroundColor: (d) => d.open <= d.close ? 'lightgreen' : 'pink'
                },
                data: DATA
              })

              // volume
              bar.draw(ctx, {
                ...props,
                background: {
                  ...props.background,
                  left: 10,
                  top: 310,
                  width: 680,
                  height: 130,
                  yAxisAt: 'right',
                  yInterval: 300,
                },
                graph: {
                  left: 10,
                  top: 310,
                  width: 630,
                  height: 80
                },
                bar: {
                  getBackgroundColor: d => d.open <= d.close ? 'lightgreen' : 'pink',
                  getLineColor: d => d.open <= d.close ? 'green' : 'red',
                  lineWidth: 1
                },
                yMin: VOLUME_MIN,
                yMax: VOLUME_MAX,
                data: DATA.map(d => ({...d, y: d.volume}))
              })
            }}
            drawUI={(ctx, props) => {
              ui.clear(ctx, props)

              if (!ui.isInsideRectHorizontal(props.mouse, {
                left: 10,
                width: 680,
              })) {
                return
              }

              if (!ui.isInsideRectVertical(props.mouse, {
                top: 10,
                height: 430,
              })) {
                return
              }

              // candlestick
              if (
                ui.isInsideRect(props.mouse, {
                  left: 10,
                  top: 10,
                  width: 630,
                  height: 280
                })
              ) {
                ui.drawYLine(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 10,
                    width: 630,
                    height: 280
                  },
                })

                ui.drawYLabel(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 10,
                    width: 630,
                    height: 280
                  },
                })
              }

              // volume
              if (
                ui.isInsideRect(props.mouse, {
                  left: 10,
                  top: 310,
                  width: 630,
                  height: 80
                })
              ) {
                ui.drawYLine(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 310,
                    width: 630,
                    height: 80
                  },
                })

                ui.drawYLabel(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 310,
                    width: 630,
                    height: 80
                  },
                  yMin: VOLUME_MIN,
                  yMax: VOLUME_MAX,
                })
              }

              // x line and x label
              if (
                ui.isInsideRect(props.mouse, {
                  left: 10,
                  top: 10,
                  width: 630,
                  height: 280
                }) ||
                ui.isInsideRect(props.mouse, {
                  left: 10,
                  top: 310,
                  width: 630,
                  height: 80
                })
              ) {
                ui.drawXLine(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 10,
                    width: 630,
                    height: 280
                  },
                })

                ui.drawXLine(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 310,
                    width: 630,
                    height: 80
                  },
                })

                ui.drawXLabel(ctx, {
                  ...props,
                  graph: {
                    left: 10,
                    top: 310,
                    width: 630,
                    height: 80
                  },
                  yMin: VOLUME_MIN,
                  yMax: VOLUME_MAX,
                })
              }

              if (this.state.data) {
                const graph = {
                  left: 10,
                  top: 10,
                  width: 630,
                  height: 280
                }

                const xMax = X_MAX
                const xMin = X_MIN
                const yMax = Y_MAX
                const yMin = Y_MIN

                line.drawPointAt(ctx, {
                  ...props,
                  graph,
                  xMax,
                  xMin,
                  yMax,
                  yMin,
                  x: this.state.data.x,
                  y: this.state.data.y,
                  radius: 10,
                  ambientColor: 'rgba(255, 255, 0, 0.5)',
                  color: 'orange',
                  borderColor: 'white',
                })
              }
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
      </div>
    )
  }
}

TestRender.defaultProps = {
  canvas: {
    width: 700,
    height: 450,
    backgroundColor: "beige",
  },
  graph: {
    left: 10,
    top: 10,
    width: 630,
    height: 280
  },
  background: {
    top: 10,
    left: 20,
    width: 450,
    height: 270,
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

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'lightgrey',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
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
