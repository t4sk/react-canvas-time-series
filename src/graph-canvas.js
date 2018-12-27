import React, { Component } from 'react'
import PropTypes from 'prop-types'
import setProps from './set-props'
import {compose} from './util'
import * as background from './canvas/background'
import * as line from './canvas/line'
import * as point from './canvas/point'
import * as bar from './canvas/bar'
import * as candlestick from './canvas/candlestick'
import * as label from './canvas/label'
import * as ui from './canvas/ui'

import {toCanvasX, toCanvasY} from './canvas/math'
import {getGraphDimensions} from './canvas/util'

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

const DEFAULT_LABEL_PROPS = {
  canvasX: 0,

  showXLine: false,
  xLineColor: 'black',

  showXLabel: false,
  xLabelAt: 'bottom',
  xLabelWidth: 50,
  xLabelHeight: 20,
  xLabelBackgroundColor: 'black',
  xLabelFont: '12px Arial',
  xLabelColor: 'white',
  xLabelText: '',

  canvasY: 0,

  showYLabel: false,
  yLineColor: 'black',

  showYLine: false,
  yLabelAt: 'left',
  yLabelWidth: 50,
  yLabelHeight: 20,
  yLabelBackgroundColor: 'black',
  yLabelFont: '12px Arial',
  yLabelColor: 'white',
  yLabelText: '',
}

const DEFAULT_UI_PROPS = {
  ...DEFAULT_LABEL_PROPS,
  showXLine: true,
  showXLabel: true,
  showYLine: true,
  showYLabel: true,
  renderXLabel: x => x,
  renderYLabel: y => y,
}

const DEFAULT_BACKGROUND_PROPS = {
  color: "white",

  yAxisAt: 'left',
  yAxisWidth: 50,
  showYLine: true,
  yLineWidth: 1,
  yLineColor: 'black',
  showYTick: true,
  yTickColor: 'grey',
  yTickWidth: 8,
  yTickLabelFont: '12px Arial',
  yTickLabelColor: 'black',
  renderYTickLabel: y => y,
  yTickInterval: 1,

  xAxisAt: 'bottom',
  xAxisHeight: 50,
  showXLine: true,
  xLineWidth: 1,
  xLineColor: 'black',
  showXTick: true,
  xTickColor: 'grey',
  xTickHeight: 8,
  xTickLabelFont: '12px Arial',
  xTickLabelColor: 'black',
  renderXTickLabel: x => x,
  xTickInterval: 1,
}

const DEFAULT_PADDING = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

