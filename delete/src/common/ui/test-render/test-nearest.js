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

  onMouseMove = (e, mouse) => {
    const {
      xMax,
      xMin,
      graph,
    } = this.props

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
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <TestCanvas
          {...this.props}
          drawBackground={(ctx) => {
            background.fillCanvas(ctx, this.props)
            background.draw(ctx, this.props)
          }}
          drawData={(ctx) => {
            line.draw(ctx, {
              ...this.props,
              data: LINE_DATA,
              line: {
                color: 'green',
                width: 1
              }
            })
          }}
          drawUI={(ctx, mouse) => {
            ui.draw(ctx, {
              ...this.props,
              mouse,
            })

            if (this.state.data) {
              line.drawPointAt(ctx, {
                ...this.props,
                mouse: mouse,
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
    )
  }
}

TestNearest.defaultProps = {
}

export default TestNearest