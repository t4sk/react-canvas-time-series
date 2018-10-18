// @flow

export type Mouse = {
  x: number,
  y: number,
  isDragging: boolean
  dragStartCanvasX: number,
  dragStartXMin: number,
  dragStartXMax: number,
}

export type Graph = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type Props = {
  canvas: {
    width: number,
    height: number,
  },
  graph: Graph,
  mouse: Mouse,
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
