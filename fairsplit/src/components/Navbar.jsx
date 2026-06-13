import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar({ theme, onToggleTheme, rightSlot }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        <Link to="/" aria-label="FairSplit home">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          {rightSlot}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}
