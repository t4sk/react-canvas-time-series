import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as background from './canvas/background'
import * as line from './canvas/line'

const GRAPHS = {
  'line': line,
}

const DEFAULT_PROPS = {
  width: 500,
  height: 300,

  // background
  backgroundColor: "white",

  showYLabel: true,
  showYLine: true,
  yLineWidth: 1,
  yLineColor: 'black',
  yAxisAt: 'left',
  yAxisWidth: 50,
  yLabelFont: '12px Arial',
  yLabelColor: 'black',
  renderYLabel: y => y,
  yTickInterval: 1,

  showXLabel: true,
  showXLine: true,
  xLineWidth: 1,
  xLineColor: 'black',
  xAxisAt: 'bottom',
  xAxisHeight: 50,
  xLabelFont: '12px Arial',
  xLabelColor: 'black',
  renderXLabel: x => x,
  xTickInterval: 1,

  graphs: [],

  // line
  lineColor: "black",
  lineWidth: 1,

  yMin: 0,
  yMax: 0,
  xMin: 0,
  xMax: 0,
}

export default class GraphCanvas extends Component {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOut: PropTypes.func,
    onWheel: PropTypes.func,

    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    // background
    backgroundColor: PropTypes.string,

    showYLabel: PropTypes.bool,
    showYLine: PropTypes.bool,
    yLineWidth: PropTypes.number,
    yLineColor: PropTypes.string,
    yAxisAt: PropTypes.oneOf(['left', 'right']).isRequired,
    yAxisWidth: PropTypes.number.isRequired,
    yLabelFont: PropTypes.string,
    yLabelColor: PropTypes.string,
    renderYLabel: PropTypes.func.isRequired,
    yTickInterval: PropTypes.number.isRequired,

    showXLabel: PropTypes.bool,
    showXLine: PropTypes.bool,
    xLineWidth: PropTypes.number,
    xLineColor: PropTypes.string,
    xAxisAt: PropTypes.oneOf(['top', 'bottom']).isRequired,
    xAxisHeight: PropTypes.number.isRequired,
    xLabelFont: PropTypes.string,
    xLabelColor: PropTypes.string,
    renderXLabel: PropTypes.func.isRequired,
    xTickInterval: PropTypes.number.isRequired,

    // graphs
    graphs: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(["line"]).isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })).isRequired,
    })).isRequired,

    // line
    lineColor: PropTypes.string.isRequired,
    lineWidth: PropTypes.number.isRequired,

    yMin: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
    xMin: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,
  }

  static defaultProps = DEFAULT_PROPS

  constructor (props) {
    super(props)

    this.background = React.createRef()
    this.data = React.createRef()
    this.ui = React.createRef()

    this.mouse = {
      x: undefined,
      y: undefined,
    }

    // ref to animation frame
    this.animation = undefined
  }

  onMouseMove = (e) => {
    const rect = this.ctx.ui.canvas.getBoundingClientRect()

    this.mouse.x = e.clientX - rect.left
    this.mouse.y = e.clientY - rect.top

    this.props.onMouseMove(e, this.mouse)
  }

  onMouseDown = (e) => {
    this.props.onMouseDown(e, this.mouse)
  }

  onMouseUp = (e) => {
    this.props.onMouseUp(e, this.mouse)
  }

  onMouseOut = (e) => {
    this.mouse.x = undefined
    this.mouse.y = undefined

    this.props.onMouseOut(e, this.mouse)
  }

  onWheel = (e) => {
    this.props.onWheel(e, this.mouse)
  }

  componentDidMount () {
    this.ctx = {
      ui: this.ui.current.getContext('2d'),
      data: this.data.current.getContext('2d'),
      background: this.background.current.getContext('2d', { alpha: false })
    }

    if (this.props.drawUI) {
      this.ctx.ui.canvas.addEventListener('mousemove', this.onMouseMove)
      this.ctx.ui.canvas.addEventListener('mousedown', this.onMouseDown)
      this.ctx.ui.canvas.addEventListener('mouseup', this.onMouseUp)
      this.ctx.ui.canvas.addEventListener('mouseout', this.onMouseOut)
      this.ctx.ui.canvas.addEventListener('wheel', this.onWheel)

      this.animate()
    } else {
      this.draw()
    }
  }

  componentWillUnmount() {
    // TODO test unmount event listeners
    this.ctx.ui.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.ctx.ui.canvas.removeEventListener('mousedown', this.onMouseDown)
    this.ctx.ui.canvas.removeEventListener('mouseup', this.onMouseUp)
    this.ctx.ui.canvas.removeEventListener('mouseout', this.onMouseOut)
    this.ctx.ui.canvas.removeEventListener('wheel', this.onWheel)

    window.cancelAnimationFrame(this.animation)
  }

  shouldComponentUpdate (nextProps) {
    // TODO props.shouldComponentUpdate()
    // TODO when props.drawUI is absent, draw is not re-triggered after prop updates
    return (
      nextProps.canvas.width !== this.props.canvas.width ||
      nextProps.canvas.height !== this.props.canvas.height
    )
  }

  draw = () => {
    // TODO shouldDrawBackground, shouldDrawGraph, shouldDrawUI
    this.ctx.background.fillStyle = this.props.backgroundColor
    this.ctx.background.fillRect(0, 0, this.props.width, this.props.height)

    background.draw(this.ctx.background, this.props)

    for (let graph of this.props.graphs) {
      GRAPHS[graph.type].draw(this.ctx.data, {...this.props, ...graph})
    }
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)

    this.props.drawBackground(this.ctx.background)
    this.props.drawData(this.ctx.data)

    this.props.drawUI(this.ctx.ui, this.mouse)
  }

  render () {
    return (
      <div style={{
        ...styles.container,
        width: this.props.width,
        height: this.props.height
      }}>
        <canvas
          ref={this.background}
          style={styles.background}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          ref={this.data}
          style={styles.data}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          ref={this.ui}
          style={styles.ui}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    cursor: 'crosshair',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  data: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  ui: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 3,
  }
}
