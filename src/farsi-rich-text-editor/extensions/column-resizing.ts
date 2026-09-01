import { Extension } from '@tiptap/core'
import type { EditorState, Transaction } from '@tiptap/pm/state'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import {
  TableMap,
  cellAround,
  pointsAtCell,
  updateColumnsOnResize,
} from '@tiptap/pm/tables'
import type { EditorView } from '@tiptap/pm/view'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

type Dragging = {
  startX: number
  startWidth: number
  isRTL: boolean
}

type ResizeAction =
  | { setHandle: number; setDragging?: undefined }
  | { setDragging: Dragging | null; setHandle?: undefined }

const NO_ACTIVE_HANDLE = -1

/**
 * Plugin state while a column-resize handle is active or being dragged.
 * Faithful to prosemirror-tables' `ResizeState`, with `isRTL` carried on
 * the dragging payload so the width delta is applied with the correct sign.
 */
class ResizeState {
  constructor(
    readonly activeHandle: number,
    readonly dragging: Dragging | null,
  ) {}

  apply(tr: Transaction): ResizeState {
    const action = tr.getMeta(rtlTableColumnResizingKey) as
      ResizeAction | undefined

    if (action?.setHandle != null) {
      return new ResizeState(action.setHandle, null)
    }

    if (action?.setDragging !== undefined) {
      return new ResizeState(this.activeHandle, action.setDragging)
    }

    if (this.activeHandle > NO_ACTIVE_HANDLE && tr.docChanged) {
      let handle = tr.mapping.map(this.activeHandle, -1)
      if (!pointsAtCell(tr.doc.resolve(handle))) handle = NO_ACTIVE_HANDLE
      return new ResizeState(handle, this.dragging)
    }

    return this
  }
}

type ColumnResizingOptions = {
  handleWidth?: number
  cellMinWidth?: number
  defaultCellMinWidth?: number
  lastColumnResizable?: boolean
}

export const rtlTableColumnResizingKey = new PluginKey<ResizeState>(
  'rtlTableColumnResizing',
)

/**
 * RTL-aware column resizer for tables.
 *
 * This is a port of prosemirror-tables' `columnResizing` plugin with the
 * drag-direction fix (upstream PR #335): in an RTL table, columns are laid
 * out right-to-left, so dragging the pointer left must *shrink* a column
 * instead of growing it. The built-in plugin assumes LTR (`startWidth + delta`),
 * which inverts the behavior in RTL.
 *
 * Direction is detected per-table from the computed `direction` of the
 * `<table>` DOM node the moment the resize handle is armed (on mousemove),
 * and that value is carried through the drag via `Dragging.isRTL` — it is
 * *not* re-derived on mousedown/mousemove, since the event target at those
 * points may not resolve back to the same table.
 */
export function rtlColumnResizing(options: ColumnResizingOptions = {}): Plugin {
  const {
    handleWidth = 5,
    cellMinWidth = 25,
    defaultCellMinWidth = 100,
    lastColumnResizable = true,
  } = options

  // Tracks the RTL-ness of the table the active handle belongs to. Set
  // whenever a handle is armed in handleMouseMove, read in handleMouseDown
  // when the drag actually starts. Plain module-closure state is fine here:
  // it's transient UI state (not part of the document) and mirrors how the
  // "isRTL" concept is scoped to a single active handle.
  let activeHandleIsRTL = false

  return new Plugin({
    key: rtlTableColumnResizingKey,
    state: {
      init() {
        return new ResizeState(NO_ACTIVE_HANDLE, null)
      },
      apply(tr, prev) {
        return prev.apply(tr)
      },
    },
    props: {
      attributes: (state: EditorState): Record<string, string> => {
        const pluginState = rtlTableColumnResizingKey.getState(state)
        return pluginState && pluginState.activeHandle > NO_ACTIVE_HANDLE
          ? { class: 'resize-cursor' }
          : {}
      },
      handleDOMEvents: {
        mousemove: (view, event) => {
          handleMouseMove(
            view,
            event,
            handleWidth,
            lastColumnResizable,
            (isRTL) => {
              activeHandleIsRTL = isRTL
            },
          )
        },
        mouseleave: (view) => {
          handleMouseLeave(view)
        },
        mousedown: (view, event) => {
          return handleMouseDown(
            view,
            event,
            cellMinWidth,
            defaultCellMinWidth,
            activeHandleIsRTL,
          )
        },
      },
      decorations: (state: EditorState) => {
        const pluginState = rtlTableColumnResizingKey.getState(state)
        if (pluginState && pluginState.activeHandle > NO_ACTIVE_HANDLE) {
          return handleDecorations(state, pluginState.activeHandle)
        }
        return DecorationSet.empty
      },
    },
  })
}

function handleMouseMove(
  view: EditorView,
  event: MouseEvent,
  handleWidth: number,
  lastColumnResizable: boolean,
  setActiveHandleIsRTL: (isRTL: boolean) => void,
) {
  const pluginState = rtlTableColumnResizingKey.getState(view.state)
  if (!pluginState) return

  if (pluginState.dragging) return

  const target = domCellAround(event.target as HTMLElement | null)
  let cell = NO_ACTIVE_HANDLE
  let isRTL = false

  if (target) {
    const { left, right } = target.getBoundingClientRect()
    if (event.clientX - left <= handleWidth) {
      isRTL = isTableRTL(domTableAround(target))
      cell = edgeCell(view, event, isRTL ? 'end' : 'start', handleWidth)
    } else if (right - event.clientX <= handleWidth) {
      isRTL = isTableRTL(domTableAround(target))
      cell = edgeCell(view, event, isRTL ? 'start' : 'end', -handleWidth)
    }
  }

  if (cell === pluginState.activeHandle) return

  if (!lastColumnResizable && cell !== NO_ACTIVE_HANDLE) {
    const $cell = view.state.doc.resolve(cell)
    const table = $cell.node(-1)
    const map = TableMap.get(table)
    const tableStart = $cell.start(-1)
    if (
      map.colCount($cell.pos - tableStart) +
        ($cell.nodeAfter?.attrs.colspan ?? 1) -
        1 ===
      map.width - 1
    ) {
      return
    }
  }

  if (cell !== NO_ACTIVE_HANDLE) setActiveHandleIsRTL(isRTL)
  updateHandle(view, cell)
}

function handleMouseLeave(view: EditorView) {
  const pluginState = rtlTableColumnResizingKey.getState(view.state)
  if (
    pluginState &&
    pluginState.activeHandle > NO_ACTIVE_HANDLE &&
    !pluginState.dragging
  ) {
    updateHandle(view, NO_ACTIVE_HANDLE)
  }
}

function handleMouseDown(
  view: EditorView,
  event: MouseEvent,
  cellMinWidth: number,
  defaultCellMinWidth: number,
  isRTL: boolean,
): boolean {
  if (!view.editable) return false

  const win = view.dom.ownerDocument.defaultView ?? window
  const pluginState = rtlTableColumnResizingKey.getState(view.state)
  if (
    !pluginState ||
    pluginState.activeHandle === NO_ACTIVE_HANDLE ||
    pluginState.dragging
  ) {
    return false
  }

  const cellNode = view.state.doc.nodeAt(pluginState.activeHandle)
  if (!cellNode) return false

  const width = currentColWidth(view, pluginState.activeHandle, cellNode.attrs)

  view.dispatch(
    view.state.tr.setMeta(rtlTableColumnResizingKey, {
      setDragging: { startX: event.clientX, startWidth: width, isRTL },
    }),
  )

  const finish = (finishEvent: MouseEvent) => {
    win.removeEventListener('mouseup', finish)
    win.removeEventListener('mousemove', move)
    const state = rtlTableColumnResizingKey.getState(view.state)
    if (state?.dragging) {
      updateColumnWidth(
        view,
        state.activeHandle,
        draggedWidth(state.dragging, finishEvent, cellMinWidth),
      )
      view.dispatch(
        view.state.tr.setMeta(rtlTableColumnResizingKey, { setDragging: null }),
      )
    }
  }

  const move = (moveEvent: MouseEvent) => {
    if (!moveEvent.buttons) {
      finish(moveEvent)
      return
    }
    const state = rtlTableColumnResizingKey.getState(view.state)
    if (!state?.dragging) return
    const dragged = draggedWidth(state.dragging, moveEvent, cellMinWidth)
    displayColumnWidth(view, state.activeHandle, dragged, defaultCellMinWidth)
  }

  displayColumnWidth(view, pluginState.activeHandle, width, defaultCellMinWidth)

  win.addEventListener('mouseup', finish)
  win.addEventListener('mousemove', move)

  event.preventDefault()
  return true
}

