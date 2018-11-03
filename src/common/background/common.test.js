// @flow
import { merge } from '../test-util'

import {
  getGraphWidth,
  getGraphHeight,
  getGraphLeft,
  getGraphTop,
} from './common'

const props = {
  canvas: {
    width: 500,
    height: 300,
  },
  padding: {
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
    - props.padding.left
    - props.padding.right
  )
})

test("get height", () => {
  expect(getGraphHeight(props)).toEqual(
    props.canvas.height
    - props.background.xAxisHeight
    - props.padding.top
    - props.padding.bottom
  )
})

describe("get graph y", () => {
  test("x axis at top", () => {
    expect(getGraphTop(merge(props, {
      background: {
        xAxisAt: 'top'
      }
    }))).toEqual(props.padding.top + props.background.xAxisHeight)
  })

  test("x axis at bottom", () => {
    expect(getGraphTop(merge(props, {
      background: {
        xAxisAt: 'bottom'
      }
    }))).toEqual(props.padding.top)
  })

  test("invalid x axis", () => {
    expect(() => getGraphTop(merge(props, {
      background: {
        xAxisAt: 'invalid'
      }
    }))).toThrow()
  })
})

describe("get graph x", () => {
  test("y axis at left", () => {
    expect(getGraphLeft(merge(props, {
      background: {
        yAxisAt: 'left'
      }
    }))).toEqual(props.padding.left + props.background.yAxisWidth)
  })

  test("y axis at right", () => {
    expect(getGraphLeft(merge(props, {
      background: {
        yAxisAt: 'right'
      }
    }))).toEqual(props.padding.left)
  })

  test("invalid y axis", () => {
    expect(() => getGraphLeft(merge(props, {
      background: {
        yAxisAt: 'invalid'
      }
    }))).toThrow()
  })
})
