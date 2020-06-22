// TODO ctx canvas
// interface CanvasContext {}
export type CanvasContext = any

export interface Rectangle {
  top: number
  left: number
  height: number
  width: number
}

export interface Layout {
  graph: Rectangle
  yAxis: Rectangle
  xAxis: Rectangle
}

export type XAxisAt = "top" | "bottom"
export type YAxisAt = "left" | "right"

export type TextAlign = "left" | "right"

export interface Point {
  x: number
  y: number
}
