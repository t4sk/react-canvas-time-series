// @flow

type Price = {
  high: number,
  low: number,
  open: number,
  close: number
}

export type Props = {
  graph: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  candlestick: {
    wickWidth: number,
    getWickColor: Price => string
    lineWidth: number,
    getLineColor: Price => string,
    getBackgroundColor: Price => string,
  },
  yMin: number,
  yMax: number,
  xMin: number,
  xMax: number,
  data: Array<Price>
}
