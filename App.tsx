import React, { useState, useEffect } from 'react';
import { TabType, Stay, Activity, PackageItem, Booking, SearchParams } from './types';
import { INITIAL_STAYS, INITIAL_ACTIVITIES, INITIAL_PACKAGES, INITIAL_BOOKINGS } from './mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [stays] = useState<Stay[]>(INITIAL_STAYS);
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [packages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // State
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Search & Filters
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Dandeli Forest & River Zone',
    checkIn: '2026-09-15',
    checkOut: '2026-09-18',
    guests: 2,
    rooms: 1,
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dandeli_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add('dark');
        localStorage.setItem('dandeli_theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('dandeli_theme', 'light');
      }
    }
  }, [isDarkMode]);

  // Filter Stays
  const filteredStays = stays
    .filter((s) => {
      if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
      if (priceFilter === 'under3k' && s.price >= 3000) return false;
      if (priceFilter === '3k-5k' && (s.price < 3000 || s.price > 5000)) return false;
      if (priceFilter === 'above5k' && s.price <= 5000) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return s.title.toLowerCase().includes(q) || s.location.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === 'Price: Low to High') return a.price - b.price;
      if (selectedSort === 'Price: High to Low') return b.price - a.price;
      if (selectedSort === 'Top Rated') return b.rating - a.rating;
      return 0;
    });

  const handleBookNow = (title: string, price: number, type: 'stay' | 'activity' | 'package') => {
    const code = 'DAN-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: Booking = {
      id: 'b-' + Date.now(),
      bookingCode: code,
      itemName: title,
      itemType: type,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      dates: `${searchParams.checkIn} to ${searchParams.checkOut}`,
      guests: `${searchParams.guests} Guests, ${searchParams.rooms} Room`,
      totalPrice: price * 2,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      location: 'Dandeli Kali River Zone',
    };
    setBookings([newBooking, ...bookings]);
    setSelectedStay(null);
    setActiveTab('my-bookings');
    alert(`🎉 Booking Confirmed!\nBooking Code: ${code}\nItem: ${title}\nCheck "My Bookings" tab for your voucher.`);
  };

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    const q = aiQuery.toLowerCase();
    if (q.includes('raft') || q.includes('river') || q.includes('water')) {
      setAiResponse('🌊 Best White Water Rafting: Mid-October through May is optimal when the Supa Dam discharges water into the Kali River. Grade 2 & 3 rapids await at Ganeshgudi!');
    } else if (q.includes('safari') || q.includes('tiger') || q.includes('wildlife') || q.includes('bird')) {
      setAiResponse('🐆 Jungle Safari & Wildlife: Dandeli Anshi Tiger Reserve conducts morning (6:00 AM - 8:30 AM) and evening (4:00 PM - 6:30 PM) jeep safaris. Famous for Black Panthers, Hornbills, and Spotted Deer.');
    } else if (q.includes('weather') || q.includes('time') || q.includes('month') || q.includes('season')) {
      setAiResponse('🌤️ Best Time to Visit: October to March provides lush green forests and pleasant 24°C days. Summer (March-May) is great for water adventures.');
    } else {
      setAiResponse(`🌿 Local Concierge Advice for "${aiQuery}": For stays near Kali River, Hornbill & Magenta Resorts are top picks. Pre-book river rafting and night bonfires for a memorable trip!`);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} font-sans flex flex-col transition-colors duration-200`}>
      {/* Top Navigation Bar */}
      <header className={`sticky top-0 z-40 ${isDarkMode ? 'bg-[#1e293b]/95 border-slate-700' : 'bg-white/95 border-slate-200'} backdrop-blur border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('stays')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-500/20">
              D
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                DandeliTours
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                Wild & River
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            {(['stays', 'activities', 'packages', 'my-bookings', 'about'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-150 ${
                  activeTab === tab
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {tab === 'stays' ? 'Resorts & Stays' : tab === 'my-bookings' ? `My Bookings (${bookings.length})` : tab}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAiConciergeOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <span>✨</span>
              <span className="hidden sm:inline">AI Concierge</span>
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <a
              href="https://wa.me/919483840540?text=Hello%20DandeliTours,%20I%20want%20to%20plan%20a%20trip!"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <span>💬</span> WhatsApp
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-slate-900 flex flex-col gap-2">
            {(['stays', 'activities', 'packages', 'my-bookings', 'about'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-semibold capitalize ${
                  activeTab === tab ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {tab === 'stays' ? 'Resorts & Stays' : tab === 'my-bookings' ? `My Bookings (${bookings.length})` : tab}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Resorts & Stays Tab */}
        {activeTab === 'stays' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className={`p-4 sm:p-6 rounded-2xl ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between`}>
              <div className="w-full md:w-1/3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Search Destination / Resort</label>
                <input
                  type="text"
                  placeholder="e.g. River Camp, Treehouse, Safari Resort..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
              </div>

              <div className="flex-1 flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
                <div
                  onClick={() => setIsSearchModalOpen(true)}
                  className={`flex-1 min-w-[130px] p-2.5 rounded-lg border cursor-pointer hover:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Dates</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{searchParams.checkIn.slice(5)} to {searchParams.checkOut.slice(5)}</span>
                </div>

                <div
                  onClick={() => setIsSearchModalOpen(true)}
                  className={`flex-1 min-w-[120px] p-2.5 rounded-lg border cursor-pointer hover:border-emerald-500 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Guests</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{searchParams.guests} Guests, {searchParams.rooms} Room</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setIsMapOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-sm font-bold flex items-center gap-1.5 transition-colors"
                >
                  🗺️ <span>Map</span>
                </button>
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  Modify Filter
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Luxury Resorts', 'Riverside Camps', 'Cozy Homestays', 'Jungle Cottages', 'Budget Hotels'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isDarkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Highlights Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div onClick={() => setActiveTab('activities')} className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="text-2xl mb-1 block">🌊</span>
                <h4 className="font-bold text-sm">River Rafting</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Kali River Rapids 9-12km</p>
              </div>
              <div onClick={() => setActiveTab('activities')} className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="text-2xl mb-1 block">🐆</span>
                <h4 className="font-bold text-sm">Jungle Safari</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Anshi Wildlife Reserve</p>
              </div>
              <div onClick={() => setActiveTab('packages')} className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="text-2xl mb-1 block">🏕️</span>
                <h4 className="font-bold text-sm">Weekend Camp</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Stay + Meals + Rafting</p>
              </div>
              <div onClick={() => setIsAiConciergeOpen(true)} className={`p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="text-2xl mb-1 block">💡</span>
                <h4 className="font-bold text-sm">Trip Planner</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Custom 2D/3D Itineraries</p>
              </div>
            </div>

            {/* Resorts Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Available Resorts & Jungle Stays ({filteredStays.length})</h2>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
                >
                  <option>Recommended</option>
                  <option>Top Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStays.map((stay) => (
                  <div
                    key={stay.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col transition-all hover:shadow-lg ${
                      isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={stay.image} alt={stay.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full font-bold">
                        {stay.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1">
                        ★ {stay.rating} ({stay.reviewCount})
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-base line-clamp-1">{stay.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{stay.subtitle}</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">📍 {stay.location}</p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {stay.amenities.slice(0, 3).map((am, i) => (
                            <span key={i} className={`text-[11px] px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                              ✓ {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{stay.price.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 font-medium">{stay.priceUnit}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block">{stay.taxesText}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedStay(stay)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleBookNow(stay.title, stay.price, 'stay')}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dandeli Adventure Activities</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kali River White Water Rafting, Jungle Jeep Safaris, Kayaking, and Treks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((act) => (
                <div key={act.id} className={`rounded-2xl border overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="relative h-48 w-full">
                    <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                      {act.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 text-slate-900 dark:text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      ★ {act.rating}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{act.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>⏱️ {act.duration}</span>
                        <span>•</span>
                        <span>⚡ {act.difficulty}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">{act.description}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{act.price}</span>
                        <span className="text-xs text-slate-400"> / person</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(act.title, act.price, 'activity')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all"
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">All-Inclusive Dandeli Tour Packages</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Full weekend itineraries including Riverside Camp, Meals, Rafting, and Jungle Treks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`rounded-2xl border overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="relative h-48 w-full">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                      {pkg.duration}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{pkg.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">{pkg.description}</p>
                      <div className="mt-3 space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Includes:</span>
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span> {inc}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">₹{pkg.price.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">per person (min 2)</span>
                      </div>
                      <button
                        onClick={() => handleBookNow(pkg.title, pkg.price, 'package')}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* My Bookings Tab */}
        {activeTab === 'my-bookings' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">My Bookings ({bookings.length})</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Confirmed vouchers and itinerary access.</p>
              </div>
              <button
                onClick={() => setActiveTab('stays')}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
              >
                + Book More
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-16 border rounded-2xl bg-white dark:bg-slate-800">
                <span className="text-4xl block mb-2">🏕️</span>
                <p className="font-bold text-slate-700 dark:text-slate-200">No bookings yet!</p>
                <p className="text-xs text-slate-400 mt-1">Explore Dandeli's top riverfront camps and book your stay.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className={`p-5 rounded-2xl border flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {b.status}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Code: {b.bookingCode}</span>
                      </div>
                      <h4 className="font-bold text-base mt-2">{b.itemName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">📅 Dates: {b.dates} • {b.guests}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">📍 {b.location}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">₹{b.totalPrice.toLocaleString()}</span>
                      <a
                        href={`https://wa.me/919483840540?text=Hi%20DandeliTours,%20here%20is%20my%20booking%20code:%20${b.bookingCode}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold"
                      >
                        WhatsApp Voucher
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* About & Guide Tab */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} space-y-4`}>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Traveler Guide</span>
              <h2 className="text-3xl font-black tracking-tight">About Dandeli, Karnataka</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Nestled in the lush Western Ghats of North Karnataka, Dandeli is renowned as South India's premier adventure capital.
                Famed for the rushing white waters of the Kali River, untouched deciduous jungles of the Kali Tiger Reserve, and vibrant
                wildlife including Hornbills, Black Panthers, and Indian Elephants.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <h4 className="font-bold text-sm text-emerald-600">Best Season</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">October to May for White Water Rafting. November to March for wildlife safari.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <h4 className="font-bold text-sm text-emerald-600">How to Reach</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nearest Rail: Alnavar (32 km), Londa (48 km). Nearest Airport: Hubballi (75 km), Goa (135 km).</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <h4 className="font-bold text-sm text-emerald-600">Top Attractions</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kali River Rafting, Syntheri Rocks, Supa Dam, Shiroli Peak, Kavala Caves.</p>
                </div>
              </div>
            </div>

            {/* Weather Widget */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Dandeli Live River & Weather Status</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Kali River Basin, Uttara Kannada</p>
                </div>
                <span className="text-3xl">⛅</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div>
                  <span className="text-xs text-slate-400 block">Temperature</span>
                  <span className="text-xl font-bold">26°C</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Rafting Condition</span>
                  <span className="text-sm font-bold text-emerald-600">Grade 3 (Open)</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Supa Dam Discharge</span>
                  <span className="text-sm font-bold text-blue-500">Normal Flow</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Humidity</span>
                  <span className="text-xl font-bold">68%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Property Details Modal */}
      {selectedStay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="relative h-64 w-full">
              <img src={selectedStay.image} alt={selectedStay.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedStay(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">{selectedStay.category}</span>
                <h3 className="text-2xl font-black">{selectedStay.title}</h3>
                <p className="text-xs text-slate-500 mt-1">📍 {selectedStay.location}</p>
              </div>

              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{selectedStay.description}</p>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Amenities & Inclusions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedStay.amenities.map((am, i) => (
                    <div key={i} className="text-xs flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                      <span className="text-emerald-500 font-bold">✓</span> {am}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-emerald-600">₹{selectedStay.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400"> / night</span>
                </div>
                <button
                  onClick={() => handleBookNow(selectedStay.title, selectedStay.price, 'stay')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-3xl p-6 border shadow-2xl ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Dandeli Valley & Kali River Map</h3>
              <button onClick={() => setIsMapOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <div className="h-64 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-4xl mb-2">🗺️</span>
              <h4 className="font-bold text-emerald-600">Interactive Hotspots</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Kali Riverbank (Hornbill & Magenta Resorts) • Supa Dam Water Body • Syntheri Rocks Trail • Ganeshgudi Rafting Hub
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modify Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">Modify Trip Parameters</h3>
              <button onClick={() => setIsSearchModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={searchParams.guests}
                    onChange={(e) => setSearchParams({ ...searchParams, guests: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Rooms</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={searchParams.rooms}
                    onChange={(e) => setSearchParams({ ...searchParams, rooms: parseInt(e.target.value) || 1 })}
                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              Apply Dates & Guests
            </button>
          </div>
        </div>
      )}

      {/* AI Concierge Modal */}
      {isAiConciergeOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="font-bold text-lg">Dandeli AI Concierge</h3>
              </div>
              <button onClick={() => setIsAiConciergeOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleAiAsk} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about rafting, best resorts, safaris..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className={`flex-1 px-3 py-2 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
              />
              <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs">
                Ask
              </button>
            </form>

            {aiResponse && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs leading-relaxed">
                {aiResponse}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[11px] text-slate-400">Quick prompts:</span>
              <button
                type="button"
                onClick={() => {
                  setAiQuery('Best time for rafting');
                  setAiResponse('🌊 Best White Water Rafting: Mid-October through May when Supa Dam water is released. Grade 2 & 3 rapids in Ganeshgudi are world-class!');
                }}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100"
              >
                Rafting season?
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiQuery('Safari timings');
                  setAiResponse('🐆 Jungle Safari: Anshi Tiger Reserve has jeep safaris at 6:00 AM - 8:30 AM and 4:00 PM - 6:30 PM. Spotting panthers, hornbills, and deer.');
                }}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100"
              >
                Safari timings?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`mt-auto border-t py-8 ${isDarkMode ? 'bg-[#0b1329] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200">DandeliTours Wild & River Adventure</span>
            <p className="mt-0.5">Kali River Valley, Uttara Kannada, Karnataka 581325</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/919483840540" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">
              WhatsApp Support: +91 94838 40540
            </a>
            <span>•</span>
            <span>© 2026 DandeliTours. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
