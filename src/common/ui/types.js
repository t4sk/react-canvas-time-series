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
    },
    label: {
      at: 'top' | 'bottom',
      width: number,
      height: number,
      backgroundColor: string,
      font: string,
      color: string,
      render: number => string | number,
    }
  },
  y: {
    line: {
      color: string,
    },
    label: {
      at: 'left' | 'right',
      width: number,
      height: number,
      backgroundColor: string,
      font: string,
      color: string,
      render: number => string | number,
    }
  },
  yMin: number,
  yMax: number,
  xMin: number,
  xMax: number,
}
