import { motion } from 'framer-motion'
import { FiHome } from 'react-icons/fi'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 relative overflow-hidden dot-grid"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* glow blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-blob glow-blob-blue   w-[400px] h-[400px] top-1/4 left-1/4  opacity-50" />
        <div className="glow-blob glow-blob-purple w-[400px] h-[400px] bottom-1/4 right-1/4 opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative text-center space-y-6 max-w-md"
      >
        {/* Large 404 */}
        <h1
          className="font-black leading-none gradient-text select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 10rem)' }}
        >
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-(--text-primary)">Page Not Found</h2>
          <p className="text-(--text-secondary) text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/" variant="primary">
            <FiHome className="w-4 h-4" aria-hidden="true" /> Go Home
          </Button>
          <Button to="/projects" variant="secondary">
            Browse Projects
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
