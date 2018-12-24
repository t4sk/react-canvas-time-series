// @flow
import {
  getGraphDimensions
} from './util'

const props = {
  width: 500,
  height: 300,
  padding: {
    top: 10,
    bottom: 20,
    left: 10,
    right: 20
  },
  background: {
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    yAxisAt: 'left',
    yAxisWidth: 50,
  },
}

describe("get graph dimensions", () => {
  test("width", () => {
    expect(getGraphDimensions(props).width).toEqual(
      props.width - props.background.yAxisWidth - (props.padding.left + props.padding.right)
    )
  })

  test("height", () => {
    expect(getGraphDimensions(props).height).toEqual(
      props.height - props.background.xAxisHeight - (props.padding.top + props.padding.bottom)
    )
  })

  describe("top", () => {
    test("x axis at top", () => {
      expect(getGraphDimensions({
        ...props,
        background: {
          ...props.background,
          xAxisAt: 'top'
        }
      }).top).toEqual(props.padding.top + props.background.xAxisHeight)
    })

    test("x axis at bottom", () => {
      expect(getGraphDimensions({
        ...props,
        background: {
          ...props.background,
          xAxisAt: 'bottom'
        }
      }).top).toEqual(props.padding.top)
    })

    test("invalid x axis", () => {
      expect(() => getGraphDimensions({
        ...props,
        background: {
          ...props.background,
          xAxisAt: 'invalid'
        }
      })).toThrow()
    })
  })

  describe("left", () => {
    test("y axis at left", () => {
      expect(getGraphDimensions({
        ...props,
        background: {
          ...props.background,
          yAxisAt: 'left'
        }
      }).left).toEqual(props.padding.left + props.background.yAxisWidth)
    })

    test("y axis at right", () => {
      expect(getGraphDimensions({
        ...props,
        background: {
          ...props.background,
          yAxisAt: 'right'
        }
      }).left).toEqual(props.padding.left)
    })

    test("invalid y axis", () => {
      expect(() => getGraphDimensions({
        ...props,
        background: {
          ...props.background,
          yAxisAt: 'invalid'
        }
      })).toThrow()
    })
  })
})
