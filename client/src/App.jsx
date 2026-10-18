import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext.jsx'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import About from './pages/About'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"             element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects"     element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/projects/:id" element={<PageWrapper><ProjectDetails /></PageWrapper>} />
        <Route path="/about"        element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/resume"       element={<PageWrapper><Resume /></PageWrapper>} />
        <Route path="/contact"      element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*"             element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
        {/* min-h-screen flex column so footer always sticks to bottom */}
        <div className="flex flex-col min-h-screen bg-(--bg-primary)">
          <Navbar />

          {/*
            pt-16 = 64px — exactly the Navbar height (h-16).
            This single spacer means NO page needs to manage its own top padding.
            flex-1 makes this region fill available height so Footer stays at bottom.
          */}
          <main id="main-content" className="flex-1 pt-16">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
        </MotionConfig>
      </ThemeProvider>
    </BrowserRouter>
  )
}
