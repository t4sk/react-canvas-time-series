import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { draw as drawXAxis } from './canvas/history/x-axis'
import { draw as drawGraph } from './canvas/history/graph'
import { draw as drawWindow } from './canvas/history/window'

class History extends Component {
  constructor (props) {
    super(props)

    this.ui = React.createRef()
    this.graph = React.createRef()

    // ref to animation frame
    this.animation = undefined
  }

  componentDidMount() {
    this.ctx = {
      ui: this.ui.current.getContext('2d'),
      graph: this.graph.current.getContext('2d')
    }

    this.draw()
    this.animate()
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation)
  }

  getGraph = () => {
    return {
      width: this.props.width,
      height: this.props.height - this.props.xAxisHeight
    }
  }

  draw = () => {
    const { data } = this.props
    const xMin = data[0].x
    const xMax = data[data.length - 1].x

    const ys = data.map(d => d.y)
    const yMin = Math.min(...ys)
    const yMax = Math.max(...ys)

    const graph = this.getGraph()

    drawXAxis(this.ctx.graph, {
      ...this.props,
      graph,
      xMin,
      xMax,
    })

    drawGraph(this.ctx.graph, {
      ...this.props,
      graph,
      xMin,
      xMax,
      yMin,
      yMax,
    })
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)

    this.ctx.ui.clearRect(0, 0, this.props.width, this.props.height)

    const graph = this.getGraph()

    drawWindow(this.ctx.ui, {
      ...this.props,
      graph,
    })
  }

  getMouse = e => {
    const rect = this.ctx.ui.canvas.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  onMouseMove = e => {
    this.props.onMouseMove(e, this.getMouse(e))
  }

  onMouseDown = e => {
    this.props.onMouseDown(e, this.getMouse(e))
  }

  onMouseUp = e => {
    this.props.onMouseUp(e, this.getMouse(e))
  }

  onMouseOut = e => {
    this.props.onMouseOut(e)
  }

  render() {
    return (
      <div style={{
        ...styles.container,
        backgroundColor: this.props.backgroundColor,
        width: this.props.width,
        height: this.props.height
      }}>
        <canvas
          ref={this.graph}
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
        />
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    cursor: 'move',
  },
  canvas: {
    position: 'absolute',
    left: 0,
    top: 0,
  }
}

History.defaultProps = {
  width: 800,
  height: 200,
  backgroundColor: "",
  xAxisHeight: 30,
  xAxisColor: "",
  tickHeight: 5,
  ticks: [],
  renderTick: x => x,
  font: '12px Arial',
  textColor: "",

  // graph
  data: [],
  lineColor: "",
  lineWidth: 1,
  step: 1,

  // window
  windowColor: "rgba(100, 100, 100, 0.5)",
  window: {
    left: 0,
    width: 0,
  },

  onMouseMove: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseOut: () => {},
}

History.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xAxisHeight: PropTypes.number.isRequired,
  xAxisColor: PropTypes.string.isRequired,
  tickHeight: PropTypes.number.isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
  renderTick: PropTypes.func.isRequired,
  font: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,

  // graph
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  lineColor: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,

  // window
  windowColor: PropTypes.string.isRequired,
  window: PropTypes.shape({
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,

  onMouseMove: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseOut: PropTypes.func,
}

export default History