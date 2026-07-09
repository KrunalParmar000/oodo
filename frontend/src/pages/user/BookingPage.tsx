import { useState } from 'react'
import { ChevronLeft, ChevronRight, CreditCard, Lock } from 'lucide-react'
import { Button, Badge } from '../../components/ui'
import UserNavbar from '../../components/layout/UserNavbar'
import type { Page } from '../../App'

const timeSlots = [
  { time: '6:00 AM', available: true }, { time: '7:00 AM', available: true }, { time: '8:00 AM', available: false },
  { time: '9:00 AM', available: false }, { time: '10:00 AM', available: true }, { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true }, { time: '1:00 PM', available: false }, { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true }, { time: '4:00 PM', available: false }, { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: true }, { time: '7:00 PM', available: true }, { time: '8:00 PM', available: false },
  { time: '9:00 PM', available: true },
]

const courts = [
  { id: 1, name: 'Court A', sport: 'Tennis', price: 25 },
  { id: 2, name: 'Court B', sport: 'Tennis', price: 30 },
  { id: 3, name: 'Court C', sport: 'Badminton', price: 22 },
]

const getDays = (year: number, month: number) => {
  const first = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  return { first, days }
}

export default function BookingPage({ nav }: { nav: (p: Page) => void }) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState(today.getDate())
  const [selectedSlot, setSelectedSlot] = useState<string | null>('6:00 PM')
  const [selectedCourt, setSelectedCourt] = useState(1)
  const [duration, setDuration] = useState(1)

  const { first, days } = getDays(year, month)
  const court = courts.find(c => c.id === selectedCourt)!
  const subtotal = court.price * duration
  const fee = 2
  const total = subtotal + fee

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <UserNavbar nav={nav} current="user-venues" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button onClick={() => nav('user-venue-detail')} className="flex items-center gap-1 text-sm text-[#64748b] hover:text-[#0f172a] mb-6">
          <ChevronLeft size={14} /> Back to Venue
        </button>

        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Book a Court</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Court selection */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-base font-bold text-[#0f172a] mb-4">1. Select Court</h2>
              <div className="flex flex-col gap-3">
                {courts.map(c => (
                  <label key={c.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCourt === c.id ? 'border-[#2563eb] bg-[#eff6ff]' : 'border-[#e2e8f0] hover:border-[#93c5fd]'}`}>
                    <input type="radio" checked={selectedCourt === c.id} onChange={() => setSelectedCourt(c.id)} className="accent-[#2563eb]" />
                    <div className="flex-1">
                      <p className={`font-semibold ${selectedCourt === c.id ? 'text-[#1d4ed8]' : 'text-[#0f172a]'}`}>{c.name}</p>
                      <p className="text-sm text-[#64748b]">{c.sport}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#0f172a]">${c.price}</span>
                      <span className="text-xs text-[#94a3b8]">/hr</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date picker */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-base font-bold text-[#0f172a] mb-4">2. Select Date</h2>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }} className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]"><ChevronLeft size={14} /></button>
                <span className="font-bold text-[#0f172a]">{monthNames[month]} {year}</span>
                <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }} className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]"><ChevronRight size={14} /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-center text-xs font-semibold text-[#94a3b8] py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: first }, (_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: days }, (_, i) => {
                  const d = i + 1
                  const isPast = year === today.getFullYear() && month === today.getMonth() && d < today.getDate()
                  const isSelected = d === selectedDate
                  return (
                    <button key={d} disabled={isPast} onClick={() => setSelectedDate(d)}
                      className={`w-full aspect-square rounded-xl text-sm font-medium transition-all ${isSelected ? 'bg-[#2563eb] text-white' : isPast ? 'text-[#d1d5db] cursor-not-allowed' : 'hover:bg-[#dbeafe] text-[#334155]'}`}>
                      {d}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-base font-bold text-[#0f172a] mb-4">3. Select Time Slot</h2>
              <div className="flex gap-3 mb-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#2563eb]" /> Selected</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#f8fafc] border border-[#e2e8f0]" /> Available</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#f1f5f9]" /> Booked</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(s => (
                  <button key={s.time} disabled={!s.available} onClick={() => setSelectedSlot(s.time)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${selectedSlot === s.time ? 'bg-[#2563eb] text-white border-[#2563eb]' : s.available ? 'bg-white border-[#e2e8f0] text-[#334155] hover:border-[#2563eb]' : 'bg-[#f8fafc] border-[#f1f5f9] text-[#d1d5db] cursor-not-allowed'}`}>
                    {s.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="text-base font-bold text-[#0f172a] mb-4">4. Duration</h2>
              <div className="flex gap-3">
                {[1, 1.5, 2, 3].map(d => (
                  <button key={d} onClick={() => setDuration(d)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${duration === d ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#334155] hover:border-[#2563eb]'}`}>
                    {d}h
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sticky top-20">
              <h2 className="text-base font-bold text-[#0f172a] mb-5">Booking Summary</h2>
              <div className="bg-[#f8fafc] rounded-xl p-4 mb-5">
                <img src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=120&fit=crop&auto=format" alt="Venue" className="w-full h-24 object-cover rounded-lg mb-3" />
                <p className="font-bold text-sm text-[#0f172a]">Arena Sports Complex</p>
                <p className="text-xs text-[#64748b]">Manhattan, NY</p>
              </div>
              <div className="flex flex-col gap-3 text-sm mb-5">
                {[
                  { l: 'Court', v: court.name },
                  { l: 'Sport', v: court.sport },
                  { l: 'Date', v: `${monthNames[month]} ${selectedDate}, ${year}` },
                  { l: 'Time', v: selectedSlot || '-' },
                  { l: 'Duration', v: `${duration} hour${duration > 1 ? 's' : ''}` },
                ].map(i => (
                  <div key={i.l} className="flex justify-between">
                    <span className="text-[#64748b]">{i.l}</span>
                    <span className="font-semibold text-[#0f172a]">{i.v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#f1f5f9] pt-4 mb-5">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-[#64748b]"><span>Subtotal ({duration}hr × ${court.price})</span><span>${subtotal}</span></div>
                  <div className="flex justify-between text-[#64748b]"><span>Platform fee</span><span>${fee}</span></div>
                  <div className="flex justify-between text-base font-extrabold text-[#0f172a] pt-2 border-t border-[#f1f5f9]"><span>Total</span><span>${total}</span></div>
                </div>
              </div>
              <Button size="lg" fullWidth variant="accent" onClick={() => nav('user-booking-success')}>
                <CreditCard size={16} /> Confirm & Pay ${total}
              </Button>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#94a3b8]">
                <Lock size={11} /> Secure payment via Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
