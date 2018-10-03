// @flow

export type Props = {
  width: number,
  height: number,
  margin: {
    top: number,
    bottom: number,
    left: number,
    right: number,
  },
  backgroundColor: string,
  y: {
    line: {
      color: string,
    },
    axis: {
      at: 'left' | 'right',
      label: {
        font: string,
        color: string,
        render: number => string | number,
      },
      width: number,
    },
    intervals: number,
  },
  x: {
    line: {
      color: number,
    },
    axis: {
      at: 'top' | 'bottom',
      label: {
        font: string,
        color: string,
        render: number => string | number,
      },
      height: number
    },
    intervals: number
  },
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}