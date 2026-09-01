import { Extension } from '@tiptap/core'
import { goToNextCell } from '@tiptap/pm/tables'

export const RtlTableArrowNavigation = Extension.create({
  name: 'rtlTableArrowNavigation',

  addKeyboardShortcuts() {
    const isInTable = () => this.editor.isActive('table')

    return {
      ArrowRight: () => {
        if (!isInTable()) return false

        return goToNextCell(-1)(this.editor.state, this.editor.view.dispatch)
      },
      ArrowLeft: () => {
        if (!isInTable()) return false

        return goToNextCell(1)(this.editor.state, this.editor.view.dispatch)
      },
    }
  },
})
