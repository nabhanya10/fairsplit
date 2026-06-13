import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import StepIndicator from '../components/StepIndicator.jsx'
import UploadReceipt from '../components/UploadReceipt.jsx'
import ReviewItems from '../components/ReviewItems.jsx'
import AddFriends from '../components/AddFriends.jsx'
import AssignItems from '../components/AssignItems.jsx'
import ResultsSummary from '../components/ResultsSummary.jsx'
import { useTheme } from '../hooks/useTheme.js'
import { useBill } from '../hooks/useBill.jsx'
import { useToast } from '../hooks/useToast.jsx'
import { getTotal } from '../utils/calculations.js'

const TOTAL_STEPS = 5

export default function AppFlow() {
  const [theme, toggleTheme] = useTheme()
  const { bill, setStep, resetBill } = useBill()
  const { showToast } = useToast()

  // currentStep drives what's shown; bill.step tracks the furthest step reached (persisted)
  const [currentStep, setCurrentStep] = useState(() => Math.min(Math.max(bill.step || 1, 1), TOTAL_STEPS))
  const maxReached = Math.max(bill.step || 1, currentStep)

  const canProceed = () => {
    if (currentStep === 2 && bill.items.length === 0) {
      showToast('Add at least one item before continuing', 'error')
      return false
    }
    if (currentStep === 3 && bill.friends.length === 0) {
      showToast('Add at least one friend before continuing', 'error')
      return false
    }
    return true
  }

  const goTo = (step) => {
    const clamped = Math.min(Math.max(step, 1), TOTAL_STEPS)
    setCurrentStep(clamped)
    if (clamped > (bill.step || 1)) setStep(clamped)
  }

  const handleNext = () => {
    if (!canProceed()) return
    goTo(currentStep + 1)
  }

  const handleBack = () => goTo(currentStep - 1)

  const handleStepClick = (step) => goTo(step)

  const handleReset = () => {
    if (window.confirm('Reset this bill? This clears items, friends, and assignments.')) {
      resetBill()
      setCurrentStep(1)
      showToast('Bill reset', 'info')
    }
  }

  const total = getTotal(bill.items)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        rightSlot={
          <button
            onClick={handleReset}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        }
      />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <StepIndicator current={currentStep} onStepClick={handleStepClick} maxReached={maxReached} />

        <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/60 dark:bg-card-dark/60 backdrop-blur p-4 sm:p-8 shadow-soft min-h-[420px]">
          {currentStep === 1 && <UploadReceipt onContinue={() => goTo(2)} />}
          {currentStep === 2 && <ReviewItems />}
          {currentStep === 3 && <AddFriends />}
          {currentStep === 4 && <AssignItems />}
          {currentStep === 5 && <ResultsSummary />}
        </div>

        {/* Nav controls */}
        {currentStep < 5 && (
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            <div className="text-sm text-slate-400 font-mono hidden sm:block">
              {bill.items.length > 0 && `Bill total: ₹${total.toLocaleString('en-IN')}`}
            </div>

            <Button onClick={handleNext}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="mt-6">
            <Button variant="secondary" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" /> Back to assigning
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
