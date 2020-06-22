import React, { useState } from "react"
import Graph from "../components/Graph"

// fake data
const X_MIN = 0
const X_MAX = 50
const Y_MIN = 0
const Y_MAX = 1000

const X_TICK_INTERVAL = 10
const Y_TICK_INTERVAL = 100

// dimensions
const WIDTH = 900
const HEIGHT = 300

function Frames() {
  const [mouse, setMouse] = useState({
    x: undefined,
    y: undefined,
  })

  function onMouseMove(e: any, mouse: any) {
    setMouse(mouse)
  }

  function onMouseOut() {
    setMouse({
      x: undefined,
      y: undefined,
    })
  }

  return (
    <Graph
      width={WIDTH}
      height={HEIGHT}
      animate={true}
      backgroundColor="beige"
      xMin={X_MIN}
      xMax={X_MAX}
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="bottom"
      xTickInterval={X_TICK_INTERVAL}
      yAxisAt="right"
      yTickInterval={Y_TICK_INTERVAL}
      frames={[
        {
          text: `x: ${mouse.x}`,
          color: "black",
          font: "16px Arial",
          left: 10,
          top: 10,
        },
        {
          text: `y: ${mouse.y}`,
          color: "black",
          font: "16px Arial",
          left: 10,
          top: 10 + 15,
        },
      ]}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    />
  )
}

export default Frames
