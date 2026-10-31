import { EventFormData, TimelineMilestone, VendorChecklistItem } from '../types';

export const DEMO_PRESETS: Record<string, { label: string; form: EventFormData }> = {
  royal_wedding: {
    label: 'Royal Jaipur Vivah (150 guests • ₹18 Lakhs)',
    form: {
      eventType: 'Wedding / Royal Vivah',
      eventName: 'Ananya & Kabir’s Royal Heritage Wedding',
      targetBudget: 1800000,
      guestCount: 150,
      eventDate: '2026-11-24',
      location: 'Jaipur, Rajasthan / Amer Heritage Courtyard',
      themePreference: 'Royal Marigold, Terracotta & Starlight Velvet',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: true,
      notes:
        'Focus on authentic Rajasthani hospitality (Dal Baati Churma & live tawa counters), live Langa-Manganiyar musicians for welcome, and royal havan mandap.',
    },
  },
  sangeet: {
    label: 'Sangeet & Cocktail Fiesta (120 guests • ₹6.5 Lakhs)',
    form: {
      eventType: 'Sangeet & Cocktail Night',
      eventName: 'Rohan & Meera’s Bollywood Sangeet Night',
      targetBudget: 650000,
      guestCount: 120,
      eventDate: '2026-12-18',
      location: 'Jaipur, Rajasthan / Heritage Lawn & Terrace',
      themePreference: 'Warm Amber, Genda Phool & Mirror-Work Accents',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: false,
      notes:
        'Energetic Sangeet choreography with family dance face-offs, live dhol players for the grand entry, and live chaat chowk stalls.',
    },
  },
  mehendi: {
    label: 'Haldi & Mehendi Garden Fiesta (80 guests • ₹3.2 Lakhs)',
    form: {
      eventType: 'Haldi & Mehendi Fiesta',
      eventName: 'Sunaina’s Sunshine Haldi & Floral Mehendi',
      targetBudget: 320000,
      guestCount: 80,
      eventDate: '2026-11-23',
      location: 'Jaipur / Poolside Garden Pavillion',
      themePreference: 'Sunshine Yellow Genda Phool & Leheriya Drapes',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: true,
      notes:
        'Organic herbal haldi, Sojat henna stations for female guests, traditional Rajasthani puppet show corner, and kulhad masala chai counter.',
    },
  },
  griha_pravesh: {
    label: 'Griha Pravesh & Puja (60 guests • ₹1.8 Lakhs)',
    form: {
      eventType: 'Griha Pravesh (Housewarming)',
      eventName: 'Sharma Family Griha Pravesh & Vastu Shanti',
      targetBudget: 180000,
      guestCount: 60,
      eventDate: '2026-10-30',
      location: 'Jaipur (C-Scheme) / New Residence',
      themePreference: 'Sacred Brass, Mango Leaves & Fresh Mogra Flowers',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: true,
      notes:
        'Vedic Havan ceremony at morning muhurat, traditional satvik lunch for close family and elders, followed by evening housewarming tea reception.',
    },
  },
  birthday: {
    label: 'Milestone 50th Rooftop Soirée (50 guests • ₹1.5 Lakhs)',
    form: {
      eventType: 'Milestone Birthday',
      eventName: 'Vikram’s Golden 50th Milestone Soirée',
      targetBudget: 150000,
      guestCount: 50,
      eventDate: '2026-11-15',
      location: 'Jaipur / Sunset Skyline Terrace',
      themePreference: 'Warm Amber, Edison Filament Lights & Acoustic Ghazals',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: false,
      notes:
        'Intimate gathering of close friends, live acoustic guitar & ghazal set, gourmet live kebabs, wood-fired artisanal pizza, and customized memory tribute montage.',
    },
  },
  cultural_festival: {
    label: 'Diwali & Annakut Cultural Gala (250 guests • ₹4.5 Lakhs)',
    form: {
      eventType: 'Festive Gala (Diwali / Navratri)',
      eventName: 'Deepotsav Community Diwali & Annakut Utsav',
      targetBudget: 450000,
      guestCount: 250,
      eventDate: '2026-11-01',
      location: 'Jaipur / Heritage Amphitheatre & Lawns',
      themePreference: 'Shubh Deepam Brass Diyas, Marigold Torans & Starlight Canopies',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: true,
      notes:
        'Grand community Lakshmi-Ganesh Maha Aarti, 56-Bhog Annakut prasad display, live Dandiya/folk music troupe, and eco-friendly artisanal fireworks display.',
    },
  },
  community_event: {
    label: 'Resident Society Cultural Mela (300 guests • ₹3.8 Lakhs)',
    form: {
      eventType: 'Community Gathering / Society Event',
      eventName: 'Aastha Enclave Annual Winter Cultural Mela',
      targetBudget: 380000,
      guestCount: 300,
      eventDate: '2026-12-20',
      location: 'Jaipur / Community Club Grounds & Pavilion',
      themePreference: 'Vibrant Rajasthani Mela & Artisan Bazaar Canopy',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: true,
      notes:
        'Inclusive community mela featuring local craft stalls, games pavilion for kids, open-air talent dais, and multicuisine regional food street buffet.',
    },
  },
  blank: {
    label: 'Start with Blank Plan',
    form: {
      eventType: 'Custom Celebration',
      eventName: 'My Upcoming Celebration',
      targetBudget: 500000,
      guestCount: 100,
      eventDate: '',
      location: 'Jaipur, Rajasthan',
      themePreference: 'Warm Festive Marigold & Terracotta',
      currency: 'INR',
      cityRegion: 'Jaipur, Rajasthan',
      isVegetarian: true,
      notes: '',
    },
  },
};

