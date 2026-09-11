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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [stays, setStays] = useState<Stay[]>(INITIAL_STAYS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [packages, setPackages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Dandeli Forest Area',
    checkIn: '2026-09-15',
    checkOut: '2026-09-18',
    guests: 2,
    rooms: 1,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col font-['Plus_Jakarta_Sans'] antialiased">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
        bookingsCount={bookings.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchSummaryBar
          params={searchParams}
          onOpenModify={() => setIsSearchModalOpen(true)}
          activeTab={activeTab}
        />

        <div className="mt-4 mb-6">
          <CategoryChips
            activeTab={activeTab}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="mb-6">
          <FilterSortBar
            activeTab={activeTab}
            selectedSort={selectedSort}
            onSelectSort={setSelectedSort}
            priceFilter={priceFilter}
            onSelectPriceFilter={setPriceFilter}
            onOpenMap={() => setIsMapOpen(true)}
          />
        </div>

        {activeTab === 'stays' && (
          <div>
            <HomeQuickHighlights onNavigateTab={setActiveTab} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.map((stay) => (
                <StayCard
                  key={stay.id}
                  stay={stay}
                  onSelectStay={setSelectedStay}
                />
              ))}
            </div>
            <div className="mt-12">
              <WeatherWidget />
            </div>
            <div className="mt-12">
              <TourismGuideSection />
            </div>
            <div className="mt-12">
              <TestimonialsSection />
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onBookActivity={() => alert(`Booking for ${activity.title}`)}
              />
            ))}
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onSelectPackage={setSelectedPackage}
              />
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-[#161c27]">My Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-500 py-8 text-center">No bookings found yet.</p>
            ) : (
              bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </div>
        )}

        {activeTab === 'about' && <AboutView />}
      </main>

      {selectedStay && (
        <PropertyDetailsModal
          stay={selectedStay}
          onClose={() => setSelectedStay(null)}
          onBookNow={() => {
            alert('Booking request received!');
            setSelectedStay(null);
          }}
        />
      )}

      {isMapOpen && (
        <MapViewModal
          stays={stays}
          onClose={() => setIsMapOpen(false)}
          onSelectStay={setSelectedStay}
        />
      )}

      {isSearchModalOpen && (
        <ModifySearchModal
          params={searchParams}
          onClose={() => setIsSearchModalOpen(false)}
          onSave={setSearchParams}
        />
      )}

      {isMenuOpen && (
        <MenuDrawer
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setIsMenuOpen(false);
          }}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      {isAiConciergeOpen && (
        <AiConciergeModal onClose={() => setIsAiConciergeOpen(false)} />
      )}

      {selectedPackage && (
        <PackageBookingModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}
