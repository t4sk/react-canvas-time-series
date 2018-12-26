import React from 'react'

export default function setProps(setDefaults) {
  return Component => class extends React.Component {
    render() {
      return (
        <Component {...setDefaults(this.props)} />
      )
    }
  }
}