/**
 * Occasion-specific timeline generator
 */
export function getTimelineForEventType(eventType: string): TimelineMilestone[] {
  const typeLower = (eventType || '').toLowerCase();

  if (typeLower.includes('birthday') || typeLower.includes('soirée') || typeLower.includes('anniversary')) {
    return [
      {
        id: 't-b-1',
        timeframe: 'T-30 Days',
        title: 'Lock Rooftop / Banquet Venue & Audio System',
        description: 'Confirm sound curfew, guest elevator access, and outside catering/beverage corkage guidelines.',
        category: 'planning',
        completed: true,
      },
      {
        id: 't-b-2',
        timeframe: 'T-20 Days',
        title: 'Curate Menu Tasting & Artisan Cake Designer',
        description: 'Finalize gourmet appetizers, live tawa counters, and custom multi-tiered thematic birthday cake.',
        category: 'booking',
        completed: true,
      },
      {
        id: 't-b-3',
        timeframe: 'T-14 Days',
        title: 'Dispatch Digital RSVP Invites & Tribute Video Assembly',
        description: 'Send WhatsApp video invitations; compile nostalgic family photos/videos for the projector tribute montage.',
        category: 'logistics',
        completed: false,
      },
      {
        id: 't-b-4',
        timeframe: 'T-7 Days',
        title: 'Book Candid Photographer & Acoustic Musician / DJ',
        description: 'Brief photographer on candid family group moments and schedule playlist for cocktail hour vs dance segment.',
        category: 'booking',
        completed: false,
      },
      {
        id: 't-b-5',
        timeframe: 'T-2 Days',
        title: 'Finalize Guest RSVPs & Return Favor Hampers',
        description: 'Confirm minimum guarantee count with venue and pack personalized artisan chocolates/favors.',
        category: 'logistics',
        completed: false,
      },
      {
        id: 't-b-6',
        timeframe: 'Event Day: 06:00 PM',
        title: 'Venue Walkthrough, AV Mic Check & Cake Arrival',
        description: 'Inspect lighting ambiance, test cordless mics for family toasts, and verify cake temperature storage.',
        category: 'day-of',
        completed: false,
      },
      {
        id: 't-b-7',
        timeframe: 'Event Day: 08:30 PM',
        title: 'Birthday Toast, Cake Cutting & Dinner Feast',
        description: 'Gather guests for toast and memory video screening, cake celebration, followed by live dinner buffet.',
        category: 'day-of',
        completed: false,
      },
    ];
  }

  if (typeLower.includes('festival') || typeLower.includes('diwali') || typeLower.includes('navratri') || typeLower.includes('community') || typeLower.includes('mela')) {
    return [
      {
        id: 't-c-1',
        timeframe: 'T-45 Days',
        title: 'Grounds Permission, Power Backup & Committee Sanction',
        description: 'Obtain society/municipal clearance, reserve generator diesel backup, and form volunteer logistics taskforce.',
        category: 'planning',
        completed: true,
      },
      {
        id: 't-c-2',
        timeframe: 'T-30 Days',
        title: 'Tender Stage, Sound System & Festive Illumination',
        description: 'Contract truss lighting, ambient fairy light canopies, stage backdrop, and high-clarity PA audio system.',
        category: 'booking',
        completed: true,
      },
      {
        id: 't-c-3',
        timeframe: 'T-20 Days',
        title: 'Finalize Community Buffet & Live Snack Counters',
        description: 'Select pure vegetarian festive menu, chaat chowk stalls, prasadam distribution, and drinking water dispensaries.',
        category: 'booking',
        completed: false,
      },
      {
        id: 't-c-4',
        timeframe: 'T-10 Days',
        title: 'Publish Program Circular & Cultural Performance Schedule',
        description: 'Coordinate volunteer timings, resident performances, Dandiya/folk artist sets, and guest welcome protocol.',
        category: 'logistics',
        completed: false,
      },
      {
        id: 't-c-5',
        timeframe: 'T-2 Days',
        title: 'Site Safety Inspection, Waste Bins & First Aid Setup',
        description: 'Designate parking lanes, place segregated waste disposal bins, and set up a staffed first-aid desk.',
        category: 'logistics',
        completed: false,
      },
      {
        id: 't-c-6',
        timeframe: 'Event Day: 04:00 PM',
        title: 'Flower Rangoli Setup & Food Stall Load-In',
        description: 'Volunteers assemble welcome marigold rangoli at entrance, food teams initiate heating and chaat prep.',
        category: 'day-of',
        completed: false,
      },
      {
        id: 't-c-7',
        timeframe: 'Event Day: 06:30 PM',
        title: 'Inaugural Aarti / Welcome Address & Cultural Showcase',
        description: 'Dignitary lamp lighting, community performances, followed by open buffet dining and festive music.',
        category: 'day-of',
        completed: false,
      },
    ];
  }

  if (typeLower.includes('griha') || typeLower.includes('housewarming')) {
    return [
      {
        id: 't-g-1',
        timeframe: 'T-25 Days',
        title: 'Lock Auspicious Muhurat with Family Purohit',
        description: 'Confirm morning Kalash Sthapana and Vastu Havan timings with the priest.',
        category: 'planning',
        completed: true,
      },
      {
        id: 't-g-2',
        timeframe: 'T-15 Days',
        title: 'Book Pure Veg Satvik Feast Caterer',
        description: 'Finalize traditional lunch menu (Poori, Aloo Tamatar, Dal Baati, Shrikhand, Kheer).',
        category: 'booking',
        completed: true,
      },
      {
        id: 't-g-3',
        timeframe: 'T-7 Days',
        title: 'Procure Sacred Havan Samagri & Puja Vessels',
        description: 'Verify copper kalash, coconut, pure cow ghee, camphor, mango leaves, and havan kund.',
        category: 'planning',
        completed: false,
      },
      {
        id: 't-g-4',
        timeframe: 'T-2 Days',
        title: 'Deep House Cleaning & Fresh Flower Toran Delivery',
        description: 'Hang fresh mango leaf & marigold entrance toran; arrange brass urlis with floating petals.',
        category: 'logistics',
        completed: false,
      },
      {
        id: 't-g-5',
        timeframe: 'Event Day: 07:30 AM',
        title: 'Kalash Sthapana & Milk Boiling Ritual (Doodh Ubalna)',
        description: 'Family enters with auspicious kalash; auspicious boiling of milk on the new stove.',
        category: 'day-of',
        completed: false,
      },
      {
        id: 't-g-6',
        timeframe: 'Event Day: 09:00 AM',
        title: 'Navagraha Vastu Havan & Maha Aarti',
        description: 'Purohit leads the sacred havan offerings, concluding with Maha Aarti and prasad distribution.',
        category: 'day-of',
        completed: false,
      },
      {
        id: 't-g-7',
        timeframe: 'Event Day: 11:30 AM',
        title: 'Family Satvik Lunch Feast & Afternoon Reception',
        description: 'Serve seated lunch for elders and relatives, followed by afternoon house tour for friends.',
        category: 'day-of',
        completed: false,
      },
    ];
  }

  // Default: Royal Wedding / Sangeet / Vivah
  return [
    {
      id: 't-1',
      timeframe: 'T-90 Days',
      title: 'Lock Venue & Verify Capacity & Power Backup',
      description:
        'Inspect lawn drainage, generator power backup for AC & stage truss, and confirm outside catering/decor policies and municipal curfew limits.',
      category: 'planning',
      completed: true,
    },
    {
      id: 't-2',
      timeframe: 'T-60 Days',
      title: 'Caterer Tasting Session & Menu Finalization',
      description:
        'Taste live chaat counters, authentic regional recipes, desserts, and confirm staff-to-guest ratio (minimum 1 steward per 12 guests).',
      category: 'booking',
      completed: true,
    },
    {
      id: 't-3',
      timeframe: 'T-45 Days',
      title: 'Book Photographer & Sangeet Choreographer',
      description:
        'Review low-light portfolio for evening rituals. Start family dance practice sessions and edit audio song mashup.',
      category: 'booking',
      completed: false,
    },
    {
      id: 't-4',
      timeframe: 'T-30 Days',
      title: 'Dispatch Digital Video Invites & Track Headcount',
      description:
        'Send personalized animated WhatsApp invitations. Request RSVP confirmations to lock in exact per-plate catering minimum guarantee.',
      category: 'logistics',
      completed: false,
    },
    {
      id: 't-5',
      timeframe: 'T-15 Days',
      title: 'Decor Walkthrough & Panditji Samagri Checklist',
      description:
        'Finalize mandap dimensions, stage flower variety (fresh marigolds & rajnigandha), and procure havan samagri, kalash, and coconut.',
      category: 'planning',
      completed: false,
    },
    {
      id: 't-6',
      timeframe: 'T-3 Days',
      title: 'Vendor Settlement Schedule & Emergency Kit',
      description:
        'Prepare payment envelopes for artists/priest, verify safa (turban) count, and pack safety kit (safety pins, fabric tape, electrolytes, first aid).',
      category: 'logistics',
      completed: false,
    },
    {
      id: 't-7',
      timeframe: 'Event Day: 03:00 PM',
      title: 'Vendor Load-In, Sound Check & Green Rooms',
      description:
        'Ensure green rooms have water, air conditioning, and full-length mirrors. Conduct wireless mic audio check.',
      category: 'day-of',
      completed: false,
    },
    {
      id: 't-8',
      timeframe: 'Event Day: 06:30 PM',
      title: 'Baraat Assembly & Live Chaat Counters Open',
      description:
        'Dhol players begin procession, welcome rose water / flower petals at entrance, and welcome beverage stations open for early guests.',
      category: 'day-of',
      completed: false,
    },
    {
      id: 't-9',
      timeframe: 'Event Day: 08:00 PM',
      title: 'Jaimala / Main Stage Event & Royal Dinner Buffet',
      description:
        'Spotlight on couple for garland exchange, photographer primed for candid angles, followed by live dinner buffet opening.',
      category: 'day-of',
      completed: false,
    },
  ];
}

