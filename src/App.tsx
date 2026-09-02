import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SheetProvider } from './components/SheetProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <SheetProvider>
      <BrowserRouter>
        <div className="relative flex min-h-screen flex-col">
          <ScrollToTop />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SheetProvider>
  )
}

export default App
