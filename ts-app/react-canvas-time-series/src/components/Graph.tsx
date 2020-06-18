import React, { useRef, useEffect, useCallback, useMemo } from "react"

import { Layout, Point, XAxisAt, YAxisAt } from "../canvas/types"
import { getLayout } from "../canvas/layout"
import * as xAxis from "../canvas/x-axis"
import * as yAxis from "../canvas/y-axis"
import * as crosshair from "../canvas/crosshair"
import { Crosshair } from "../canvas/crosshair"
import * as text from "../canvas/text"
import * as xLabel from "../canvas/x-label"
import { XLabel } from "../canvas/x-label"
import * as yLabel from "../canvas/y-label"
import { YLabel } from "../canvas/y-label"
import * as bars from "../canvas/bars"
import * as line from "../canvas/line"
import * as points from "../canvas/points"
import * as candlesticks from "../canvas/candlesticks"

// type GraphTypes = "line" | "points" | "bars" | "candlestick"
interface PointGraph extends Partial<points.Graph> {
  type: string
}

interface LineGraph extends Partial<line.Graph> {
  type: string
}

interface BarGraph extends Partial<bars.Graph> {
  type: string
}

interface CandlestickGraph extends Partial<candlesticks.Graph> {
  type: string
}

type GraphType = PointGraph | LineGraph | BarGraph | CandlestickGraph

const GRAPHS = {
  line,
  points,
  bars,
  candlesticks,
}

interface Mouse {
  x: number
  y: number
}

interface Props {
  width: number
  height: number
  padding: number
  backgroundColor: string
  animate?: boolean
  shouldRedrawGraph?: () => boolean
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  // x axis
  xAxisAt: XAxisAt
  xAxisHeight: number
  xAxisLineColor: string
  xTicks: number[]
  xTickInterval: number
  xTickLength: number
  renderXTick: (x: number) => string
  xAxisFont: string
  xAxisTextColor: string
  showXLine: boolean
  xLineColor: string
  // y axis
  yAxisAt: YAxisAt
  yAxisWidth: number
  yAxisLineColor: string
  yTicks: number[]
  yTickInterval: number
  yTickLength: number
  renderYTick: (y: number) => string
  yAxisFont: string
  yAxisTextColor: string
  showYLine: boolean
  yLineColor: string
  // graphs
  graphs: GraphType[]
  // TODO types Array
  frames: Array<any>
  xLabels: Array<Partial<XLabel>>
  yLabels: Array<Partial<YLabel>>
  crosshair?: Partial<Crosshair>
  onMouseMove?: (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) => void
  onMouseDown?: (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) => void
  onMouseUp?: (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) => void
  onMouseOut?: (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) => void
  onWheel?: (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) => void
}

const DEFAULT_PROPS = {
  width: 500,
  height: 300,
  padding: 10,
  backgroundColor: "transparent",
  animate: false,
  shouldRedrawGraph: () => true,
  xMin: 0,
  xMax: 0,
  yMin: 0,
  yMax: 0,
  // x axis
  xAxisAt: "bottom" as XAxisAt,
  xAxisHeight: 30,
  xAxisLineColor: "black",
  xTicks: [],
  xTickInterval: 0,
  xTickLength: 10,
  renderXTick: (x: number) => x.toString(),
  xAxisFont: "",
  xAxisTextColor: "black",
  showXLine: true,
  xLineColor: "lightgrey",

  // y axis
  yAxisAt: "right" as YAxisAt,
  yAxisWidth: 50,
  yAxisLineColor: "black",
  yTicks: [],
  yTickInterval: 0,
  yTickLength: 10,
  renderYTick: (y: number) => y.toString(),
  yAxisFont: "",
  yAxisTextColor: "black",
  showYLine: true,
  yLineColor: "lightgrey",

  // graphs
  graphs: [],
  frames: [],
  xLabels: [],
  yLabels: [],
}

function withDefaultProps(props: Partial<Props>): Props {
  return {
    ...DEFAULT_PROPS,
    ...props,
  }
}

