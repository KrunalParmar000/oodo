import { CheckCircle, Download, Calendar, MapPin, Clock, Hash, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui'
import type { Page } from '../../App'

export default function BookingSuccessPage({ nav }: { nav: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-lg w-full max-w-lg overflow-hidden">
        {/* Success header */}
        <div className="bg-gradient-to-br from-[#10b981] to-[#059669] px-8 pt-10 pb-16 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Booking Confirmed!</h1>
          <p className="text-green-100 text-sm">Your court has been reserved successfully</p>
        </div>

        {/* Ticket tear */}
        <div className="relative -mt-6 mx-6">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f8fafc] rounded-full border-r border-[#e2e8f0]" />
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#f8fafc] rounded-full border-l border-[#e2e8f0]" />
          <div className="border border-dashed border-[#e2e8f0] rounded-2xl bg-white p-6">
            {/* Booking ID */}
            <div className="flex items-center justify-between bg-[#f8fafc] rounded-xl px-4 py-3 mb-5">
              <div className="flex items-center gap-2 text-[#64748b]">
                <Hash size={14} />
                <span className="text-xs font-semibold uppercase tracking-wider">Booking ID</span>
              </div>
              <span className="font-mono font-bold text-[#0f172a] text-sm tracking-wider">QB-2025-84751</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <MapPin size={14} />, label: 'Venue', val: 'Arena Sports Complex' },
                { icon: <Calendar size={14} />, label: 'Date', val: 'July 13, 2025' },
                { icon: <Clock size={14} />, label: 'Time', val: '6:00 PM – 7:00 PM' },
                { icon: <ArrowRight size={14} />, label: 'Court', val: 'Court A (Tennis)' },
              ].map(d => (
                <div key={d.label}>
                  <div className="flex items-center gap-1.5 text-[#94a3b8] mb-1">{d.icon}<span className="text-xs font-semibold uppercase tracking-wider">{d.label}</span></div>
                  <p className="font-semibold text-sm text-[#0f172a]">{d.val}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#f1f5f9] flex justify-between items-center">
              <span className="text-sm text-[#64748b]">Amount Paid</span>
              <span className="text-xl font-extrabold text-[#0f172a]">$27</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-5 flex flex-col gap-3">
          <Button size="lg" fullWidth onClick={() => nav('user-bookings')}>
            <Calendar size={16} /> View My Bookings
          </Button>
          <button className="flex items-center justify-center gap-2 py-2.5 text-sm text-[#64748b] hover:text-[#0f172a] border border-[#e2e8f0] rounded-xl transition-colors">
            <Download size={14} /> Download Receipt
          </button>
          <button onClick={() => nav('user-home')} className="text-sm text-[#94a3b8] hover:text-[#64748b] text-center">Back to Home</button>
        </div>
      </div>
    </div>
  )
}
