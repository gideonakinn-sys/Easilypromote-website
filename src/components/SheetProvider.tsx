import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import ContactSheet from './ContactSheet'
import { SheetContext, type SheetId } from './sheets'

export function SheetProvider({ children }: { children: ReactNode }) {
  const [activeSheet, setActiveSheet] = useState<SheetId>(null)

  const openSheet = useCallback((sheet: Exclude<SheetId, null>) => {
    setActiveSheet((current) => (current === sheet ? null : sheet))
  }, [])

  const closeSheet = useCallback(() => setActiveSheet(null), [])

  useEffect(() => {
    if (!activeSheet) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-sheet-root]') && !target.closest('[data-sheet-trigger]')) {
        setActiveSheet(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveSheet(null)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeSheet])

  const value = useMemo(
    () => ({ activeSheet, openSheet, closeSheet }),
    [activeSheet, openSheet, closeSheet],
  )

  return (
    <SheetContext.Provider value={value}>
      {children}
      <ContactSheet />
    </SheetContext.Provider>
  )
}
