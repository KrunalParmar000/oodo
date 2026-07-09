import { useState } from 'react'
import { MapPin, Star, Clock, ChevronLeft, Heart, Share2, Wifi, ParkingCircle, Droplets, Coffee, Shield, Zap as ZapIcon } from 'lucide-react'
import { Button, Badge } from '../../components/ui'
import UserNavbar from '../../components/layout/UserNavbar'
import Footer from '../../components/layout/Footer'
import type { Page } from '../../App'

const images = [
  'photo-1554068865-24cecd4e34b8',
  'photo-1546519638-68e109498ffc',
  'photo-1529900748604-07564a03e7a6',
  'photo-1530549387789-4c1017266635',
  'photo-1547347298-4074fc3086f0',
]

const reviews = [
  { name: 'Michael Torres', avatar: 'MT', rating: 5, date: 'Jul 2, 2025', text: 'Excellent facility! The courts are well-maintained and the staff is super friendly. Booked via QuickBolt and it was seamless.' },
  { name: 'Priya Sharma', avatar: 'PS', rating: 5, date: 'Jun 28, 2025', text: 'Best tennis courts in Manhattan. Clean, spacious, with great lighting for evening sessions. Highly recommend!' },
  { name: 'Jake Williams', avatar: 'JW', rating: 4, date: 'Jun 15, 2025', text: 'Good courts and fair pricing. Parking is a bit limited but overall a great place to play. Will be back!' },
]

const amenities = [
  { icon: <Wifi size={16} />, label: 'Free Wi-Fi' },
  { icon: <ParkingCircle size={16} />, label: 'Parking' },
  { icon: <Droplets size={16} />, label: 'Showers' },
  { icon: <Coffee size={16} />, label: 'Cafeteria' },
  { icon: <Shield size={16} />, label: 'Security' },
  { icon: <ZapIcon size={16} />, label: 'Floodlights' },
]

const hours = [
  { day: 'Mon–Fri', open: '6:00 AM', close: '11:00 PM' },
  { day: 'Saturday', open: '7:00 AM', close: '10:00 PM' },
  { day: 'Sunday', open: '8:00 AM', close: '9:00 PM' },
]

export default function VenueDetailPage({ nav }: { nav: (p: Page) => void }) {
  const [activeImg, setActiveImg] = useState(0)
  const [liked, setLiked] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <UserNavbar nav={nav} current="user-venues" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#64748b] mb-5">
          <button onClick={() => nav('user-venues')} className="flex items-center gap-1 hover:text-[#2563eb] transition-colors"><ChevronLeft size={14} /> Venues</button>
          <span>/</span>
          <span className="text-[#0f172a] font-medium">Arena Sports Complex</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden mb-4">
              <img src={`https://images.unsplash.com/${images[activeImg]}?w=900&h=500&fit=crop&auto=format`} alt="Venue" className="w-full h-72 sm:h-96 object-cover" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#2563eb]' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <img src={`https://images.unsplash.com/${img}?w=100&h=80&fit=crop&auto=format`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Venue info */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <Badge variant="blue">Tennis</Badge>
                    <Badge variant="blue">Badminton</Badge>
                    <Badge variant="green">Open Now</Badge>
                  </div>
                  <h1 className="text-2xl font-extrabold text-[#0f172a]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Arena Sports Complex</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#f97316" className="text-[#f97316]" />)}
                      <span className="font-bold text-sm ml-1">4.9</span>
                      <span className="text-sm text-[#94a3b8]">(312 reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#64748b] mt-2">
                    <MapPin size={14} className="text-[#2563eb]" />
                    <span>123 Sports Ave, Manhattan, New York, NY 10001</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLiked(!liked)} className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${liked ? 'bg-red-50 border-red-200 text-red-500' : 'border-[#e2e8f0] text-[#64748b] hover:bg-[#f8fafc]'}`}>
                    <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                  </button>
                  <button className="w-9 h-9 rounded-xl border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:bg-[#f8fafc]"><Share2 size={16} /></button>
                </div>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed">
                Arena Sports Complex is Manhattan's premier multi-sport facility, offering world-class tennis and badminton courts with professional-grade flooring. Equipped with modern changing rooms, a cafeteria, and secure parking — we cater to players of all skill levels, from casual to competitive.
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-5">
              <h2 className="text-lg font-bold text-[#0f172a] mb-4">Amenities</h2>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {amenities.map(a => (
                  <div key={a.label} className="flex flex-col items-center gap-2 p-3 bg-[#f8fafc] rounded-xl">
                    <span className="text-[#2563eb]">{a.icon}</span>
                    <span className="text-xs font-medium text-[#334155] text-center">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-5">
              <h2 className="text-lg font-bold text-[#0f172a] mb-4">Opening Hours</h2>
              <div className="flex flex-col gap-2">
                {hours.map(h => (
                  <div key={h.day} className="flex items-center justify-between py-2 border-b border-[#f1f5f9] last:border-0">
                    <span className="text-sm font-medium text-[#334155]">{h.day}</span>
                    <div className="flex items-center gap-1.5 text-sm text-[#64748b]">
                      <Clock size={13} />
                      <span>{h.open} – {h.close}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0f172a]">Reviews</h2>
                <div className="flex items-center gap-2 bg-[#f8fafc] px-3 py-1.5 rounded-xl">
                  <Star size={14} fill="#f97316" className="text-[#f97316]" />
                  <span className="font-extrabold text-[#0f172a]">4.9</span>
                  <span className="text-sm text-[#94a3b8]">/ 5.0</span>
                </div>
              </div>
              {/* Rating bars */}
              <div className="flex flex-col gap-2 mb-6">
                {[5, 4, 3, 2, 1].map(r => (
                  <div key={r} className="flex items-center gap-3">
                    <span className="text-xs text-[#64748b] w-4 text-right">{r}</span>
                    <Star size={11} fill="#f97316" className="text-[#f97316] shrink-0" />
                    <div className="flex-1 h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#f97316] rounded-full" style={{ width: r === 5 ? '78%' : r === 4 ? '15%' : r === 3 ? '5%' : '1%' }} />
                    </div>
                    <span className="text-xs text-[#94a3b8] w-8">{r === 5 ? '78%' : r === 4 ? '15%' : r === 3 ? '5%' : '1%'}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                {reviews.map(r => (
                  <div key={r.name} className="border-b border-[#f1f5f9] pb-5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#2563eb] text-sm font-bold flex items-center justify-center">{r.avatar}</div>
                        <div>
                          <p className="font-semibold text-sm text-[#0f172a]">{r.name}</p>
                          <p className="text-xs text-[#94a3b8]">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="#f97316" className="text-[#f97316]" />)}
                      </div>
                    </div>
                    <p className="text-sm text-[#64748b] leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sticky top-20">
              <div className="mb-4 pb-4 border-b border-[#f1f5f9]">
                <p className="text-xs text-[#94a3b8] mb-1">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#0f172a]">$25</span>
                  <span className="text-[#94a3b8] text-sm">/hour</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">Available Courts</p>
                  {['Court A (Tennis)', 'Court B (Tennis)', 'Court C (Badminton)'].map(c => (
                    <div key={c} className="flex items-center justify-between py-2 border-b border-[#f8fafc] last:border-0">
                      <span className="text-sm text-[#334155]">{c}</span>
                      <Badge variant="green">Available</Badge>
                    </div>
                  ))}
                </div>
                <Button size="lg" fullWidth variant="accent" onClick={() => nav('user-booking')}>Book a Court</Button>
                <button className="text-sm text-[#64748b] text-center hover:text-[#0f172a]">View availability calendar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
