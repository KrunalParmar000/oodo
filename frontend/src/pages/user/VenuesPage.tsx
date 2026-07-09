import { useState } from 'react'
import { Search, Filter, MapPin, Star, SlidersHorizontal, ChevronDown, Grid3X3, List } from 'lucide-react'
import { Button, Badge } from '../../components/ui'
import UserNavbar from '../../components/layout/UserNavbar'
import Footer from '../../components/layout/Footer'
import type { Page } from '../../App'

const allVenues = [
  { id: 1, name: 'Arena Sports Complex', sports: ['Tennis', 'Badminton'], price: 25, address: 'Manhattan, NY', rating: 4.9, reviews: 312, img: 'photo-1554068865-24cecd4e34b8', type: 'Indoor', badge: 'Top Rated' },
  { id: 2, name: 'Downtown Basketball Hub', sports: ['Basketball'], price: 30, address: 'Brooklyn, NY', rating: 4.8, reviews: 208, img: 'photo-1546519638-68e109498ffc', type: 'Indoor', badge: 'Popular' },
  { id: 3, name: 'GreenPark Football Fields', sports: ['Football'], price: 45, address: 'Queens, NY', rating: 4.7, reviews: 435, img: 'photo-1529900748604-07564a03e7a6', type: 'Outdoor', badge: '' },
  { id: 4, name: 'AquaLife Swim Center', sports: ['Swimming'], price: 20, address: 'Bronx, NY', rating: 4.9, reviews: 189, img: 'photo-1530549387789-4c1017266635', type: 'Indoor', badge: 'New' },
  { id: 5, name: 'City Volleyball Courts', sports: ['Volleyball'], price: 35, address: 'Staten Island, NY', rating: 4.6, reviews: 97, img: 'photo-1547347298-4074fc3086f0', type: 'Outdoor', badge: '' },
  { id: 6, name: 'ProFit Boxing Gym', sports: ['Boxing'], price: 40, address: 'Harlem, NY', rating: 4.8, reviews: 156, img: 'photo-1517836357463-d25dfeac3438', type: 'Indoor', badge: '' },
  { id: 7, name: 'East Side Badminton Club', sports: ['Badminton'], price: 22, address: 'Long Island, NY', rating: 4.7, reviews: 134, img: 'photo-1593784991095-a205069470b6', type: 'Indoor', badge: '' },
  { id: 8, name: 'Riverside Cricket Ground', sports: ['Cricket'], price: 55, address: 'Newark, NJ', rating: 4.5, reviews: 78, img: 'photo-1531415074968-036ba1b575da', type: 'Outdoor', badge: '' },
]

