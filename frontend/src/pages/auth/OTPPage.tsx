import { useState, useRef } from 'react'
import { Zap, Mail } from 'lucide-react'
import { Button } from '../../components/ui'
import type { Page } from '../../App'

export default function OTPPage({ nav }: { nav: (p: Page) => void }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  const handleInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) refs[i + 1].current?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs[i - 1].current?.focus()
  }

  const filled = otp.every(d => d !== '')

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-lg border border-[#e2e8f0] p-10 w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="font-extrabold text-[#0f172a] text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quick<span className="text-[#2563eb]">Bolt</span></span>
        </div>

        <div className="w-16 h-16 bg-[#dbeafe] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-[#2563eb]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Verify your email</h1>
        <p className="text-[#64748b] text-sm mb-2">We sent a 6-digit code to</p>
        <p className="text-[#0f172a] font-semibold mb-8">john@example.com</p>

        {/* OTP inputs */}
        <div className="flex gap-3 justify-center mb-8">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              className={`w-12 h-14 rounded-xl border-2 text-center text-xl font-bold outline-none transition-all ${d ? 'border-[#2563eb] bg-[#eff6ff] text-[#1d4ed8]' : 'border-[#e2e8f0] text-[#0f172a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10'}`}
            />
          ))}
        </div>

        <Button size="lg" fullWidth disabled={!filled} onClick={() => nav('user-home')}>
          Verify Email
        </Button>

        <div className="mt-6 text-sm text-[#64748b]">
          Didn&apos;t receive the code?{' '}
          <button className="text-[#2563eb] font-semibold hover:underline">Resend in 0:48</button>
        </div>

        <button onClick={() => nav('register')} className="mt-4 text-sm text-[#94a3b8] hover:text-[#64748b] transition-colors">
          ← Back to registration
        </button>
      </div>
    </div>
  )
}
