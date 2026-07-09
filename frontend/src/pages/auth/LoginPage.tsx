import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Zap } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import type { Page } from '../../App'

export default function LoginPage({ nav }: { nav: (p: Page) => void }) {
  const [show, setShow] = useState(false)
  const [role, setRole] = useState<'user' | 'owner' | 'admin'>('user')

  const roles = [
    { id: 'user' as const, label: 'Player', emoji: '🏃' },
    { id: 'owner' as const, label: 'Owner', emoji: '🏟️' },
    { id: 'admin' as const, label: 'Admin', emoji: '⚙️' },
  ]

  const handleLogin = () => {
    if (role === 'owner') nav('owner-dashboard')
    else if (role === 'admin') nav('admin-dashboard')
    else nav('user-home')
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-[480px] shrink-0 bg-[#0f172a] text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e293b] to-[#0f172a]" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-16">
            <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center">
              <Zap size={18} fill="white" className="text-white" />
            </div>
            <span className="font-extrabold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quick<span className="text-[#60a5fa]">Bolt</span></span>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold mb-5 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Your Game.<br />Your Schedule.<br />Your Venue.
            </h2>
            <p className="text-[#94a3b8] leading-relaxed">
              Book sports venues near you in seconds. Real-time availability, instant confirmation.
            </p>
          </div>
          {/* Testimonial */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex gap-0.5 mb-3">
              {[1,2,3,4,5].map(i => <span key={i} className="text-[#f97316]">★</span>)}
            </div>
            <p className="text-sm text-[#cbd5e1] mb-3 leading-relaxed">"QuickBolt made it so easy to find and book a tennis court last minute. Confirmed in under a minute!"</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center text-xs font-bold">SJ</div>
              <div>
                <p className="text-sm font-semibold">Sarah Johnson</p>
                <p className="text-xs text-[#64748b]">Tennis enthusiast, NYC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <Zap size={15} fill="white" className="text-white" />
            </div>
            <span className="font-extrabold text-[#0f172a] text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quick<span className="text-[#2563eb]">Bolt</span></span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Welcome back</h1>
          <p className="text-[#64748b] mb-8">Sign in to your QuickBolt account</p>

          {/* Role selector */}
          <div className="flex gap-2 mb-8">
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-semibold border-2 transition-all ${role === r.id ? 'border-[#2563eb] bg-[#dbeafe] text-[#1d4ed8]' : 'border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#93c5fd]'}`}
              >
                <span className="text-lg">{r.emoji}</span>
                {r.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <Input label="Email address" type="email" placeholder="you@example.com" icon={<Mail size={15} />} />
            <Input label="Password" type={show ? 'text' : 'password'} placeholder="Enter your password" icon={<Lock size={15} />} suffix={
              <button onClick={() => setShow(!show)}>{show ? <EyeOff size={15} /> : <Eye size={15} />}</button>
            } />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#64748b] cursor-pointer">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <button onClick={() => nav('forgot')} className="text-sm text-[#2563eb] font-semibold hover:underline">Forgot password?</button>
            </div>
            <Button size="lg" fullWidth onClick={handleLogin}>Sign In</Button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-[#e2e8f0]" />
              <span className="text-xs text-[#94a3b8]">or continue with</span>
              <div className="flex-1 h-px bg-[#e2e8f0]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Google', icon: '🔍' }, { label: 'Apple', icon: '🍎' }].map(p => (
                <button key={p.label} className="flex items-center justify-center gap-2 py-2.5 border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#334155] hover:bg-[#f8fafc] transition-colors">
                  <span>{p.icon}</span> {p.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-[#64748b] mt-6">
            Don&apos;t have an account?{' '}
            <button onClick={() => nav('register')} className="text-[#2563eb] font-semibold hover:underline">Create one</button>
          </p>
        </div>
      </div>
    </div>
  )
}
