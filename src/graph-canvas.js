import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    })
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
    this.ctx.ui.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.ctx.ui.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.ctx.ui.canvas.removeEventListener('mousemove', this.onMouseMove)
    this.ctx.ui.canvas.removeEventListener('mousemove', this.onMouseMove)
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
    this.props.drawBackground(this.ctx.background)
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
