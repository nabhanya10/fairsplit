import React from 'react'

export default function FeatureCard({ icon: Icon, title, description, accent = 'primary', style }) {
  const accents = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-300',
  }
  return (
    <div
      style={style}
      className="group rounded-2xl bg-white dark:bg-card-dark border border-slate-200/70 dark:border-slate-800 p-6 shadow-softer hover:shadow-soft hover:-translate-y-1 transition-all duration-300 animate-fade-in-up opacity-0"
    >
      <div className={`mb-4 inline-grid h-11 w-11 place-items-center rounded-xl ${accents[accent]} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </div>
      <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}
