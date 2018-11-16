import * as background from './background'
import * as bar from './bar'
import * as candlestick from './candlestick'
import * as line from './line'
import * as ui from './ui'
import * as math from './math'

function fill (ctx: any, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(
    0,
    0,
    props.width,
    props.height,
  )
}

export default {
  fill,
  background,
  bar,
  candlestick,
  line,
  ui,
  math,
}
