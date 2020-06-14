import { CanvasContext } from "./types"

interface Props {
  left: number
  top: number
  color: string
  text: number | string
  font: string
}

const defaultProps = {
  color: "black",
  font: "12px Arial",
}

function setDefaults(props: Props): Props {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx: CanvasContext, props: Props) {
  props = setDefaults(props)

  const { left, top, color, font, text } = props

  ctx.textBaseline = "top"
  ctx.textAlign = "left"

  ctx.font = font
  ctx.fillStyle = color

  ctx.fillText(`${text}`, left, top)
}
