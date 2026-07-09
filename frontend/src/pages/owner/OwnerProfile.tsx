import { useState } from 'react'
import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, Camera, Bell, Settings, LogOut, Shield } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

export default function OwnerProfile({ nav }: { nav: (p: Page) => void }) {
  const [tab, setTab] = useState('personal')

  const sidebarItems = [
    { page: 'owner-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'owner-facilities' as Page, label: 'Facilities', icon: <Building2 size={16} /> },
    { page: 'owner-courts' as Page, label: 'Courts', icon: <Layers size={16} /> },
    { page: 'owner-slots' as Page, label: 'Time Slots', icon: <CalendarClock size={16} /> },
    { page: 'owner-bookings' as Page, label: 'Bookings', icon: <BookOpen size={16} /> },
    { page: 'owner-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'owner-profile' as Page, label: 'Profile', icon: <User size={16} /> },
  ]

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User size={15} /> },
    { id: 'facility', label: 'Facility Info', icon: <Building2 size={15} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={15} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={15} /> },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="owner-profile" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5">
          <h1 className="text-xl font-bold text-[#0f172a]">Profile & Settings</h1>
        </div>
        <div className="p-8 max-w-3xl">
          {/* Profile header */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-[#dbeafe] flex items-center justify-center text-2xl font-extrabold text-[#2563eb]">DC</div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2563eb] rounded-full flex items-center justify-center shadow-md"><Camera size={12} className="text-white" /></button>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">David Chen</h2>
                <p className="text-sm text-[#64748b]">david@arenacomplex.com</p>
                <p className="text-xs text-[#94a3b8] mt-1">Facility Owner · Verified · Member since Mar 2023</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-[#e2e8f0] rounded-xl p-1 mb-6">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? 'bg-[#2563eb] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab === 'personal' && (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h3 className="text-base font-bold text-[#0f172a] mb-5">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <Input label="Full Name" defaultValue="David Chen" />
                <Input label="Email" type="email" defaultValue="david@arenacomplex.com" />
                <Input label="Phone" defaultValue="+1 (555) 876-5432" />
                <Input label="City" defaultValue="New York, NY" />
              </div>
              <Button>Save Changes</Button>
            </div>
          )}

          {tab === 'facility' && (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h3 className="text-base font-bold text-[#0f172a] mb-5">Facility Information</h3>
              <div className="flex flex-col gap-4 mb-5">
                <Input label="Business Name" defaultValue="Arena Sports Complex" />
                <Input label="Business Email" defaultValue="info@arenacomplex.com" />
                <Input label="Phone" defaultValue="+1 (555) 123-4567" />
                <Input label="Address" defaultValue="123 Sports Ave, Manhattan, New York, NY 10001" />
                <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Description</label><textarea rows={3} defaultValue="Premier multi-sport facility in Manhattan..." className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] resize-none" /></div>
              </div>
              <Button>Save Facility Info</Button>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h3 className="text-base font-bold text-[#0f172a] mb-5">Notification Settings</h3>
              <div className="flex flex-col gap-1">
                {[
                  { l: 'New booking received', d: 'Get notified when a player books a court', on: true },
                  { l: 'Booking cancellations', d: 'Alert when a booking is cancelled', on: true },
                  { l: 'Payment received', d: 'Confirmation when a payment is processed', on: true },
                  { l: 'Weekly revenue report', d: 'Weekly summary every Monday', on: false },
                  { l: 'Review received', d: 'When a player leaves a review', on: true },
                ].map(n => (
                  <div key={n.l} className="flex items-center justify-between py-3 border-b border-[#f8fafc] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a]">{n.l}</p>
                      <p className="text-xs text-[#94a3b8]">{n.d}</p>
                    </div>
                    <button className={`relative w-11 h-6 rounded-full transition-colors ${n.on ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${n.on ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#d1fae5] rounded-xl flex items-center justify-center text-[#10b981]"><Shield size={18} /></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#0f172a]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#64748b]">Enabled via authenticator app</p>
                </div>
                <button className="text-sm text-[#2563eb] font-semibold">Manage</button>
              </div>
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#fee2e2] rounded-xl flex items-center justify-center text-red-500"><LogOut size={18} /></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#0f172a]">Sign Out</p>
                  <p className="text-xs text-[#64748b]">Sign out of your account</p>
                </div>
                <button onClick={() => nav('welcome')} className="text-sm text-red-500 font-semibold">Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
