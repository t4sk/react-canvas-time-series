import React, { Component } from 'react'
import BackgroundTestRender from './background-test-render'
import BarTestRender from './bar-test-render'
import LineTestRender from './line-test-render'

export default class App extends Component {
  render () {
    return (
      <div>
        <LineTestRender />
        <BarTestRender />
        <BackgroundTestRender />
      </div>
    )
  }
}
