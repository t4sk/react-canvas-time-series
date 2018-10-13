import React, { Component } from 'react'
import { merge } from '../test-util'
import TestCanvas from '../test-canvas'
import * as background from '../background'
import * as ui from './index'

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>X Drag</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              x: {
                axis: {
                  at: 'bottom'
                }
              }
            },
            ui: {
              x: {
                label: {
                  at: 'bottom'
                }
              }
            }
          })}
          showBackground={true}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>X Label Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              x: {
                axis: {
                  at: 'bottom'
                }
              }
            },
            ui: {
              x: {
                label: {
                  at: 'bottom'
                }
              }
            }
          })}
          showBackground={true}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>X Label Top</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              x: {
                axis: {
                  at: 'top'
                }
              }
            },
            graph: {
              y: 60
            },
            ui: {
              x: {
                label: {
                  at: 'top'
                }
              }
            }
          })}
          showBackground={true}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>Y Label Left</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              y: {
                axis: {
                  at: 'left'
                }
              }
            },
            ui: {
              y: {
                label: {
                  at: 'left'
                }
              }
            }
          })}
          showBackground={true}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>Y Label Right</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              y: {
                axis: {
                  at: 'right'
                }
              }
            },
            graph: {
              x: 20
            },
            ui: {
              y: {
                label: {
                  at: 'right'
                }
              }
            }
          })}
          showBackground={true}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
  canvas: {
    width: 500,
    height: 300
  },
  margin: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 30
  },
  background: {
    backgroundColor: 'lightgrey',
    y: {
      line: {
        color: 'red'
      },
      axis: {
        at: 'left',
        label: {
          font: '12px Arial',
          color: 'black',
          render: y => y
        },
        width: 50
      },
      interval: 10
    },
    x: {
      line: {
        color: 'blue'
      },
      axis: {
        at: 'bottom',
        label: {
          font: '12px Arial',
          color: 'black',
          render: x => x
        },
        height: 50
      },
      interval: 10
    },
  },
  graph: {
    // y label left, x label bottom
    x: 70, // margin.left + x.axis.width
    y: 10, // margin.top
    width: 400, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
  ui: {
    x: {
      line: {
        color: 'blue'
      },
      label: {
        at: 'bottom',
        width: 70,
        height: 20,
        backgroundColor: 'green',
        font: '12px Arial',
        color: 'black',
        render: x => Math.round(x)
      }
    },
    y: {
      line: {
        color: 'green'
      },
      label: {
        at: 'left',
        width: 50,
        height: 20,
        backgroundColor: 'black',
        font: '12px Arial',
        color: 'white',
        render: y => y.toFixed(2)
      }
    }
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender
