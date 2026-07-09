import { useState } from 'react'
import { Camera, User, Mail, Phone, Lock, Bell, LogOut, ChevronRight, Shield } from 'lucide-react'
import { Button, Input, Badge } from '../../components/ui'
import UserNavbar from '../../components/layout/UserNavbar'
import type { Page } from '../../App'

export default function UserProfilePage({ nav }: { nav: (p: Page) => void }) {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    { id: 'profile', label: 'Profile Info', icon: <User size={16} /> },
    { id: 'password', label: 'Change Password', icon: <Lock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'bookings', label: 'Booking History', icon: <ChevronRight size={16} /> },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <UserNavbar nav={nav} current="user-profile" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-extrabold text-[#0f172a] mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Profile</h1>

        {/* Profile header card */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[#dbeafe] flex items-center justify-center text-2xl font-extrabold text-[#2563eb]">AJ</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2563eb] rounded-full flex items-center justify-center shadow-md">
                <Camera size={12} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-[#0f172a]">Alex Johnson</h2>
                <Badge variant="blue">Player</Badge>
                <Badge variant="green">Verified</Badge>
              </div>
              <p className="text-sm text-[#64748b]">alex.johnson@email.com</p>
              <p className="text-xs text-[#94a3b8] mt-1">Member since January 2024 · 23 bookings</p>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-center">
              {[{ v: '23', l: 'Bookings' }, { v: '5', l: 'Sports' }, { v: '4.9★', l: 'Rating' }].map(s => (
                <div key={s.l} className="px-4">
                  <p className="text-lg font-extrabold text-[#0f172a]">{s.v}</p>
                  <p className="text-xs text-[#64748b]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar nav */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-3 h-fit">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${activeSection === s.id ? 'bg-[#dbeafe] text-[#2563eb]' : 'text-[#64748b] hover:bg-[#f8fafc]'}`}>
                <span className={activeSection === s.id ? 'text-[#2563eb]' : 'text-[#94a3b8]'}>{s.icon}</span>
                {s.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-[#f1f5f9]">
              <button onClick={() => nav('welcome')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            {activeSection === 'profile' && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <h3 className="text-lg font-bold text-[#0f172a] mb-5">Profile Information</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <Input label="Full Name" defaultValue="Alex Johnson" icon={<User size={15} />} />
                  <Input label="Email" type="email" defaultValue="alex.johnson@email.com" icon={<Mail size={15} />} />
                  <Input label="Phone" type="tel" defaultValue="+1 (555) 234-5678" icon={<Phone size={15} />} />
                  <Input label="City" defaultValue="New York, NY" />
                </div>
                <div className="mb-5">
                  <label className="text-sm font-medium text-[#374151] block mb-1.5">Favourite Sports</label>
                  <div className="flex flex-wrap gap-2">
                    {['⚽ Football', '🎾 Tennis', '🏀 Basketball'].map(s => (
                      <span key={s} className="bg-[#dbeafe] text-[#1d4ed8] text-xs font-semibold px-3 py-1.5 rounded-full">{s}</span>
                    ))}
                    <button className="text-xs text-[#2563eb] font-semibold hover:underline">+ Add sport</button>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </div>
            )}

            {activeSection === 'password' && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <h3 className="text-lg font-bold text-[#0f172a] mb-5">Change Password</h3>
                <div className="flex flex-col gap-4">
                  <Input label="Current Password" type="password" placeholder="Enter current password" icon={<Lock size={15} />} />
                  <Input label="New Password" type="password" placeholder="Enter new password" icon={<Lock size={15} />} />
                  <Input label="Confirm New Password" type="password" placeholder="Confirm new password" icon={<Lock size={15} />} />
                  <Button>Update Password</Button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <h3 className="text-lg font-bold text-[#0f172a] mb-5">Notification Preferences</h3>
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'Booking confirmations', desc: 'Get notified when a booking is confirmed', on: true },
                    { label: 'Booking reminders', desc: 'Receive reminders 24h before your booking', on: true },
                    { label: 'Promotional offers', desc: 'Deals and discounts on venues near you', on: false },
                    { label: 'New venues nearby', desc: 'When new venues open in your area', on: true },
                    { label: 'Match invitations', desc: 'When someone invites you to a match', on: true },
                  ].map(n => (
                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-[#f8fafc] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{n.label}</p>
                        <p className="text-xs text-[#94a3b8]">{n.desc}</p>
                      </div>
                      <button className={`relative w-11 h-6 rounded-full transition-colors ${n.on ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${n.on ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'bookings' && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-[#0f172a]">Booking History</h3>
                  <button onClick={() => nav('user-bookings')} className="text-sm text-[#2563eb] font-semibold hover:underline flex items-center gap-1">View all <ChevronRight size={14} /></button>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { venue: 'Arena Sports Complex', sport: 'Tennis', date: 'Jul 13', amount: '$27', status: 'upcoming' },
                    { venue: 'GreenPark Football', sport: 'Football', date: 'Jul 6', amount: '$90', status: 'completed' },
                    { venue: 'AquaLife Swim Center', sport: 'Swimming', date: 'Jun 28', amount: '$22', status: 'completed' },
                  ].map(b => (
                    <div key={b.venue + b.date} className="flex items-center justify-between py-3 border-b border-[#f8fafc] last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a]">{b.venue}</p>
                        <p className="text-xs text-[#64748b]">{b.sport} · {b.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#0f172a]">{b.amount}</span>
                        <Badge variant={b.status === 'upcoming' ? 'blue' : 'green'}>{b.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#d1fae5] rounded-xl flex items-center justify-center text-[#10b981]"><Shield size={18} /></div>
                <div>
                  <p className="font-semibold text-sm text-[#0f172a]">Account Secured</p>
                  <p className="text-xs text-[#64748b]">Two-factor authentication enabled</p>
                </div>
                <button className="ml-auto text-xs text-[#2563eb] font-semibold hover:underline">Manage</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
