import { Zap, MapPin, Calendar, Star, ArrowRight, Play } from 'lucide-react'
import { Button } from '../../components/ui'
import type { Page } from '../../App'

export default function WelcomePage({ nav }: { nav: (p: Page) => void }) {
  const sports = ['⚽ Football', '🎾 Tennis', '🏀 Basketball', '🏸 Badminton', '🏊 Swimming', '🎱 Billiards']
  const stats = [
    { value: '2,400+', label: 'Venues' },
    { value: '180K+', label: 'Players' },
    { value: '50+ Cities', label: 'Nationwide' },
    { value: '4.9★', label: 'Rating' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-16 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center">
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="font-extrabold text-[#0f172a] text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Quick<span className="text-[#2563eb]">Bolt</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => nav('login')}>Sign In</Button>
          <Button variant="primary" onClick={() => nav('register')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-16 pb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-pulse" />
              100+ new venues this month
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-tight mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Book Sports<br />
              <span className="text-[#2563eb]">Venues</span> Near<br />
              You Instantly
            </h1>
            <p className="text-lg text-[#64748b] leading-relaxed mb-8 max-w-lg">
              Discover and book football courts, tennis courts, swimming pools and more. Find the perfect venue, pick a time, and play today.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" onClick={() => nav('user-home')}>
                <Play size={16} /> Explore Venues
              </Button>
              <Button size="lg" variant="outline" onClick={() => nav('register')}>
                List Your Venue <ArrowRight size={16} />
              </Button>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-extrabold text-[#0f172a]">{s.value}</p>
                  <p className="text-sm text-[#64748b]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Hero image */}
          <div className="relative hidden lg:block">
            <div className="w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&auto=format"
                alt="Sports venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/20 to-transparent" />
            </div>
            {/* Floating cards */}
            <div className="absolute -left-8 top-1/3 bg-white rounded-2xl p-4 shadow-xl border border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d1fae5] rounded-xl flex items-center justify-center text-[#10b981]"><Calendar size={18} /></div>
                <div>
                  <p className="font-bold text-sm text-[#0f172a]">Booking confirmed!</p>
                  <p className="text-xs text-[#64748b]">Tennis Court B · 6:00 PM</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 bottom-1/3 bg-white rounded-2xl p-4 shadow-xl border border-[#e2e8f0]">
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f97316" className="text-[#f97316]" />)}
              </div>
              <p className="font-semibold text-sm text-[#0f172a]">Arena Sports Complex</p>
              <p className="text-xs text-[#64748b] flex items-center gap-1 mt-0.5"><MapPin size={10} /> Manhattan, NY</p>
            </div>
          </div>
        </div>

        {/* Sports pills */}
        <div className="bg-[#f8fafc] border-y border-[#e2e8f0] px-6 lg:px-16 py-5">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold text-[#64748b] mr-2">Popular Sports:</span>
            {sports.map(s => (
              <button key={s} className="bg-white border border-[#e2e8f0] hover:border-[#2563eb] hover:text-[#2563eb] text-[#334155] text-sm px-4 py-2 rounded-full font-medium transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-[#0f172a] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>How QuickBolt Works</h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">Booking a sports venue has never been easier. Three simple steps to get on the court.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '🔍', step: '01', title: 'Discover Venues', desc: 'Search thousands of verified sports venues near your location filtered by sport, price, and availability.' },
            { icon: '📅', step: '02', title: 'Pick a Slot', desc: 'Choose your preferred date, time slot, and court. See real-time availability and instant pricing.' },
            { icon: '⚡', step: '03', title: 'Play Instantly', desc: 'Confirm your booking in seconds with secure payment. Get your confirmation and head to the venue.' },
          ].map(f => (
            <div key={f.step} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{f.icon}</div>
              <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">{f.step}</span>
              <h3 className="text-xl font-bold text-[#0f172a] mt-2 mb-3">{f.title}</h3>
              <p className="text-[#64748b] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2563eb] mx-6 lg:mx-16 rounded-3xl py-16 px-8 mb-20 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Ready to Play?</h2>
        <p className="text-[#93c5fd] text-lg mb-8 max-w-md mx-auto">Join 180,000+ players already booking their favourite sports venues on QuickBolt.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="accent" onClick={() => nav('register')}>Create Free Account</Button>
          <button onClick={() => nav('login')} className="text-white border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl text-base font-semibold transition-colors">
            Sign In
          </button>
        </div>
      </section>
    </div>
  )
}
