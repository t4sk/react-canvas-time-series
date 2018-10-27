import React, { Component } from 'react'
import * as ui from './ui'

class TestCanvas extends Component {
  constructor (props) {
    super(props)

    // TODO React.createRef

    this.mouse = {
      x: undefined,
      y: undefined,
      isDragging: false,
      dragStartCanvasX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined
    }
  }

  componentDidMount () {
    this.ctx = {
      ui: this.refs.ui.getContext('2d'),
      data: this.refs.data.getContext('2d'),
      background: this.refs.background.getContext('2d', { alpha: false })
    }

    if (this.props.drawUI) {
      this.ctx.ui.canvas.addEventListener('mousemove', e => {
        const rect = this.ctx.ui.canvas.getBoundingClientRect()

        this.mouse.x = e.clientX - rect.left
        this.mouse.y = e.clientY - rect.top

        this.props.onMouseMove(this.mouse)
      })

      this.ctx.ui.canvas.addEventListener('mousedown', e => {
        if (ui.isInsideGraph(this.mouse, this.props.graph)) {
          this.mouse.isDragging = true
          this.mouse.dragStartCanvasX = this.mouse.x
          this.mouse.dragStartXMin = this.props.xMin
          this.mouse.dragStartXMax = this.props.xMax
        }
      })

      this.ctx.ui.canvas.addEventListener('mouseup', e => {
        this.mouse.isDragging = false
        this.mouse.dragStartCanvasX = undefined
        this.mouse.dragStartXMin = undefined
        this.mouse.dragStartXMax = undefined
      })

      this.ctx.ui.canvas.addEventListener('mouseout', e => {
        this.mouse.x = undefined
        this.mouse.y = undefined

        this.mouse.isDragging = false
        this.mouse.dragStartCanvasX = undefined
        this.mouse.dragStartXMin = undefined
        this.mouse.dragStartXMax = undefined

        this.props.onMouseOut()
      })

      this.animate()
    } else {
      this.draw()
    }
  }

  componentWillUnmount() {
    // TODO unmount event listener
    // TODO cancel animation frame
  }

  shouldComponentUpdate () {
    return false
  }

  draw = () => {
    this.props.drawBackground(this.ctx.background, this.props)
    this.props.draw(this.ctx.data, this.props)
  }

  animate = () => {
    window.requestAnimationFrame(this.animate)

    this.props.drawBackground(this.ctx.background, this.props)
    this.props.draw(this.ctx.data, this.props)

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
          style={style.background}
          ref="background"
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          style={style.data}
          ref="data"
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          style={style.ui}
          ref="ui"
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
  onMouseMove: (mouse) => {},
  onMouseOut: () => {},
  draw: (ctx, props) => {},
  drawBackground: (ctx, props) => {},
  // drawUI optional
  canvas: {
    width: 500,
    height: 300
  },
  graph: {
    x: 60, // margin.left + x.axis.width
    y: 20, // margin.
    width: 420, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  }
}

export default TestCanvas
