import React from 'react'

export default function setDefaultProps(setDefaults) {
  return Component => class extends React.Component {
    render() {
      return (
        <Component {...setDefaults(this.props)} />
      )
    }
  }
}
