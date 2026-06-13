import React from 'react'
import { Receipt } from 'lucide-react'

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 font-display font-bold ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 text-white shadow-glow">
        <Receipt className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="text-lg tracking-tight">
        Fair<span className="text-primary-600">Split</span>
      </span>
    </div>
  )
}
