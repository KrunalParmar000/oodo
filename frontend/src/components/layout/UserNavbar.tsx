import { useState } from 'react'
import { Search, Bell, Menu, X, Zap, MapPin } from 'lucide-react'
import { Avatar } from '../ui'
import type { Page } from '../../App'

export default function UserNavbar({ nav, current }: { nav: (p: Page) => void; current: Page }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links: { p: Page; l: string }[] = [
    { p: 'user-home', l: 'Home' },
    { p: 'user-venues', l: 'Venues' },
    { p: 'user-bookings', l: 'My Bookings' },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => nav('user-home')} className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-extrabold text-[#0f172a] text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Quick<span className="text-[#2563eb]">Bolt</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l.p}
              onClick={() => nav(l.p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${current === l.p ? 'bg-[#dbeafe] text-[#2563eb]' : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]'}`}
            >
              {l.l}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="hidden lg:flex items-center gap-2 flex-1 max-w-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2">
          <Search size={14} className="text-[#94a3b8] shrink-0" />
          <input placeholder="Search venues..." className="bg-transparent text-sm outline-none w-full placeholder-[#94a3b8]" />
        </div>

        {/* Location */}
        <div className="hidden md:flex items-center gap-1.5 text-sm text-[#64748b]">
          <MapPin size={14} className="text-[#2563eb]" />
          <span>New York</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f1f5f9] transition-colors text-[#64748b]">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f97316] rounded-full" />
          </button>
          <button onClick={() => nav('user-profile')}>
            <Avatar name="Alex Johnson" size="sm" />
          </button>
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f1f5f9]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#e2e8f0] bg-white px-4 py-3 flex flex-col gap-1">
          {links.map(l => (
            <button key={l.p} onClick={() => { nav(l.p); setMenuOpen(false) }} className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium ${current === l.p ? 'bg-[#dbeafe] text-[#2563eb]' : 'text-[#64748b]'}`}>
              {l.l}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
