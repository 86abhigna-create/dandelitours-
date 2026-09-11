import React, { useState, useEffect } from 'react';
import { TabType, Stay, Activity, PackageItem, Booking, SearchParams } from './types';
import { INITIAL_STAYS, INITIAL_ACTIVITIES, INITIAL_PACKAGES, INITIAL_BOOKINGS } from './mockData';

const heroBannerImage = "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1800&q=80";

// --- Header ---
interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch?: () => void;
  onOpenAiConcierge: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bookingsCount: number;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenSearch,
  onOpenAiConcierge,
  setActiveTab,
  bookingsCount,
  isDarkMode = false,
  onToggleTheme
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f9f9ff]/85 dark:bg-[#1a1c1e]/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_-4px_rgba(27,67,50,0.06)] border-b border-stone-200/50 dark:border-stone-800">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <button 
            id="mobile-menu-btn"
            onClick={onOpenMenu}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#1a1c1e] dark:text-stone-200 hover:bg-[#1b4332]/5 dark:hover:bg-stone-800 transition-colors"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1b4332] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[18px]">kayaking</span>
            </div>
            <div>
              <span className="font-headline font-bold text-[19px] tracking-tight text-[#1a1c1e] dark:text-white leading-none block">
                Dandeli<span className="text-[#2d6a4f] dark:text-[#52b788]">Tours</span>
              </span>
              <span className="text-[10px] text-stone-700 dark:text-stone-300 font-medium tracking-wide flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                Wild & Adventure
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenSearch && (
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1a1c1e] dark:text-stone-200 hover:bg-[#1b4332]/5 dark:hover:bg-stone-800 transition-colors"
              title="Search Stays & Activities"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
          )}

          {onToggleTheme && (
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1a1c1e] dark:text-stone-200 hover:bg-[#1b4332]/5 dark:hover:bg-stone-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}

          <button
            id="ai-concierge-btn"
            onClick={onOpenAiConcierge}
            className="relative px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-[#2d6a4f] dark:text-emerald-400">smart_toy</span>
            <span className="hidden sm:inline">AI Concierge</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// --- SearchSummaryBar ---
interface SearchSummaryBarProps {
  location: string;
  dates: string;
  guests: number;
  rooms: number;
  onModify: () => void;
}

export const SearchSummaryBar: React.FC<SearchSummaryBarProps> = ({
  location,
  dates,
  guests,
  rooms,
  onModify
}) => {
  return (
    <div className="bg-white/80 dark:bg-[#202427]/80 backdrop-blur-md rounded-2xl p-3 border border-stone-200/60 dark:border-stone-800 shadow-sm flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#1b4332] dark:text-emerald-400 shrink-0">
          <span className="material-symbols-outlined text-[20px]">pin_drop</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">{location}</p>
          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
            {dates} • {guests} Guests, {rooms} Room{rooms > 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <button 
        onClick={onModify}
        className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors shrink-0"
      >
        Modify
      </button>
    </div>
  );
};

// --- CategoryChips ---
interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
              isSelected
                ? 'bg-[#1b4332] text-white shadow-md shadow-[#1b4332]/20'
                : 'bg-white dark:bg-stone-800/90 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700/60'
            }`}
          >
            {category === 'Luxury Resorts' && <span className="material-symbols-outlined text-[15px]">villa</span>}
            {category === 'Riverside Camps' && <span className="material-symbols-outlined text-[15px]">camping</span>}
            {category === 'Treehouses' && <span className="material-symbols-outlined text-[15px]">forest</span>}
            {category === 'Nature Homestays' && <span className="material-symbols-outlined text-[15px]">cottage</span>}
            {category === 'All' && <span className="material-symbols-outlined text-[15px]">explore</span>}
            {category}
          </button>
        );
      })}
    </div>
  );
};

// --- FilterSortBar ---
interface FilterSortBarProps {
  selectedSort: string;
  onSelectSort: (sort: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  onOpenMap: () => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  selectedSort,
  onSelectSort,
  priceFilter,
  onPriceFilterChange,
  onOpenMap
}) => {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 flex-wrap">
        <select
          value={selectedSort}
          onChange={(e) => onSelectSort(e.target.value)}
          className="bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
        >
          <option value="Recommended">Sort: Recommended</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Rating: High to Low">Rating: High to Low</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => onPriceFilterChange(e.target.value)}
          className="bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#1b4332]"
        >
          <option value="all">Budget: All</option>
          <option value="under3k">Under ₹3,000</option>
          <option value="3kto5k">₹3,000 - ₹5,000</option>
          <option value="above5k">Above ₹5,000</option>
        </select>
      </div>

      <button
        onClick={onOpenMap}
        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-[#1b4332] dark:text-emerald-300 font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 hover:bg-emerald-100 transition-colors shrink-0"
      >
        <span className="material-symbols-outlined text-[16px]">map</span>
        <span>View Map</span>
      </button>
    </div>
  );
};

// --- HomeQuickHighlights ---
interface HomeQuickHighlightsProps {
  onSelectHighlight: (category: string) => void;
}

export const HomeQuickHighlights: React.FC<HomeQuickHighlightsProps> = ({ onSelectHighlight }) => {
  const highlights = [
    { title: 'River Rafting', subtitle: 'Kali River Grade 3+', icon: 'kayaking', category: 'Activities' },
    { title: 'Jungle Safari', subtitle: 'Hornbill & Leopard Zone', icon: 'pets', category: 'Activities' },
    { title: 'Treehouse Stays', subtitle: 'Canopy View Cottages', icon: 'forest', category: 'Treehouses' },
    { title: 'Riverfront Camps', subtitle: 'Bonfire & Kayaking', icon: 'camping', category: 'Riverside Camps' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
      {highlights.map((h, i) => (
        <div
          key={i}
          onClick={() => onSelectHighlight(h.category)}
          className="bg-white dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200/70 dark:border-stone-700/60 cursor-pointer hover:border-[#1b4332] dark:hover:border-emerald-500 transition-all group shadow-sm hover:shadow"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-[#1b4332] dark:text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[22px]">{h.icon}</span>
          </div>
          <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{h.title}</h4>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{h.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

// --- WeatherWidget ---
export const WeatherWidget: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-800 to-[#1b4332] text-white rounded-2xl p-4 my-4 shadow-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
          <span className="material-symbols-outlined text-[28px] text-amber-300">partly_cloudy_day</span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-headline">28°C</span>
            <span className="text-xs text-emerald-200">Misty Morning</span>
          </div>
          <p className="text-xs text-emerald-100/90 mt-0.5">Dandeli Forest & Kali Valley: Ideal for Rafting</p>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-block px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-medium backdrop-blur-sm">
          Water Level: Optimal
        </span>
      </div>
    </div>
  );
};

// --- TourismGuideSection ---
export const TourismGuideSection: React.FC = () => {
  const guidePoints = [
    { title: 'Best Time to Visit', desc: 'October to May for white-water rafting, wildlife spotting, and jungle trekking in dry forest canopy.' },
    { title: 'Kali River Rapids', desc: '9 km stretch with 9 thrilling grade 2 to grade 3+ rapids guided by certified international instructors.' },
    { title: 'Anshi National Park', desc: 'Part of Kali Tiger Reserve, home to black panthers, barking deer, hornbills, and rare orchids.' },
    { title: 'Local Cuisine', desc: 'Savor traditional North Karnataka thalis, Jolada rotti, and fresh river fish curry at local homestays.' }
  ];

  return (
    <div className="bg-white dark:bg-stone-800/90 rounded-3xl p-6 border border-stone-200/70 dark:border-stone-700/60 my-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#1b4332] dark:text-emerald-400 flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">explore</span>
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-white font-headline">
          About Dandeli & Travel Tips
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guidePoints.map((point, index) => (
          <div key={index} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-700/40 border border-stone-100 dark:border-stone-700">
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332] dark:bg-emerald-400"></span>
              {point.title}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{point.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- TestimonialsSection ---
export const TestimonialsSection: React.FC = () => {
  const reviews = [
    { name: 'Aditya Rao', from: 'Bengaluru', rating: 5, comment: 'The Kali River rafting and hornbill resort treehouse stay was breathtaking. Best weekend adventure trip!' },
    { name: 'Priya Sharma', from: 'Pune', rating: 5, comment: 'DandeliTours arranged our family package with zero hassle. Food was authentic and the night safari was unforgettable.' }
  ];

  return (
    <div className="my-6">
      <h3 className="text-base font-bold text-stone-900 dark:text-white mb-3 font-headline flex items-center gap-2">
        <span className="material-symbols-outlined text-amber-500 text-[20px]">star</span>
        Traveler Stories
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-white dark:bg-stone-800 p-4 rounded-2xl border border-stone-200/70 dark:border-stone-700 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">{rev.name}</h4>
                <p className="text-[10px] text-stone-400">{rev.from}</p>
              </div>
              <div className="flex text-amber-400 text-xs">
                {'★'.repeat(rev.rating)}
              </div>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- StayCard ---
interface StayCardProps {
  stay: Stay;
  onSelect: (stay: Stay) => void;
  onBookNow: (stay: Stay) => void;
}

export const StayCard: React.FC<StayCardProps> = ({ stay, onSelect, onBookNow }) => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden border border-stone-200/70 dark:border-stone-700 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      <div className="relative h-52 overflow-hidden cursor-pointer" onClick={() => onSelect(stay)}>
        <img
          src={stay.image}
          alt={stay.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {stay.badges?.map((badge, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#1b4332] text-white tracking-wide uppercase shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="absolute top-3 right-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-amber-500 text-[14px]">star</span>
          <span>{stay.rating}</span>
          <span className="text-stone-400 text-[10px]">({stay.reviewCount})</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block mb-0.5">
            {stay.category}
          </span>
          <h3 className="text-base font-bold leading-snug line-clamp-1">{stay.title}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mb-2.5">{stay.subtitle}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {stay.amenities?.slice(0, 3).map((amenity, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300 text-[11px] font-medium"
              >
                {amenity}
              </span>
            ))}
          </div>

          {stay.scarcityText && (
            <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
              {stay.scarcityText}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              {stay.originalPrice && (
                <span className="text-xs text-stone-400 line-through">₹{stay.originalPrice}</span>
              )}
              <span className="text-lg font-bold text-stone-900 dark:text-white font-headline">
                ₹{stay.price}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">{stay.priceUnit || '/ night'}</span>
            </div>
            {stay.taxesText && (
              <span className="text-[10px] text-stone-400 block">{stay.taxesText}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(stay)}
              className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onBookNow(stay)}
              className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ActivityCard ---
interface ActivityCardProps {
  activity: Activity;
  onBook: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onBook }) => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden border border-stone-200/70 dark:border-stone-700 shadow-sm flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-amber-500 text-[14px]">star</span>
          <span>{activity.rating}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
            {activity.duration} • {activity.difficulty}
          </span>
          <h3 className="text-base font-bold leading-snug">{activity.title}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mb-3 leading-relaxed">
          {activity.description}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700">
          <div>
            <span className="text-base font-bold text-stone-900 dark:text-white font-headline">₹{activity.price}</span>
            <span className="text-xs text-stone-400"> / person</span>
          </div>
          <button
            onClick={() => onBook(activity)}
            className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PackageCard ---
interface PackageCardProps {
  packageItem: PackageItem;
  onBook: (pkg: PackageItem) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packageItem, onBook }) => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden border border-stone-200/70 dark:border-stone-700 shadow-sm flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={packageItem.image}
          alt={packageItem.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
          {packageItem.duration}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-base font-bold leading-snug">{packageItem.title}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mb-3 leading-relaxed">
            {packageItem.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {packageItem.highlights?.slice(0, 3).map((h, i) => (
              <span key={i} className="text-[10px] bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md">
                • {h}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700">
          <div>
            <span className="text-base font-bold text-stone-900 dark:text-white font-headline">₹{packageItem.price}</span>
            <span className="text-xs text-stone-400"> / person</span>
          </div>
          <button
            onClick={() => onBook(packageItem)}
            className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Select Package
          </button>
        </div>
      </div>
    </div>
  );
};

// --- BookingCard ---
interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 border border-stone-200/70 dark:border-stone-700 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {booking.status.toUpperCase()}
          </span>
          <span className="text-xs font-mono text-stone-400">{booking.bookingRef}</span>
        </div>
        <h4 className="text-sm font-bold text-stone-900 dark:text-white">{booking.title}</h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
          Dates: {booking.dates} • {booking.guests} Guests
        </p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <span className="text-base font-bold text-stone-900 dark:text-white">₹{booking.amount}</span>
        <button
          onClick={() => onCancel(booking.id)}
          className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 dark:border-rose-800 dark:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// --- MapViewModal ---
interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapViewModal: React.FC<MapViewModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const pins = [
    { title: 'Kali River Rafting Point', location: 'Ganeshgudi', desc: 'Main whitewater launch site with grade 3+ rapids' },
    { title: 'Hornbill River Resort', location: 'Riverbank', desc: 'Luxury canopy treehouses overlooking the river' },
    { title: 'Syntheri Rocks', location: 'Gund', desc: 'Monolithic granite structure with Kaneri river water hollows' },
    { title: 'Kali Tiger Reserve Buffer', location: 'Anshi', desc: 'Leopard & Black Panther safari core zone' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full p-5 shadow-xl border border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1b4332] dark:text-emerald-400">map</span>
            <h3 className="font-bold text-base text-stone-900 dark:text-white">Dandeli Valley Explorer</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="h-44 rounded-2xl bg-stone-100 dark:bg-stone-700 relative overflow-hidden mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#1b4332_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
          <div className="text-center p-4">
            <span className="material-symbols-outlined text-4xl text-[#1b4332] dark:text-emerald-400 mb-1">location_on</span>
            <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">Western Ghats • Dandeli, Karnataka</p>
            <p className="text-[10px] text-stone-500">15.2361° N, 74.6173° E</p>
          </div>
        </div>

        <div className="space-y-2">
          {pins.map((pin, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-700/50 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">place</span>
              <div>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">{pin.title}</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">{pin.location} — {pin.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ModifySearchModal ---
interface ModifySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchParams: SearchParams;
  onSave: (params: SearchParams) => void;
}

export const ModifySearchModal: React.FC<ModifySearchModalProps> = ({ isOpen, onClose, searchParams, onSave }) => {
  const [params, setParams] = useState(searchParams);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-md w-full p-5 shadow-xl border border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-stone-900 dark:text-white">Modify Stay Search</h3>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold block mb-1 text-stone-700 dark:text-stone-300">Location</label>
            <input
              type="text"
              value={params.location}
              onChange={(e) => setParams({ ...params, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-stone-700 dark:text-stone-300">Check In</label>
              <input
                type="date"
                value={params.checkIn}
                onChange={(e) => setParams({ ...params, checkIn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-stone-700 dark:text-stone-300">Check Out</label>
              <input
                type="date"
                value={params.checkOut}
                onChange={(e) => setParams({ ...params, checkOut: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold block mb-1 text-stone-700 dark:text-stone-300">Guests</label>
              <input
                type="number"
                min="1"
                max="20"
                value={params.guests}
                onChange={(e) => setParams({ ...params, guests: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-semibold block mb-1 text-stone-700 dark:text-stone-300">Rooms</label>
              <input
                type="number"
                min="1"
                max="10"
                value={params.rooms}
                onChange={(e) => setParams({ ...params, rooms: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
              />
            </div>
          </div>

          <button
            onClick={() => {
              onSave(params);
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs mt-2"
          >
            Update Search
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MenuDrawer ---
interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType) => void;
  onOpenAiConcierge: () => void;
  onOpenMap: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAiConcierge,
  onOpenMap
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-72 bg-white dark:bg-stone-900 h-full p-5 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
            <span className="font-bold text-lg text-stone-900 dark:text-white font-headline">DandeliTours</span>
            <button onClick={onClose} className="p-1 rounded-full text-stone-400">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="mt-4 space-y-1 text-sm font-semibold text-stone-700 dark:text-stone-300">
            {[
              { id: 'explore' as TabType, label: 'Home & Explore', icon: 'explore' },
              { id: 'stays' as TabType, label: 'Resorts & Stays', icon: 'cottage' },
              { id: 'activities' as TabType, label: 'Rafting & Activities', icon: 'kayaking' },
              { id: 'packages' as TabType, label: 'Holiday Packages', icon: 'inventory_2' },
              { id: 'bookings' as TabType, label: 'My Bookings', icon: 'receipt_long' },
              { id: 'about' as TabType, label: 'About Dandeli', icon: 'info' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left"
              >
                <span className="material-symbols-outlined text-[20px] text-emerald-600">{item.icon}</span>
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                onOpenMap();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-emerald-600">map</span>
              Interactive Map
            </button>

            <button
              onClick={() => {
                onOpenAiConcierge();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#1b4332] dark:text-emerald-300 transition-colors text-left font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              AI Trip Concierge
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-500">
          <p className="font-bold text-stone-800 dark:text-stone-200">24/7 Dandeli Travel Desk</p>
          <p className="mt-1">+91 94800 12345 • info@dandelitours.in</p>
        </div>
      </div>
    </div>
  );
};

// --- AiConciergeModal ---
interface AiConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConciergeModal: React.FC<AiConciergeModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch('/api/ai-recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query })
      });
      const data = await res.json();
      setResponse(data.recommendation || 'Dandeli is optimal for white-water rafting, hornbill watching, and jungle safaris between October and May. Choose riverside camps in Ganeshgudi for direct river access.');
    } catch {
      setResponse('Dandeli is optimal for white-water rafting, hornbill watching, and jungle safaris between October and May. Choose riverside camps in Ganeshgudi for direct river access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full p-5 shadow-xl border border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1b4332] dark:text-emerald-400">smart_toy</span>
            <h3 className="font-bold text-base text-stone-900 dark:text-white">Dandeli AI Concierge</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 mb-3">
          Ask questions about white-water rafting grades, safari timing, packing lists, or best seasons to visit.
        </p>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. When is the best time for grade 3 rafting?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-900 dark:text-white"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className="px-4 py-2 bg-[#1b4332] text-white rounded-xl text-xs font-bold disabled:opacity-50"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>

          {response && (
            <div className="p-3.5 bg-stone-50 dark:bg-stone-700/50 rounded-2xl border border-stone-200/60 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 leading-relaxed max-h-60 overflow-y-auto">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- PackageBookingModal ---
interface PackageBookingModalProps {
  packageItem: PackageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pkg: PackageItem, guests: number) => void;
}

export const PackageBookingModal: React.FC<PackageBookingModalProps> = ({
  packageItem,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [guests, setGuests] = useState(2);
  if (!isOpen || !packageItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-md w-full p-5 shadow-xl border border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-stone-900 dark:text-white">Book All-Inclusive Package</h3>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">{packageItem.title}</h4>
            <p className="text-stone-500">{packageItem.duration} • ₹{packageItem.price} per person</p>
          </div>

          <div>
            <label className="font-semibold block mb-1 text-stone-700 dark:text-stone-300">Number of Travelers</label>
            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white"
            />
          </div>

          <div className="p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl flex justify-between items-center font-bold">
            <span>Total Payable:</span>
            <span className="text-base text-[#1b4332] dark:text-emerald-400">₹{packageItem.price * guests}</span>
          </div>

          <button
            onClick={() => {
              onConfirm(packageItem, guests);
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-[#1b4332] text-white font-bold text-xs"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

// --- PropertyDetailsModal ---
interface PropertyDetailsModalProps {
  stay: Stay | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (stay: Stay) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  stay,
  isOpen,
  onClose,
  onBookNow
}) => {
  if (!isOpen || !stay) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{stay.category}</span>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white font-headline">{stay.title}</h2>
            <p className="text-xs text-stone-500">{stay.location}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-stone-400 hover:text-stone-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
          <img src={stay.image} alt={stay.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4 text-xs text-stone-700 dark:text-stone-300">
          <div>
            <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-1">About this stay</h4>
            <p className="leading-relaxed">{stay.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2">Amenities & Highlights</h4>
            <div className="grid grid-cols-2 gap-2">
              {stay.amenities?.map((a, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-700/50">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-stone-900 dark:text-white font-headline">₹{stay.price}</span>
              <span className="text-xs text-stone-500"> {stay.priceUnit || '/ night'}</span>
            </div>
            <button
              onClick={() => {
                onBookNow(stay);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-bold text-sm shadow-md transition-colors"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- AboutView ---
export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="bg-white dark:bg-stone-800 rounded-3xl p-6 border border-stone-200 dark:border-stone-700 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900 dark:text-white font-headline mb-3">About Dandeli Wilderness</h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
          Dandeli is Karnataka's premier eco-adventure sanctuary, cradled along the white-water rapids of the Kali River in the Western Ghats. Known for black panther sightings, vibrant Great Pied Hornbills, and rugged deciduous forests, Dandeli offers nature lovers, rafters, and families an unmatched wilderness getaway.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-stone-50 dark:bg-stone-700/40 rounded-2xl">
            <h4 className="font-bold text-stone-900 dark:text-white mb-1">Kali River Rapids</h4>
            <p className="text-stone-500">World-class grade 2 to grade 3+ whitewater rapids suitable for both novices and seasoned rafters.</p>
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-700/40 rounded-2xl">
            <h4 className="font-bold text-stone-900 dark:text-white mb-1">Wildlife Sanctuary</h4>
            <p className="text-stone-500">Part of the Kali Tiger Reserve, harboring tigers, leopards, Indian bison, and over 300 bird species.</p>
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-700/40 rounded-2xl">
            <h4 className="font-bold text-stone-900 dark:text-white mb-1">Verified Stays</h4>
            <p className="text-stone-500">Every resort, campsite, and treehouse is safety-audited with direct river and guide access.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [stays] = useState<Stay[]>(INITIAL_STAYS);
  const [activities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [packages] = useState<PackageItem[]>(INITIAL_PACKAGES);
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
  const [priceFilter, setPriceFilter] = useState('all');

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

  const categories = ['All', 'Luxury Resorts', 'Riverside Camps', 'Treehouses', 'Nature Homestays'];

  const filteredStays = stays
    .filter((stay) => {
      if (selectedCategory !== 'All' && stay.category !== selectedCategory) return false;
      if (priceFilter === 'under3k') return stay.price < 3000;
      if (priceFilter === '3kto5k') return stay.price >= 3000 && stay.price <= 5000;
      if (priceFilter === 'above5k') return stay.price > 5000;
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === 'Price: Low to High') return a.price - b.price;
      if (selectedSort === 'Rating: High to Low') return b.rating - a.rating;
      return 0;
    });

  const handleBookStay = (stay: Stay) => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      title: stay.title,
      dates: `${searchParams.checkIn} to ${searchParams.checkOut}`,
      guests: searchParams.guests,
      amount: stay.price * 2,
      status: 'confirmed',
      bookingRef: `DND-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setBookings([newBooking, ...bookings]);
    setActiveTab('bookings');
  };

  const handleBookActivity = (act: Activity) => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      title: act.title,
      dates: searchParams.checkIn,
      guests: searchParams.guests,
      amount: act.price * searchParams.guests,
      status: 'confirmed',
      bookingRef: `ACT-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setBookings([newBooking, ...bookings]);
    setActiveTab('bookings');
  };

  const handleBookPackage = (pkg: PackageItem, guestsCount: number) => {
    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      title: pkg.title,
      dates: searchParams.checkIn,
      guests: guestsCount,
      amount: pkg.price * guestsCount,
      status: 'confirmed',
      bookingRef: `PKG-${Math.floor(100000 + Math.random() * 900000)}`
    };
    setBookings([newBooking, ...bookings]);
    setActiveTab('bookings');
  };

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#121416] text-[#1a1c1e] dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingsCount={bookings.length}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="h-16 shrink-0"></div>

      {/* Main Navigation Tabs */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scrollbar-none">
          {[
            { id: 'explore' as TabType, label: 'Explore' },
            { id: 'stays' as TabType, label: 'Stays' },
            { id: 'activities' as TabType, label: 'Activities' },
            { id: 'packages' as TabType, label: 'Packages' },
            { id: 'bookings' as TabType, label: `Bookings (${bookings.length})` },
            { id: 'about' as TabType, label: 'About' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#1b4332] text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-5 pb-24">
        {activeTab === 'explore' && (
          <div>
            <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg mb-6">
              <img src={heroBannerImage} alt="Dandeli wilderness Kali River" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="px-3 py-1 bg-emerald-600 text-[10px] font-bold tracking-wider uppercase rounded-full w-fit mb-2">
                  Welcome to Dandeli
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold font-headline leading-tight">
                  River Rapids, Jungle Canopy & Wildlife Stays
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-xl">
                  Book verified riverfront camps, luxury treehouses, and grade 3 whitewater rafting guided by local experts.
                </p>
              </div>
            </div>

            <WeatherWidget />
            <HomeQuickHighlights onSelectHighlight={(cat) => {
              if (cat === 'Activities') setActiveTab('activities');
              else {
                setSelectedCategory(cat);
                setActiveTab('stays');
              }
            }} />
            <TourismGuideSection />
            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'stays' && (
          <div className="space-y-4">
            <SearchSummaryBar
              location={searchParams.location}
              dates={`${searchParams.checkIn} - ${searchParams.checkOut}`}
              guests={searchParams.guests}
              rooms={searchParams.rooms}
              onModify={() => setIsSearchModalOpen(true)}
            />

            <CategoryChips
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <FilterSortBar
              selectedSort={selectedSort}
              onSelectSort={setSelectedSort}
              priceFilter={priceFilter}
              onPriceFilterChange={setPriceFilter}
              onOpenMap={() => setIsMapOpen(true)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {filteredStays.map((stay) => (
                <StayCard
                  key={stay.id}
                  stay={stay}
                  onSelect={setSelectedStay}
                  onBookNow={handleBookStay}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activities' && (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white font-headline">Dandeli Adventure Activities</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">Certified guides and international-grade safety equipment included.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activities.map((act) => (
                <ActivityCard key={act.id} activity={act} onBook={handleBookActivity} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'packages' && (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white font-headline">All-Inclusive Holiday Packages</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">Accommodation, all meals, rafting, and jungle safari bundled at guaranteed best rates.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} packageItem={pkg} onBook={setSelectedPackage} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white font-headline">My Active Reservations</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">Present your booking confirmation code at resort check-in.</p>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700">
                <span className="material-symbols-outlined text-5xl text-stone-300">receipt_long</span>
                <p className="text-sm font-bold text-stone-700 dark:text-stone-300 mt-2">No active bookings yet</p>
                <button onClick={() => setActiveTab('stays')} className="mt-3 px-4 py-2 bg-[#1b4332] text-white rounded-xl text-xs font-bold">
                  Browse Stays
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <BookingCard key={b.id} booking={b} onCancel={handleCancelBooking} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Modals */}
      <PropertyDetailsModal
        stay={selectedStay}
        isOpen={!!selectedStay}
        onClose={() => setSelectedStay(null)}
        onBookNow={handleBookStay}
      />

      <MapViewModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

      <ModifySearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        searchParams={searchParams}
        onSave={setSearchParams}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setActiveTab}
        onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
        onOpenMap={() => setIsMapOpen(true)}
      />

      <AiConciergeModal
        isOpen={isAiConciergeOpen}
        onClose={() => setIsAiConciergeOpen(false)}
      />

      <PackageBookingModal
        packageItem={selectedPackage}
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onConfirm={handleBookPackage}
      />
    </div>
  );
}
