import React, { useRef, useState } from 'react'
import { UploadCloud, FileText, Image as ImageIcon, X, Sparkles, ScanLine } from 'lucide-react'
import Button from './Button.jsx'
import { useBill } from '../hooks/useBill.jsx'
import { useToast } from '../hooks/useToast.jsx'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']

export default function UploadReceipt({ onContinue }) {
  const { bill, setReceiptImage, simulateOcr, loadDemo } = useBill()
  const { showToast } = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = (files) => {
    const file = files?.[0]
    if (!file) return
    if (!ACCEPTED_TYPES.includes(file.type)) {
      showToast('Please upload a JPG, PNG, or PDF file', 'error')
      return
    }

    if (file.type === 'application/pdf') {
      setReceiptImage(null, file.name)
      showToast('PDF uploaded — ready to extract items', 'success')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setReceiptImage(reader.result, file.name)
      showToast('Receipt uploaded — ready to extract items', 'success')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleExtract = () => {
    setIsScanning(true)
    setTimeout(() => {
      simulateOcr()
      setIsScanning(false)
      showToast('Items extracted from your receipt', 'success')
      onContinue()
    }, 1100)
  }

  const handleDemo = () => {
    loadDemo()
    showToast('Demo bill loaded', 'info')
    onContinue()
  }

  const clearReceipt = () => setReceiptImage(null, null)

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Upload your receipt</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Drop in a photo or PDF of the bill. We'll pull out the line items for you.</p>
      </div>

      {!bill.receiptImage && !bill.receiptFileName ? (
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 sm:py-20 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 hover:border-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/5'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300">
            <UploadCloud className="h-7 w-7" />
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              <span className="text-primary-600 dark:text-primary-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-slate-400 mt-1">JPG, PNG, or PDF — up to 10MB</p>
          </div>
        </label>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark p-4 sm:p-6 shadow-softer animate-scale-in">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              {bill.receiptImage ? (
                <img
                  src={bill.receiptImage}
                  alt="Uploaded receipt preview"
                  className="h-28 w-24 sm:h-32 sm:w-28 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <div className="h-28 w-24 sm:h-32 sm:w-28 rounded-xl border border-slate-200 dark:border-slate-700 grid place-items-center bg-slate-50 dark:bg-slate-800 text-slate-400">
                  <FileText className="h-8 w-8" />
                </div>
              )}
              <button
                onClick={clearReceipt}
                aria-label="Remove uploaded receipt"
                className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 shadow-softer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                {bill.receiptImage ? <ImageIcon className="h-4 w-4 text-primary-500" /> : <FileText className="h-4 w-4 text-primary-500" />}
                <span className="truncate">{bill.receiptFileName || 'Receipt'}</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">Ready to scan. We'll simulate OCR to extract the items below.</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={handleExtract} disabled={isScanning} className="min-w-[160px]">
                  {isScanning ? (
                    <>
                      <ScanLine className="h-4 w-4 animate-pulse" /> Scanning…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Extract items
                    </>
                  )}
                </Button>
                <Button variant="secondary" onClick={() => inputRef.current?.click()}>
                  Replace file
                </Button>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="sr-only"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">or</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-dashed border-primary-200 dark:border-primary-500/30 bg-primary-50/60 dark:bg-primary-500/5 p-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">Don't have a receipt handy?</p>
          <p className="text-sm text-slate-400">Load a sample bill for The Garden Bistro with items, friends, and assignments already filled in.</p>
        </div>
        <Button variant="secondary" onClick={handleDemo} className="w-full sm:w-auto shrink-0">
          Try Demo
        </Button>
      </div>
    </div>
  )
}
