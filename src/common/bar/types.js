// @flow

export type Props = {
  graph: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  yMin: number,
  yMax: number,
  data: Array<{
    y: number,
    backgroundColor: string,
    lineColor: string,
  }>
}