function currentColWidth(
  view: EditorView,
  cellPos: number,
  attrs: { colspan?: number; colwidth?: number[] },
): number {
  const lastWidth = attrs.colwidth?.[attrs.colwidth.length - 1]
  if (lastWidth) return lastWidth

  const dom = view.domAtPos(cellPos)
  const cellDom = dom.node.childNodes[dom.offset] as HTMLElement | undefined

  // Fall back to the configured default rather than crashing: this can be
  // undefined for spanning cells where `dom.offset` doesn't line up with an
  // actual DOM child.
  if (!cellDom) return 100

  let domWidth = cellDom.offsetWidth
  let parts = attrs.colspan ?? 1

  if (attrs.colwidth) {
    for (let i = 0; i < (attrs.colspan ?? 1); i++) {
      const colWidth = attrs.colwidth[i]
      if (colWidth) {
        domWidth -= colWidth
        parts--
      }
    }
  }

  return domWidth / parts
}

function domCellAround(target: HTMLElement | null): HTMLElement | null {
  while (target && target.nodeName !== 'TD' && target.nodeName !== 'TH') {
    target = target.classList.contains('ProseMirror')
      ? null
      : (target.parentNode as HTMLElement | null)
  }
  return target
}

function domTableAround(target: HTMLElement | null): HTMLTableElement | null {
  while (target && target.nodeName !== 'TABLE') {
    target = target.classList.contains('ProseMirror')
      ? null
      : (target.parentNode as HTMLElement | null)
  }
  return target as HTMLTableElement | null
}

function isTableRTL(table: HTMLTableElement | null): boolean {
  if (!table) return false
  return (
    table.ownerDocument.defaultView?.getComputedStyle(table).direction === 'rtl'
  )
}

function edgeCell(
  view: EditorView,
  event: MouseEvent,
  side: 'start' | 'end',
  offset: number,
): number {
  const found = view.posAtCoords({
    left: event.clientX + offset,
    top: event.clientY,
  })
  if (!found) return NO_ACTIVE_HANDLE

  const $cell = cellAround(view.state.doc.resolve(found.pos))
  if (!$cell) return NO_ACTIVE_HANDLE

  if (side === 'end') return $cell.pos

  const map = TableMap.get($cell.node(-1))
  const start = $cell.start(-1)
  const index = map.map.indexOf($cell.pos - start)
  // First column has no preceding edge to resize from.
  if (index % map.width === 0) return NO_ACTIVE_HANDLE

  const prevCellPos = map.map[index - 1]
  if (prevCellPos === undefined) return NO_ACTIVE_HANDLE

  return start + prevCellPos
}

function draggedWidth(
  dragging: Dragging,
  event: MouseEvent,
  resizeMinWidth: number,
): number {
  const offset = event.clientX - dragging.startX
  // In RTL, columns are laid out right-to-left, so the pointer delta must be
  // subtracted rather than added to the column width.
  return Math.max(
    resizeMinWidth,
    dragging.startWidth + (dragging.isRTL ? -offset : offset),
  )
}

function updateHandle(view: EditorView, value: number) {
  view.dispatch(
    view.state.tr.setMeta(rtlTableColumnResizingKey, { setHandle: value }),
  )
}

