import {
  getGraphWidth,
  getGraphHeight
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
        height: 50,
      }
    },
    y: {
      axis: {
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
