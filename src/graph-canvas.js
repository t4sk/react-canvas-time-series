import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as background from './canvas/background'
import * as line from './canvas/line'
import * as point from './canvas/point'
import * as bar from './canvas/bar'
import * as candlestick from './canvas/candlestick'
import * as ui from './canvas/ui'

import {toCanvasX, toCanvasY} from './canvas/math'
import {getGraphDimensions} from './canvas/background/util'

const GRAPHS = {
  line,
  point,
  bar,
  candlestick,
}

const DEFAULT_GRAPH_PROPS = {
  line: {
    color: "black",
    width: 1,
  },
  point: {
    color: 'orange',
    radius: 3,
    ambientColor: 'rgba(255, 255, 0, 0.5)',
    ambientRadius: 10,
  },
  bar: {
    getColor: d => 'rgba(0, 175, 0, 0.6)',
    width: 10,
  },
  candlestick: {
    width: 10,
    getColor: d => d.open <= d.close ? 'yellowgreen' : 'deeppink',
    wickWidth: 1,
  }
}

const DEFAULT_UI_PROPS = {
  showXLabel: true,
  showXLine: true,
  xLineColor: 'black',
  xLabelAt: 'bottom',
  xLabelWidth: 50,
  xLabelHeight: 20,
  xLabelBackgroundColor: 'black',
  xLabelFont: '12px Arial',
  xLabelColor: 'white',
  renderXLabel: x => x,

  showYLabel: true,
  showYLine: true,
  yLineColor: 'black',
  yLabelAt: 'left',
  yLabelWidth: 50,
  yLabelHeight: 20,
  yLabelBackgroundColor: 'black',
  yLabelFont: '12px Arial',
  yLabelColor: 'white',
  renderYLabel: y => y,
}

const DEFAULT_PROPS = {
  width: 500,
  height: 300,

  // background
  background: {
    color: "white",

    yAxisAt: 'left',
    yAxisWidth: 50,
    showYLine: true,
    yLineWidth: 1,
    yLineColor: 'black',
    showYTick: true,
    yTickFont: '12px Arial',
    yTickBackgroundColor: 'black',
    renderYTick: y => y,
    yTickInterval: 1,

    xAxisAt: 'bottom',
    xAxisHeight: 50,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'black',
    showXTick: true,
    xTickFont: '12px Arial',
    xTickBackgroundColor: 'black',
    renderXTick: x => x,
    xTickInterval: 1,
  },

  graphs: [],

  yMin: 0,
  yMax: 0,
  xMin: 0,
  xMax: 0,

  showUI: false,
  onMouseMove: (e, mouse) => {},
  onMouseDown: (e, mouse) => {},
  onMouseUp: (e, mouse) => {},
  onMouseOut: (e, mouse) => {},
  onWheel: (e, mouse) => {},
}

// TODO component to set default props
export default class GraphCanvas extends Component {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOut: PropTypes.func,
    onWheel: PropTypes.func,

    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    yMin: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
    xMin: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,

    // TODO graph, getCanvasX, getCanvasY props

    // background
    background: PropTypes.shape({
      color: PropTypes.string,

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
    }),

    // graphs
    graphs: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf([
        "line",
        "point",
        "bar",
        "candlestick"
      ]).isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })).isRequired,
    })).isRequired,

    // line
    // line: PropTypes.shape({
    //   color: PropTypes.string.isRequired,
    //   width: PropTypes.number.isRequired,
    // }),

    // point
    // point: PropTypes.shape({
    //   color: PropTypes.string.isRequired,
    //   radius: PropTypes.number.isRequired,
    //   ambientColor: PropTypes.string.isRequired,
    //   ambientRadius: PropTypes.number.isRequired,
    // }),

    // bar
    // bar: PropTypes.shape({
    //   getColor: PropTypes.func.isRequired,
    //   width: PropTypes.number.isRequired,
    // }),

    // candlestick
    // candlestick: PropTypes.shape({
    //   width: PropTypes.number.isRequired,
    //   getColor: PropTypes.func.isRequired,
    //   wickWidth: PropTypes.number.isRequired,
    // }),

    // TODO UI prop types
    showUI: PropTypes.bool.isRequired,
  }

  static defaultProps = DEFAULT_PROPS

  constructor (props) {
    super(props)

    this.background = React.createRef()
    this.graph = React.createRef()
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
      graph: this.graph.current.getContext('2d'),
      background: this.background.current.getContext('2d', { alpha: false })
    }

    if (this.props.showUI) {
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
    // TODO fix
    // return (
    //   nextProps.canvas.width !== this.props.canvas.width ||
    //   nextProps.canvas.height !== this.props.canvas.height
    // )
    return false
  }

  draw = () => {
    // TODO fix getCanvasX, getCanvasY does not update after prop changes
    const graph = getGraphDimensions({
      width: this.props.width,
      height: this.props.height,
      ...DEFAULT_PROPS.background,
      ...this.props.background
    })

    const getCanvasX = toCanvasX({
      width: graph.width,
      left: graph.left,
      xMax: this.props.xMax,
      xMin: this.props.xMin,
    })

    const getCanvasY = toCanvasY({
      height: graph.height,
      top: graph.top,
      yMax: this.props.yMax,
      yMin: this.props.yMin,
    })

    // TODO shouldDrawBackground, shouldDrawGraph, shouldDrawUI
    this.ctx.background.fillStyle = this.props.backgroundColor
    this.ctx.background.fillRect(0, 0, this.props.width, this.props.height)

    background.draw(this.ctx.background, {
      ...this.props,
      graph,
      getCanvasX,
      getCanvasY,
      background: {
        ...DEFAULT_PROPS.background,
        ...this.props.background,
      },
    })

    for (let g of this.props.graphs) {
      GRAPHS[g.type].draw(this.ctx.graph, {
        ...this.props,
        graph,
        getCanvasX,
        getCanvasY,
        ...DEFAULT_GRAPH_PROPS[g.type],
        ...g,
      })
    }
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)

    this.draw()

    // TODO fix getCanvasX, getCanvasY does not update after prop changes
    const graph = getGraphDimensions({
      width: this.props.width,
      height: this.props.height,
      ...DEFAULT_PROPS.background,
      ...this.props.background
    })

    const getCanvasX = toCanvasX({
      width: graph.width,
      left: graph.left,
      xMax: this.props.xMax,
      xMin: this.props.xMin,
    })

    const getCanvasY = toCanvasY({
      height: graph.height,
      top: graph.top,
      yMax: this.props.yMax,
      yMin: this.props.yMin,
    })

    ui.draw(this.ctx.ui, {
      ...this.props,
      graph,
      getCanvasX,
      getCanvasY,
      ui: {
        ...DEFAULT_UI_PROPS,
        ...this.props.ui,
      },
      mouse: this.mouse,
    })
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
          ref={this.graph}
          style={styles.graph}
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
  graph: {
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
