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
      minXTickInterval: PropTypes.number.isRequired,
      numXTicks: PropTypes.number.isRequired,
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

    getXRange = (e, mouse, graph) => {
      if (!ui.isInsideRect(mouse, graph)) {
        return
      }

      const {
        zoomRate,
        xMin,
        xMax,
        minXTickInterval,
        numXTicks,
      } = this.props

      const xDiff = xMax - xMin

      if (e.deltaY > 0) {
        // zoom out
        const xTickInterval = Math.max(
          (1 + 2 * zoomRate) * xDiff / numXTicks,
          minXTickInterval
        )

        return {
          xMin: xMin - zoomRate * xDiff,
          xMax: xMax + zoomRate * xDiff,
          xTickInterval,
        }
      } else {
        // zoom in
        const xTickInterval = Math.max(
          (1 - 2 * zoomRate) * xDiff / numXTicks,
          minXTickInterval
        )

        return {
          xMin: xMin + zoomRate * xDiff,
          xMax: xMax - zoomRate * xDiff,
          xTickInterval,
        }
      }
    }

    onWheel = (e, mouse, graph) => {
      const xRange = this.getXRange(e, mouse, graph)
      this.props.onWheel(e, mouse, graph, xRange)
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
