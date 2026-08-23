import { createContext, useContext } from 'react'

export type SheetId = 'contact' | null

export interface SheetContextValue {
  activeSheet: SheetId
  openSheet: (sheet: Exclude<SheetId, null>) => void
  closeSheet: () => void
}

export const SheetContext = createContext<SheetContextValue | null>(null)

export function useSheets() {
  const ctx = useContext(SheetContext)
  if (!ctx) throw new Error('useSheets must be used within a SheetProvider')
  return ctx
}