interface Context {
  // axes: CanvasRenderingContext2D | null | undefined
  // graphs: CanvasRenderingContext2D | null | undefined
  // ui: CanvasRenderingContext2D | null | undefined
  axes: any
  graphs: any
  ui: any
}

function draw(ctx: Context, props: Props, layout: Layout) {
  const { xAxisAt, yAxisAt } = props

  ctx.axes.clearRect(0, 0, props.width, props.height)

  if (xAxisAt) {
    xAxis.draw(ctx.axes, layout, props)
  }

  if (yAxisAt) {
    yAxis.draw(ctx.axes, layout, props)
  }

  ctx.graphs.clearRect(0, 0, props.width, props.height)

  for (const graph of props.graphs) {
    // @ts-ignore
    GRAPHS[graph.type].draw(ctx.graphs, layout, graph, props)
  }

  ctx.ui.clearRect(0, 0, props.width, props.height)

  if (props.crosshair) {
    crosshair.draw(ctx.ui, layout, props.crosshair)
  }

  for (const frame of props.frames) {
    text.draw(ctx.ui, frame)
  }

  for (const label of props.xLabels) {
    xLabel.draw(ctx.ui, layout, label, props)
  }

  for (const label of props.yLabels) {
    yLabel.draw(ctx.ui, layout, label, props)
  }
}

function getMouse(
  ctx: Context,
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
): Mouse {
  const rect = ctx.ui.canvas.getBoundingClientRect()

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

const Graph: React.SFC<Partial<Props>> = (props) => {
  const _props = useMemo(() => withDefaultProps(props), [props])
  const layout = useMemo(() => getLayout(_props), [props])

  const refs = {
    axes: useRef<HTMLCanvasElement | null>(null),
    graphs: useRef<HTMLCanvasElement | null>(null),
    ui: useRef<HTMLCanvasElement | null>(null),
    // ref to animation frame
    animation: useRef<number | null>(null),
    // NOTE: store props and layout as ref for animate to draw with latest prop
    props: useRef(_props),
    layout: useRef(layout),
  }

  refs.props.current = _props
  refs.layout.current = layout

  const ctx = useRef<Context>({
    axes: null,
    graphs: null,
    ui: null,
  })

  useEffect(() => {
    ctx.current.axes = refs.axes.current?.getContext("2d")
    ctx.current.graphs = refs.graphs.current?.getContext("2d")
    ctx.current.ui = refs.ui.current?.getContext("2d")

    if (_props.animate) {
      animate()
    } else {
      draw(ctx.current, refs.props.current, refs.layout.current)
    }

    return () => {
      // stop animation
      if (refs.animation.current) {
        window.cancelAnimationFrame(refs.animation.current)
      }
    }
  }, [])

  // TODO
  // componentDidUpdate() {
  //   if (!this.props.animate && this.props.shouldRedrawGraph()) {
  //     this.draw()
  //   }

  //   this.layout = getLayout(this.props)
  // }

  const animate = useCallback(() => {
    refs.animation.current = window.requestAnimationFrame(animate)
    draw(ctx.current, refs.props.current, refs.layout.current)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      _props.onMouseMove?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      _props.onMouseDown?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      _props.onMouseUp?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onMouseOut = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      _props.onMouseOut?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onWheel = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      _props.onWheel?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  // Note: inline styling to remove ts errors
  return (
    <div
      style={{
        position: "relative",
        cursor: "crosshair",
        width: _props.width,
        height: _props.height,
        backgroundColor: _props.backgroundColor,
      }}
    >
      <canvas
        ref={refs.axes}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={_props.width}
        height={_props.height}
      />
      <canvas
        ref={refs.graphs}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={_props.width}
        height={_props.height}
      />
      <canvas
        ref={refs.ui}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={_props.width}
        height={_props.height}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        onWheel={onWheel}
      />
    </div>
  )
}

// TODO useMemo
export default Graph
