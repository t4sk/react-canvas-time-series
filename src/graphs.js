import React, { Component } from "react"
import PropTypes from "prop-types"

import * as xLines from "./canvas/x-lines"
import * as yLines from "./canvas/y-lines"
import * as bars from "./canvas/bars"
import * as line from "./canvas/line"
import * as point from "./canvas/point"
import * as xAxis from "./canvas/x-axis"
import * as yAxis from "./canvas/y-axis"
import * as crosshair from "./canvas/crosshair"
import * as text from "./canvas/text"

const AXES = {
  top: xAxis,
  bottom: xAxis,
  left: yAxis,
  right: yAxis,
}

const GRAPHS = {
  xLines,
  yLines,
  line,
  point,
  bars,
}

class Graphs extends Component {
  constructor(props) {
    super(props)

    this.axes = React.createRef()
    this.graphs = React.createRef()
    this.ui = React.createRef()
    this.crosshair = React.createRef()

    // ref to animation frame
    this.animation = undefined
  }

  componentDidMount() {
    this.ctx = {
      axes: this.axes.current.getContext("2d"),
      graphs: this.graphs.current.getContext("2d"),
      ui: this.ui.current.getContext("2d"),
      crosshair: this.crosshair.current.getContext("2d"),
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
    this.ctx.axes.clearRect(0, 0, this.props.width, this.props.height)

    for (let axis of this.props.axes) {
      AXES[axis.at].draw(this.ctx.axes, axis)
    }

    this.ctx.graphs.clearRect(0, 0, this.props.width, this.props.height)

    for (let graph of this.props.graphs) {
      GRAPHS[graph.type].draw(this.ctx.graphs, graph)
    }

    if (this.props.crosshair) {
      this.ctx.crosshair.clearRect(0, 0, this.props.width, this.props.height)
      crosshair.draw(this.ctx.crosshair, this.props.crosshair)
    }

    this.ctx.ui.clearRect(0, 0, this.props.width, this.props.height)

    for (let frame of this.props.frames) {
      text.draw(this.ctx.ui, frame)
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
    const rect = this.ctx.crosshair.canvas.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  onMouseMove = e => {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(e, this.getMouse(e))
    }
  }

  onMouseDown = e => {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e, this.getMouse(e))
    }
  }

  onMouseUp = e => {
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e, this.getMouse(e))
    }
  }

  onMouseOut = e => {
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e)
    }
  }

  onWheel = e => {
    if (this.props.onWheel) {
      this.props.onWheel(e, this.getMouse(e))
    }
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
          ref={this.crosshair}
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

Graphs.defaultProps = {
  width: 800,
  height: 400,
  animate: true,
  shouldRedrawGraph: () => true,
  backgroundColor: "",
  axes: [],
  graphs: [],
  frames: [],
}

Graphs.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  animate: PropTypes.bool.isRequired,
  shouldRedrawGraph: PropTypes.func.isRequired,
  axes: PropTypes.arrayOf(
    PropTypes.shape({
      at: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
    })
  ).isRequired,
  graphs: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["xLines", "yLines", "line", "point", "bars"]),
    })
  ).isRequired,
  frames: PropTypes.array.isRequired,
  crosshair: PropTypes.object,
  onMouseMove: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseOut: PropTypes.func,
  onWheel: PropTypes.func,
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

export default Graphs
