import React from 'react'

const variants = {
  primary:
    'bg-primary-600 text-white shadow-glow hover:bg-primary-700 active:scale-[0.98] focus-visible:outline-primary-600',
  secondary:
    'bg-white dark:bg-card-dark text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98]',
  success:
    'bg-success-500 text-white hover:bg-success-600 active:scale-[0.98]',
  ghost:
    'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98]',
  danger:
    'bg-transparent text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 active:scale-[0.98]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-xl gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  ...props
}) {
  const Component = as
  return (
    <Component
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