const DEFAULT_PROPS = {
  width: 500,
  height: 300,

  padding: DEFAULT_PADDING,

  // background
  background: DEFAULT_BACKGROUND_PROPS,

  graphs: [],
  labels: [],

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

class GraphCanvas extends Component {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseOut: PropTypes.func,
    onWheel: PropTypes.func,

    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    padding: PropTypes.shape({
      top: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
    }).isRequired,

    graph: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,

    getCanvasX: PropTypes.func.isRequired,
    getCanvasY: PropTypes.func.isRequired,
    getGraphCanvasX: PropTypes.func.isRequired,
    getGraphCanvasY: PropTypes.func.isRequired,

    yMin: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
    xMin: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,

    background: PropTypes.shape({
      color: PropTypes.string,

      showYLabel: PropTypes.bool,
      showYLine: PropTypes.bool,
      yLineWidth: PropTypes.number,
      yLineColor: PropTypes.string,
      yAxisAt: PropTypes.oneOf(['left', 'right']).isRequired,
      yAxisWidth: PropTypes.number.isRequired,
      yTickLabelFont: PropTypes.string,
      yTickLabelColor: PropTypes.string,
      renderYTickLabel: PropTypes.func.isRequired,
      yTickInterval: PropTypes.number.isRequired,

      showXLabel: PropTypes.bool,
      showXLine: PropTypes.bool,
      xLineWidth: PropTypes.number,
      xLineColor: PropTypes.string,
      xAxisAt: PropTypes.oneOf(['top', 'bottom']).isRequired,
      xAxisHeight: PropTypes.number.isRequired,
      xTickLabelFont: PropTypes.string,
      xTickLabelColor: PropTypes.string,
      renderXTickLabel: PropTypes.func.isRequired,
      xTickInterval: PropTypes.number.isRequired,
    }),

    graphs: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf(["line"]).isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        })).isRequired,
        color: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
      }),
      PropTypes.shape({
        type: PropTypes.oneOf(["point"]).isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        })).isRequired,
        color: PropTypes.string.isRequired,
        radius: PropTypes.number.isRequired,
        ambientColor: PropTypes.string.isRequired,
        ambientRadius: PropTypes.number.isRequired,
      }),
      PropTypes.shape({
        type: PropTypes.oneOf(["bar"]).isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        })).isRequired,
        getColor: PropTypes.func.isRequired,
        width: PropTypes.number.isRequired,
      }),
      PropTypes.shape({
        type: PropTypes.oneOf(["candlestick"]).isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
          open: PropTypes.number.isRequired,
          close: PropTypes.number.isRequired,
          high: PropTypes.number.isRequired,
          low: PropTypes.number.isRequired,
          timestamp: PropTypes.number.isRequired,
        })).isRequired,
        width: PropTypes.number.isRequired,
        getColor: PropTypes.func.isRequired,
        wickWidth: PropTypes.number.isRequired,
      }),
    ])).isRequired,

    labels: PropTypes.arrayOf(PropTypes.shape({
      canvasX: PropTypes.number.isRequired,
      showXLine: PropTypes.bool,
      xLineColor: PropTypes.string.isRequired,
      showXLabel: PropTypes.bool,
      xLabelAt: PropTypes.oneOf(['top', 'bottom']).isRequired,
      xLabelWidth: PropTypes.number.isRequired,
      xLabelHeight: PropTypes.number.isRequired,
      xLabelBackgroundColor: PropTypes.string.isRequired,
      xLabelFont: PropTypes.string.isRequired,
      xLabelColor: PropTypes.string.isRequired,
      xLabelText: PropTypes.string.isRequired,
      canvasY: PropTypes.number.isRequired,
      showYLabel: PropTypes.bool,
      yLineColor: PropTypes.string.isRequired,
      showYLine: PropTypes.bool,
      yLabelAt: PropTypes.oneOf(['left', 'right']).isRequired,
      yLabelWidth: PropTypes.number.isRequired,
      yLabelHeight: PropTypes.number.isRequired,
      yLabelBackgroundColor: PropTypes.string.isRequired,
      yLabelFont: PropTypes.string.isRequired,
      yLabelColor: PropTypes.string.isRequired,
      yLabelText: PropTypes.string.isRequired,
    })).isRequired,

    showUI: PropTypes.bool,
    ui: PropTypes.shape({
      showXLine: PropTypes.bool,
      xLineColor: PropTypes.string.isRequired,
      showXLabel: PropTypes.bool,
      xLabelAt: PropTypes.oneOf(['top', 'bottom']).isRequired,
      xLabelWidth: PropTypes.number.isRequired,
      xLabelHeight: PropTypes.number.isRequired,
      xLabelBackgroundColor: PropTypes.string.isRequired,
      xLabelFont: PropTypes.string.isRequired,
      xLabelColor: PropTypes.string.isRequired,
      xLabelText: PropTypes.string.isRequired,
      showYLabel: PropTypes.bool,
      yLineColor: PropTypes.string.isRequired,

      showYLine: PropTypes.bool,
      yLabelAt: PropTypes.oneOf(['left', 'right']).isRequired,

      yLabelWidth: PropTypes.number.isRequired,
      yLabelHeight: PropTypes.number.isRequired,
      yLabelBackgroundColor: PropTypes.string.isRequired,
      yLabelFont: PropTypes.string.isRequired,
      yLabelColor: PropTypes.string.isRequired,
      yLabelText: PropTypes.string.isRequired,

      renderXLabel: PropTypes.func.isRequired,
      renderYLabel: PropTypes.func.isRequired,
    })
  }

  static defaultProps = DEFAULT_PROPS

  constructor (props) {
    super(props)

    this.backgroundRef = React.createRef()
    this.graphRef = React.createRef()
    this.uiRef = React.createRef()

    this.mouse = {
      x: undefined,
      y: undefined,
    }

    // ref to animation frame
    this.animation = undefined
  }

  componentDidMount () {
    this.ctx = {
      ui: this.uiRef.current.getContext('2d'),
      graph: this.graphRef.current.getContext('2d'),
      background: this.backgroundRef.current.getContext('2d', { alpha: false })
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
    // return (
    //   nextProps.canvas.width !== this.props.canvas.width ||
    //   nextProps.canvas.height !== this.props.canvas.height
    // )
    return true
  }

  onMouseMove = (e) => {
    const rect = this.ctx.ui.canvas.getBoundingClientRect()

    this.mouse.x = e.clientX - rect.left
    this.mouse.y = e.clientY - rect.top

    this.props.onMouseMove(e, this.mouse, this.props.graph)
  }

  onMouseDown = (e) => {
    this.props.onMouseDown(e, this.mouse, this.props.graph)
  }

  onMouseUp = (e) => {
    this.props.onMouseUp(e, this.mouse, this.props.graph)
  }

  onMouseOut = (e) => {
    this.mouse.x = undefined
    this.mouse.y = undefined

    this.props.onMouseOut(e, this.mouse, this.props.graph)
  }

  onWheel = (e) => {
    this.props.onWheel(e, this.mouse, this.props.graph)
  }

  draw = () => {
    const {
      graph,
      getCanvasX,
      getCanvasY,
      getGraphCanvasX,
      getGraphCanvasY,
    } = this.props

    // TODO shouldDrawBackground, shouldDrawGraph, shouldDrawUI
    this.ctx.background.fillStyle = this.props.backgroundColor
    this.ctx.background.fillRect(0, 0, this.props.width, this.props.height)

    background.draw(this.ctx.background, {
      width: this.props.width,
      height: this.props.height,
      xMin: this.props.xMin,
      xMax: this.props.xMax,
      yMin: this.props.yMin,
      yMax: this.props.yMax,
      background: this.props.background,
      graph,
      getCanvasX,
      getCanvasY,
    })

    this.ctx.graph.clearRect(0, 0, graph.width, graph.height)

    for (let g of this.props.graphs) {
      GRAPHS[g.type].draw(this.ctx.graph, {
        getCanvasX: getGraphCanvasX,
        getCanvasY: getGraphCanvasY,
        [g.type]: g,
      })
    }

    for (let l of this.props.labels) {
      label.draw(this.ctx.ui, {
        graph,
        label: l,
      })
    }
  }

  animate = () => {
    this.animation = window.requestAnimationFrame(this.animate)

    // TODO only draw if data or background changed
    this.draw()

    const {
      graph,
      getCanvasX,
      getCanvasY,
    } = this.props

    ui.draw(this.ctx.ui, {
      width: this.props.width,
      height: this.props.height,
      xMin: this.props.xMin,
      xMax: this.props.xMax,
      yMin: this.props.yMin,
      yMax: this.props.yMax,
      ui: this.props.ui,
      graph,
      getCanvasX,
      getCanvasY,
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
          ref={this.backgroundRef}
          style={styles.background}
          width={this.props.width}
          height={this.props.height}
        />
        <canvas
          ref={this.graphRef}
          style={{
            ...styles.graph,
            top: this.props.graph.top,
            left: this.props.graph.left,
          }}
          width={this.props.graph.width}
          height={this.props.graph.height}
        />
        <canvas
          ref={this.uiRef}
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

export default compose(
  setProps(props => {
    const graphs = (props.graphs || []).map(graph => ({
      ...DEFAULT_GRAPH_PROPS[graph.type],
      ...graph
    }))

    const labels = (props.labels || []).map(label => ({
      ...DEFAULT_LABEL_PROPS,
      ...label
    }))

    return {
      ...DEFAULT_PROPS,
      ...props,
      padding: {
        ...props.padding,
        ...DEFAULT_PADDING,
      },
      background:  {
        ...DEFAULT_BACKGROUND_PROPS,
        ...props.background,
      },
      graphs,
      labels,
      ui: props.showUI && {
        ...DEFAULT_UI_PROPS,
        ...props.ui,
      }
    }
  }),
  setProps(props => {
    const {
      xMin,
      xMax,
      yMin,
      yMax
    } = props

    const graph = getGraphDimensions(props)

    const getCanvasX = toCanvasX({
      width: graph.width,
      left: graph.left,
      xMax,
      xMin,
    })

    const getCanvasY = toCanvasY({
      height: graph.height,
      top: graph.top,
      yMax,
      yMin,
    })

    const getGraphCanvasX = toCanvasX({
      width: graph.width,
      left: 0,
      xMax,
      xMin,
    })

    const getGraphCanvasY = toCanvasY({
      height: graph.height,
      top: 0,
      yMax,
      yMin,
    })

    return {
      ...props,
      graph,
      getCanvasX,
      getCanvasY,
      getGraphCanvasX,
      getGraphCanvasY,
    }
  })
)(GraphCanvas)
