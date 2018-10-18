// @flow

export type Props = {
  canvas: {
    width: number,
    height: number,
  },
  margin: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  background: {
    backgroundColor: string,

    yLineWidth: number,
    yLineColor: number,
    yAxisAt: 'left' | 'right',
    yAxisWidth: number,
    yLabelFont: string,
    yLabelColor: string,
    yLabelRender: number => string | number,
    yInterval: number,

    xLineWidth: number,
    xLineColor: number,
    xAxisAt: 'top' | 'bottom',
    xAxisHeight: number,
    xLabelFont: string,
    xLabelColor: string,
    xLabelRender: number => string | number,
    xInterval: number,
  },
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}
