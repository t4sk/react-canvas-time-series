import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as xLine from './canvas/x-line'
import * as yLine from './canvas/y-line'
import * as line from './canvas/line'
import * as xAxis from './canvas/x-axis'
import * as yAxis from './canvas/y-axis'

const AXES = {
  top: xAxis,
  bottom: xAxis,
  left: yAxis,
  right: yAxis
}

const GRAPHS = {
  xLine,
  yLine,
  line,
}

class Graphs extends Component {
  constructor(props) {
    super(props)

    this.axes = React.createRef()
    this.graphs = React.createRef()
    this.frames = React.createRef()
    this.crosshair = React.createRef()

    // ref to animation frame
    this.animation = undefined
  }

  componentDidMount() {
    this.ctx = {
      axes: this.axes.current.getContext('2d'),
      graphs: this.graphs.current.getContext('2d'),
      frames: this.frames.current.getContext('2d'),
      crosshair: this.crosshair.current.getContext('2d'),
    }

    this.draw()
    this.animate()
  }

  draw = () => {
    for (let axis of this.props.axes) {
      AXES[axis.at].draw(this.ctx.axes, axis)
    }

    for (let graph of this.props.graphs) {
      GRAPHS[graph.type].draw(this.ctx.graphs, graph)
    }
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)

    // this.ctx.frames.clearRect(0, 0, this.props.width, this.props.height)
    // this.ctx.crosshair.clearRect(0, 0, this.props.width, this.props.height)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation)
  }

  render() {
    return (
      <div style={{
        ...styles.container,
        width: this.props.width,
        height: this.props.height,
        backgroundColor: this.props.backgroundColor,
      }}>
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
          ref={this.frames}
          style={styles.canvas}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          ref={this.crosshair}
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
  backgroundColor: "",
  axes: [],
  graphs: [],
}

Graphs.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  axes: PropTypes.arrayOf(PropTypes.shape({
    at: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  })).isRequired,
  graphs: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['xLine', 'yLine', 'line'])
  })).isRequired,
}

const styles = {
  container: {
    position: 'relative',
    cursor: 'crosshair',
  },
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
  }
}

export default Graphs
