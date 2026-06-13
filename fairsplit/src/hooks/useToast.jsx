import React, { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, Info, XCircle, X } from 'lucide-react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3200)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[100] flex flex-col gap-2 sm:max-w-sm">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ toast, onClose }) {
  const config = {
    success: { icon: CheckCircle2, classes: 'border-success-500/30 text-success-700 dark:text-success-100' },
    error: { icon: XCircle, classes: 'border-red-400/30 text-red-700 dark:text-red-200' },
    info: { icon: Info, classes: 'border-primary-400/30 text-primary-700 dark:text-primary-100' },
  }[toast.type] || { icon: Info, classes: '' }

  const Icon = config.icon

  return (
    <div
      role="status"
      className={`animate-slide-in-right flex items-start gap-3 rounded-2xl border bg-white/95 dark:bg-card-dark/95 backdrop-blur px-4 py-3 shadow-soft ${config.classes}`}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
