import React, { Component } from 'react'
import { Graphs, canvas } from 'react-canvas-time-series'

class Axes extends Component {
  render() {
    return (
      <Graphs
        width={900}
        height={500}
        backgroundColor="beige"
      />
    )
  }
}

export default Axes
