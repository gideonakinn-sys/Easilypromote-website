import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SheetProvider } from './components/SheetProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import { metaFor } from './routeMeta'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/*
 * Each route ships with its own title and description in the prerendered HTML;
 * this keeps them correct after a client-side navigation, which leaves the
 * head untouched.
 */
function TitleSync() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description)
  }, [pathname])

  return null
}

/*
 * Everything below the router lives here so the prerender step can mount the
 * same tree under a StaticRouter and write real HTML per route. Crawlers that
 * do not run JavaScript were being served an empty shell on every path,
 * including the legal pages. See scripts/prerender.mjs.
 */
export function AppShell() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollToTop />
      <TitleSync />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[0.6875rem] focus:uppercase focus:tracking-[0.12em] focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <SheetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </SheetProvider>
  )
}

export default App
