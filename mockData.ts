import { Stay, Activity, PackageItem, Booking } from '../types';

export const INITIAL_STAYS: Stay[] = [
  {
    id: 'stay-1',
    title: 'Hornbill River Resort & Treehouses',
    subtitle: 'River View Deluxe Cottage with Balcony',
    category: 'Luxury Resorts',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0S790XoEZUF80A5zVImTxzLdIGB2P4HMeNKiYqXYZayRx1Xd-YYEtqJ5cbZ2x0LlruIB3qwSPMK4oimZ66_qtgRNd9L3ukTV0WQZyArw1iEvrUOFcljDr8zWabiywYMK0lc3jLWryd14pE0GHq9L94QEcTj4DffpnP6GTYpFTKrmK9dpgLBLVLVliej99WSo767nurqBH0qp5_XBTvY8P27khBd2YYmkTkL9gsurxDLtKGTpysphe',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0S790XoEZUF80A5zVImTxzLdIGB2P4HMeNKiYqXYZayRx1Xd-YYEtqJ5cbZ2x0LlruIB3qwSPMK4oimZ66_qtgRNd9L3ukTV0WQZyArw1iEvrUOFcljDr8zWabiywYMK0lc3jLWryd14pE0GHq9L94QEcTj4DffpnP6GTYpFTKrmK9dpgLBLVLVliej99WSo767nurqBH0qp5_XBTvY8P27khBd2YYmkTkL9gsurxDLtKGTpysphe',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 342,
    badges: ['Riverfront', 'Featured'],
    features: ['1 King Bed', 'Max 3 Guests', '380 sq.ft'],
    amenities: ['Free Breakfast', 'Infinity Pool', 'Bonfire Night', 'Nature Walk', 'Kayaking Access', 'Free Wi-Fi'],
    scarcityText: 'Only 2 rooms left for your dates!',
    policyText: 'Free cancellation up to 48 hrs before check-in',
    originalPrice: 5500,
    price: 4200,
    priceUnit: '/ night',
    taxesText: '+ ₹504 Taxes & fees',
    description: 'Perched on the banks of the majestic Kali River, Hornbill River Resort offers luxurious treehouses and wooden cottages immersed in the dense Western Ghats canopy. Enjoy morning mist views, guided bird watching, and world-class hospitality.',
    location: 'Ganeshgudi, Kali River Bank, Dandeli',
    roomsLeft: 2
  },
  {
    id: 'stay-2',
    title: 'Dandeli Jungle Nest Wildlife Camp',
    subtitle: 'Safari Glamping Tent with Attached Bath',
    category: 'Riverside Camps',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtqkr5ZlwJj33dJgepTHvWyvCGSN72fkveCJOkTDA08cB4eKXS65W-Ptwkn0B0daAmRsKlFnMAdCY1-dSgxg6AqP3MMPwVDjyHFvRN5wd_tkJf8Pf92uZRfo_6qNT_jweIScR6WZEs0yXJ1AVY-rq-GFXkrcxQvl-bbI22gTxzxibD0JgN3nHXoYRrEkbbh3fLHxXc0vM0DoISOjbkI1Gms3zL9pKs_kz_TarMPAMlHAY_TGiA_YOG',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAtqkr5ZlwJj33dJgepTHvWyvCGSN72fkveCJOkTDA08cB4eKXS65W-Ptwkn0B0daAmRsKlFnMAdCY1-dSgxg6AqP3MMPwVDjyHFvRN5wd_tkJf8Pf92uZRfo_6qNT_jweIScR6WZEs0yXJ1AVY-rq-GFXkrcxQvl-bbI22gTxzxibD0JgN3nHXoYRrEkbbh3fLHxXc0vM0DoISOjbkI1Gms3zL9pKs_kz_TarMPAMlHAY_TGiA_YOG',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 219,
    badges: ['Eco Lodge'],
    features: ['Queen Bed', 'Private Deck', 'Forest Perimeter'],
    amenities: ['All Meals Included (Veg/Non-Veg)', 'Bird Watching Walk', 'Campfire Included', 'Safari Guide'],
    scarcityText: 'High demand for weekend safari tours',
    policyText: 'Free cancellation up to 24 hours prior',
    price: 2600,
    priceUnit: '/ person / night',
    taxesText: 'Includes all 3 meals & trek',
    description: 'Experience authentic wildlife camping at the edge of the Dandeli Wildlife Sanctuary. Spacious weather-proof glamping tents equipped with comfortable bedding, attached modern washrooms, and private wooden verandas.',
    location: 'Anshi Reserve Buffer Zone, Dandeli',
    roomsLeft: 5
  },
  {
    id: 'stay-3',
    title: 'Kali Wilderness Riverside Retreat',
    subtitle: 'Riverfront Wooden Chalet',
    category: 'Riverside Camps',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvimPdL1_o4Z7rKhGNjse2CvASRIYevSSum3qbsGUlU51XSjSENV-bXD1_NDBk-moWTCwHlh2OXUNaQbUnrsTBnFdwLNJoXGEuoCZMRLKDKreWnfDJc9jvbxKq9YEY89wEuKxmJkg9OT6QCvxPMkVOoeRSkuVLJL-wxSK2orfis8p_gesXFXa2i-3t82dUGoh4eN_U4xq14wW28SVdVLmWLrd2xKt9HvtR2MysR6Tv5egf4XtteDwc',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvimPdL1_o4Z7rKhGNjse2CvASRIYevSSum3qbsGUlU51XSjSENV-bXD1_NDBk-moWTCwHlh2OXUNaQbUnrsTBnFdwLNJoXGEuoCZMRLKDKreWnfDJc9jvbxKq9YEY89wEuKxpJkg9OT6QCvxPMkVOoeRSkuVLJL-wxSK2orfis8p_gesXFXa2i-3t82dUGoh4eN_U4xq14wW28SVdVLmWLrd2xKt9HvtR2MysR6Tv5egf4XtteDwc',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 180,
    badges: ['River Activity Access'],
    features: ['Teak Wood Balcony', 'River View', 'Attached Bath'],
    amenities: ['Direct Kali River Access', 'Complimentary Coracle Ride', 'Free Breakfast', 'Bonfire'],
    policyText: 'Flexible cancellation policy',
    price: 3500,
    priceUnit: '/ night',
    taxesText: '+ Taxes • Free Breakfast',
    description: 'A secluded wooden chalet retreat designed for nature lovers and adventure seekers alike. Wake up to the soothing sound of rapids and enjoy direct access to river kayaking and coracle rides right from your doorstep.',
    location: 'Kali River Rapids Zone, Dandeli',
    roomsLeft: 3
  },
  {
    id: 'stay-4',
    title: 'Silver Cascade Canopy Homestay',
    subtitle: 'Traditional Malnad Villa with Spice Garden',
    category: 'Cozy Homestays',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 94,
    badges: ['Host Pick'],
    features: ['2 Queen Beds • 4 Guests', 'Veranda', 'Home-cooked Meals'],
    amenities: ['Authentic Malnad Food', 'Coffee Plantation Tour', 'Bonfire', 'Indoor Games'],
    price: 2800,
    priceUnit: '/ night',
    taxesText: 'Includes Breakfast & Dinner',
    description: 'Experience genuine hospitality in a traditional ancestral home surrounded by lush Arecanut and spice plantations. Savour authentic Malnad cuisine prepared with local farm-fresh spices.',
    location: 'Joida Road, Dandeli Outskirts',
    roomsLeft: 2
  },
  {
    id: 'stay-5',
    title: 'Syntheri Rock Jungle Cottages',
    subtitle: 'Granite Valley View Cottage',
    category: 'Jungle Cottages',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    reviewCount: 112,
    badges: ['Scenic View'],
    features: ['King Bed • Valley View', 'Private Balcony'],
    amenities: ['Guided Trek to Syntheri Rocks', 'Campfire', 'Parking', 'Restaurant'],
    price: 3200,
    priceUnit: '/ night',
    taxesText: '+ Taxes',
    description: 'Located close to the magnificent 300ft monolithic granite monolith of Syntheri Rocks. Perfect base for trekking enthusiasts and nature photographers.',
    location: 'Near Syntheri Rocks, Dandeli',
    roomsLeft: 4
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Kali River White-Water Rafting (Grade III)',
    category: 'Water Sports',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 1420,
    duration: '3.5 Hours',
    difficulty: 'Intense',
    price: 1350,
    description: 'Conquer the thrilling rapids of the Kali River with certified international rafting instructors. Includes 12km of turbulent white-water rapids, safety briefing, gear, and GoPro action photos.',
    highlights: ['12km Rapids Run', 'Certified Instructors', 'All Safety Gear Included', 'Complimentary Action Photos']
  },
  {
    id: 'act-2',
    title: 'Dandeli Wildlife Jeep Safari & Night Trail',
    category: 'Wildlife Safari',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 890,
    duration: '4 Hours',
    difficulty: 'Moderate',
    price: 950,
    description: 'Explore the dense deciduous forests of Anshi-Dandeli Tiger Reserve in an open-top 4x4 Jeep with expert naturalists. Spot Black Panthers, Hornbills, Indian Bisons, and spotted deer.',
    highlights: ['Open 4x4 Safari Vehicle', 'Government Certified Naturalist', 'Binoculars Provided', 'Morning & Evening Slots']
  },
  {
    id: 'act-3',
    title: 'Traditional Coracle Boat Ride & Natural Jacuzzi',
    category: 'Water Sports',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewCount: 650,
    duration: '2 Hours',
    difficulty: 'Easy',
    price: 600,
    description: 'Float gently in circular wicker coracle boats along calm stretches of the Kali River, followed by an exhilarating natural water jacuzzi bath in the river rapids.',
    highlights: ['Traditional Basket Boat Ride', 'Natural River Jacuzzi', 'Life Jackets Mandatory', 'Great for Families']
  },
  {
    id: 'act-4',
    title: 'Kavala Caves Spelunking & Trek',
    category: 'Trekking',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 310,
    duration: '5 Hours',
    difficulty: 'Moderate',
    price: 800,
    description: 'Trek through 4km of dense bamboo forest leading up to ancient limestone volcanic caves. Climb down 375 metal steps into the dark subterranean sanctum housing a natural Shiva lingam.',
    highlights: ['Ancient Volcanic Caves', 'Guided Jungle Trek', 'Torch Lights Provided', 'Panoramic Valley Views']
  },
  {
    id: 'act-5',
    title: 'Zipline Across Kali River Gorge',
    category: 'Water Sports',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 520,
    duration: '45 Mins',
    difficulty: 'Moderate',
    price: 750,
    description: 'Soar high above the emerald waters of Kali River on a thrilling 500-meter zipline cable run with breathtaking panoramic views of the Western Ghats.',
    highlights: ['500-meter Aerial Glide', 'International Safety Harness', 'Professional Instructors']
  }
];

