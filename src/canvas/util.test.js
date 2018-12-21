// @flow
import { merge } from '../test-util'

import {
  getGraphWidth,
  getGraphHeight,
  getGraphLeft,
  getGraphTop,
} from './util'

const props = {
  canvas: {
    width: 500,
    height: 300,
  },
  background: {
    width: 460,
    height: 270,
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    yAxisAt: 'left',
    yAxisWidth: 50,
  }
}

// TODO fix test
test("get width", () => {
  expect(getGraphWidth(props)).toEqual(
    props.background.width - props.background.yAxisWidth
  )
})

test("get height", () => {
  expect(getGraphHeight(props)).toEqual(
    props.background.height - props.background.xAxisHeight
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
