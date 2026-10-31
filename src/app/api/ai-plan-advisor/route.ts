import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { AICulturalAdvisorResponse, EventFormData } from '@/types';

/**
 * Curated authentic Rajasthan & Indian cultural fallback knowledge base.
 * Guarantees a rich, delightful experience even when no GEMINI_API_KEY is configured
 * or when network access to Google GenAI is unavailable.
 */
function getCuratedCulturalFallback(eventData: EventFormData): AICulturalAdvisorResponse {
  const typeLower = (eventData.eventType || '').toLowerCase();
  const isBirthday = typeLower.includes('birthday') || typeLower.includes('soirée') || typeLower.includes('soiree');
  const isFestival = typeLower.includes('festival') || typeLower.includes('diwali') || typeLower.includes('navratri') || typeLower.includes('gala');
  const isCommunity = typeLower.includes('community') || typeLower.includes('society') || typeLower.includes('mela');
  const isHaldiMehendi = typeLower.includes('haldi') || typeLower.includes('mehendi');
  const isGrihaPravesh = typeLower.includes('griha') || typeLower.includes('housewarming');

  if (isBirthday) {
    return {
      isFallback: true,
      message:
        'Personalized using FestaFlow’s Curated Celebration Knowledge Base (Add GEMINI_API_KEY to .env.local for custom live AI generation).',
      themeConcept: {
        title: 'Amber Twilight & Acoustic Ghazal Soirée',
        description:
          'An intimate, sophisticated evening blending vintage warm brass accents, glowing Edison filament bulbs, acoustic guitar or ghazal harmonies, and an heirloom memory lounge.',
        colorPalette: [
          { name: 'Warm Amber', hex: '#D97706' },
          { name: 'Heritage Brass', hex: '#B45309' },
          { name: 'Twilight Charcoal', hex: '#1F2937' },
          { name: 'Warm Cream Silk', hex: '#FFFBEB' },
        ],
        decorElements: [
          'Canopy of Edison filament bulbs and warm fairy lights suspended over terrace seating',
          'Brass lanterns and floating tea lights in water bowls across cocktail tables',
          'Curated retro photo gallery milestone display and polaroid guestbook nook',
          'Live wood-fired barbecue counter and bespoke artisanal dessert spread',
        ],
        floralStyle: 'Restrained white lilies, tuberose (rajnigandha), and touches of wild desert greens.',
      },
      dayOfSchedule: [
        { time: '06:30 PM', activity: 'Guest Arrival & Signature Mocktails', details: 'Acoustic background melodies, artisanal cheese & canapés, welcome greetings.' },
        { time: '07:30 PM', activity: 'Live Appetizer Pass & Roaming Musician', details: 'Fresh tawa starters, wood-fired bites, and casual fireside conversation.' },
        { time: '08:45 PM', activity: 'Memory Tribute & Birthday Toast', details: 'Short milestone slideshow projection followed by heartfelt family toasts.' },
        { time: '09:15 PM', activity: 'Artisan Cake Cutting Ceremony', details: 'Celebration cake cutting under warm sparkler candles with family and friends.' },
        { time: '09:30 PM', activity: 'Gourmet Dinner Buffet & Open Lounge', details: 'Warm gourmet spread, dessert bar with artisanal gelatos and hot halwas.' },
      ],
      hospitalityAndRituals: [
        'Arrange plush lounge seating and blankets if hosted on an open rooftop in winter.',
        'Place a memory book where attendees can pen handwritten anecdotes and blessings.',
        'Ensure elder relatives have quiet, well-cushioned seats away from direct speakers.',
        'Gift attendees custom miniature artisan chocolate hampers or scented soy candles.',
      ],
    };
  }

  if (isFestival) {
    return {
      isFallback: true,
      message:
        'Personalized using FestaFlow’s Curated Celebration Knowledge Base (Add GEMINI_API_KEY to .env.local for custom live AI generation).',
      themeConcept: {
        title: 'Deepotsav Shubh Deepam & Starlight Canopy',
        description:
          'A radiant cultural festival grounded in hundreds of traditional brass oil lamps, grand floral petal rangolis, festive marigold torans, and uplifting community music.',
        colorPalette: [
          { name: 'Auspicious Kumkum', hex: '#B91C1C' },
          { name: 'Radiant Deepam Gold', hex: '#F59E0B' },
          { name: 'Peacock Emerald', hex: '#047857' },
          { name: 'Temple Ivory', hex: '#FFFDF5' },
        ],
        decorElements: [
          'Concentric brass urlis with floating oil wicks and fresh marigold flowers',
          'Grand entrance floral rangoli with geometric rice-flour and natural dye patterns',
          'Starlight fairy-light canopy draped across trees and community courtyards',
          'Festive Lakshmi-Ganesh flower altar and traditional sweet display',
        ],
        floralStyle: 'Heavy yellow and orange genda phool, scented mogra strings, and fresh mango leaves.',
      },
      dayOfSchedule: [
        { time: '05:30 PM', activity: 'Community Gathering & Rangoli Lighting', details: 'Residents and guests arrive; children light oil diyas along garden pathways.' },
        { time: '06:30 PM', activity: 'Maha Aarti & Vedic Chanting', details: 'Congregational aarti with brass temple bells, conch shells, and sweet prasad distribution.' },
        { time: '07:15 PM', activity: 'Cultural Music Troupe & Dandiya Raas', details: 'Live folk singers and traditional percussionists lead energetic community dancing.' },
        { time: '08:30 PM', activity: 'Grand Satvik Festive Feast', details: 'Traditional regional delicacies, live chaat stalls, and 56-Bhog sweet assortment.' },
        { time: '10:00 PM', activity: 'Eco-Friendly Light & Sound Show', details: 'Festive sparklers, lantern displays, and holiday gift hamper distribution.' },
      ],
      hospitalityAndRituals: [
        'Organize dedicated shoe deposit racks with numbered tokens near the puja pavilion.',
        'Serve hot kulhad masala chai and saffron badam milk upon guest arrival.',
        'Use 100% compostable areca nut leaf plates and earthenware for dining sustainability.',
        'Distribute brass Lakshmi-Ganesh keepsake mementos or artisanal sweet boxes.',
      ],
    };
  }

  if (isCommunity) {
    return {
      isFallback: true,
      message:
        'Personalized using FestaFlow’s Curated Celebration Knowledge Base (Add GEMINI_API_KEY to .env.local for custom live AI generation).',
      themeConcept: {
        title: 'Vibrant Rajasthani Mela & Artisan Bazaar',
        description:
          'An inclusive community celebration celebrating togetherness through colorful block-print canopies, artisan craft stalls, open-air talent dais, and regional street food.',
        colorPalette: [
          { name: 'Terracotta Clay', hex: '#C76B29' },
          { name: 'Marigold Yellow', hex: '#EAB308' },
          { name: 'Teal Peacock', hex: '#0D9488' },
          { name: 'Parchment Sand', hex: '#FAF5EE' },
        ],
        decorElements: [
          'Bright Leheriya and Bandhani fabric awnings over food stalls and activity booths',
          'Open-air wooden stage with acoustic mic rig and fabric bunting streamers',
          'Festive fairy-lit entrance gate with auspicious torans and brass bells',
          'Traditional craft stalls: pottery wheel demo, puppet show, and local artisan crafts',
        ],
        floralStyle: 'Fresh orange marigold garlands and potted foliage arrangements.',
      },
      dayOfSchedule: [
        { time: '04:00 PM', activity: 'Mela Grounds Open & Fun Games Pavilion', details: 'Artisan booths open, carnival games for children, and welcome beverage stations.' },
        { time: '05:30 PM', activity: 'Inaugural Lamp Lighting & Welcome Remarks', details: 'Community leaders welcome attendees; felicitation of senior citizens.' },
        { time: '06:15 PM', activity: 'Community Talent & Cultural Showcase', details: 'Music, folk dance performances, and youth cultural presentations.' },
        { time: '07:45 PM', activity: 'Community Food Street Buffet Opens', details: 'Multicuisine live counters (Pav Bhaji, Chaat, Dosa, and regional curries).' },
        { time: '09:30 PM', activity: 'Closing Awards & Group Fellowship', details: 'Token of appreciation for volunteers and organizers; community photograph.' },
      ],
      hospitalityAndRituals: [
        'Set up a prominent information kiosk, first aid station, and lost-and-found desk.',
        'Provide wheelchair-accessible seating and ramps for senior residents.',
        'Place clearly marked segregated recycling and compost bins across the grounds.',
        'Provide all families with a community directory or commemorative celebration program.',
      ],
    };
  }

  if (isHaldiMehendi) {
    return {
      isFallback: true,
      message:
        'Personalized using FestaFlow’s Curated Celebration Knowledge Base (Add GEMINI_API_KEY to .env.local for custom live AI generation).',
      themeConcept: {
        title: 'Kesariya & Genda Phool Sunshine Garden',
        description:
          'A vibrant celebration grounded in traditional block prints, sunlit yellow genda phool cascades, and brass urli water bowls with floating petals.',
        colorPalette: [
          { name: 'Haldi Marigold', hex: '#F59E0B' },
          { name: 'Kesariya Saffron', hex: '#EA580C' },
          { name: 'Parrot Green', hex: '#65A30D' },
          { name: 'Ivory Silk', hex: '#FFFDF9' },
        ],
        decorElements: [
          'Leheriya and Bandhani fabric drapery across garden pergolas',
          'Brass urlis with floating rose petals and fragrant mogra',
          'Intricate floral jhoola (swing) backdrop for festive photo moments',
          'Rajasthani puppet (Kathputli) welcome booth and live bangle-making stall',
        ],
        floralStyle: 'Heavy locally-sourced yellow & orange marigolds paired with fresh mango leaves.',
      },
      dayOfSchedule: [
        { time: '10:30 AM', activity: 'Guest Welcome & Herbal Kulhad Chai', details: 'Welcome drinks with sweet lassi, cutting chai, and mild breakfast kachoris.' },
        { time: '11:15 AM', activity: 'Haldi Ubtan Ritual Starts', details: 'Auspicious traditional songs, maternal aunts apply organic turmeric paste.' },
        { time: '12:30 PM', activity: 'Phoolon ki Holi (Flower Shower)', details: 'Marigold petal shower accompanied by lively dhol beats.' },
        { time: '01:15 PM', activity: 'Rajasthani Satvik Feast Buffet', details: 'Dal Baati Churma, Ker Sangri, and live jalebi-rabri counters.' },
        { time: '02:30 PM', activity: 'Mehendi Stations & Live Sangeet Antakshari', details: 'Sojat henna artists begin applying intricate designs for family ladies.' },
      ],
      hospitalityAndRituals: [
        'Provide organic, chemical-free turmeric to protect guests with sensitive skin.',
        'Keep wet towels and rosewater sprays handy near the haldi seating area.',
        'Offer comfortable floor gaddi seating with bolster pillows for elders.',
        'Present female guests with hand-tied floral jewellery (haathphool and maang tikka).',
      ],
    };
  }

  if (isGrihaPravesh) {
    return {
      isFallback: true,
      message:
        'Personalized using FestaFlow’s Curated Celebration Knowledge Base (Add GEMINI_API_KEY to .env.local for custom live AI generation).',
      themeConcept: {
        title: 'Shubh Aarambh Sacred Brass & Mogra',
        description:
          'An auspicious, serene housewarming aesthetic highlighting sacred copper & brass accents, fresh mango leaf torans, and intricate rice flour rangoli.',
        colorPalette: [
          { name: 'Auspicious Kumkum', hex: '#B91C1C' },
          { name: 'Pure Haldi Gold', hex: '#D97706' },
          { name: 'Sacred Tulsi Green', hex: '#15803D' },
          { name: 'Temple Ivory', hex: '#FAF6F0' },
        ],
        decorElements: [
          'Fresh mango leaf and marigold entrance toran at main threshold',
          'Navagraha puja altar with brass kalash, coconut, and sacred red cloth',
          'Intricate rice-powder and gulal rangoli at entrance entryway',
          'Fragrant mogra strings and earthen brass oil lamps (diyas)',
        ],
        floralStyle: 'Fragrant white mogra, holy basil (tulsi), and yellow marigolds.',
      },
      dayOfSchedule: [
        { time: '07:30 AM', activity: 'Vastu Puja & Kalash Sthapana', details: 'Priest initiates threshold blessing and milk boiling ceremony (Doodh Ubalna).' },
        { time: '08:45 AM', activity: 'Navagraha & Vastu Havan', details: 'Sacred fire offerings with pure cow ghee and auspicious herbs.' },
        { time: '10:00 AM', activity: 'Maha Aarti & Prasad Distribution', details: 'Family gathers for aarti, Panchamrit, and coconut prasad.' },
        { time: '10:30 AM', activity: 'Satvik Brunch Feast', details: 'Pure vegetarian meal (Poori, Aloo Tamatar, Chana Masala, and Kheer).' },
        { time: '04:00 PM', activity: 'Evening Reception for Extended Friends', details: 'Tea, artisanal mithai boxes, and house walkthrough.' },
      ],
      hospitalityAndRituals: [
        'Ensure elder relatives are seated comfortably away from direct havan smoke.',
        'Distribute brass Lakshmi-Ganesh coins or sweets boxes as return gifts (Prasad).',
        'Have shoe racks and welcome slipper baskets positioned outside the entrance.',
        'Keep water carafes and tulsi prasad easily accessible for attendees.',
      ],
    };
  }

  // Default: Royal Wedding & Sangeet
  return {
    isFallback: true,
    message:
      'Personalized using FestaFlow’s Curated Jaipur Cultural Knowledge Base (Add GEMINI_API_KEY to .env.local for custom AI generation).',
    themeConcept: {
      title: 'Amer Heritage Darbar & Starlight Amber',
      description:
        'A regal Rajasthani palatial concept weaving together sandstone architectural backdrops, royal marigold and crimson floral arches, and ambient fairy-lit tree illumination.',
      colorPalette: [
        { name: 'Royal Kesari', hex: '#EA580C' },
        { name: 'Heritage Marigold', hex: '#D97706' },
        { name: 'Rajputana Crimson', hex: '#991B1B' },
        { name: 'Emerald Forest', hex: '#2D6A4F' },
        { name: 'Sandstone Ivory', hex: '#FDFBF7' },
      ],
      decorElements: [
        'Four-pillar carved stone or floral Vedic Mandap with sacred havan kund',
        'Grand Rajasthani royal entryway with brass lanterns and rose-water mist',
        'Fairy-light canopy and starlight truss over the outdoor dining courtyard',
        'Traditional Shekhawati vintage furniture lounges for elder guests',
      ],
      floralStyle: 'Classic genda phool (marigold), red Indian roses, and scented rajnigandha garlands.',
    },
    dayOfSchedule: [
      { time: '04:30 PM', activity: 'Baraat Assembly & Royal Safa Tying', details: 'Gentlemen Baraatis are crowned with royal leheriya safas; Dholis begin rhythm.' },
      { time: '05:30 PM', activity: 'Grand Baraat Procession', details: 'Groom procession with vintage open car or chariot, accompanied by brass band.' },
      { time: '06:45 PM', activity: 'Milni & Welcoming the Groom', details: 'Bride’s family offers garlands, rose water sprinkles, and sweet shagun.' },
      { time: '07:30 PM', activity: 'Jaimala / Garland Exchange', details: 'Spotlight garland ceremony under shower of cold-pyro and rose petals.' },
      { time: '08:15 PM', activity: 'Royal Banquet Buffet Open', details: 'Live chaat chowk, Rajasthani royal curries, and live kulfi-falooda lounge.' },
      { time: '09:30 PM', activity: 'Vedic Pheras & Saptapadi', details: 'Sacred seven vows around the havan fire with priest explaining the verses.' },
    ],
    hospitalityAndRituals: [
      'Set up a dedicated elder care lounge with comfortable armchairs and low-noise acoustics.',
      'Assign a hospitality desk with safety pins, safa readjustment pins, and bottled water.',
      'Clearly demarcate pure Jain vegetarian counters and spicy live chaat stalls.',
      'Present guests with personalized embroidered potli bags or artisanal Jaipur mithai hampers.',
    ],
  };
}

