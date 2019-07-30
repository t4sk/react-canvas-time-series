import React, { Component } from "react"
import PropTypes from "prop-types"

import { getLayout } from "./layout"
import * as xAxis from "./canvas/x-axis"
import * as yAxis from "./canvas/y-axis"
import * as crosshair from "./canvas/crosshair"
import * as text from "./canvas/text"
import * as xLabel from "./canvas/x-label"
import * as yLabel from "./canvas/y-label"
import * as bars from "./canvas/bars"
import * as line from "./canvas/line"
import * as points from "./canvas/points"
import * as candlesticks from "./canvas/candlesticks"

const GRAPHS = {
  line,
  points,
  bars,
  candlesticks,
}

class Graph extends Component {
  constructor(props) {
    super(props)

    this.axes = React.createRef()
    this.graphs = React.createRef()
    this.ui = React.createRef()

    // ref to animation frame
    this.animation = undefined
  }

  componentDidMount() {
    this.ctx = {
      axes: this.axes.current.getContext("2d"),
      graphs: this.graphs.current.getContext("2d"),
      ui: this.ui.current.getContext("2d"),
    }

    if (this.props.animate) {
      this.animate()
    } else {
      this.draw()
    }
  }

  componentDidUpdate() {
    if (!this.props.animate && this.props.shouldRedrawGraph()) {
      this.draw()
    }
  }

  draw = () => {
    const { xMin, xMax, yMin, yMax, xAxisAt, yAxisAt } = this.props

    const layout = getLayout(this.props)

    this.ctx.axes.clearRect(0, 0, this.props.width, this.props.height)

    if (xAxisAt) {
      xAxis.draw(this.ctx.axes, layout, this.props)
    }

    if (yAxisAt) {
      yAxis.draw(this.ctx.axes, layout, this.props)
    }

    this.ctx.graphs.clearRect(0, 0, this.props.width, this.props.height)

    for (let graph of this.props.graphs) {
      GRAPHS[graph.type].draw(this.ctx.graphs, layout, graph, this.props)
    }

    this.ctx.ui.clearRect(0, 0, this.props.width, this.props.height)

    if (this.props.crosshair) {
      crosshair.draw(this.ctx.ui, layout, this.props.crosshair)
    }

    for (let frame of this.props.frames) {
      text.draw(this.ctx.ui, frame)
    }

    for (let label of this.props.xLabels) {
      xLabel.draw(this.ctx.ui, layout, label, this.props)
    }

    for (let label of this.props.yLabels) {
      yLabel.draw(this.ctx.ui, layout, label, this.props)
    }
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)
    this.draw()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation)
  }

  getMouse = e => {
    const rect = this.ctx.ui.canvas.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  onMouseMove = e => {
    this.props.onMouseMove(e, this.getMouse(e), getLayout(this.props))
  }

  onMouseDown = e => {
    this.props.onMouseDown(e, this.getMouse(e), getLayout(this.props))
  }

  onMouseUp = e => {
    this.props.onMouseUp(e, this.getMouse(e))
  }

  onMouseOut = e => {
    this.props.onMouseOut(e)
  }

  onWheel = e => {
    this.props.onWheel(e, this.getMouse(e))
  }

  render() {
    return (
      <div
        style={{
          ...styles.container,
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.props.backgroundColor,
        }}
      >
        <canvas
          ref={this.axes}
          style={styles.canvas}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          ref={this.graphs}
          style={styles.canvas}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          ref={this.ui}
          style={styles.canvas}
          width={this.props.width}
          height={this.props.height}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseOut={this.onMouseOut}
          onWheel={this.onWheel}
        />
      </div>
    )
  }
}

Graph.defaultProps = {
  width: 500,
  height: 300,
  padding: 10,
  animate: true,
  shouldRedrawGraph: () => true,
  backgroundColor: "",
  // x axis
  xAxisHeight: 30,
  xAxisLineColor: "black",
  xTicks: [],
  xTickInterval: 0,
  xTickLength: 10,
  renderXTick: x => x,
  xAxisFont: "",
  xAxisTextColor: "black",
  showXLine: true,
  xLineColor: "lightgrey",

  // y axis
  yAxisWidth: 50,
  yAxisLineColor: "black",
  yTicks: [],
  yTickInterval: 0,
  yTickLength: 10,
  renderYTick: y => y,
  yAxisFont: "",
  yAxisTextColor: "black",
  showYLine: true,
  yLineColor: "lightgrey",

  xMin: 0,
  xMax: 0,
  yMin: 0,
  yMax: 0,
  graphs: [],
  frames: [],
  xLabels: [],
  yLabels: [],

  onMouseMove: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseOut: () => {},
  onWheel: () => {},
}

Graph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  animate: PropTypes.bool.isRequired,
  shouldRedrawGraph: PropTypes.func.isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  // x axis
  xAxisAt: PropTypes.oneOf(["top", "bottom"]),
  xAxisHeight: PropTypes.number.isRequired,
  xAxisLineColor: PropTypes.string.isRequired,
  xTicks: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  xTickInterval: PropTypes.number.isRequired,
  xTickLength: PropTypes.number.isRequired,
  renderXTick: PropTypes.func.isRequired,
  xAxisFont: PropTypes.string.isRequired,
  xAxisTextColor: PropTypes.string.isRequired,
  showXLine: PropTypes.bool.isRequired,
  xLineColor: PropTypes.string.isRequired,
  // y axis
  yAxisAt: PropTypes.oneOf(["left", "right"]),
  yAxisWidth: PropTypes.number.isRequired,
  yAxisLineColor: PropTypes.string.isRequired,
  yTicks: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  yTickInterval: PropTypes.number.isRequired,
  yTickLength: PropTypes.number.isRequired,
  renderYTick: PropTypes.func.isRequired,
  yAxisFont: PropTypes.string.isRequired,
  yAxisTextColor: PropTypes.string.isRequired,
  showYLine: PropTypes.bool.isRequired,
  yLineColor: PropTypes.string.isRequired,
  // graphs
  graphs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["line", "points", "bars", "candlesticks"]),
    })
  ).isRequired,
  frames: PropTypes.array.isRequired,
  xLabels: PropTypes.array.isRequired,
  yLabels: PropTypes.array.isRequired,
  crosshair: PropTypes.object,
  onMouseMove: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
}

const styles = {
  container: {
    position: "relative",
    cursor: "crosshair",
  },
  canvas: {
    position: "absolute",
    left: 0,
    top: 0,
  },
}

export default Graph
