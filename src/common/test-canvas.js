import React, { Component } from 'react'
import * as ui from './ui'

class TestCanvas extends Component {
  constructor (props) {
    super(props)

    this.mouse = {
      x: undefined,
      y: undefined,
      isDragging: false,
      dragStartCanvasX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined,
    }
  }

  componentDidMount () {
    this.ctx = {
      ui: this.refs.ui.getContext('2d'),
      testCanvas: this.refs.testCanvas.getContext('2d'),
      background: this.refs.background.getContext('2d', { alpha: false })
    }

    if (this.props.showUI) {
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
      })
    }

    if (this.props.showUI) {
      this.animate()
    } else {
      this.draw()
    }
  }

  shouldComponentUpdate () {
    return false
  }

  draw () {
    if (this.props.showBackground) {
      this.props.drawBackground(this.ctx.background, this.props)
    }
    this.props.draw(this.ctx.testCanvas, this.props)
  }

  animate = () => {
    window.requestAnimationFrame(this.animate)

    this.draw()

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
          style={style.testCanvas}
          ref="testCanvas"
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
    position: 'relative'
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  },
  testCanvas: {
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
  onMouseMove: () => {},
  draw: (ctx, props) => {},
  showBackground: false,
  drawBackground: (ctx, props) => {},
  showUI: false,
  drawUI: (ctx, props) => {},
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
