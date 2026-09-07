import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/*
 * Routes written out by scripts/prerender.mjs arrive with their markup already
 * in place, so they are hydrated rather than re-rendered — otherwise the page
 * would blank for a frame before React puts the same content back. Home ships
 * as an empty shell and still mounts normally.
 */
if (container.firstElementChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
