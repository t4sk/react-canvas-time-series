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

    showYLabel: boolean,
    showYLine: boolean,
    yLineWidth: number,
    yLineColor: number,
    yAxisAt: 'left' | 'right',
    yAxisWidth: number,
    yLabelFont: string,
    yLabelColor: string,
    renderYLabel: number => string | number,
    yInterval: number,

    showXLabel: boolean,
    showXLine: boolean,
    xLineWidth: number,
    xLineColor: number,
    xAxisAt: 'top' | 'bottom',
    xAxisHeight: number,
    xLabelFont: string,
    xLabelColor: string,
    renderXLabel: number => string | number,
    xInterval: number,
  },
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}
