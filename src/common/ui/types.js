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

  xLineColor: string,
  xLabelAt: 'top' | 'bottom',
  xLabelWidth: number,
  xLabelHeight: number,
  xLabelBackgroundColor: string,
  xLabelFont: string,
  xLabelColor: string,
  renderXLabel: number => string | number,

  yLineColor: string,
  yLabelAt: 'left' | 'right',
  yLabelWidth: number,
  yLabelHeight: number,
  yLabelBackgroundColor: string,
  yLabelFont: string,
  yLabelColor: string,
  renderYLabel: number => string | number,
  
  yMin: number,
  yMax: number,
  xMin: number,
  xMax: number,
}
