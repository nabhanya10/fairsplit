import React from 'react'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center sm:text-right">
          Built for groups who'd rather split the bill than the friendship. <br className="hidden sm:block" />
          &copy; {new Date().getFullYear()} FairSplit. All amounts in ₹ (INR).
        </p>
      </div>
    </footer>
  )
}
