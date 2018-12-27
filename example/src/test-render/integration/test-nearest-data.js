import React, { Component } from 'react'
import {GraphCanvas, canvas} from 'react-canvas-time-series'
const { ui, math } = canvas

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

const DATA = [{
  x: X_MIN, y: Y_MIN
}, {
  x: (X_MAX + X_MIN) / 4, y: (Y_MAX + Y_MIN) / 4
}, {
  x: (X_MAX + X_MIN) / 2, y: (Y_MAX + Y_MIN) / 2
}, {
  x: 3 * (X_MAX + X_MIN) / 4, y: 3 * (Y_MAX + Y_MIN) / 4
}, {
  x: X_MAX, y: Y_MAX
}]

class TestNearestData extends Component {
  onMouseMove = (e, mouse, graph, xRange) => {
    if (!ui.isInsideRect(mouse, graph)) {
      return
    }

    const x = math.toX({
      width: graph.width,
      left: graph.left,
      xMin: X_MIN,
      xMax: X_MAX
    })(mouse.x)

    const i = math.findNearestIndex(DATA.map(d => d.x), x)

    mouse.x = math.toCanvasX({
      width: graph.width,
      left: graph.left,
      xMin: X_MIN,
      xMax: X_MAX
    })(DATA[i].x)
  }

  render () {
    return (
      <GraphCanvas
        {...this.props}
        xMin={X_MIN}
        xMax={X_MAX}
        yMin={Y_MIN}
        yMax={Y_MAX}
        graphs={[{
          type: 'point',
          data: DATA
        }]}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

TestNearestData.defaultProps = {
}

export default TestNearestData
