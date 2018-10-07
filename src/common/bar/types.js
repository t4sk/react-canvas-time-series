// @flow

type Bar = {
  y: number,
}

export type Props = {
  graph: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  bar: {
    getBackgroundColor: Bar => string,
    line: {
      width: number,
      getColor: Bar => string,
    }
  },
  yMin: number,
  yMax: number,
  data: Array<Bar>
}
