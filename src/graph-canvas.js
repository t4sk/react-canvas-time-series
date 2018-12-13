import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as background from './canvas/background'

const DEFAULT_PROPS = {
  background: {
    top: 10,
    left: 20,
    width: 450,
    height: 270,

    backgroundColor: 'lightgrey',

    showYLabel: true,
    showYLine: true,
    yLineWidth: 1,
    yLineColor: 'red',
    yAxisAt: 'left',
    yAxisWidth: 50,
    yLabelFont: '12px Arial',
    yLabelColor: 'black',
    renderYLabel: y => y,
    yStep: 10,

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => x,
    xStep: 15,

    // TODO move up
    yMin: 10,
    yMax: 110,
    xMin: 1900,
    xMax: 2010,
  }
}

export default class GraphCanvas extends Component {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOut: PropTypes.func,
    onWheel: PropTypes.func,
    drawBackground: PropTypes.func.isRequired,
    drawData: PropTypes.func.isRequired,
    drawUI: PropTypes.func,
    canvas: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    background: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,

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
      yStep: PropTypes.number.isRequired,

      showXLabel: PropTypes.bool,
      showXLine: PropTypes.bool,
      xLineWidth: PropTypes.number,
      xLineColor: PropTypes.string,
      xAxisAt: PropTypes.oneOf(['top', 'bottom']).isRequired,
      xAxisHeight: PropTypes.number.isRequired,
      xLabelFont: PropTypes.string,
      xLabelColor: PropTypes.string,
      renderXLabel: PropTypes.func.isRequired,
      xStep: PropTypes.number.isRequired,

      // TODO move up
      yMin: PropTypes.number.isRequired,
      yMax: PropTypes.number.isRequired,
      xMin: PropTypes.number.isRequired,
      xMax: PropTypes.number.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    onMouseMove: (e, mouse) => {},
    onMouseDown: (e, mouse) => {},
    onMouseUp: (e, mouse) => {},
    onMouseOut: (e, mouse) => {},
    onWheel: (e, mouse) => {},
    drawData: (ctx) => {},
    drawBackground: (ctx) => {},
    canvas: {
      width: 500,
      height: 300
    },
    background: DEFAULT_PROPS.background
  }

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
    background.draw(this.ctx.background, {
      ...DEFAULT_PROPS.background,
      ...this.props.background
    })
    this.props.drawData(this.ctx.data)
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
        width: this.props.canvas.width,
        height: this.props.canvas.height
      }}>
        <canvas
          ref={this.background}
          style={styles.background}
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          ref={this.data}
          style={styles.data}
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          ref={this.ui}
          style={styles.ui}
          width={this.props.canvas.width}
          height={this.props.canvas.height}
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
