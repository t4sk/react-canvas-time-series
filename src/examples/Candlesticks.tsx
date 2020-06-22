import React from "react"
import Graph from "../components/Graph"
import moment from "moment"
import { getRandomCandlestickData } from "../util"

const NOW = moment()
const DAYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map((i) => NOW.clone().startOf("day").subtract(i, "day").unix())
  .reverse()

const X_MIN = DAYS[0]
const X_MAX = DAYS[DAYS.length - 1]
const X_TICK_INTERVAL = 24 * 3600

const Y_MIN = 0
const Y_MAX = 1000
const Y_TICK_INTERVAL = 100

const DATA = getRandomCandlestickData(3600, X_MIN, X_MAX, Y_MIN, Y_MAX, 0)

// dimensions
const WIDTH = 900
const HEIGHT = 300

function Candlesticks() {
  return (
    <Graph
      width={WIDTH}
      height={HEIGHT}
      animate={false}
      backgroundColor="beige"
      xMin={X_MIN}
      xMax={X_MAX}
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="bottom"
      xTickInterval={X_TICK_INTERVAL}
      yAxisAt="left"
      yTickInterval={Y_TICK_INTERVAL}
      graphs={[
        {
          type: "candlesticks",
          data: DATA,
          step: 4,
          getColor: (d) => (d.open >= d.close ? "green" : "red"),
          candlestickWidth: 5,
        },
      ]}
    />
  )
}

export default Candlesticks
