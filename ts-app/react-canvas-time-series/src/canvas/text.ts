import { CanvasContext } from "./types"

export interface Text {
  left: number
  top: number
  text: number | string
  color: string
  font: string
}

const DEFAULT_PROPS = {
  left: 0,
  top: 0,
  text: "",
  color: "black",
  font: "12px Arial",
}

function withDefaultProps(props: Partial<Text>): Text {
  return {
    ...DEFAULT_PROPS,
    ...props,
  }
}

export function draw(ctx: CanvasContext, props: Partial<Text>) {
  const _props = withDefaultProps(props)

  const { left, top, color, font, text } = _props

  ctx.textBaseline = "top"
  ctx.textAlign = "left"

  ctx.font = font
  ctx.fillStyle = color

  ctx.fillText(`${text}`, left, top)
}
