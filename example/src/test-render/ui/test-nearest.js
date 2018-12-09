import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from '../../util'
const { background, ui, line, math } = canvas
const { toX, toCanvasX, toCanvasY, nearestIndexOf } = math

const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 10
const Y_MAX = 110

let DATA = []

for (let i = 0; i < 10; i++) {
  DATA.push({
    x: Math.round(rand(X_MIN, X_MAX)),
    y: Math.round(rand(Y_MIN, Y_MAX))
  })
}

DATA.sort((a, b) => a.x - b.x)

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

const HOVER_WIDTH = 40
const HOVER_HEIGHT = 20

class TestNearest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mouseX: undefined,
      mouseY: undefined,
      data: undefined,
    }
  }

  onMouseMove = (e, mouse) => {
    const {
      graph,
      xMax,
      xMin,
    } = this.props.ui

    if (ui.isInsideRect(mouse, graph)) {
      const x = toX({
        width: graph.width,
        left: graph.left,
        xMax,
        xMin
      })(mouse.x)

      const i = nearestIndexOf(x, DATA.map(d => d.x))

      this.setState((state) => ({
        mouseX: mouse.x,
        mouseY: mouse.y,
        data: DATA[i] || undefined,
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
    return
    this.setState((state) => ({
      mouseX: undefined,
      mouseY: undefined,
      data: undefined,
    }))
  }

  render () {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            canvas.fill(ctx, this.props.canvas)
            background.draw(ctx, this.props.background)
          }}
          drawData={(ctx) => {
            line.draw(ctx, {
              graph: {
                left: 70,
                top: 10,
                width: 400,
                height: 220
              },
              color: 'green',
              width: 1,
              data: DATA,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props.ui,
              mouse,
            })

            if (this.state.data) {
              const {
                graph,
                xMax,
                xMin,
                yMax,
                yMin,
              } = this.props.ui

              const canvasX = toCanvasX({
                width: graph.width,
                left: graph.left,
                xMax,
                xMin,
              })(this.state.data.x)

              const canvasY = toCanvasY({
                height: graph.height,
                top: graph.top,
                yMax,
                yMin,
              })(this.state.data.y)

              line.drawPoint(ctx, {
                canvasX,
                canvasY,
                color: 'orange',
                radius: 3,
                ambientColor: 'rgba(255, 255, 0, 0.5)',
                ambientRadius: 10,
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
              width: HOVER_WIDTH,
              height: HOVER_HEIGHT,
              top: getTop(this.state.mouseY, 10, HOVER_HEIGHT, this.props.ui.graph),
              left:getLeft(this.state.mouseX, 10, HOVER_WIDTH, this.props.ui.graph),
              transition: getTransition(this.state.mouseX, 10, HOVER_WIDTH, this.props.ui.graph),
              zIndex: 4,
              border: '1px solid black',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
            }}
          >
            {this.state.data.x}
          </div>
        )}
      </div>
    )
  }
}

TestNearest.defaultProps = {
}

export default TestNearest
