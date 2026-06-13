import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UploadCloud, ListChecks, Users, SplitSquareHorizontal, Sparkles,
  ArrowRight, Receipt, ShieldCheck, Smartphone, Moon,
} from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import ReceiptPreviewCard from '../components/ReceiptPreviewCard.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useBill } from '../hooks/useBill.jsx'
import { useToast } from '../hooks/useToast.jsx'

const steps = [
  { num: '01', title: 'Upload your receipt', desc: 'Drop in a photo or PDF of the bill. FairSplit reads the items for you.', icon: UploadCloud },
  { num: '02', title: 'Review the items', desc: 'Fix a name, tweak a price, or add something the scan missed.', icon: ListChecks },
  { num: '03', title: 'Add everyone at the table', desc: 'Type in names — FairSplit turns them into friend pills you can tap.', icon: Users },
  { num: '04', title: 'Assign who had what', desc: 'Tap each person against each item. Shared dishes split evenly, automatically.', icon: SplitSquareHorizontal },
]

const features = [
  { icon: UploadCloud, title: 'Drag-and-drop upload', desc: 'JPG, PNG, or PDF receipts — drop them straight onto the page.', accent: 'primary' },
  { icon: ListChecks, title: 'Editable line items', desc: 'Every item is editable. Add what the scan missed, delete what it got wrong.', accent: 'success' },
  { icon: SplitSquareHorizontal, title: 'Fair, itemized splitting', desc: 'Shared starters split evenly. Solo orders stay with the person who ordered them.', accent: 'primary' },
  { icon: ShieldCheck, title: 'Private by default', desc: 'Your bill stays on your device with local storage — nothing uploaded to a server.', accent: 'success' },
  { icon: Smartphone, title: 'Mobile-first', desc: 'Designed for the table — fast to use on a phone while everyone is still seated.', accent: 'primary' },
  { icon: Moon, title: 'Light & dark mode', desc: 'Easy on the eyes whether you are settling up at lunch or at midnight.', accent: 'success' },
]

export default function Landing() {
  const [theme, toggleTheme] = useTheme()
  const { loadDemo, resetBill } = useBill()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleGetStarted = () => {
    resetBill()
    navigate('/app')
  }

  const handleTryDemo = () => {
    loadDemo()
    showToast('Demo bill loaded — review the items to continue', 'info')
    navigate('/app')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-surface to-success-50/40 dark:from-primary-950/40 dark:via-surface-dark dark:to-success-950/10" />
        <div className="absolute -top-32 -left-32 -z-10 h-72 w-72 rounded-full bg-primary-200/40 dark:bg-primary-500/10 blur-3xl" />
        <div className="absolute top-40 -right-24 -z-10 h-72 w-72 rounded-full bg-success-200/40 dark:bg-success-500/10 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-up opacity-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-500/30 bg-white/70 dark:bg-card-dark/70 px-3.5 py-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-5 shadow-softer">
              <Sparkles className="h-3.5 w-3.5" /> Itemized, fair, instant
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Split Restaurant Bills{' '}
              <span className="gradient-text">Fairly</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Upload a receipt, assign items to people, and calculate exactly what everyone owes —
              no more splitting evenly when someone only had a Coke.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Button size="lg" onClick={handleGetStarted} className="w-full sm:w-auto group">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="secondary" onClick={handleTryDemo} className="w-full sm:w-auto">
                <Receipt className="h-4 w-4" />
                Try Demo
              </Button>
            </div>
            <p className="mt-4 text-xs text-slate-400">No sign-up needed. Your data stays in your browser.</p>
          </div>

          <ReceiptPreviewCard />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">From receipt to settled up, in four steps</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">The order matters — each step builds on the last, so by the end the math is already done for you.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative rounded-2xl bg-white dark:bg-card-dark border border-slate-200/70 dark:border-slate-800 p-6 shadow-softer hover:shadow-soft transition-all duration-300 hover:-translate-y-1 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <span className="font-display text-3xl font-extrabold text-primary-100 dark:text-primary-500/20">{step.num}</span>
              <div className="mt-2 mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1.5">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">Everything you need to settle up</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Built for the moment the bill arrives — fast, fair, and friendly on any device.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <FeatureCard key={f.title} {...f} style={{ animationDelay: `${idx * 80}ms` }} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 sm:px-12 py-12 sm:py-16 text-center shadow-glow">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-success-400/20 blur-3xl" />
          <h2 className="relative font-display font-bold text-2xl sm:text-3xl text-white">Ready to never overpay for someone else's pizza again?</h2>
          <p className="relative mt-3 text-primary-100 max-w-lg mx-auto">It takes less time than waiting for the card machine.</p>
          <div className="relative mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" variant="success" onClick={handleGetStarted}>
              Start splitting <ArrowRight className="h-4 w-4" />
            </Button>
            <Link to="/app" onClick={handleTryDemo} className="text-sm font-semibold text-white/90 hover:text-white underline-offset-4 hover:underline">
              or try the demo bill →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
