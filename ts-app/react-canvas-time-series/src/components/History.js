// import React, { Component } from "react"
// import PropTypes from "prop-types"
// import * as math from "./canvas/math"
// import history from "./canvas/history"

// class History extends Component {
//   constructor(props) {
//     super(props)

//     this.ui = React.createRef()
//     this.graph = React.createRef()

//     // ref to animation frame
//     this.animation = undefined
//   }

//   componentDidMount() {
//     this.ctx = {
//       ui: this.ui.current.getContext("2d"),
//       graph: this.graph.current.getContext("2d"),
//     }

//     this.drawGraph()
//     this.animate()
//   }

//   componentWillUnmount() {
//     window.cancelAnimationFrame(this.animation)
//   }

//   componentDidUpdate() {
//     if (this.props.shouldRedrawGraph()) {
//       this.drawGraph()
//     }
//   }

//   getGraph = () => {
//     return {
//       top: 0,
//       left: 0,
//       width: this.props.width,
//       height: this.props.height - this.props.xAxisHeight,
//     }
//   }

//   drawGraph = () => {
//     this.ctx.graph.clearRect(0, 0, this.props.width, this.props.height)

//     const { data, xMin, xMax, yMin, yMax } = this.props

//     const graph = this.getGraph()

//     history.xAxis.draw(this.ctx.graph, {
//       ...this.props,
//       graph,
//       xMin,
//       xMax,
//     })

//     history.graph.draw(this.ctx.graph, {
//       ...this.props,
//       graph,
//       xMin,
//       xMax,
//       yMin,
//       yMax,
//     })
//   }

//   animate = () => {
//     this.animation = window.requestAnimationFrame(this.animate)

//     this.ctx.ui.clearRect(0, 0, this.props.width, this.props.height)

//     const graph = this.getGraph()

//     history.mask.draw(this.ctx.ui, {
//       ...this.props,
//       graph,
//     })
//   }

//   getMouse = e => {
//     const rect = this.ctx.ui.canvas.getBoundingClientRect()

//     return {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     }
//   }

//   onMouseMove = e => {
//     this.props.onMouseMove(e, this.getMouse(e))
//   }

//   onMouseDown = e => {
//     this.props.onMouseDown(e, this.getMouse(e))
//   }

//   onMouseUp = e => {
//     this.props.onMouseUp(e, this.getMouse(e))
//   }

//   onMouseOut = e => {
//     this.props.onMouseOut(e)
//   }

//   getCursor() {
//     const { maskEdgeDelta, mouse, mask } = this.props

//     const graph = this.getGraph()

//     if (!math.isInside(graph, mouse)) {
//       return "auto"
//     }

//     if (
//       Math.abs(mask.left - mouse.x) <= maskEdgeDelta ||
//       Math.abs(mask.left + mask.width - mouse.x) <= maskEdgeDelta
//     ) {
//       return "ew-resize"
//     }

//     if (mouse.x > mask.left && mouse.x < mask.left + mask.width) {
//       return "grab"
//     }

//     return "auto"
//   }

//   render() {
//     const cursor = this.getCursor()

//     return (
//       <div
//         style={{
//           ...styles.container,
//           cursor,
//           backgroundColor: this.props.backgroundColor,
//           width: this.props.width,
//           height: this.props.height,
//         }}
//       >
//         <canvas
//           ref={this.graph}
//           style={styles.canvas}
//           width={this.props.width}
//           height={this.props.height}
//         />
//         <canvas
//           ref={this.ui}
//           style={styles.canvas}
//           width={this.props.width}
//           height={this.props.height}
//           onMouseMove={this.onMouseMove}
//           onMouseDown={this.onMouseDown}
//           onMouseUp={this.onMouseUp}
//           onMouseOut={this.onMouseOut}
//         />
//       </div>
//     )
//   }
// }

// const styles = {
//   container: {
//     position: "relative",
//     cursor: "auto",
//   },
//   canvas: {
//     position: "absolute",
//     left: 0,
//     top: 0,
//   },
// }

// History.defaultProps = {
//   shouldRedrawGraph: () => true,
//   width: 800,
//   height: 200,
//   backgroundColor: "",
//   xAxisHeight: 30,
//   xAxisColor: "",
//   xMin: 0,
//   xMax: 0,
//   yMin: 0,
//   yMax: 0,
//   tickHeight: 5,
//   ticks: [],
//   renderTick: x => x,
//   font: "12px Arial",
//   textColor: "",

//   // graph
//   data: [],
//   lineColor: "",
//   lineWidth: 1,
//   step: 1,

//   // mask
//   maskColor: "rgba(100, 100, 100, 0.5)",
//   mask: {
//     left: 0,
//     width: 0,
//   },
//   maskEdgeDelta: 10,

//   mouse: {
//     x: undefined,
//     y: undefined,
//   },
//   onMouseMove: () => {},
//   onMouseDown: () => {},
//   onMouseUp: () => {},
//   onMouseOut: () => {},
// }

// History.propTypes = {
//   shouldRedrawGraph: PropTypes.func.isRequired,
//   backgroundColor: PropTypes.string.isRequired,
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   xAxisHeight: PropTypes.number.isRequired,
//   xAxisColor: PropTypes.string.isRequired,
//   tickHeight: PropTypes.number.isRequired,
//   ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
//   renderTick: PropTypes.func.isRequired,
//   font: PropTypes.string.isRequired,
//   textColor: PropTypes.string.isRequired,
//   xMin: PropTypes.number.isRequired,
//   xMax: PropTypes.number.isRequired,
//   yMin: PropTypes.number.isRequired,
//   yMax: PropTypes.number.isRequired,

//   // graph
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       x: PropTypes.number.isRequired,
//       y: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   lineColor: PropTypes.string.isRequired,
//   lineWidth: PropTypes.number.isRequired,
//   step: PropTypes.number.isRequired,

//   // mask
//   maskColor: PropTypes.string.isRequired,
//   mask: PropTypes.shape({
//     left: PropTypes.number.isRequired,
//     width: PropTypes.number.isRequired,
//   }).isRequired,
//   maskEdgeDelta: PropTypes.number.isRequired,

//   mouse: PropTypes.shape({
//     x: PropTypes.number,
//     y: PropTypes.number,
//   }).isRequired,
//   onMouseMove: PropTypes.func,
//   onMouseDown: PropTypes.func,
//   onMouseUp: PropTypes.func,
//   onMouseOut: PropTypes.func,
// }

// export default History
