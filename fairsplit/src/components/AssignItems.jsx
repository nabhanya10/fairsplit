import React from 'react'
import { Check, AlertTriangle } from 'lucide-react'
import { useBill } from '../hooks/useBill.jsx'
import { avatarColor, initials } from './AddFriends.jsx'
import { formatCurrency, getItemShare } from '../utils/calculations.js'

export default function AssignItems() {
  const { bill, toggleAssignment } = useBill()

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Who had what?</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Tap everyone who shared each item. Shared items split evenly.</p>
      </div>

      <div className="space-y-3">
        {bill.items.map((item, idx) => {
          const assigned = bill.assignments[item.id] || []
          const share = getItemShare(item.price, assigned.length)
          const isUnassigned = assigned.length === 0

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark p-4 sm:p-5 shadow-softer animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap mb-3.5">
                <div>
                  <p className="font-display font-semibold text-slate-800 dark:text-white">{item.name || 'Untitled item'}</p>
                  <p className="text-sm text-slate-400 font-mono">{formatCurrency(item.price)}</p>
                </div>
                {isUnassigned ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300 text-xs font-semibold px-3 py-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> Not assigned yet
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 dark:bg-success-500/10 text-success-600 dark:text-success-300 text-xs font-semibold px-3 py-1 font-mono">
                    {formatCurrency(share)} each &times; {assigned.length}
                  </span>
                )}
              </div>

              {bill.friends.length === 0 ? (
                <p className="text-sm text-slate-400">Add friends in the previous step to assign this item.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {bill.friends.map((friend, fIdx) => {
                    const checked = assigned.includes(friend.id)
                    return (
                      <button
                        key={friend.id}
                        onClick={() => toggleAssignment(item.id, friend.id)}
                        aria-pressed={checked}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                          checked
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 shadow-softer'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-300 hover:text-primary-600'
                        }`}
                      >
                        <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold transition-colors ${
                          checked ? 'bg-primary-600 text-white' : avatarColor(fIdx)
                        }`}>
                          {checked ? <Check className="h-3 w-3" /> : initials(friend.name)}
                        </span>
                        {friend.name}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
