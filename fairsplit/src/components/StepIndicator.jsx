import React from 'react'
import { Check } from 'lucide-react'

const STEP_LABELS = ['Upload', 'Items', 'Friends', 'Assign', 'Results']

export default function StepIndicator({ current, onStepClick, maxReached }) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1
          const isActive = stepNum === current
          const isComplete = stepNum < current
          const isReachable = stepNum <= maxReached
          return (
            <li key={label} className="flex-1 flex items-center">
              <button
                onClick={() => isReachable && onStepClick(stepNum)}
                disabled={!isReachable}
                aria-current={isActive ? 'step' : undefined}
                className={`group flex items-center gap-2 w-full ${isReachable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <span
                  className={`grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full text-xs sm:text-sm font-bold border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-600 border-primary-600 text-white shadow-glow scale-110'
                      : isComplete
                      ? 'bg-success-500 border-success-500 text-white'
                      : 'bg-white dark:bg-card-dark border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : stepNum}
                </span>
                <span
                  className={`hidden sm:inline text-sm font-medium transition-colors ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {label}
                </span>
              </button>
              {idx < STEP_LABELS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 sm:mx-2 rounded transition-colors duration-300 ${stepNum < current ? 'bg-success-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
