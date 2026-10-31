import { CurrencyCode, CurrencyConfig, SimulatorOptions, SimulatorResults } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rateAgainstINR: 1.0, locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', rateAgainstINR: 0.012, locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', rateAgainstINR: 0.011, locale: 'en-IE' },
  GBP: { code: 'GBP', symbol: '£', rateAgainstINR: 0.0095, locale: 'en-GB' },
};

/**
 * Format a numeric amount in the active currency with localized digit separators.
 * For INR, uses the standard Indian numbering system (e.g. ₹15,00,000).
 */
export function formatCurrency(amount: number, currency: CurrencyCode = 'INR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = Math.round(amount * config.rateAgainstINR);

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(converted);
}

/**
 * Format a numeric amount in Indian Lakhs/Crores notation if in INR (e.g. ₹18.5 L or ₹1.2 Cr),
 * or standard currency format.
 */
export function formatCurrencyCompact(amount: number, currency: CurrencyCode = 'INR'): string {
  if (currency === 'INR') {
    if (Math.abs(amount) >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (Math.abs(amount) >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh.toFixed(2).replace(/\.00$/, '')} L`;
    }
    return formatCurrency(amount, 'INR');
  }
  return formatCurrency(amount, currency);
}

/**
 * Format a raw number without currency symbol in Indian locale
 */
export function formatNumber(amount: number, locale: string = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Baseline real-world price points in base INR, calibrated to Rajasthan / Indian celebration market rates.
 * Supports Weddings, Birthdays, Cultural Festivals, and Community Gatherings.
 */
export function getBaselinesForEventType(eventType?: string) {
  const typeLower = (eventType || '').toLowerCase();
  const isBirthday = typeLower.includes('birthday') || typeLower.includes('soirée') || typeLower.includes('soiree');
  const isAnniversary = typeLower.includes('anniversary');
  const isGrihaPravesh = typeLower.includes('griha') || typeLower.includes('housewarming');
  const isFestival = typeLower.includes('festival') || typeLower.includes('diwali') || typeLower.includes('navratri') || typeLower.includes('gala');
  const isCommunity = typeLower.includes('community') || typeLower.includes('society') || typeLower.includes('mela');

  if (isBirthday) {
    return {
      cateringPerGuest: { budget: 750, standard: 1350, premium: 2200 },
      decorFixed: { minimal: 22000, signature: 48000, luxury: 110000 },
      entertainmentFixed: { diy: 8000, live_dj: 28000, full_band: 65000 },
      venueBase: 35000,
      photographyBase: 25000,
      ritualsFixed: 0,
      attireMehendiFixed: 0,
      invitesFavorsPerGuest: 250,
      occasionLabel: 'Milestone Birthday / Party',
    };
  }

  if (isAnniversary) {
    return {
      cateringPerGuest: { budget: 850, standard: 1450, premium: 2400 },
      decorFixed: { minimal: 28000, signature: 62000, luxury: 135000 },
      entertainmentFixed: { diy: 10000, live_dj: 32000, full_band: 75000 },
      venueBase: 45000,
      photographyBase: 32000,
      ritualsFixed: 0,
      attireMehendiFixed: 0,
      invitesFavorsPerGuest: 280,
      occasionLabel: 'Anniversary Celebration Banquet',
    };
  }

  if (isGrihaPravesh) {
    return {
      cateringPerGuest: { budget: 650, standard: 1050, premium: 1750 },
      decorFixed: { minimal: 25000, signature: 55000, luxury: 120000 },
      entertainmentFixed: { diy: 6000, live_dj: 20000, full_band: 45000 },
      venueBase: 25000,
      photographyBase: 22000,
      ritualsFixed: 18000,
      attireMehendiFixed: 0,
      invitesFavorsPerGuest: 200,
      occasionLabel: 'Griha Pravesh & Puja',
    };
  }

  if (isFestival || isCommunity) {
    return {
      cateringPerGuest: { budget: 550, standard: 950, premium: 1600 },
      decorFixed: { minimal: 38000, signature: 95000, luxury: 220000 },
      entertainmentFixed: { diy: 14000, live_dj: 42000, full_band: 95000 },
      venueBase: 65000,
      photographyBase: 30000,
      ritualsFixed: 12000,
      attireMehendiFixed: 0,
      invitesFavorsPerGuest: 120,
      occasionLabel: 'Festival & Community Gathering',
    };
  }

  // Default: Royal Wedding / Sangeet / Heritage Celebration
  return {
    cateringPerGuest: {
      budget: 1100,    // Pure Veg traditional feast: Dal Baati Churma, 3 live chaat stalls, 2 sweets
      standard: 1850,  // Deluxe multi-cuisine spread: 5 live counters, Rajasthani + North Indian + Continental
      premium: 3200,   // Royal palace artisanal catering: 8 live stations, imported mocktails, gourmet dessert lounge
    },
    decorFixed: {
      minimal: 65000,   // Genda phool drapes, brass urlis with floating diyas, entrance toran, fairy lights
      signature: 180000,// Bespoke Rajasthani mandap/stage, block print canopies, mood lighting truss, photo booth
      luxury: 450000,   // Royal palace grand staging, imported blooms, crystal chandeliers, mirror dance floor
    },
    entertainmentFixed: {
      diy: 18000,       // High-end sound system + cordless mic set + curated Bollywood sangeet playlists
      live_dj: 55000,   // Pro Wedding DJ + Punjabi Dhol pair + moving heads dance floor lighting
      full_band: 140000,// Live fusion band / Rajasthani Langa-Manganiyar folk troupe + pro concert stage audio
    },
    venueBase: 150000,    // Typical Rajasthan haveli courtyard or lawn day rental in INR
    photographyBase: 85000,// 2 candid + traditional photographers with 4K highlight reel
    ritualsFixed: 18000,  // Vedic panditji dakshina, havan kund, samagri, and auspicious puja items
    attireMehendiFixed: 28000, // Bridal mehendi artist + guest henna station & safa draping artists
    invitesFavorsPerGuest: 450, // Artisanal mithai/gift box + digital animated RSVP invitation
    occasionLabel: 'Royal Wedding & Vivah',
  };
}

export const TIER_BASELINES = getBaselinesForEventType('Wedding');

/**
 * Pure deterministic calculation engine for FestaFlow.
 * Reconciles every single rupee mathematically so all category allocations
 * sum exactly to the displayed total with zero AI or floating-point drift.
 * Handles empty, zero, and huge values gracefully.
 */
export function calculateSimulatorTotals(options: SimulatorOptions): SimulatorResults {
  const {
    guestCount,
    targetBudget,
    cateringTier,
    decorTier,
    entertainmentTier,
    includeRituals,
    includeMehendiAttire,
    contingencyPercent,
    eventType,
  } = options;

  // Clamped valid inputs to prevent NaN or negative anomalies
  const safeGuestCount = Math.max(0, Math.min(isNaN(guestCount) ? 0 : guestCount, 25000));
  const safeTargetBudget = Math.max(0, isNaN(targetBudget) ? 0 : targetBudget);
  const safeContingencyPercent = Math.max(0, Math.min(isNaN(contingencyPercent) ? 10 : contingencyPercent, 30));

  const baselines = getBaselinesForEventType(eventType);

  // 1. Direct Category Subtotals
  const venueCost = baselines.venueBase;
  const cateringCost = baselines.cateringPerGuest[cateringTier] * safeGuestCount;
  const decorCost = baselines.decorFixed[decorTier];
  const photographyCost = baselines.photographyBase;
  const entertainmentCost = baselines.entertainmentFixed[entertainmentTier];
  const ritualsCost = includeRituals ? baselines.ritualsFixed : 0;
  const attireMehendiCost = includeMehendiAttire ? baselines.attireMehendiFixed : 0;
  const invitesFavorsCost = baselines.invitesFavorsPerGuest * safeGuestCount;

  // 2. Direct Subtotal before Contingency Buffer
  const directSubtotal =
    venueCost +
    cateringCost +
    decorCost +
    photographyCost +
    entertainmentCost +
    ritualsCost +
    attireMehendiCost +
    invitesFavorsCost;

  // 3. Contingency Buffer Calculation
  const contingencyCost = Math.round(directSubtotal * (safeContingencyPercent / 100));

  // 4. Reconciled Total Estimated Cost
  const totalEstimatedCost = directSubtotal + contingencyCost;

  // 5. Variance and Deficit / Surplus Math
  const variance = safeTargetBudget - totalEstimatedCost;
  const isOverBudget = safeTargetBudget === 0 ? true : variance < 0;
  const deficitAmount = isOverBudget ? Math.abs(variance) : 0;
  const surplusAmount = !isOverBudget ? variance : 0;
  const costPerGuest = safeGuestCount > 0 ? Math.round(totalEstimatedCost / safeGuestCount) : 0;

  // 6. Actionable, deterministic recommendations based on mathematical levers
  const recommendations: string[] = [];

  if (safeTargetBudget === 0) {
    recommendations.push(
      'Target budget is currently set to ₹0. Set your anticipated celebration budget in Event Setup to unlock tailored financial surplus/deficit guidance.'
    );
  } else if (isOverBudget) {
    // Guest list trim recommendation
    const variablePerGuest =
      baselines.cateringPerGuest[cateringTier] + baselines.invitesFavorsPerGuest;
    if (variablePerGuest > 0) {
      const guestsToTrim = Math.ceil(deficitAmount / variablePerGuest);
      if (guestsToTrim > 0 && guestsToTrim <= safeGuestCount * 0.45) {
        recommendations.push(
          `Trimming the attendee headcount by ~${guestsToTrim} guests would save ${formatCurrency(
            guestsToTrim * variablePerGuest,
            'INR'
          )} and bring you close to your target.`
        );
      }
    }

    // Catering tier adjustment
    if (cateringTier === 'premium') {
      const diff =
        (baselines.cateringPerGuest.premium - baselines.cateringPerGuest.standard) *
        safeGuestCount;
      if (diff > 0) {
        recommendations.push(
          `Switching Catering from "Premium Artisanal" to "Deluxe Multi-Cuisine" saves ${formatCurrency(
            diff,
            'INR'
          )} without compromising menu variety.`
        );
      }
    } else if (cateringTier === 'standard') {
      const diff =
        (baselines.cateringPerGuest.standard - baselines.cateringPerGuest.budget) *
        safeGuestCount;
      if (diff > 0) {
        recommendations.push(
          `Selecting the "Traditional Feast" catering tier saves ${formatCurrency(
            diff,
            'INR'
          )} while retaining rich regional live counters.`
        );
      }
    }

    // Decor tier adjustment
    if (decorTier === 'luxury') {
      const diff = baselines.decorFixed.luxury - baselines.decorFixed.signature;
      recommendations.push(
        `Choosing "Signature Thematic Decor" instead of "Luxury Grandeur" releases ${formatCurrency(
          diff,
          'INR'
        )} in staging and floral production.`
      );
    } else if (decorTier === 'signature') {
      const diff = baselines.decorFixed.signature - baselines.decorFixed.minimal;
      recommendations.push(
        `Opting for "Essential Ambient Floral & Lights" styling saves ${formatCurrency(
          diff,
          'INR'
        )}.`
      );
    }

    // Entertainment adjustment
    if (entertainmentTier === 'full_band') {
      const diff =
        baselines.entertainmentFixed.full_band - baselines.entertainmentFixed.live_dj;
      recommendations.push(
        `Booking a professional celebration DJ instead of a full live concert band saves ${formatCurrency(
          diff,
          'INR'
        )}.`
      );
    }
  } else {
    // Surplus / Healthy Plan
    recommendations.push(
      `Your celebration budget is comfortably on target with an uncommitted surplus of ${formatCurrency(
        surplusAmount,
        'INR'
      )}.`
    );
    if (safeContingencyPercent < 10) {
      recommendations.push(
        `We recommend maintaining at least a 10% contingency buffer (${formatCurrency(
          Math.round(directSubtotal * 0.1),
          'INR'
        )}) for unexpected day-of logistics or last-minute attendees.`
      );
    } else {
      recommendations.push(
        `You could allocate ${formatCurrency(
          Math.round(surplusAmount * 0.4),
          'INR'
        )} toward customized attendee welcome favors or an extended video highlight reel.`
      );
    }
  }

  return {
    totalEstimatedCost,
    targetBudget: safeTargetBudget,
    variance,
    costPerGuest,
    isOverBudget,
    deficitAmount,
    surplusAmount,
    categoryTotals: {
      venue: venueCost,
      catering: cateringCost,
      decor: decorCost,
      photography: photographyCost,
      entertainment: entertainmentCost,
      rituals: ritualsCost,
      attire_mehendi: attireMehendiCost,
      invites_favors: invitesFavorsCost,
      contingency: contingencyCost,
    },
    recommendations,
  };
}
