import { Mail, Zap } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import type { Page } from '../../App'

export default function ForgotPasswordPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-lg border border-[#e2e8f0] p-10 w-full max-w-md">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="font-extrabold text-[#0f172a] text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quick<span className="text-[#2563eb]">Bolt</span></span>
        </div>

        <div className="w-14 h-14 bg-[#ffedd5] rounded-2xl flex items-center justify-center mb-6">
          <Mail size={24} className="text-[#f97316]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Forgot password?</h1>
        <p className="text-[#64748b] text-sm mb-8">No worries! Enter your email and we'll send you a reset link.</p>

        <div className="flex flex-col gap-5">
          <Input label="Email address" type="email" placeholder="you@example.com" icon={<Mail size={15} />} />
          <Button size="lg" fullWidth onClick={() => nav('reset')}>Send Reset Link</Button>
          <button onClick={() => nav('login')} className="text-sm text-[#64748b] hover:text-[#0f172a] text-center transition-colors">← Back to sign in</button>
        </div>
      </div>
    </div>
  )
}