function updateColumnWidth(view: EditorView, cell: number, width: number) {
  const $cell = view.state.doc.resolve(cell)
  const table = $cell.node(-1)
  const map = TableMap.get(table)
  const start = $cell.start(-1)
  const col =
    map.colCount($cell.pos - start) + ($cell.nodeAfter?.attrs.colspan ?? 1) - 1
  const tr = view.state.tr

  for (let row = 0; row < map.height; row++) {
    const mapIndex = row * map.width + col
    if (row && map.map[mapIndex] === map.map[mapIndex - map.width]) continue
    const pos = map.map[mapIndex]
    if (pos === undefined) continue
    const attrs = table.nodeAt(pos)?.attrs
    if (!attrs) continue
    const index = (attrs.colspan ?? 1) === 1 ? 0 : col - map.colCount(pos)
    if (attrs.colwidth && attrs.colwidth[index] === width) continue
    const colwidth = attrs.colwidth
      ? attrs.colwidth.slice()
      : (Array(attrs.colspan ?? 1).fill(0) as number[])
    colwidth[index] = width
    tr.setNodeMarkup(start + pos, null, { ...attrs, colwidth })
  }

  if (tr.docChanged) view.dispatch(tr)
}

function displayColumnWidth(
  view: EditorView,
  cell: number,
  width: number,
  defaultCellMinWidth: number,
) {
  const $cell = view.state.doc.resolve(cell)
  const table = $cell.node(-1)
  const start = $cell.start(-1)
  const col =
    TableMap.get(table).colCount($cell.pos - start) +
    ($cell.nodeAfter?.attrs.colspan ?? 1) -
    1

  let dom = view.domAtPos(start).node as HTMLElement | null
  while (dom && dom.nodeName !== 'TABLE') {
    dom = dom.parentNode as HTMLElement | null
  }
  if (!dom) return

  updateColumnsOnResize(
    table,
    dom.firstChild as HTMLTableColElement,
    dom as HTMLTableElement,
    defaultCellMinWidth,
    col,
    width,
  )
}

function handleDecorations(state: EditorState, cell: number) {
  const decorations: Decoration[] = []
  const $cell = state.doc.resolve(cell)
  const table = $cell.node(-1)
  const map = TableMap.get(table)
  const start = $cell.start(-1)
  const col =
    map.colCount($cell.pos - start) + ($cell.nodeAfter?.attrs.colspan ?? 1) - 1
  const pluginState = rtlTableColumnResizingKey.getState(state)

  for (let row = 0; row < map.height; row++) {
    const index = col + row * map.width
    const isLastCellOfCol =
      col === map.width - 1 || map.map[index] !== map.map[index + 1]
    const isFirstRowOfCell =
      row === 0 || map.map[index] !== map.map[index - map.width]
    if (!isLastCellOfCol || !isFirstRowOfCell) continue

    const cellPos = map.map[index]
    if (cellPos === undefined) continue
    const size = table.nodeAt(cellPos)?.nodeSize ?? 0
    const pos = start + cellPos + size - 1
    const dom = document.createElement('div')
    dom.className = 'column-resize-handle'
    if (pluginState?.dragging) {
      decorations.push(
        Decoration.node(start + cellPos, start + cellPos + size, {
          class: 'column-resize-dragging',
        }),
      )
    }
    decorations.push(Decoration.widget(pos, dom))
  }

  return DecorationSet.create(state.doc, decorations)
}

/**
 * Tiptap extension that wires `rtlColumnResizing` into the editor.
 *
 * Works alongside `@tiptap/extension-table` configured with `resizable: false`
 * (which disables Tiptap's LTR-only column resizer) while keeping the table's
 * direction RTL.
 */
export const RtlColumnResizing = Extension.create<ColumnResizingOptions>({
  name: 'rtlColumnResizing',

  addOptions() {
    return {
      handleWidth: 5,
      cellMinWidth: 25,
      defaultCellMinWidth: 100,
      lastColumnResizable: true,
    }
  },

  addProseMirrorPlugins() {
    if (!this.editor.isEditable) return []

    return [rtlColumnResizing(this.options)]
  },
})
