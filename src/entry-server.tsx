import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { SheetProvider } from './components/SheetProvider'
import { AppShell } from './App'

export { ROUTE_META, SITE } from './routeMeta'

/** Renders one route to markup for scripts/prerender.mjs. */
export function render(url: string) {
  return renderToString(
    <SheetProvider>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </SheetProvider>,
  )
}