export default function VenuesPage({ nav }: { nav: (p: Page) => void }) {
  const [search, setSearch] = useState('')
  const [sport, setSport] = useState('All')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('rating')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [priceRange, setPriceRange] = useState(100)
  const [minRating, setMinRating] = useState(0)

  const sports = ['All', 'Tennis', 'Basketball', 'Football', 'Swimming', 'Volleyball', 'Boxing', 'Badminton', 'Cricket']
  const types = ['All', 'Indoor', 'Outdoor']

  const filtered = allVenues.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.address.toLowerCase().includes(search.toLowerCase())) return false
    if (sport !== 'All' && !v.sports.includes(sport)) return false
    if (type !== 'All' && v.type !== type) return false
    if (v.price > priceRange) return false
    if (v.rating < minRating) return false
    return true
  }).sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'price_asc') return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    return 0
  })

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <UserNavbar nav={nav} current="user-venues" />

      {/* Header */}
      <div className="bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-extrabold text-[#0f172a] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Find Sports Venues</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5">
              <Search size={16} className="text-[#94a3b8] shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search venues..." className="flex-1 bg-transparent outline-none text-sm text-[#0f172a] placeholder-[#94a3b8]" />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select value={sort} onChange={e => setSort(e.target.value)} className="appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-[#334155] outline-none cursor-pointer">
                  <option value="rating">Top Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
              </div>
              <button onClick={() => setFiltersOpen(!filtersOpen)} className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${filtersOpen ? 'bg-[#dbeafe] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#334155] hover:bg-[#f8fafc]'}`}>
                <SlidersHorizontal size={15} /> Filters
              </button>
              <div className="flex border border-[#e2e8f0] rounded-xl overflow-hidden">
                <button onClick={() => setView('grid')} className={`px-3 py-2 ${view === 'grid' ? 'bg-[#2563eb] text-white' : 'bg-white text-[#64748b]'}`}><Grid3X3 size={15} /></button>
                <button onClick={() => setView('list')} className={`px-3 py-2 ${view === 'list' ? 'bg-[#2563eb] text-white' : 'bg-white text-[#64748b]'}`}><List size={15} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Filters sidebar */}
        {filtersOpen && (
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sticky top-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0f172a]">Filters</h3>
                <button onClick={() => { setSport('All'); setType('All'); setPriceRange(100); setMinRating(0) }} className="text-xs text-[#2563eb] font-semibold">Reset all</button>
              </div>
              {/* Sport filter */}
              <div className="mb-5">
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">Sport</p>
                <div className="flex flex-col gap-1.5">
                  {sports.map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={sport === s} onChange={() => setSport(s)} className="accent-[#2563eb]" />
                      <span className={`text-sm ${sport === s ? 'font-semibold text-[#2563eb]' : 'text-[#334155]'}`}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Type filter */}
              <div className="mb-5">
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">Venue Type</p>
                <div className="flex gap-2">
                  {types.map(t => (
                    <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${type === t ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#2563eb]'}`}>{t}</button>
                  ))}
                </div>
              </div>
              {/* Price */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Max Price</p>
                  <span className="text-sm font-bold text-[#0f172a]">${priceRange}/hr</span>
                </div>
                <input type="range" min={10} max={100} value={priceRange} onChange={e => setPriceRange(+e.target.value)} className="w-full accent-[#2563eb]" />
              </div>
              {/* Rating */}
              <div>
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider mb-3">Min Rating</p>
                <div className="flex gap-1">
                  {[0,3,4,4.5].map(r => (
                    <button key={r} onClick={() => setMinRating(r)} className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${minRating === r ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white text-[#64748b] border-[#e2e8f0]'}`}>
                      {r === 0 ? 'All' : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Sport tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
            {sports.map(s => (
              <button key={s} onClick={() => setSport(s)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${sport === s ? 'bg-[#2563eb] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb] hover:text-[#2563eb]'}`}>
                {s}
              </button>
            ))}
          </div>

          <p className="text-sm text-[#64748b] mb-5">{filtered.length} venues found</p>

          <div className={view === 'grid' ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
            {filtered.map(v => view === 'grid' ? (
              <div key={v.id} className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:shadow-md transition-shadow cursor-pointer group" onClick={() => nav('user-venue-detail')}>
                <div className="relative h-44 overflow-hidden">
                  <img src={`https://images.unsplash.com/${v.img}?w=400&h=200&fit=crop&auto=format`} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  {v.badge && <div className="absolute top-3 left-3"><Badge variant="orange">{v.badge}</Badge></div>}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={11} fill="#f97316" className="text-[#f97316]" />
                    <span className="text-xs font-bold text-[#0f172a]">{v.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {v.sports.map(s => <Badge key={s} variant="blue">{s}</Badge>)}
                    <Badge variant="gray">{v.type}</Badge>
                  </div>
                  <h3 className="font-bold text-[#0f172a] mb-1">{v.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#94a3b8] mb-3"><MapPin size={11} /> {v.address}</div>
                  <div className="flex items-center justify-between">
                    <div><span className="text-base font-extrabold text-[#0f172a]">${v.price}</span><span className="text-xs text-[#94a3b8]">/hr</span></div>
                    <button onClick={e => { e.stopPropagation(); nav('user-booking') }} className="bg-[#f97316] hover:bg-[#ea6a00] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">Book Now</button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={v.id} className="bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] hover:shadow-md transition-shadow cursor-pointer flex" onClick={() => nav('user-venue-detail')}>
                <div className="w-48 shrink-0 overflow-hidden">
                  <img src={`https://images.unsplash.com/${v.img}?w=200&h=150&fit=crop&auto=format`} alt={v.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex gap-1 mb-1.5 flex-wrap">
                      {v.sports.map(s => <Badge key={s} variant="blue">{s}</Badge>)}
                    </div>
                    <h3 className="font-bold text-[#0f172a] mb-1">{v.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#94a3b8]"><MapPin size={11} /> {v.address}</div>
                    <div className="flex items-center gap-1 mt-1"><Star size={12} fill="#f97316" className="text-[#f97316]" /><span className="text-xs font-bold">{v.rating}</span><span className="text-xs text-[#94a3b8]">({v.reviews} reviews)</span></div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="mb-2"><span className="text-xl font-extrabold text-[#0f172a]">${v.price}</span><span className="text-xs text-[#94a3b8]">/hr</span></div>
                    <button onClick={e => { e.stopPropagation(); nav('user-booking') }} className="bg-[#f97316] hover:bg-[#ea6a00] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {[1, 2, 3, '...', 8].map((p, i) => (
              <button key={i} onClick={() => typeof p === 'number' && setPage(p)} className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${page === p ? 'bg-[#2563eb] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb]'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
