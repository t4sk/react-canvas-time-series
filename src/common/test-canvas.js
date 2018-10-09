import React, { Component } from 'react'

class TestCanvas extends Component {
  constructor (props) {
    super(props)

    this.mouse = {
      x: undefined,
      y: undefined
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
      })
    }

    // translate by half pixel to draw thin lines
    this.ctx.testCanvas.translate(0.5, 0.5)

    if (this.props.showUI) {
      this.animate()
    } else {
      this.draw()
    }
  }

  shouldComponentUpdate () {
    return false
  }

  drawBackground (ctx, props) {
    ctx.fillStyle = 'lightgrey'
    ctx.fillRect(
      0, 0,
      props.canvas.width,
      props.canvas.height
    )

    ctx.fillStyle = 'white'
    ctx.fillRect(
      props.graph.x,
      props.graph.y,
      props.graph.width,
      props.graph.height
    )
  }

  draw () {
    if (this.props.drawBackground) {
      this.drawBackground(this.ctx.background, this.props)
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
    position: 'relative',
    border: '1px solid black'
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
  draw: (ctx, props) => {},
  showUI: false,
  drawUI: (ctx, props) => {},
  drawBackground: false,
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
