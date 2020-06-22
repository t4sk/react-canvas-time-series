import { XAxisAt, YAxisAt } from "./types"
import { getLayout } from "./layout"

const padding = 10
const width = 500
const height = 400

const props = {
  padding,
  width,
  height,
  xAxisAt: "bottom" as XAxisAt,
  xAxisHeight: 0,
  yAxisAt: "left" as YAxisAt,
  yAxisWidth: 0,
}

describe("getLayout", () => {
  test("default", () => {
    expect(getLayout(props)).toEqual({
      graph: {
        top: padding,
        left: padding,
        width: width - 2 * padding,
        height: height - 2 * padding,
      },
      xAxis: {
        top: height - padding,
        left: padding,
        width: width - 2 * padding,
        height: 0,
      },
      yAxis: {
        top: padding,
        left: padding,
        width: 0,
        height: height - 2 * padding,
      },
    })
  })

  const xAxisHeight = 20
  const yAxisWidth = 50

  test("left top", () => {
    expect(
      getLayout({
        ...props,
        yAxisAt: "left",
        xAxisAt: "top",
        xAxisHeight,
        yAxisWidth,
      })
    ).toEqual({
      graph: {
        top: padding + xAxisHeight,
        left: padding + yAxisWidth,
        width: width - 2 * padding - yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
      xAxis: {
        top: padding,
        left: padding + yAxisWidth,
        width: width - 2 * padding - yAxisWidth,
        height: xAxisHeight,
      },
      yAxis: {
        top: padding + xAxisHeight,
        left: padding,
        width: yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
    })
  })

  test("left bottom", () => {
    expect(
      getLayout({
        ...props,
        yAxisAt: "left",
        xAxisAt: "bottom",
        xAxisHeight,
        yAxisWidth,
      })
    ).toEqual({
      graph: {
        top: padding,
        left: padding + yAxisWidth,
        width: width - 2 * padding - yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
      xAxis: {
        top: height - padding - xAxisHeight,
        left: padding + yAxisWidth,
        width: width - 2 * padding - yAxisWidth,
        height: xAxisHeight,
      },
      yAxis: {
        top: padding,
        left: padding,
        width: yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
    })
  })

  test("right top", () => {
    expect(
      getLayout({
        ...props,
        yAxisAt: "right",
        xAxisAt: "top",
        xAxisHeight,
        yAxisWidth,
      })
    ).toEqual({
      graph: {
        top: padding + xAxisHeight,
        left: padding,
        width: width - 2 * padding - yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
      xAxis: {
        top: padding,
        left: padding,
        width: width - 2 * padding - yAxisWidth,
        height: xAxisHeight,
      },
      yAxis: {
        top: padding + xAxisHeight,
        left: width - padding - yAxisWidth,
        width: yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
    })
  })

  test("right bottom", () => {
    expect(
      getLayout({
        ...props,
        yAxisAt: "right",
        xAxisAt: "bottom",
        xAxisHeight,
        yAxisWidth,
      })
    ).toEqual({
      graph: {
        top: padding,
        left: padding,
        width: width - 2 * padding - yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
      xAxis: {
        top: height - padding - xAxisHeight,
        left: padding,
        width: width - 2 * padding - yAxisWidth,
        height: xAxisHeight,
      },
      yAxis: {
        top: padding,
        left: width - padding - yAxisWidth,
        width: yAxisWidth,
        height: height - 2 * padding - xAxisHeight,
      },
    })
  })
})
