import { CanvasContext } from "../types"

interface Props {
  graph: {
    width: number
    height: number
  }
  mask: {
    left: number
    width: number
  }
  maskColor: string
}

export function draw(ctx: CanvasContext, props: Props) {
  const { graph, mask, maskColor } = props

  ctx.fillStyle = maskColor
  ctx.fillRect(mask.left, 0, mask.width, graph.height)
}
