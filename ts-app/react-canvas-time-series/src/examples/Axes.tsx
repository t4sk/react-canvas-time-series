import React from "react"
import Graph from "../components/Graph"
import moment from "moment"

const NOW = Math.round(Date.now() / 1000)

const X_TICK_INTERVAL = 3600
const X_MIN = NOW - 10 * X_TICK_INTERVAL
const X_MAX = NOW
const X_TICKS = [NOW, NOW - X_TICK_INTERVAL]

const Y_TICK_INTERVAL = 1000
const Y_MIN = 1000
const Y_MAX = 10000
const Y_TICKS = [Y_MIN + 1500]

function renderXTick(x: number): string {
  return moment(x * 1000).format("HH:mm")
}

function renderYTick(y: number): string {
  return y.toLocaleString()
}

function Axes() {
  return (
    <Graph
      width={800}
      height={500}
      padding={20}
      backgroundColor="beige"
      xMin={X_MIN}
      xMax={X_MAX}
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="top"
      xAxisHeight={30}
      xAxisLineColor="red"
      xTicks={X_TICKS}
      xTickInterval={X_TICK_INTERVAL}
      xTickLength={5}
      renderXTick={renderXTick}
      xAxisFont=""
      xAxisTextColor="blue"
      showXLine={true}
      xLineColor="lightgrey"
      yAxisAt="left"
      yAxisWidth={50}
      yAxisLineColor="green"
      yTicks={Y_TICKS}
      yTickInterval={Y_TICK_INTERVAL}
      yTickLength={10}
      renderYTick={renderYTick}
      yAxisFont=""
      yAxisTextColor="red"
      showYLine={true}
      yLineColor="lightgrey"
    />
  )
}

export default Axes