export const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-student',
    title: '🎓 Dandeli Student Explorer Camp (1N/2D)',
    duration: '1 Night / 2 Days',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 310,
    inclusions: [
      '1 Night Jungle Glamping Tent Stay',
      '3 Nutritious Meals (Veg & Non-Veg Buffet)',
      'Kali River Rafting & Safety Gear',
      'Campfire with Music & Team Games',
      'Guided Nature & Bird Watching Walk',
      'Student Group Discount & ID Verification'
    ],
    originalPrice: 4500,
    price: 2999,
    description: 'Specially designed budget-friendly adventure package for college and school student groups looking for thrilling whitewater rafting and wilderness camping.'
  },
  {
    id: 'pkg-group',
    title: '👥 Group Squad Adrenaline Thrill Pass (2N/3D)',
    duration: '2 Nights / 3 Days',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 245,
    inclusions: [
      '2 Nights Riverside Wooden Chalets',
      'All 6 Meals & Evening Barbecue',
      'Grade III White-Water Rafting Expedition',
      'Anshi-Dandeli Jeep Safari for the Squad',
      'Zipline Across River Gorge',
      'Coracle Ride & Natural Jacuzzi'
    ],
    originalPrice: 11999,
    price: 8999,
    description: 'The ultimate group adventure package for friends and corporate teams seeking team bonding, high-adrenaline water sports, and campfires.'
  },
  {
    id: 'pkg-family',
    title: '👨‍👩‍👧‍👦 Family Heritage & Wilderness Holiday (3N/4D)',
    duration: '3 Nights / 4 Days',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 198,
    inclusions: [
      '3 Nights Family Cottage Accommodation',
      'All Meals featuring Authentic Malnad Cuisine',
      'Safe Family Coracle Boat Ride',
      'Guided Coffee Plantation & Spice Tour',
      'Kavala Caves Family Trek',
      'Complimentary Kids Activities & Board Games'
    ],
    originalPrice: 15500,
    price: 11499,
    description: 'A wholesome, relaxing multi-day holiday tailored for families with children and seniors, combining comfortable eco-stays with cultural and nature experiences.'
  },
  {
    id: 'pkg-couple',
    title: '❤️ Romantic Riverside Treehouse Getaway (2N/3D)',
    duration: '2 Nights / 3 Days',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewCount: 142,
    inclusions: [
      '2 Nights Luxury Treehouse Stay with Balcony',
      'Candlelight Riverside Dinner under the Stars',
      'Private Coracle Ride on Kali River',
      'Flower Bed Decoration & Welcome Mocktails',
      'All Meals & Breakfast in Bed Service'
    ],
    originalPrice: 14000,
    price: 10999,
    description: 'Designed exclusively for couples seeking tranquil luxury amidst the misty canopy of Dandeli with private dining and romantic touches.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingCode: 'DT-849201',
    itemName: 'Hornbill River Resort & Treehouses',
    itemType: 'stay',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0S790XoEZUF80A5zVImTxzLdIGB2P4HMeNKiYqXYZayRx1Xd-YYEtqJ5cbZ2x0LlruIB3qwSPMK4oimZ66_qtgRNd9L3ukTV0WQZyArw1iEvrUOFcljDr8zWabiywYMK0lc3jLWryd14pE0GHq9L94QEcTj4DffpnP6GTYpFTKrmK9dpgLBLVLVliej99WSo767nurqBH0qp5_XBTvY8P27khBd2YYmkTkL9gsurxDLtKGTpysphe',
    dates: '18 Oct – 20 Oct 2026',
    guests: '2 Guests • 1 Room',
    totalPrice: 8904,
    status: 'Confirmed',
    createdAt: '2026-09-01',
    location: 'Ganeshgudi, Kali River Bank, Dandeli'
  },
  {
    id: 'bk-102',
    bookingCode: 'DT-736291',
    itemName: 'Kali River White-Water Rafting (Grade III)',
    itemType: 'activity',
    image: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1200&q=80',
    dates: '19 Oct 2026 (09:00 AM)',
    guests: '2 Persons',
    totalPrice: 2700,
    status: 'Confirmed',
    createdAt: '2026-09-02',
    location: 'Dandeli Rafting Start Point'
  }
];
