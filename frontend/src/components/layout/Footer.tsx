import { Zap, Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <span className="font-extrabold text-white text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Quick<span className="text-[#60a5fa]">Bolt</span>
              </span>
            </div>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 max-w-xs">
              The easiest way to discover, book, and play at sports venues near you. Join thousands of players already using QuickBolt.
            </p>
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <button key={i} className="w-9 h-9 bg-[#1e293b] hover:bg-[#2563eb] rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={16} className="text-[#94a3b8]" />
                </button>
              ))}
            </div>
          </div>
          {/* Links */}
          {[
            { title: 'Platform', links: ['Find Venues', 'Browse Sports', 'Join Matches', 'Become an Owner'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
            { title: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><a href="#" className="text-sm text-[#94a3b8] hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#64748b]">© 2025 QuickBolt. All rights reserved.</p>
          <div className="flex gap-2">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=120&h=40&fit=crop&auto=format" alt="App Store" className="h-8 rounded opacity-60 hover:opacity-100 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=120&h=40&fit=crop&auto=format" alt="Play Store" className="h-8 rounded opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  )
}
