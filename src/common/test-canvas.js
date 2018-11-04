import React, { Component } from 'react'
import * as ui from './ui'

class TestCanvas extends Component {
  constructor (props) {
    super(props)

    this.background = React.createRef()
    this.data = React.createRef()
    this.ui = React.createRef()

    this.mouse = {
      x: undefined,
      y: undefined,
      isDragging: false,
      dragStartLeft: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined
    }

    // ref to animation frame
    this.animation = undefined
  }

  onMouseMove = (e) => {
    const rect = this.ctx.ui.canvas.getBoundingClientRect()

    this.mouse.x = e.clientX - rect.left
    this.mouse.y = e.clientY - rect.top

    this.props.onMouseMove(this.mouse)
  }

  onMouseDown = (e) => {
    if (ui.isInsideGraph(this.mouse, this.props.graph)) {
      this.mouse.isDragging = true
      this.mouse.dragStartLeft = this.mouse.x
      this.mouse.dragStartXMin = this.props.xMin
      this.mouse.dragStartXMax = this.props.xMax
    }
  }

  onMouseUp = (e) => {
    this.mouse.isDragging = false
    this.mouse.dragStartLeft = undefined
    this.mouse.dragStartXMin = undefined
    this.mouse.dragStartXMax = undefined
  }

  onMouseOut = (e) => {
    this.mouse.x = undefined
    this.mouse.y = undefined

    this.mouse.isDragging = false
    this.mouse.dragStartLeft = undefined
    this.mouse.dragStartXMin = undefined
    this.mouse.dragStartXMax = undefined

    this.props.onMouseOut()
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

    // TODO remove
    this.props.getRefs(this.ctx)

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
    return (
      nextProps.canvas.width !== this.props.canvas.width ||
      nextProps.canvas.height !== this.props.canvas.height
    )
  }

  draw = () => {
    this.props.drawBackground(this.ctx.background, this.props)
    this.props.drawData(this.ctx.data, this.props)
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)

    this.props.drawBackground(this.ctx.background, this.props)
    this.props.drawData(this.ctx.data, this.props)

    this.props.drawUI(
      this.ctx.ui, {
        ...this.props,
        mouse: this.mouse
      }
    )
  }

  render () {
    return (
      <div style={{
        ...style.container,
        width: this.props.canvas.width,
        height: this.props.canvas.height
      }}>
        <canvas
          ref={this.background}
          style={style.background}
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          ref={this.data}
          style={style.data}
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          ref={this.ui}
          style={style.ui}
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
      </div>
    )
  }
}

const style = {
  container: {
    position: 'relative',
    cursor: 'crosshair'
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  },
  data: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2
  },
  ui: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 3
  }
}

TestCanvas.defaultProps = {
  getRefs: (refs) => {},
  onMouseMove: (mouse) => {},
  onMouseOut: () => {},
  onWheel: (e, mouse) => {},
  drawData: (ctx, props) => {},
  drawBackground: (ctx, props) => {},
  canvas: {
    width: 500,
    height: 300
  },
  graph: {
    left: 60, // padding.left + x.axis.width
    top: 20, // padding.
    width: 420, // canvas.width - (padding.left + padding.right + x.axis.width)
    height: 220 // canvas.height - (padding.top + padding.bottom + y.axis.height)
  }
}

export default TestCanvas
