import React, { useRef, useEffect, useCallback, useMemo } from "react"

import { Layout, Rectangle } from "../canvas/types"
import { XAxisAt, YAxisAt } from "../canvas/types"
import { getLayout } from "../canvas/layout"
import * as xAxis from "../canvas/x-axis"
import * as yAxis from "../canvas/y-axis"
import * as crosshair from "../canvas/crosshair"
import * as text from "../canvas/text"
import * as xLabel from "../canvas/x-label"
import * as yLabel from "../canvas/y-label"
import * as bars from "../canvas/bars"
import * as line from "../canvas/line"
import * as points from "../canvas/points"
import * as candlesticks from "../canvas/candlesticks"

type GraphTypes = "line" | "points" | "bars" | "candlestick"

const GRAPHS = {
  line,
  points,
  bars,
  candlesticks,
}

type Graph = Rectangle

interface Mouse {
  x: number
  y: number
}

// TODO types Array, Function, object
interface Props {
  width: number
  height: number
  padding: number
  backgroundColor: string
  animate?: boolean
  // shouldRedrawGraph?: Function
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
  graphs?: GraphTypes[]
  frames?: Array<any>
  xLabels?: Array<any>
  yLabels?: Array<any>
  crosshair?: {
    canvasX: number
    canvasY: number
    xLineColor: string
    xLineWidth: number
    yLineColor: string
    yLineWidth: number
  }
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

interface Context {
  // axes: CanvasRenderingContext2D | null | undefined
  // graphs: CanvasRenderingContext2D | null | undefined
  // ui: CanvasRenderingContext2D | null | undefined
  axes: any
  graphs: any
  ui: any
}

function draw(ctx: Context, props: Props, layout: Layout) {
  const {
    xAxisAt,
    yAxisAt,
    graphs = [],
    frames = [],
    xLabels = [],
    yLabels = [],
  } = props

  ctx.axes.clearRect(0, 0, props.width, props.height)

  if (xAxisAt) {
    xAxis.draw(ctx.axes, layout, props)
  }

  if (yAxisAt) {
    yAxis.draw(ctx.axes, layout, props)
  }

  ctx.graphs.clearRect(0, 0, props.width, props.height)

  for (const graph of graphs) {
    // @ts-ignore
    GRAPHS[graph.type].draw(ctx.graphs, layout, graph, props)
  }

  ctx.ui.clearRect(0, 0, props.width, props.height)

  if (props.crosshair) {
    crosshair.draw(ctx.ui, layout, props.crosshair)
  }

  for (const frame of frames) {
    text.draw(ctx.ui, frame)
  }

  for (const label of xLabels) {
    xLabel.draw(ctx.ui, layout, label, props)
  }

  for (const label of yLabels) {
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

const Graph: React.FC<Props> = (props) => {
  const refs = {
    axes: useRef<HTMLCanvasElement | null>(null),
    graphs: useRef<HTMLCanvasElement | null>(null),
    ui: useRef<HTMLCanvasElement | null>(null),
    // ref to animation frame
    animation: useRef<number | null>(null),
  }

  const ctx = useRef<Context>({
    axes: null,
    graphs: null,
    ui: null,
  })
  const layout = useMemo(() => getLayout(props), [props])

  useEffect(() => {
    ctx.current.axes = refs.axes.current?.getContext("2d")
    ctx.current.graphs = refs.graphs.current?.getContext("2d")
    ctx.current.ui = refs.ui.current?.getContext("2d")

    if (props.animate) {
      animate()
    } else {
      draw(ctx.current, props, layout)
    }

    return () => {
      // stop animation
      if (refs.animation.current) {
        window.cancelAnimationFrame(refs.animation.current)
      }
    }
  }, [])

  // componentDidUpdate() {
  //   if (!this.props.animate && this.props.shouldRedrawGraph()) {
  //     this.draw()
  //   }

  //   this.layout = getLayout(this.props)
  // }

  const animate = useCallback(() => {
    refs.animation.current = window.requestAnimationFrame(animate)
    draw(ctx.current, props, layout)
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      props.onMouseMove?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      props.onMouseDown?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      props.onMouseUp?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onMouseOut = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      props.onMouseOut?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  const onWheel = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      props.onWheel?.(e, getMouse(ctx.current, e), layout)
    },
    []
  )

  // Note: inline styling to remove ts errors
  return (
    <div
      style={{
        position: "relative",
        cursor: "crosshair",
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
      }}
    >
      <canvas
        ref={refs.axes}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={props.width}
        height={props.height}
      />
      <canvas
        ref={refs.graphs}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={props.width}
        height={props.height}
      />
      <canvas
        ref={refs.ui}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={props.width}
        height={props.height}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        onWheel={onWheel}
      />
    </div>
  )
}

Graph.defaultProps = {
  padding: 10,
  // shouldRedrawGraph: () => true,

  // x axis
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
}

// TODO useMemo
export default Graph
