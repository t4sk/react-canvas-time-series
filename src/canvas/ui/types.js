// @flow

export type Mouse = {
  x: number,
  y: number,
  isDragging: boolean
  dragStartLeft: number,
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

export type DrawYLineAtProps = {
  graph: Graph,
  top: number,
  lineColor: string,
}

export type DrawYLabelAtProps = {
  top: number,
  text: string,
  height: number,
  width: number,
  graph: Graph,
  labelAt: 'left' | 'right',
  backgroundColor: string,
  color: string,
  font: string,
}

export type DrawXLineAtProps = {
  graph: Graph,
  left: number,
  lineColor: string,
}

export type DrawXLabelAtProps = {
  left: number,
  text: string,
  height: number,
  width: number,
  graph: Graph,
  labelAt: 'top' | 'bottom',
  backgroundColor: string,
  color: string,
  font: string,
}
