import { useState } from 'react'
import { Lock, Eye, EyeOff, Zap, ShieldCheck } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import type { Page } from '../../App'

export default function ResetPasswordPage({ nav }: { nav: (p: Page) => void }) {
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [done, setDone] = useState(false)

  if (done) return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-lg border border-[#e2e8f0] p-10 w-full max-w-md text-center">
        <div className="w-20 h-20 bg-[#d1fae5] rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={36} className="text-[#10b981]" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0f172a] mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Password updated!</h2>
        <p className="text-[#64748b] mb-8">Your password has been reset successfully. You can now sign in with your new password.</p>
        <Button size="lg" fullWidth onClick={() => nav('login')}>Go to Sign In</Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-lg border border-[#e2e8f0] p-10 w-full max-w-md">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="font-extrabold text-[#0f172a] text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quick<span className="text-[#2563eb]">Bolt</span></span>
        </div>
        <div className="w-14 h-14 bg-[#dbeafe] rounded-2xl flex items-center justify-center mb-6">
          <Lock size={24} className="text-[#2563eb]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Set new password</h1>
        <p className="text-[#64748b] text-sm mb-8">Create a strong password for your account.</p>
        <div className="flex flex-col gap-5">
          <Input label="New Password" type={show1 ? 'text' : 'password'} placeholder="New password" icon={<Lock size={15} />} suffix={<button onClick={() => setShow1(!show1)}>{show1 ? <EyeOff size={15} /> : <Eye size={15} />}</button>} />
          <Input label="Confirm Password" type={show2 ? 'text' : 'password'} placeholder="Confirm new password" icon={<Lock size={15} />} suffix={<button onClick={() => setShow2(!show2)}>{show2 ? <EyeOff size={15} /> : <Eye size={15} />}</button>} />
          {/* Password strength */}
          <div>
            <p className="text-xs text-[#64748b] mb-2">Password strength</p>
            <div className="flex gap-1">
              {[1,2,3,4].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 3 ? 'bg-[#f97316]' : 'bg-[#e2e8f0]'}`} />)}
            </div>
            <p className="text-xs text-[#f97316] mt-1 font-medium">Good</p>
          </div>
          <Button size="lg" fullWidth onClick={() => setDone(true)}>Reset Password</Button>
          <button onClick={() => nav('login')} className="text-sm text-[#64748b] hover:text-[#0f172a] text-center">← Back to sign in</button>
        </div>
      </div>
    </div>
  )
}