export async function POST(req: Request) {
  try {
    const eventData: EventFormData = await req.json();

    // Check if user provided GEMINI_API_KEY in environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful and rich fallback
      const fallbackData = getCuratedCulturalFallback(eventData);
      return NextResponse.json(fallbackData);
    }

    // Call Google GenAI SDK
    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are FestaFlow's Chief Indian Cultural Event Architect and Celebration Stylist, specializing in authentic Indian celebrations across all occasions (weddings, milestone birthdays, cultural festivals, community gatherings, housewarmings, and galas) with contemporary warmth and regional heritage.

Event Details:
- Title: ${eventData.eventName}
- Category: ${eventData.eventType}
- Location: ${eventData.location || 'Jaipur, Rajasthan'}
- Theme Preference: ${eventData.themePreference || 'Royal Traditional'}
- Guest Count: ${eventData.guestCount}
- Food Preference: ${eventData.isVegetarian ? 'Strict Pure Vegetarian' : 'Multi-cuisine'}
- Special Notes: ${eventData.notes || 'None provided'}

Generate an authentic, culturally rich, and highly practical celebration blueprint in JSON format matching this schema:
{
  "themeConcept": {
    "title": "string (poetic, authentic Indian concept name)",
    "description": "string (2-3 sentences describing atmosphere and design)",
    "colorPalette": [
      { "name": "string (e.g. Saffron Kesari)", "hex": "#HEX" }
    ],
    "decorElements": ["string", "string", "string", "string"],
    "floralStyle": "string"
  },
  "dayOfSchedule": [
    { "time": "string (e.g. 05:00 PM)", "activity": "string", "details": "string" }
  ],
  "hospitalityAndRituals": [
    "string", "string", "string", "string"
  ]
}

DO NOT include any financial costs or dollar/rupee figures in this AI output. FestaFlow handles all financial arithmetic deterministically. Focus strictly on cultural elegance, guest warmth, ceremony schedule, and aesthetic vision.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new Error('Empty response received from Gemini');
      }

      const parsed = JSON.parse(responseText);

      const result: AICulturalAdvisorResponse = {
        themeConcept: parsed.themeConcept || getCuratedCulturalFallback(eventData).themeConcept,
        dayOfSchedule: parsed.dayOfSchedule || getCuratedCulturalFallback(eventData).dayOfSchedule,
        hospitalityAndRituals:
          parsed.hospitalityAndRituals || getCuratedCulturalFallback(eventData).hospitalityAndRituals,
        isFallback: false,
        message: 'Personalized live with Google Gemini 2.5 Flash GenAI.',
      };

      return NextResponse.json(result);
    } catch (apiErr: any) {
      console.warn('Google GenAI API call failed or timed out, using curated cultural knowledge base:', apiErr?.message);
      const fallbackData = getCuratedCulturalFallback(eventData);
      fallbackData.message = `AI Advisor fallback active (${apiErr?.message || 'Gemini response issue'}). Showing curated Jaipur cultural blueprint.`;
      return NextResponse.json(fallbackData);
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to generate cultural plan' },
      { status: 500 }
    );
  }
}
