import React from 'react'
import { Check, Sparkles } from 'lucide-react'

const rows = [
  { name: 'Pizza Margherita', price: '₹450', people: ['N', 'R'] },
  { name: 'Chicken Burger', price: '₹280', people: ['R', 'A'] },
  { name: 'French Fries', price: '₹150', people: ['N', 'A', 'S'] },
  { name: 'Coke', price: '₹60', people: ['S'] },
  { name: 'Brownie', price: '₹180', people: ['N', 'R', 'A', 'S'] },
]

export default function ReceiptPreviewCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm animate-fade-in-up opacity-0" style={{ animationDelay: '150ms' }}>
      {/* Ambient glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-400/30 via-primary-200/20 to-success-300/20 blur-2xl" />

      {/* Floating badge */}
      <div className="absolute -right-4 -top-5 z-20 flex items-center gap-1.5 rounded-full bg-success-500 text-white text-xs font-semibold px-3 py-1.5 shadow-soft animate-float">
        <Sparkles className="h-3.5 w-3.5" />
        Split instantly
      </div>

      <div className="receipt-paper receipt-edge rounded-t-2xl shadow-soft px-6 pt-7 pb-5 font-mono text-slate-700 dark:text-slate-200 rotate-[-1.5deg]">
        <div className="text-center mb-4">
          <p className="font-display font-bold tracking-wide text-slate-900 dark:text-white text-sm">THE GARDEN BISTRO</p>
          <p className="text-[11px] text-slate-400 mt-0.5">12 Church St, Bengaluru</p>
        </div>

        <div className="space-y-2.5">
          {rows.map((row, idx) => (
            <div
              key={row.name}
              className="dotted-divider pb-2 animate-fade-in opacity-0"
              style={{ animationDelay: `${300 + idx * 120}ms` }}
            >
              <div className="flex items-center justify-between text-xs sm:text-[13px]">
                <span>{row.name}</span>
                <span className="font-semibold">{row.price}</span>
              </div>
              <div className="mt-1.5 flex gap-1.5">
                {row.people.map((p) => (
                  <span
                    key={p}
                    className="grid h-5 w-5 place-items-center rounded-full bg-primary-100 dark:bg-primary-500/20 text-[10px] font-bold text-primary-700 dark:text-primary-300"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
          <span>Total</span>
          <span>₹1,120.00</span>
        </div>
      </div>

      {/* Result strip */}
      <div className="rounded-b-2xl bg-primary-600 text-white px-6 py-4 shadow-soft -mt-px">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-100 mb-2">
          <Check className="h-3.5 w-3.5" /> Everyone pays their share
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-mono">
          <span>Nabhanya</span><span className="text-right font-semibold">₹335.00</span>
          <span>Rahul</span><span className="text-right font-semibold">₹285.00</span>
          <span>Aditi</span><span className="text-right font-semibold">₹280.00</span>
          <span>Sam</span><span className="text-right font-semibold">₹220.00</span>
        </div>
      </div>
    </div>
  )
}
