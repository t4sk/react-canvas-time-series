// TODO ctx canvas
// interface CanvasContext {}
export type CanvasContext = any

export interface Layout {
  graph: { top: number; left: number; height: number; width: number }
  yAxis: { top: number; left: number; height: number; width: number }
  xAxis: { top: number; left: number; height: number; width: number }
}

export type XAxisAt = "top" | "bottom"
export type YAxisAt = "left" | "right"

export type TextAlign = "left" | "right"

export interface Point {
  x: number
  y: number
}
