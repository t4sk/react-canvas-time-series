import React, { Component } from 'react'
import { rand } from '../../test-util'
import TestCanvas from '../../test-canvas'
import { linear, round, getNearestDataAtX } from '../../math'
import * as background from '../../background'
import * as line from '../../line'
import * as ui from '../index'

const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 10
const Y_MAX = 110

let LINE_DATA = []

for (let i = 0; i < 10; i++) {
  LINE_DATA.push({
    x: round(rand(X_MIN, X_MAX)),
    y: round(rand(Y_MIN, Y_MAX))
  })
}

LINE_DATA.sort((a, b) => a.x - b.x)

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

class TestNearest extends Component {
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
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <TestCanvas
          {...this.props}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
          drawData={(ctx, props) => {
            line.draw(ctx, {
              ...props,
              data: LINE_DATA,
              line: {
                color: 'green',
                width: 1
              }
            })
          }}
          drawUI={(ctx, props) => {
            ui.draw(ctx, props)

            if (this.state.data) {
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
    )
  }
}

TestNearest.defaultProps = {
}

export default TestNearest
