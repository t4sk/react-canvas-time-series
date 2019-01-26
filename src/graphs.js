import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
}

Graphs.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
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
