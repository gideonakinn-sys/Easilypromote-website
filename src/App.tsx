import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SheetProvider } from './components/SheetProvider'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'

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
        <div className="flex min-h-screen flex-col bg-stone-100">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SheetProvider>
  )
}

export default App
