import React, { Component } from 'react'
import * as ui from './index'

class TestUICanvas extends Component {
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
      background: this.refs.background.getContext('2d', { alpha: false })
    }

    this.ctx.ui.canvas.addEventListener('mousemove', e => {
      const rect = this.ctx.ui.canvas.getBoundingClientRect()

      this.mouse.x = e.clientX - rect.left
      this.mouse.y = e.clientY - rect.top

      //this.draw()
    })

    // translate by half pixel to draw thin lines
    this.ctx.ui.translate(0.5, 0.5)
    this.draw()
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

  getMetrics () {
    return {
      yMin: 10,
      yMax: 110,
      xMin: 1900,
      xMax: 2010
    }
  }

  draw = () => {
    window.requestAnimationFrame(this.draw)

    this.drawBackground(this.ctx.background, this.props)

    ui.draw(
      this.ctx.ui, {
        ...this.props,
        mouse: this.mouse,
        ...this.getMetrics()
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
  ui: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2
  }
}

TestUICanvas.defaultProps = {
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

export default TestUICanvas