/**
 * Occasion-specific vendor checklist generator
 */
export function getVendorChecklistForEventType(eventType: string): VendorChecklistItem[] {
  const typeLower = (eventType || '').toLowerCase();

  if (typeLower.includes('birthday') || typeLower.includes('soirée') || typeLower.includes('anniversary')) {
    return [
      {
        id: 'v-b-1',
        category: 'Venue & Ambiance',
        title: 'Skyline Terrace or Boutique Lounge Venue',
        recommendedBudgetRange: '20% - 25% of total budget',
        keyQuestionsToAsk: [
          'Is sound system and background music clearance included until midnight?',
          'What is the rain contingency / covered indoor area policy?',
          'Are outside decorator and cake delivery permitted without corkage fee?',
        ],
        status: 'booked',
        bookedVendorName: 'Sunset Skyline Terrace',
        actualQuote: 35000,
        notes: 'Deposit paid. Space reserved from 5:00 PM to 12:00 AM.',
      },
      {
        id: 'v-b-2',
        category: 'Food & Live Barbecue',
        title: 'Gourmet Live Tawa & Barbecue Counters',
        recommendedBudgetRange: '35% - 45% of total budget',
        keyQuestionsToAsk: [
          'How many live appetizer passes are included before main dinner?',
          'Do you supply copper tableware, warm buffet chafers, and service staff?',
          'Can we accommodate strict vegetarian and vegan guests separately?',
        ],
        status: 'comparing_quotes',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Shortlisted 2 boutique caterers known for wood-fired gourmet catering.',
      },
      {
        id: 'v-b-3',
        category: 'Artisan Bakery',
        title: 'Custom Thematic Birthday Cake & Dessert Lounge',
        recommendedBudgetRange: '5% - 8% of total budget',
        keyQuestionsToAsk: [
          'Do you handle chilled delivery and assembly directly at the venue?',
          'Can you create eggless / gluten-free layers upon request?',
          'Does quote include custom cake topper and display pedestal?',
        ],
        status: 'not_started',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Designing custom 2-tier dark chocolate salted caramel cake.',
      },
      {
        id: 'v-b-4',
        category: 'Decor & Photo Backdrop',
        title: 'Warm Filament Lights & Thematic Photo Booth',
        recommendedBudgetRange: '15% - 20% of total budget',
        keyQuestionsToAsk: [
          'Does quote include personalized custom neon sign / marquee lettering?',
          'Are outdoor heaters / ambient lantern lights provided?',
        ],
        status: 'comparing_quotes',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Reviewing warm Edison light truss and brass urli flower installation.',
      },
      {
        id: 'v-b-5',
        category: 'Music & Photography',
        title: 'Acoustic Guitarist / DJ & Candid Photographer',
        recommendedBudgetRange: '12% - 18% of total budget',
        keyQuestionsToAsk: [
          'Will the photographer cover speeches and cake cutting candidly?',
          'What is the turnaround time for social highlight photos (within 48 hours)?',
        ],
        status: 'not_started',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Booking solo acoustic guitarist for first 2 hours, upbeat DJ for later.',
      },
    ];
  }

  if (typeLower.includes('festival') || typeLower.includes('diwali') || typeLower.includes('navratri') || typeLower.includes('community') || typeLower.includes('mela')) {
    return [
      {
        id: 'v-c-1',
        category: 'Grounds & Infrastructure',
        title: 'Community Amphitheatre / Club Lawn & Power Backup',
        recommendedBudgetRange: '15% - 20% of total budget',
        keyQuestionsToAsk: [
          'Is commercial diesel power backup provided for uninterrupted stage and food lighting?',
          'Are waste bins, sanitation, and post-event cleanup included?',
          'What is the sound decibel limit and curfew timing?',
        ],
        status: 'booked',
        bookedVendorName: 'Club Pavilion Grounds',
        actualQuote: 45000,
        notes: 'Permission approved by society management; security briefed.',
      },
      {
        id: 'v-c-2',
        category: 'Festive Catering & Sweets',
        title: 'Community Festive Feast & Live Chaat Stalls',
        recommendedBudgetRange: '35% - 45% of total budget',
        keyQuestionsToAsk: [
          'What is your capacity to serve 250+ guests concurrently without long queues?',
          'Can you organize separate Satvik / Jain prasad counters?',
          'Do you supply eco-friendly compostable areca nut plates and wooden cutlery?',
        ],
        status: 'comparing_quotes',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Reviewing tasting menus with 4 local sweet and snack specialists.',
      },
      {
        id: 'v-c-3',
        category: 'Lighting & Decor',
        title: 'Starlight Canopy, Brass Diyas & Entrance Rangoli',
        recommendedBudgetRange: '20% - 25% of total budget',
        keyQuestionsToAsk: [
          'Does quote include illumination across trees, boundary walls, and central dais?',
          'Will you provide safe electric brass lamps or oil wick protection?',
        ],
        status: 'comparing_quotes',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Commissioning large entrance floral rangoli with marigold and gulal.',
      },
      {
        id: 'v-c-4',
        category: 'Sound, Stage & Cultural Troupe',
        title: 'Dandiya DJ / Folk Troupe & High-Clarity Audio System',
        recommendedBudgetRange: '10% - 15% of total budget',
        keyQuestionsToAsk: [
          'Does audio equipment include feedback-free cordless mics for announcements and aarti?',
          'Are Dandiya sticks and traditional folk artists arranged for community participation?',
        ],
        status: 'not_started',
        bookedVendorName: '',
        actualQuote: 0,
        notes: 'Contracting Rajasthani folk singer pair and evening Dandiya DJ.',
      },
    ];
  }

  // Default: Royal Wedding & Sangeet Checklist
  return [
    {
      id: 'v-1',
      category: 'Venue & Infrastructure',
      title: 'Heritage Haveli / Banquet Lawn Venue',
      recommendedBudgetRange: '18% - 24% of total budget',
      keyQuestionsToAsk: [
        'Is 100% generator diesel backup included for uninterrupted lighting & air cooling?',
        'Are outside catering and decor vendors permitted without royalty/commission penalty?',
        'What is the sound curfew limit (e.g. 10:00 PM outdoor noise guidelines)?',
      ],
      status: 'booked',
      bookedVendorName: 'Amer Courtyard Grounds',
      actualQuote: 220000,
      notes: 'Agreement signed. Advance deposit paid; final balance payable on event morning.',
    },
    {
      id: 'v-2',
      category: 'Catering & Hospitality',
      title: 'Pure Veg Royal Feast with Live Chaat Counters',
      recommendedBudgetRange: '35% - 42% of total budget',
      keyQuestionsToAsk: [
        'What is your steward-to-guest ratio (ideal: 1 steward per 10-12 guests)?',
        'What is the extra plate buffer policy (typically 5-10% buffer allowed)?',
        'Do you provide premium bone china/brass crockery, copper chafing dishes, and RO drinking water?',
      ],
      status: 'comparing_quotes',
      bookedVendorName: '',
      actualQuote: 0,
      notes: 'Tasting completed for 2 shortlisted Jaipur caterers; finalizing dessert spread.',
    },
    {
      id: 'v-3',
      category: 'Decor & Thematic Styling',
      title: 'Royal Marigold, Mandap & Starlight Production',
      recommendedBudgetRange: '18% - 25% of total budget',
      keyQuestionsToAsk: [
        'Are marigold and rajnigandha blooms guaranteed fresh on morning of event?',
        'Does quote include stage focus lights and ambient illumination across lawn trees?',
        'Is post-event cleanup and flower disposal handled by the decor team?',
      ],
      status: 'comparing_quotes',
      bookedVendorName: '',
      actualQuote: 0,
      notes: 'Reviewing 3D render designs for the 4-pillar Vedic mandap.',
    },
    {
      id: 'v-4',
      category: 'Photography & Cinematography',
      title: 'Candid Wedding Photographer & Teaser Reel',
      recommendedBudgetRange: '10% - 14% of total budget',
      keyQuestionsToAsk: [
        'How many dedicated candid vs traditional shooters will be present on-site?',
        'What is the promised turnaround time for the 60-second social media teaser reel?',
        'Will you provide all uncompressed RAW images and 4K video clips?',
      ],
      status: 'comparing_quotes',
      bookedVendorName: '',
      actualQuote: 0,
      notes: 'Shortlisting Jaipur candid photo teams with strong night lighting experience.',
    },
    {
      id: 'v-5',
      category: 'Music & Cultural Artists',
      title: 'Dhol Players, Bollywood DJ & Folk Artists',
      recommendedBudgetRange: '6% - 10% of total budget',
      keyQuestionsToAsk: [
        'Does the DJ quote include 2 wireless handheld cordless mics for family speeches?',
        'Are PPL/IPRS music public performance copyright clearances handled by vendor or venue?',
        'Can we provide a strict "Do-Not-Play" list and custom family entrance audio cues?',
      ],
      status: 'not_started',
      bookedVendorName: '',
      actualQuote: 0,
      notes: 'Seeking pair of energetic Punjabi dholis for the Baraat arrival.',
    },
    {
      id: 'v-6',
      category: 'Rituals & Panditji',
      title: 'Vedic Priest & Authentic Puja Samagri',
      recommendedBudgetRange: '1% - 3% of total budget',
      keyQuestionsToAsk: [
        'Will Panditji bring the havan kund, ceremonial woods, and copper vessels?',
        'What is the precise auspicious muhurat duration for pheras or havan?',
        'Can the rituals be conducted with English/Hindi explanations for modern guests?',
      ],
      status: 'not_started',
      bookedVendorName: '',
      actualQuote: 0,
      notes: 'Muhurat confirmed between 7:30 PM - 9:30 PM.',
    },
  ];
}

export const INITIAL_TIMELINE: TimelineMilestone[] = getTimelineForEventType('Wedding');
export const INITIAL_VENDOR_CHECKLIST: VendorChecklistItem[] = getVendorChecklistForEventType('Wedding');
