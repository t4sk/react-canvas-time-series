// @flow
import { merge } from '../test-util'

import {
  getGraphWidth,
  getGraphHeight,
  getGraphX,
  getGraphY,
} from './common'

const props = {
  canvas: {
    width: 500,
    height: 300,
  },
  margin: {
    top: 10,
    bottom: 20,
    left: 10,
    right: 30
  },
  background: {
    x: {
      axis: {
        at: 'bottom',
        height: 50,
      }
    },
    y: {
      axis: {
        at: 'left',
        width: 50,
      }
    },
  }
}

test("get width", () => {
  expect(getGraphWidth(props)).toEqual(
    props.canvas.width
    - props.background.y.axis.width
    - props.margin.left
    - props.margin.right
  )
})

test("get height", () => {
  expect(getGraphHeight(props)).toEqual(
    props.canvas.height
    - props.background.x.axis.height
    - props.margin.top
    - props.margin.bottom
  )
})

describe("get graph y", () => {
  test("x axis at top", () => {
    expect(getGraphY(merge(props, {
      background: {
        x: {
          axis: {
            at: 'top'
          }
        }
      }
    }))).toEqual(props.margin.top + props.background.x.axis.height)
  })

  test("x axis at bottom", () => {
    expect(getGraphY(merge(props, {
      background: {
        x: {
          axis: {
            at: 'bottom'
          }
        }
      }
    }))).toEqual(props.margin.top)
  })

  test("invalid x axis", () => {
    expect(() => getGraphY(merge(props, {
      background: {
        x: {
          axis: {
            at: 'invalid'
          }
        }
      }
    }))).toThrow()
  })
})

describe("get graph x", () => {
  test("y axis at left", () => {
    expect(getGraphX(merge(props, {
      background: {
        y: {
          axis: {
            at: 'left'
          }
        }
      }
    }))).toEqual(props.margin.left + props.background.y.axis.width)
  })

  test("y axis at right", () => {
    expect(getGraphX(merge(props, {
      background: {
        y: {
          axis: {
            at: 'right'
          }
        }
      }
    }))).toEqual(props.margin.left)
  })

  test("invalid y axis", () => {
    expect(() => getGraphX(merge(props, {
      background: {
        y: {
          axis: {
            at: 'invalid'
          }
        }
      }
    }))).toThrow()
  })
})
