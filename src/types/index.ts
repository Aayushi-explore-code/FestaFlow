export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstINR: number;
  locale: string;
}

export type IndianEventType =
  | 'Wedding / Royal Vivah'
  | 'Sangeet & Cocktail Night'
  | 'Haldi & Mehendi Fiesta'
  | 'Griha Pravesh (Housewarming)'
  | 'Milestone Birthday'
  | 'Anniversary Banquet'
  | 'Festive Gala (Diwali / Navratri)'
  | 'Community Gathering / Society Event'
  | 'Custom Celebration';

export interface EventFormData {
  eventType: IndianEventType | string;
  eventName: string;
  targetBudget: number;
  guestCount: number;
  eventDate: string;
  location: string;
  themePreference: string;
  currency: CurrencyCode;
  notes?: string;
  isVegetarian?: boolean;
  cityRegion?: string;
}

export type EventCategoryKey =
  | 'venue'
  | 'catering'
  | 'decor'
  | 'photography'
  | 'entertainment'
  | 'rituals'
  | 'attire_mehendi'
  | 'invites_favors'
  | 'contingency';

export interface BudgetItem {
  id: string;
  name: string;
  category: EventCategoryKey;
  isPerGuest: boolean;
  baseAmount: number; // in INR
  actualAmount: number;
  notes: string;
}

export interface BudgetCategorySummary {
  category: EventCategoryKey;
  label: string;
  allocatedAmount: number;
  percentageOfBudget: number;
  isPerGuest?: boolean;
  perGuestRate?: number;
  items?: BudgetItem[];
  color: string;
  notes: string;
}

export interface TimelineMilestone {
  id: string;
  timeframe: string;
  title: string;
  description: string;
  category: 'planning' | 'booking' | 'logistics' | 'day-of';
  completed: boolean;
}

export interface VendorChecklistItem {
  id: string;
  category: string;
  title: string;
  recommendedBudgetRange: string;
  keyQuestionsToAsk: string[];
  status: 'not_started' | 'comparing_quotes' | 'booked';
  notes: string;
  actualQuote?: number;
  bookedVendorName?: string;
}

export interface IndianCostBenchmark {
  id: string;
  category: EventCategoryKey;
  serviceName: string;
  region: string; // e.g. "Jaipur, Rajasthan", "Udaipur & Marwar", "Pan-India Benchmark"
  unit: 'per_guest' | 'per_day' | 'fixed_package';
  lowPriceINR: number;
  typicalPriceINR: number;
  highPriceINR: number;
  dataSourceType: 'verified_benchmark' | 'indicative_market';
  sourceBenchmarkName: string;
  sourceUrl: string;
  verificationDate: string;
  description: string;
}

export interface SimulatorOptions {
  guestCount: number;
  targetBudget: number;
  cateringTier: 'budget' | 'standard' | 'premium';
  decorTier: 'minimal' | 'signature' | 'luxury';
  entertainmentTier: 'diy' | 'live_dj' | 'full_band';
  includeRituals: boolean;
  includeMehendiAttire: boolean;
  contingencyPercent: number; // 5-15%
  eventType?: string;
}

export interface SimulatorResults {
  totalEstimatedCost: number;
  targetBudget: number;
  variance: number; // targetBudget - totalEstimatedCost (negative is deficit)
  costPerGuest: number;
  isOverBudget: boolean;
  deficitAmount: number;
  surplusAmount: number;
  categoryTotals: {
    venue: number;
    catering: number;
    decor: number;
    photography: number;
    entertainment: number;
    rituals: number;
    attire_mehendi: number;
    invites_favors: number;
    contingency: number;
  };
  recommendations: string[];
}

export interface SavedPlan {
  id: string;
  name: string;
  updatedAt: string;
  eventData: EventFormData;
  simulatorOptions: SimulatorOptions;
  milestones: TimelineMilestone[];
  vendorChecklist: VendorChecklistItem[];
  userNotes: string;
}

export interface AICulturalAdvisorResponse {
  themeConcept: {
    title: string;
    description: string;
    colorPalette: { name: string; hex: string }[];
    decorElements: string[];
    floralStyle: string;
  };
  dayOfSchedule: {
    time: string;
    activity: string;
    details: string;
  }[];
  hospitalityAndRituals: string[];
  isFallback: boolean;
  message?: string;
}
