import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { BillProvider } from './hooks/useBill.jsx'
import { ToastProvider } from './hooks/useToast.jsx'
import Landing from './pages/Landing.jsx'
import AppFlow from './pages/AppFlow.jsx'

export default function App() {
  return (
    <ToastProvider>
      <BillProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<AppFlow />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </HashRouter>
      </BillProvider>
    </ToastProvider>
  )
}
