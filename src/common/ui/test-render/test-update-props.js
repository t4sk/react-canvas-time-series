import React, { Component } from 'react'
import { merge } from '../../test-util'
import TestCanvas from '../../test-canvas'
import { round } from '../../math'
import * as background from '../../background'
import {
  getGraphWidth,
  getGraphHeight
} from '../../background/common'
import * as ui from '../index'

class TestUpdateProps extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canvas: {
        width: 500,
        height: 300,
      }
    }
  }

  onWheel = (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      this.setState((state) => ({
        canvas: {
          width: state.canvas.width + 10,
          height: state.canvas.height + 10,
        }
      }))
    } else {
      this.setState((state) => ({
        canvas: {
          width: state.canvas.width - 10,
          height: state.canvas.height - 10,
        }
      }))
    }
  }

  render () {
    return (
      <TestCanvas
        {...merge(this.props, {
          canvas: this.state.canvas,
          graph: {
            width: getGraphWidth(merge(this.props, {
              canvas: this.state.canvas
            })),
            height: getGraphHeight(merge(this.props, {
              canvas: this.state.canvas,
            }))
          }
        })}
        drawBackground={background.draw}
        showUI={true}
        drawUI={ui.draw}
        onWheel={this.onWheel}
      />
    )
  }
}

TestUpdateProps.defaultProps = {
}

export default TestUpdateProps
