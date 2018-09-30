// @flow

export type Props = {
  canvas: {
    width: number,
    height: number,
  },
  graph: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  mouse: {
    x: number,
    y: number,
  },
  x: {
    line: {
      color: string,
    }
  },
  y: {
    line: {
      color: string,
    }
  }
}
