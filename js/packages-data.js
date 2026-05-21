const siteData = {
  hajjPackages: [
    {
      id: "hajj-economy",
      name: "Economy Hajj Package",
      type: "economy",
      price: "$4,500",
      rawPrice: 4500,
      duration: "14 Days",
      hotel: "Al Shohada Hotel (3-Star, 800m from Haram)",
      flight: "Direct Economy Flight (PIA / AirBlue)",
      food: "3 Buffet Meals Daily (Continental & Asian)",
      transport: "Air-Conditioned Shuttle Bus",
      visa: "Hajj Visa & Insurance Included",
      ziyarat: "Makkah & Madinah Holy Sites Tour",
      rating: 4.6,
      badge: "Best Value"
    },
    {
      id: "hajj-family",
      name: "Family Spiritual Package",
      type: "family",
      price: "$6,200",
      rawPrice: 6200,
      duration: "15 Days",
      hotel: "Swissôtel Makkah (4-Star Family Quad Rooms)",
      flight: "Direct Flight (Saudi Airlines / PIA)",
      food: "Buffet Breakfast & Dinner",
      transport: "Private Coaster for Family Tours",
      visa: "Complete Visa & Medical Insurance",
      ziyarat: "Guided Family Tours with Islamic Scholar",
      rating: 4.8,
      badge: "Family Favorite"
    },
    {
      id: "hajj-vip",
      name: "VIP Elite Hajj Package",
      type: "vip",
      price: "$12,500",
      rawPrice: 12500,
      duration: "21 Days",
      hotel: "Fairmont Makkah Clock Royal Tower (5-Star Kaaba View)",
      flight: "Business Class Flights (Emirates / Qatar)",
      food: "5-Star Fine Dining Buffets",
      transport: "Luxury Private GMC Yukon / Mercedes VIP Vans",
      visa: "Priority Express Visa & VIP Services",
      ziyarat: "Exclusive VIP Historian Guided Ziyarats",
      rating: 4.9,
      badge: "Premium Choice"
    },
    {
      id: "hajj-luxury",
      name: "Luxury 5-Star Golden Gate",
      type: "luxury",
      price: "$15,800",
      rawPrice: 15800,
      duration: "15 Days",
      hotel: "Raffles Makkah Palace (Ultra-Luxury Kaaba View Suites)",
      flight: "First Class Flights (Emirates / Saudia)",
      food: "All-Inclusive Royal Catering",
      transport: "Private Chauffeur Executive Cars",
      visa: "Golden Visa Handling & Lounge Access",
      ziyarat: "Elite Personal Ziyarat Guide & Security Escort",
      rating: 5.0,
      badge: "Ultimate Luxury"
    }
  ],
  umrahPackages: [
    {
      id: "umrah-economy",
      name: "Economy Umrah Essentials",
      type: "economy",
      price: "$1,200",
      rawPrice: 1200,
      duration: "10 Days",
      hotel: "Luluat Al Sharq (3-Star, Shuttled to Haram)",
      flight: "Transit Economy Flight (PIA)",
      food: "Breakfast Buffet Included",
      transport: "Coordinated Bus Transport",
      visa: "Umrah eVisa & Basic Insurance",
      ziyarat: "Group Ziyarat Tour",
      rating: 4.5,
      badge: "Budget-Friendly"
    },
    {
      id: "umrah-15days",
      name: "Classic 15-Days Journey",
      type: "standard",
      price: "$1,850",
      rawPrice: 1850,
      duration: "15 Days",
      hotel: "Dar Al Eiman Royal (4-Star, 300m from Haram)",
      flight: "Direct Flight (Saudi Airlines / PIA)",
      food: "Breakfast & Dinner Buffets",
      transport: "Standard VIP Coaster Service",
      visa: "Umrah eVisa & Health Cover",
      ziyarat: "Detailed Makkah & Madinah Tours",
      rating: 4.7,
      badge: "Most Popular"
    },
    {
      id: "umrah-21days",
      name: "Extended 21-Days Reflection",
      type: "standard",
      price: "$2,400",
      rawPrice: 2400,
      duration: "21 Days",
      hotel: "Pullman Zamzam Makkah (5-Star Tower)",
      flight: "Direct Flight (Saudi Airlines)",
      food: "Half-Board Fine Dining",
      transport: "Executive Shared Bus Service",
      visa: "Premium Umrah eVisa Processing",
      ziyarat: "Makkah, Madinah, and Jeddah Historic Sites",
      rating: 4.8,
      badge: "Best Duration"
    },
    {
      id: "umrah-ramadan",
      name: "Ramadan Holy Nights Umrah",
      type: "ramadan",
      price: "$3,950",
      rawPrice: 3950,
      duration: "15 Days",
      hotel: "Swissôtel Al Maqam Makkah (5-Star Adjacent to Haram)",
      flight: "Direct Flight (Emirates / Saudia)",
      food: "Suhoor & Iftar Buffet Included",
      transport: "VIP Shared Transport Services",
      visa: "Ramadan Umrah Special Visa Processing",
      ziyarat: "Historical Lectures & Guided Ziyarat Tours",
      rating: 4.9,
      badge: "Holy Month Special"
    },
    {
      id: "umrah-vip",
      name: "VIP Royal Umrah Experience",
      type: "vip",
      price: "$8,500",
      rawPrice: 8500,
      duration: "12 Days",
      hotel: "The Oberoi Madinah & Raffles Makkah",
      flight: "First Class Flights (Qatar Airways)",
      food: "All-Inclusive Fine Dining (A La Carte)",
      transport: "Private Luxury Sedan (Mercedes S-Class)",
      visa: "VIP Express Umrah eVisa & Fast Track",
      ziyarat: "Custom-Tailored VIP Historical Excursions",
      rating: 5.0,
      badge: "Elite Sanctuary"
    }
  ],
  holyPlaces: [
    {
      id: "kaaba",
      name: "The Holy Kaaba",
      location: "Masjid Al Haram, Makkah",
      description: "The house of Allah SWT, the focal point of Islamic prayer globally, and the central sanctuary of the Hajj and Umrah pilgrimages.",
      image: "assets/kaaba.jpg",
      highlight: "Heart of Islam",
      bgGradient: "linear-gradient(135deg, #111 0%, #333 100%)",
      coords: { x: 0, y: 0 }
    },
    {
      id: "masjid-al-haram",
      name: "Masjid Al Haram",
      location: "Makkah",
      description: "The Sacred Mosque and the largest mosque in the world, enclosing the Holy Kaaba. It features massive white marble courtyards.",
      image: "assets/masjid_haram.jpg",
      highlight: "The Sacred Mosque",
      bgGradient: "linear-gradient(135deg, #3d3b30 0%, #1f1b0a 100%)",
      coords: { x: 0.5, y: -0.2 }
    },
    {
      id: "masjid-an-nabawi",
      name: "Masjid An Nabawi",
      location: "Madinah Al Munawwarah",
      description: "The Prophet's Mosque, built by Prophet Muhammad (PBUH). Home to the iconic Green Dome where the Prophet is laid to rest.",
      image: "assets/nabawi.jpg",
      highlight: "Prophet's Sanctuary",
      bgGradient: "linear-gradient(135deg, #0f2c1d 0%, #05140d 100%)",
      coords: { x: -0.8, y: 0.5 }
    },
    {
      id: "cave-hira",
      name: "Cave Hira (Jabal Al Noor)",
      location: "Jabal Al Noor, Makkah",
      description: "The cave on the Mountain of Light where Prophet Muhammad (PBUH) received his very first revelation of the Holy Quran.",
      image: "assets/cave_hira.jpg",
      highlight: "Birthplace of Revelation",
      bgGradient: "linear-gradient(135deg, #423826 0%, #1f180e 100%)",
      coords: { x: 1.2, y: 0.8 }
    },
    {
      id: "mina",
      name: "The City of Tents (Mina)",
      location: "East of Makkah",
      description: "The valley of tents where pilgrims stay during Hajj. It plays a critical role in the stoning of the Jamarat ritual.",
      image: "assets/mina.jpg",
      highlight: "Sacred Valley",
      bgGradient: "linear-gradient(135deg, #ebdcb9 0%, #b89865 100%)",
      coords: { x: 0.6, y: -0.9 }
    },
    {
      id: "arafat",
      name: "Mount Arafat",
      location: "Southeast of Makkah",
      description: "The Mount of Mercy, where the Prophet (PBUH) delivered his Farewell Sermon. The Day of Arafah is the pinnacle of Hajj.",
      image: "assets/arafat.jpg",
      highlight: "Pinnacle of Hajj",
      bgGradient: "linear-gradient(135deg, #d3c4a5 0%, #876839 100%)",
      coords: { x: -0.5, y: -1.2 }
    }
  ],
  flights: [
    {
      airline: "Saudi Arabian Airlines",
      logo: "saudia",
      class: "First, Business, Economy",
      rating: 4.8,
      features: "Halal Culinary Catering, Onboard Prayer Area, Luxury Amenities",
      logoColor: "#cda052"
    },
    {
      airline: "Emirates",
      logo: "emirates",
      class: "First, Business, Economy",
      rating: 4.9,
      features: "Award-winning Entertainment, World-class Dining, Lounge Access",
      logoColor: "#d71920"
    },
    {
      airline: "Qatar Airways",
      logo: "qatar",
      class: "Qsuite Business, Economy",
      rating: 4.9,
      features: "5-Star Global Dining, Priority Boarding, High-Comfort Reclining Seats",
      logoColor: "#5c0632"
    },
    {
      airline: "Pakistan International Airlines",
      logo: "pia",
      class: "Executive Economy, Economy",
      rating: 4.3,
      features: "Direct Flights, Traditional Cuisine, Generous Baggage Allowance",
      logoColor: "#006633"
    },
    {
      airline: "AirBlue",
      logo: "airblue",
      class: "Economy High Value",
      rating: 4.2,
      features: "Affordable Fares, Direct Routes, Friendly Cabin Crew Service",
      logoColor: "#003b71"
    }
  ],
  hotels: [
    {
      name: "Fairmont Makkah Clock Royal Tower",
      location: "Makkah (Directly in front of Haram)",
      stars: 5,
      view: "Kaaba & Haram Panorama",
      description: "Rising 76 stories in the Clock Tower, it offers absolute luxury, panoramic prayer rooms, and 5-star service.",
      rating: 4.9,
      highlight: "Unrivaled Kaaba Views"
    },
    {
      name: "Raffles Makkah Palace",
      location: "Abraj Al Bait, Makkah",
      stars: 5,
      view: "Direct Kaaba View Suites",
      description: "An exclusive all-suite hotel overlooking the Grand Mosque. Offers personalized butler service and refined luxury.",
      rating: 5.0,
      highlight: "Personal Butler Service"
    },
    {
      name: "The Oberoi Madinah",
      location: "Madinah (Adjacent to Prophet's Mosque)",
      stars: 5,
      view: "Masjid An Nabawi Green Dome View",
      description: "Exquisite elegance and unrivaled proximity to the Green Dome. Known for world-class hospitality.",
      rating: 4.9,
      highlight: "Close to Prophet's Resting Place"
    },
    {
      name: "Dar Al Taqwa Madinah",
      location: "Madinah (Just steps from the Mosque main gate)",
      stars: 5,
      view: "Haram Courtyard View",
      description: "Combines modern luxury with traditional Arabian hospitality. Perfect for spiritual convenience.",
      rating: 4.8,
      highlight: "Ultimate Location Convenience"
    }
  ],
  testimonials: [
    {
      name: "Dr. Farhan Siddiqui",
      city: "Houston, USA",
      package: "VIP Elite Hajj Package",
      review: "Subhan'Allah, our spiritual journey was flawless. The five-star accommodation at Fairmont and the private GMC transport saved my elderly parents from fatigue. Excellent organization!",
      avatar: "assets/avatar1.jpg"
    },
    {
      name: "Amina & Tariq Mahmood",
      city: "London, UK",
      package: "Classic 15-Days Umrah",
      review: "A dream come true. The booking system was simple, the flights were direct, and our hotel in Madinah had an incredible view of the Prophet's Mosque. JazakAllah Khair!",
      avatar: "assets/avatar2.jpg"
    },
    {
      name: "Fatima Al-Harbi",
      city: "Sydney, Australia",
      package: "Ramadan Holy Nights Umrah",
      review: "Spending the last ten nights of Ramadan in Makkah with the VIP package was breathtaking. The Suhoor & Iftar buffets were royal and the guiding scholar was very knowledgeable.",
      avatar: "assets/avatar3.jpg"
    }
  ],
  faqs: [
    {
      q: "What is the primary difference between Hajj and Umrah?",
      a: "Hajj is a major pilgrimage that is compulsory for every able-bodied Muslim to perform once in their lifetime during the Islamic month of Dhu al-Hijjah. Umrah is a minor, voluntary pilgrimage that can be performed at any time of the year."
    },
    {
      q: "Are flights and visa processing included in all packages?",
      a: "Yes! All our premium and economy packages include complete eVisa processing, medical insurance, standard/first-class flights (as selected), and verified luxury/economy lodging."
    },
    {
      q: "What documents are required to initiate the visa application?",
      a: "You will need a passport valid for at least 6 months, a passport-sized photograph with a white background, proof of vaccination (meningitis, COVID-19 as required by Saudi authorities), and your flight booking details."
    },
    {
      q: "Can we customize our packages (e.g., adding days in Madinah)?",
      a: "Absolutely! Our VIP and Custom packages allow you to choose your own itinerary, extend stays at specific hotels, or select custom flights and private luxury transport. Contact us directly or use our booking form to request customization."
    },
    {
      q: "Will there be a guide (Mutawwif) to assist us during rituals?",
      a: "Yes, our packages include qualified, multilingual scholars and guides who lead the group, conduct educational seminars, and guide you step-by-step through the rituals of Umrah and Hajj."
    }
  ]
};

// Export to window object for browser access
window.siteData = siteData;
