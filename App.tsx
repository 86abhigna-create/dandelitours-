import React, { useState, useEffect } from 'react';
import { TabType, Stay, Activity, PackageItem, Booking, SearchParams } from './types';
import { INITIAL_STAYS, INITIAL_ACTIVITIES, INITIAL_PACKAGES, INITIAL_BOOKINGS } from './data/mockData';
import { Header } from './components/Header';
import { SearchSummaryBar } from './components/SearchSummaryBar';
import { CategoryChips } from './components/CategoryChips';
import { FilterSortBar } from './components/FilterSortBar';
import { StayCard } from './components/StayCard';
import { ActivityCard } from './components/ActivityCard';
import { PackageCard } from './components/PackageCard';
import { BookingCard } from './components/BookingCard';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { MapViewModal } from './components/MapViewModal';
import { ModifySearchModal } from './components/ModifySearchModal';
import { MenuDrawer } from './components/MenuDrawer';
import { AiConciergeModal } from './components/AiConciergeModal';
import { AboutView } from './components/AboutView';
import { TourismGuideSection } from './components/TourismGuideSection';
import { PackageBookingModal } from './components/PackageBookingModal';
import { WeatherWidget } from './components/WeatherWidget';
import { TestimonialsSection } from './components/TestimonialsSection';
import { HomeQuickHighlights } from './components/HomeQuickHighlights';
import heroBannerImage from './assets/images/dandeli_hero_banner_1788880366425.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [stays] = useState<Stay[]>(INITIAL_STAYS);
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [packages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Theme Management (Light / Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dandeli_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dandeli_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dandeli_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [minRating, setMinRating] = useState(0);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Dandeli, Karnataka',
    checkIn: '18 Oct',
    checkOut: '20 Oct',
    guests: 2,
    rooms: 1
  });

  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [packageCategory, setPackageCategory] = useState('All');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConfirmBooking = (bookingData: {
    itemName: string;
    itemType: 'stay' | 'activity' | 'package';
    image: string;
    dates: string;
    guests: string;
    totalPrice: number;
    location: string;
  }) => {
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode: `DT-${Math.floor(100000 + Math.random() * 900000)}`,
      ...bookingData,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings([newBooking, ...bookings]);
    setSelectedStay(null);
    showToast(`Booking confirmed! Code: ${newBooking.bookingCode}`);
    setActiveTab('my-bookings');
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    showToast('Booking cancelled successfully.');
  };

  // Filter & sort stays
  const filteredStays = stays.filter(stay => {
    if (selectedCategory !== 'All' && stay.category !== selectedCategory) return false;
    if (minRating > 0 && stay.rating < minRating) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  const categoryCounts = stays.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#07130e] text-[#edf2f7]' : 'bg-[#f9f9ff] text-[#161c27]'} flex flex-col font-['Plus_Jakarta_Sans'] pb-12 transition-colors duration-200`}>
      
      {/* Header */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsModifyModalOpen(true)}
        onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingsCount={bookings.filter(b => b.status === 'Confirmed').length}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Top Navigation Bar Below Header */}
      <nav className={`sticky top-16 inset-x-0 z-40 ${isDarkMode ? 'bg-[#0a1b14]/95 border-[rgba(82,183,136,0.18)] shadow-[0_4px_16px_rgba(0,0,0,0.4)]' : 'bg-[#f9f9ff]/90 border-[rgba(27,67,50,0.06)] shadow-[0_4px_12px_-4px_rgba(27,67,50,0.04)]'} backdrop-blur-xl border-b transition-colors`}>
        <div className="flex items-center justify-around sm:justify-start gap-1 sm:gap-4 h-14 px-4 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
          {[
            { id: 'explore' as TabType, label: 'Home', icon: 'home' },
            { id: 'stays' as TabType, label: 'Stays', icon: 'cottage' },
            { id: 'activities' as TabType, label: 'Activities', icon: 'kayaking' },
            { id: 'packages' as TabType, label: 'Packages', icon: 'local_activity' },
            { id: 'my-bookings' as TabType, label: 'Bookings', icon: 'confirmation_number', hasBadge: true },
            { id: 'about' as TabType, label: 'About', icon: 'info' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-semibold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#1b4332] text-white shadow-md'
                    : isDarkMode
                    ? 'text-[#cbd5e1] hover:bg-[#132e22] hover:text-[#a7f3d0]'
                    : 'text-[#414844] hover:bg-[#e8eeff] hover:text-[#012d1d]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.hasBadge && confirmedCount > 0 && (
                  <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isActive ? 'bg-[#c1ecd4] text-[#012d1d]' : 'bg-[#e76f51] text-white'}`}>
                    {confirmedCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* View Map Option beside About */}
          <button
            onClick={() => setIsMapModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-semibold transition-all shrink-0 ${
              isDarkMode
                ? 'text-[#cbd5e1] hover:bg-[#132e22] hover:text-[#a7f3d0]'
                : 'text-[#414844] hover:bg-[#e8eeff] hover:text-[#012d1d]'
            } active:scale-95`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006688]">map</span>
            <span>View Map</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-4 flex-grow max-w-7xl mx-auto w-full px-4">
        
        {/* TAB 1 & 2: EXPLORE / STAYS */}
        {(activeTab === 'explore' || activeTab === 'stays') && (
          <div className="py-3 flex flex-col gap-6">
            {activeTab === 'stays' && (
              <>
                <SearchSummaryBar
                  searchParams={searchParams}
                  onModify={() => setIsModifyModalOpen(true)}
                />
                <CategoryChips
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  counts={categoryCounts}
                />
                <FilterSortBar
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  minRating={minRating}
                  setMinRating={setMinRating}
                  onOpenFilters={() => setIsModifyModalOpen(true)}
                  activeFilterCount={minRating > 0 ? 1 : 0}
                />
              </>
            )}

            {activeTab === 'explore' && (
              <>
                <div className="rounded-3xl overflow-hidden shadow-2xl w-full h-[340px] sm:h-[480px] bg-[#012d1d] relative flex items-center justify-center group">
                  <img
                    src="https://res.cloudinary.com/jn4npnn4/image/upload/f_auto,q_auto/karnatak"
                    alt="Dandeli Karnataka Tourism"
                    className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = heroBannerImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#c1ecd4] text-[#002114] font-bold text-[11px] sm:text-[12px] uppercase tracking-wider shadow-sm">
                        Welcome to Dandeli
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-[12px] font-semibold">
                        Kali River & Tiger Reserve
                      </span>
                    </div>
                    <h1 className="font-epilogue text-[26px] sm:text-[42px] font-bold text-white drop-shadow-md leading-tight max-w-2xl">
                      Gateway to Wilderness & Rapids
                    </h1>
                    <p className="text-[#e8eeff]/90 text-[13px] sm:text-[15px] mt-1.5 max-w-xl hidden sm:block leading-relaxed">
                      Experience crystal-clear rapids, tranquil jungle stays, and rich Western Ghats biodiversity.
                    </p>
                  </div>
                </div>
                <WeatherWidget />
                <HomeQuickHighlights setActiveTab={setActiveTab} />
                <TourismGuideSection />
                <TestimonialsSection />
              </>
            )}

            <div className="flex items-center justify-between">
              <h2 className="font-epilogue text-[22px] font-bold text-[#161c27]">
                {activeTab === 'explore' ? 'Featured Stays & Eco Resorts' : `${selectedCategory} (${filteredStays.length})`}
              </h2>
              {activeTab === 'stays' && (
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="flex items-center gap-1.5 text-[#006688] font-semibold text-[14px] hover:underline"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">map</span>
                  <span>View Map</span>
                </button>
              )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStays.map((stay) => (
                <StayCard
                  key={stay.id}
                  stay={stay}
                  onSelect={(s) => setSelectedStay(s)}
                  onBook={(s) => setSelectedStay(s)}
                />
              ))}
            </div>

            {filteredStays.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl shadow-sm">
                <span className="material-symbols-outlined text-[48px] text-[#414844]">search_off</span>
                <p className="font-epilogue text-[18px] font-semibold text-[#161c27]">No stays found matching your filters.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setMinRating(0); }}
                  className="px-4 py-2 bg-[#012d1d] text-white rounded-xl text-[13px] font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="px-4 py-4 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="font-epilogue text-[24px] font-bold text-[#161c27]">Adventure Sports & Safaris</h1>
              <p className="text-[14px] text-[#414844]">Experience Grade III whitewater rafting, jungle safaris, and coracle rides on the Kali River.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((act) => (
                <ActivityCard
                  key={act.id}
                  activity={act}
                  onBook={(a) => {
                    handleConfirmBooking({
                      itemName: a.title,
                      itemType: 'activity',
                      image: a.image,
                      dates: searchParams.checkIn + ' 2026 (09:00 AM)',
                      guests: '2 Persons',
                      totalPrice: a.price * 2,
                      location: 'Dandeli Adventure Hub'
                    });
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PACKAGES */}
        {activeTab === 'packages' && (() => {
          const filteredPackages = packages.filter(pkg => {
            if (packageCategory === 'All') return true;
            if (packageCategory === 'Student') return pkg.id.includes('student');
            if (packageCategory === 'Group') return pkg.id.includes('group');
            if (packageCategory === 'Family') return pkg.id.includes('family');
            if (packageCategory === 'Couple') return pkg.id.includes('couple');
            return true;
          });

          return (
            <div className="px-4 py-4 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="font-epilogue text-[24px] font-bold text-[#161c27]">Student, Group, Family & Couple Packages</h1>
                <p className="text-[14px] text-[#414844]">View, select, and book online curated multi-day adventure packages tailored for every group type.</p>
              </div>

              {/* Package Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {['All', 'Student', 'Group', 'Family', 'Couple'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPackageCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[14px] font-semibold transition-all shrink-0 ${
                      packageCategory === cat
                        ? 'bg-[#1b4332] text-white shadow-sm'
                        : 'bg-white text-[#414844] border border-[rgba(27,67,50,0.1)] hover:bg-[#e8eeff]'
                    }`}
                    type="button"
                  >
                    {cat === 'All' ? '🌟 All Packages' : cat === 'Student' ? '🎓 Student Camp' : cat === 'Group' ? '👥 Group Pass' : cat === 'Family' ? '👨‍👩‍👧‍👦 Family Holiday' : '❤️ Couple Getaway'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onBook={(p) => setSelectedPackage(p)}
                  />
                ))}
              </div>
              {filteredPackages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-[48px] text-[#414844]">travel_explore</span>
                  <p className="font-epilogue text-[18px] font-semibold text-[#161c27]">No packages found for this category.</p>
                  <button
                    onClick={() => setPackageCategory('All')}
                    className="px-4 py-2 bg-[#012d1d] text-white rounded-xl text-[13px] font-semibold"
                  >
                    View All Packages
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* TAB 5: MY BOOKINGS */}
        {activeTab === 'my-bookings' && (
          <div className="px-4 py-4 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="font-epilogue text-[24px] font-bold text-[#161c27]">My Bookings & E-Tickets</h1>
              <p className="text-[14px] text-[#414844]">Manage your upcoming reservations, download e-tickets, or modify trip details.</p>
            </div>

            <div className="flex flex-col gap-4">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancelBooking}
                />
              ))}

              {bookings.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3 bg-white rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-[48px] text-[#414844]">confirmation_number</span>
                  <p className="font-epilogue text-[18px] font-semibold text-[#161c27]">No active bookings found.</p>
                  <button
                    onClick={() => setActiveTab('stays')}
                    className="px-5 py-2.5 bg-[#012d1d] text-white rounded-xl text-[14px] font-semibold"
                  >
                    Explore Stays Now
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: ABOUT */}
        {activeTab === 'about' && <AboutView />}

      </main>

      {/* Floating WhatsApp Quick Chat Button */}
      <aside className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/919480123456?text=Hello%20DandeliTours!%20I%20would%20like%20to%20inquire%20about%20stays%20and%20rafting%20packages."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] active:scale-95 transition-all duration-200"
          title="Chat with Dandeli Expert on WhatsApp (+91 94801 23456)"
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/assets/whatsapp_logo.png"
              alt="WhatsApp"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-sm"
            />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-[14px] pr-1 whitespace-nowrap tracking-wide">
            Chat on WhatsApp
          </span>
        </a>
      </aside>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#012d1d] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[20px] text-[#c1ecd4]">check_circle</span>
          <span className="text-[14px] font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      {selectedStay && (
        <PropertyDetailsModal
          stay={selectedStay}
          onClose={() => setSelectedStay(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {isMapModalOpen && (
        <MapViewModal
          stays={stays}
          onClose={() => setIsMapModalOpen(false)}
          onSelectStay={(s) => setSelectedStay(s)}
        />
      )}

      {isModifyModalOpen && (
        <ModifySearchModal
          searchParams={searchParams}
          onClose={() => setIsModifyModalOpen(false)}
          onSave={setSearchParams}
        />
      )}

      {isMenuOpen && (
        <MenuDrawer
          onClose={() => setIsMenuOpen(false)}
          setActiveTab={setActiveTab}
          onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
          onOpenMap={() => setIsMapModalOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {isAiConciergeOpen && (
        <AiConciergeModal
          onClose={() => setIsAiConciergeOpen(false)}
        />
      )}

      {selectedPackage && (
        <PackageBookingModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onConfirm={(bookingData) => {
            handleConfirmBooking(bookingData);
            setSelectedPackage(null);
            showToast('Package successfully booked online! E-ticket generated.');
          }}
        />
      )}

    </div>
  );
}
