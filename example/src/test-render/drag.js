import React, { useState } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"

const NOW = moment()
const DAYS = [...Array(10).keys()]
  .map(i =>
    NOW.clone()
      .startOf("day")
      .subtract(i, "day")
      .unix()
  )
  .reverse()

const X_MIN = DAYS[0]
const X_MAX = DAYS[DAYS.length - 1]
const X_TICK_INTERVAL = 24 * 3600

// graph
const WIDTH = 900
const HEIGHT = 150
const PADDING = 10
const X_AXIS_HEIGHT = 20

const X_AXIS = {
  top: HEIGHT - PADDING - X_AXIS_HEIGHT,
  left: PADDING,
  width: WIDTH - 2 * PADDING,
  height: X_AXIS_HEIGHT,
}

const GRAPH = {
  top: PADDING,
  left: PADDING,
  width: X_AXIS.width,
  height: HEIGHT - 2 * PADDING - X_AXIS.height,
}

function Drag(props) {
  const [state, setState] = useState({
    dragging: false,
    mouse: {
      x: undefined,
      y: undefined,
    },
    xMin: X_MIN,
    xMax: X_MAX,
  })

  function getXRange(mouse, state) {
    if (!canvas.math.isInsideRect(GRAPH, mouse) || !state.dragging) {
      return {
        xMin: state.xMin,
        xMax: state.xMax,
      }
    }

    const diff = mouse.x - state.mouse.x

    const xMin = canvas.math.getX(
      GRAPH.width,
      GRAPH.left,
      state.xMax,
      state.xMin,
      GRAPH.left - diff
    )

    const xMax = canvas.math.getX(
      GRAPH.width,
      GRAPH.left,
      state.xMax,
      state.xMin,
      GRAPH.width + GRAPH.left - diff
    )

    return {
      xMin,
      xMax,
    }
  }

  function onMouseMove(e, mouse) {
    const { xMin, xMax } = getXRange(mouse, state)

    setState({
      ...state,
      mouse: {
        x: mouse.x,
        y: mouse.y,
      },
      xMin,
      xMax,
    })
  }

  function onMouseDown(e, mouse) {
    if (canvas.math.isInsideRect(GRAPH, mouse)) {
      setState({
        ...state,
        dragging: true,
      })
    }
  }

  function onMouseUp(e, mouse) {
    setState({
      ...state,
      dragging: false,
    })
  }

  function onMouseOut() {
    setState({
      ...state,
      dragging: false,
      mouse: {
        x: undefined,
        y: undefined,
      },
    })
  }

  const { xMin, xMax, mouse } = state

  return (
    <Graphs
      width={WIDTH}
      height={HEIGHT}
      backgroundColor="beige"
      axes={[
        {
          at: "bottom",
          ...X_AXIS,
          lineColor: "blue",
          xMin,
          xMax,
          tickInterval: X_TICK_INTERVAL,
          renderTick: x => moment(x * 1000).format("MM-DD"),
        },
      ]}
      graphs={[
        {
          type: "xLines",
          ...GRAPH,
          lineColor: "blue",
          xMin,
          xMax,
          xInterval: X_TICK_INTERVAL,
        },
      ]}
      crosshair={{
        ...GRAPH,
        canvasX: mouse.x,
        canvasY: mouse.y,
      }}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  )
}

export default Drag
