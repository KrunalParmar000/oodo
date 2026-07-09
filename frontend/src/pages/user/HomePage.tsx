import { Search, MapPin, Star, ArrowRight, Zap, TrendingUp, Calendar, Users } from 'lucide-react'
import { Button, Badge } from '../../components/ui'
import UserNavbar from '../../components/layout/UserNavbar'
import Footer from '../../components/layout/Footer'
import type { Page } from '../../App'

const venues = [
  { id: 1, name: 'Arena Sports Complex', sport: 'Tennis & Badminton', price: 25, address: 'Manhattan, NY', rating: 4.9, reviews: 312, img: 'photo-1554068865-24cecd4e34b8' },
  { id: 2, name: 'Downtown Basketball Hub', sport: 'Basketball', price: 30, address: 'Brooklyn, NY', rating: 4.8, reviews: 208, img: 'photo-1546519638-68e109498ffc' },
  { id: 3, name: 'GreenPark Football Fields', sport: 'Football', price: 45, address: 'Queens, NY', rating: 4.7, reviews: 435, img: 'photo-1529900748604-07564a03e7a6' },
  { id: 4, name: 'AquaLife Swim Center', sport: 'Swimming', price: 20, address: 'Bronx, NY', rating: 4.9, reviews: 189, img: 'photo-1530549387789-4c1017266635' },
]

const sports = [
  { icon: '⚽', label: 'Football', count: 124 },
  { icon: '🎾', label: 'Tennis', count: 89 },
  { icon: '🏀', label: 'Basketball', count: 67 },
  { icon: '🏸', label: 'Badminton', count: 98 },
  { icon: '🏊', label: 'Swimming', count: 43 },
  { icon: '🏐', label: 'Volleyball', count: 55 },
  { icon: '🥊', label: 'Boxing', count: 32 },
  { icon: '🎱', label: 'Billiards', count: 28 },
]

const events = [
  { title: 'Sunday Tennis League', sport: 'Tennis', date: 'Jul 13', time: '8:00 AM', players: '12/16', venue: 'Arena Sports Complex', img: 'photo-1545809074-59472b3f5ecc' },
  { title: 'Friday Night Basketball', sport: 'Basketball', date: 'Jul 11', time: '7:00 PM', players: '8/10', venue: 'Downtown Basketball Hub', img: 'photo-1504450758481-7338eba7524a' },
  { title: '5-a-side Football Cup', sport: 'Football', date: 'Jul 15', time: '10:00 AM', players: '18/20', venue: 'GreenPark Fields', img: 'photo-1431324155629-1a6deb1dec8d' },
]

export default function HomePage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-white">
      <UserNavbar nav={nav} current="user-home" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#1d4ed8] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp size={14} /> 2,400+ verified venues across 50+ cities
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Find & Book Sports Venues<br />
            <span className="text-[#93c5fd]">Near You Today</span>
          </h1>
          <p className="text-[#bfdbfe] text-lg mb-10 max-w-2xl mx-auto">
            From football fields to tennis courts — discover available slots, compare prices, and book instantly.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-xl">
            <div className="flex items-center gap-2 flex-1 px-4 py-2">
              <Search size={16} className="text-[#94a3b8] shrink-0" />
              <input className="flex-1 outline-none text-[#0f172a] text-sm placeholder-[#94a3b8]" placeholder="Search venue, sport, or location..." />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border-l border-[#e2e8f0]">
              <MapPin size={16} className="text-[#2563eb] shrink-0" />
              <input className="w-28 outline-none text-[#0f172a] text-sm placeholder-[#94a3b8]" placeholder="New York" />
            </div>
            <Button variant="accent" size="md" onClick={() => nav('user-venues')}>
              <Search size={15} /> Search
            </Button>
          </div>
        </div>
      </section>

      {/* Sports categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-[#0f172a]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Browse by Sport</h2>
            <button onClick={() => nav('user-venues')} className="text-sm text-[#2563eb] font-semibold flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight size={14} /></button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {sports.map(s => (
              <button key={s.label} onClick={() => nav('user-venues')} className="flex flex-col items-center gap-2 p-4 bg-[#f8fafc] hover:bg-[#dbeafe] rounded-2xl transition-all hover:shadow-sm group">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-semibold text-[#334155] group-hover:text-[#2563eb] transition-colors">{s.label}</span>
                <span className="text-[10px] text-[#94a3b8]">{s.count} venues</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Venues */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Popular Venues</h2>
              <p className="text-sm text-[#64748b] mt-1">Top-rated venues near you</p>
            </div>
            <button onClick={() => nav('user-venues')} className="text-sm text-[#2563eb] font-semibold flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight size={14} /></button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map(v => (
              <div key={v.id} className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:shadow-md transition-shadow group cursor-pointer" onClick={() => nav('user-venue-detail')}>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${v.img}?w=400&h=200&fit=crop&auto=format`}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="blue">⭐ {v.rating}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="green">Available</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#64748b] mb-1">{v.sport}</p>
                  <h3 className="font-bold text-[#0f172a] mb-2 leading-tight">{v.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#94a3b8] mb-3">
                    <MapPin size={11} /> {v.address}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-extrabold text-[#0f172a]">${v.price}</span>
                      <span className="text-xs text-[#94a3b8]">/hr</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); nav('user-booking') }} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0f172a]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Featured Events</h2>
              <p className="text-sm text-[#64748b] mt-1">Join matches happening near you</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map(e => (
              <div key={e.title} className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-36 overflow-hidden relative">
                  <img src={`https://images.unsplash.com/${e.img}?w=400&h=180&fit=crop&auto=format`} alt={e.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="orange">{e.sport}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#0f172a] mb-3">{e.title}</h3>
                  <div className="flex flex-col gap-1.5 text-xs text-[#64748b]">
                    <span className="flex items-center gap-2"><Calendar size={11} /> {e.date} · {e.time}</span>
                    <span className="flex items-center gap-2"><Users size={11} /> {e.players} players joined</span>
                    <span className="flex items-center gap-2"><MapPin size={11} /> {e.venue}</span>
                  </div>
                  <Button variant="outline" size="sm" fullWidth className="mt-4">Join Match</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Zap size={20} />, val: '2,400+', label: 'Venues Listed' },
            { icon: <Users size={20} />, val: '180K+', label: 'Active Players' },
            { icon: <Calendar size={20} />, val: '1.2M+', label: 'Bookings Made' },
            { icon: <Star size={20} />, val: '4.9/5', label: 'Average Rating' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#1e293b] rounded-2xl flex items-center justify-center text-[#60a5fa]">{s.icon}</div>
              <p className="text-3xl font-extrabold text-white">{s.val}</p>
              <p className="text-sm text-[#64748b]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Own a Sports Facility?</h2>
          <p className="text-[#64748b] mb-8">List your venue on QuickBolt and reach thousands of players looking to book. Simple setup, powerful management tools.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="accent" onClick={() => nav('register')}>List Your Venue</Button>
            <Button size="lg" variant="outline" onClick={() => nav('login')}>Learn More</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
