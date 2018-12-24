import React from 'react'
import PropTypes from 'prop-types'
import canvas from './canvas'
const { ui } = canvas

export default function zoomable(Component) {
  return class extends React.Component {
    static propTypes = {
      onWheel: PropTypes.func.isRequired,
      // zoomRate < 0.5
      zoomRate: PropTypes.number.isRequired,
      xMin: PropTypes.number.isRequired,
      xMax: PropTypes.number.isRequired,
      yMin: PropTypes.number.isRequired,
      yMax: PropTypes.number.isRequired,
      minXTickInterval: PropTypes.number.isRequired,
      minYTickInterval: PropTypes.number.isRequired,
      numXTicks: PropTypes.number.isRequired,
      numYTicks: PropTypes.number.isRequired,
    }

    static defaultProps = {
      zoomRate: 0.1,
      minXTickInterval: 1,
      minYTickInterval: 1,
      numXTicks: 10,
      numYTicks: 10,
    }

    constructor (props) {
      super(props)

      this.mouse = {
        isDragging: false,
        dragStartCanvasX: undefined,
        dragStartXMin: undefined,
        dragStartXMax: undefined
      }
    }

    getRange = (e, mouse, graph) => {
      if (!ui.isInsideRect(mouse, graph)) {
        return
      }

      const {
        zoomRate,
        xMin,
        xMax,
        yMin,
        yMax,
        minXTickInterval,
        minYTickInterval,
        numXTicks,
        numYTicks,
      } = this.props

      const xDiff = xMax - xMin
      const yDiff = yMax - yMin

      if (e.deltaY > 0) {
        // zoom out
        const xTickInterval = Math.max(
          (1 + 2 * zoomRate) * xDiff / numXTicks,
          minXTickInterval
        )

        const yTickInterval = Math.max(
          (1 + 2 * zoomRate) * yDiff / numYTicks,
          minYTickInterval
        )

        return {
          xMin: xMin - zoomRate * xDiff,
          xMax: xMax + zoomRate * xDiff,
          xTickInterval,
          yMin: yMin - zoomRate * yDiff,
          yMax: yMax + zoomRate * yDiff,
          yTickInterval,
        }
      } else {
        // zoom in
        const xTickInterval = Math.max(
          (1 - 2 * zoomRate) * xDiff / numXTicks,
          minXTickInterval
        )

        const yTickInterval = Math.max(
          (1 - 2 * zoomRate) * yDiff / numYTicks,
          minYTickInterval
        )

        return {
          xMin: xMin + zoomRate * xDiff,
          xMax: xMax - zoomRate * xDiff,
          xTickInterval,
          yMin: yMin + zoomRate * yDiff,
          yMax: yMax - zoomRate * yDiff,
          yTickInterval,
        }
      }
    }

    onWheel = (e, mouse, graph) => {
      const range = this.getRange(e, mouse, graph)
      this.props.onWheel(e, mouse, graph, range)
    }

    render() {
      return (
        <Component
          {...this.props}
          onWheel={this.onWheel}
        />
      )
    }
  }
}
