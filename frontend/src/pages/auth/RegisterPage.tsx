import { useState} from 'react'
import { Mail, Lock, User, Eye, EyeOff, Zap, ChevronRight } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import type { Page } from '../../App'

export default function RegisterPage({ nav }: { nav: (p: Page) => void }) {
  const [show, setShow] = useState(false)
  const [role, setRole] = useState<'user' | 'owner'>('user')
  const [step, setStep] = useState(1)

  const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)


const handleRegister = async () => {
  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: role.toUpperCase(),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful!");
      nav("otp");
    } else {
      alert(data.message || "Registration Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to connect to server");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col w-[420px] shrink-0 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white p-12">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="font-extrabold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Quick<span className="text-[#60a5fa]">Bolt</span></span>
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Join 180K+<br />Athletes Today</h2>
          <p className="text-[#94a3b8] mb-10">Create your account and start booking your favourite sports venues instantly.</p>
          <div className="space-y-4">
            {['Find venues near you instantly', 'Book in under 60 seconds', 'Real-time availability', 'Secure payments & easy cancellations'].map(b => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm text-[#cbd5e1]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? 'bg-[#2563eb] text-white' : 'bg-[#e2e8f0] text-[#94a3b8]'}`}>{s}</div>
                {s === 1 && <div className={`h-0.5 w-16 transition-colors ${step >= 2 ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'}`} />}
              </div>
            ))}
            <span className="ml-2 text-xs text-[#94a3b8]">Step {step} of 2</span>
          </div>

          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {step === 1 ? 'Create account' : 'Choose your role'}
          </h1>
          <p className="text-[#64748b] mb-8">{step === 1 ? 'Start your QuickBolt journey today.' : 'How will you use QuickBolt?'}</p>

          {step === 1 ? (
            <div className="flex flex-col gap-5">
  
              <Input
  label="Full Name"
  placeholder="John Smith"
  icon={<User size={15} />}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<Input
  label="Email address"
  type="email"
  placeholder="john@example.com"
  icon={<Mail size={15} />}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Input
  label="Password"
  type={show ? 'text' : 'password'}
  placeholder="Create a strong password"
  icon={<Lock size={15} />}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  suffix={
    <button type="button" onClick={() => setShow(!show)}>
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  }
/>
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-0.5 rounded" />
                <p className="text-sm text-[#64748b]">I agree to the <a href="#" className="text-[#2563eb] font-semibold">Terms of Service</a> and <a href="#" className="text-[#2563eb] font-semibold">Privacy Policy</a></p>
              </div>
              <Button size="lg" fullWidth onClick={() => setStep(2)}>Continue <ChevronRight size={16} /></Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="grid gap-4">
                {[
                  { id: 'user' as const, label: 'Player / User', desc: 'Discover venues, book courts, join matches and manage your bookings.', icon: '🏃', color: 'blue' },
                  { id: 'owner' as const, label: 'Facility Owner', desc: 'List your sports facility, manage courts, time slots, and track revenue.', icon: '🏟️', color: 'orange' },
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all ${role === r.id ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-[#e2e8f0] bg-white hover:border-[#93c5fd]'}`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{r.icon}</span>
                      <div>
                        <p className={`font-bold text-base mb-1 ${role === r.id ? 'text-[#1d4ed8]' : 'text-[#0f172a]'}`}>{r.label}</p>
                        <p className="text-sm text-[#64748b]">{r.desc}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${role === r.id ? 'border-[#2563eb] bg-[#2563eb]' : 'border-[#e2e8f0]'}`}>
                        {role === r.id && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button size="lg" fullWidth onClick={handleRegister} disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
              <button onClick={() => setStep(1)} className="text-sm text-[#64748b] hover:text-[#0f172a] transition-colors">← Back</button>
            </div>
          )}

          <p className="text-center text-sm text-[#64748b] mt-6">
            Already have an account?{' '}
            <button onClick={() => nav('login')} className="text-[#2563eb] font-semibold hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  )
}
