// @flow

export type Props = {
  graph: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  line: {
    color: string,
    width: number,
  },
  yMin: number,
  yMax: number,
  xMin: number,
  xMax: number,
  data: Array<{
    x: number,
    y: number,
  }>
}
