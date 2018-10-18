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
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    yAxisAt: 'left',
    yAxisWidth: 50,
  }
}

test("get width", () => {
  expect(getGraphWidth(props)).toEqual(
    props.canvas.width
    - props.background.yAxisWidth
    - props.margin.left
    - props.margin.right
  )
})

test("get height", () => {
  expect(getGraphHeight(props)).toEqual(
    props.canvas.height
    - props.background.xAxisHeight
    - props.margin.top
    - props.margin.bottom
  )
})

describe("get graph y", () => {
  test("x axis at top", () => {
    expect(getGraphY(merge(props, {
      background: {
        xAxisAt: 'top'
      }
    }))).toEqual(props.margin.top + props.background.xAxisHeight)
  })

  test("x axis at bottom", () => {
    expect(getGraphY(merge(props, {
      background: {
        xAxisAt: 'bottom'
      }
    }))).toEqual(props.margin.top)
  })

  test("invalid x axis", () => {
    expect(() => getGraphY(merge(props, {
      background: {
        xAxisAt: 'invalid'
      }
    }))).toThrow()
  })
})

describe("get graph x", () => {
  test("y axis at left", () => {
    expect(getGraphX(merge(props, {
      background: {
        yAxisAt: 'left'
      }
    }))).toEqual(props.margin.left + props.background.yAxisWidth)
  })

  test("y axis at right", () => {
    expect(getGraphX(merge(props, {
      background: {
        yAxisAt: 'right'
      }
    }))).toEqual(props.margin.left)
  })

  test("invalid y axis", () => {
    expect(() => getGraphX(merge(props, {
      background: {
        yAxisAt: 'invalid'
      }
    }))).toThrow()
  })
})
