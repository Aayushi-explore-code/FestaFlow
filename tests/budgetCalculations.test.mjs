import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CURRENCIES,
  TIER_BASELINES,
  calculateSimulatorTotals,
  formatCurrency,
  formatCurrencyCompact,
  formatNumber,
  getBaselinesForEventType,
} from '../src/utils/budgetCalculations.ts';

describe('Budget Calculations - Currency & Formatting', () => {
  it('CURRENCIES contains valid configurations for INR, USD, EUR, GBP', () => {
    assert.ok(CURRENCIES.INR);
    assert.ok(CURRENCIES.USD);
    assert.ok(CURRENCIES.EUR);
    assert.ok(CURRENCIES.GBP);

    assert.strictEqual(CURRENCIES.INR.rateAgainstINR, 1.0);
    assert.strictEqual(CURRENCIES.INR.symbol, '₹');
    assert.strictEqual(CURRENCIES.USD.rateAgainstINR, 0.012);
    assert.strictEqual(CURRENCIES.EUR.rateAgainstINR, 0.011);
    assert.strictEqual(CURRENCIES.GBP.rateAgainstINR, 0.0095);
  });

  it('formatCurrency formats INR with Indian numbering locale', () => {
    const formatted = formatCurrency(1500000, 'INR');
    // Normalize any non-breaking spaces
    const clean = formatted.replace(/\u00A0/g, ' ');
    assert.ok(clean.includes('₹'), 'Should include ₹ symbol');
    assert.ok(clean.includes('15,00,000'), 'Should format in Indian lakhs notation');
  });

  it('formatCurrency converts correctly into foreign currencies', () => {
    // 1,000,000 INR * 0.012 = $12,000
    const usd = formatCurrency(1000000, 'USD').replace(/\u00A0/g, ' ');
    assert.ok(usd.includes('$') || usd.includes('USD'));
    assert.ok(usd.includes('12,000'));

    // 1,000,000 INR * 0.011 = €11,000
    const eur = formatCurrency(1000000, 'EUR').replace(/\u00A0/g, ' ');
    assert.ok(eur.includes('€') || eur.includes('EUR'));
    assert.ok(eur.includes('11,000'));

    // 1,000,000 INR * 0.0095 = £9,500
    const gbp = formatCurrency(1000000, 'GBP').replace(/\u00A0/g, ' ');
    assert.ok(gbp.includes('£') || gbp.includes('GBP'));
    assert.ok(gbp.includes('9,500'));
  });

  it('formatCurrency falls back safely to INR for unknown currency codes', () => {
    const fallback = formatCurrency(50000, 'XYZ');
    const clean = fallback.replace(/\u00A0/g, ' ');
    assert.ok(clean.includes('₹') || clean.includes('50,000'));
  });

  it('formatCurrencyCompact formats INR in Lakhs and Crores accurately', () => {
    // Crores (>= 10,000,000)
    assert.strictEqual(formatCurrencyCompact(15000000, 'INR'), '₹1.50 Cr');
    assert.strictEqual(formatCurrencyCompact(10000000, 'INR'), '₹1 Cr');
    assert.strictEqual(formatCurrencyCompact(25400000, 'INR'), '₹2.54 Cr');

    // Lakhs (>= 100,000 and < 10,000,000)
    assert.strictEqual(formatCurrencyCompact(1850000, 'INR'), '₹18.50 L');
    assert.strictEqual(formatCurrencyCompact(500000, 'INR'), '₹5 L');
    assert.strictEqual(formatCurrencyCompact(625000, 'INR'), '₹6.25 L');

    // Sub-lakh amounts use standard formatCurrency
    const smallAmount = formatCurrencyCompact(45000, 'INR').replace(/\u00A0/g, ' ');
    assert.ok(smallAmount.includes('45,000'));

    // Non-INR currencies fall back to standard formatCurrency
    const nonInr = formatCurrencyCompact(1850000, 'USD').replace(/\u00A0/g, ' ');
    assert.ok(nonInr.includes('$') || nonInr.includes('22,200'));
  });

  it('formatNumber formats raw number with locale thousands separator', () => {
    const formatted = formatNumber(1250000);
    assert.ok(formatted.includes('12,50,000') || formatted.includes('1,250,000'));
  });
});

describe('Budget Calculations - Baselines for Event Types', () => {
  it('returns Royal Wedding baselines by default or for wedding variants', () => {
    const defaultBaselines = getBaselinesForEventType();
    assert.strictEqual(defaultBaselines.occasionLabel, 'Royal Wedding & Vivah');
    assert.strictEqual(defaultBaselines.venueBase, 150000);
    assert.strictEqual(defaultBaselines.cateringPerGuest.budget, 1100);
    assert.strictEqual(defaultBaselines.cateringPerGuest.standard, 1850);
    assert.strictEqual(defaultBaselines.cateringPerGuest.premium, 3200);
    assert.strictEqual(defaultBaselines.decorFixed.minimal, 65000);
    assert.strictEqual(defaultBaselines.decorFixed.signature, 180000);
    assert.strictEqual(defaultBaselines.decorFixed.luxury, 450000);
    assert.strictEqual(defaultBaselines.entertainmentFixed.diy, 18000);
    assert.strictEqual(defaultBaselines.entertainmentFixed.live_dj, 55000);
    assert.strictEqual(defaultBaselines.entertainmentFixed.full_band, 140000);
    assert.strictEqual(defaultBaselines.ritualsFixed, 18000);
    assert.strictEqual(defaultBaselines.attireMehendiFixed, 28000);
    assert.strictEqual(defaultBaselines.invitesFavorsPerGuest, 450);

    const namedWedding = getBaselinesForEventType('Wedding / Royal Vivah');
    assert.strictEqual(namedWedding.occasionLabel, 'Royal Wedding & Vivah');
  });

  it('returns Birthday baselines correctly', () => {
    const birthday = getBaselinesForEventType('Milestone Birthday');
    assert.strictEqual(birthday.occasionLabel, 'Milestone Birthday / Party');
    assert.strictEqual(birthday.venueBase, 35000);
    assert.strictEqual(birthday.cateringPerGuest.standard, 1350);
    assert.strictEqual(birthday.ritualsFixed, 0);
    assert.strictEqual(birthday.attireMehendiFixed, 0);
  });

  it('returns Anniversary baselines correctly', () => {
    const anniversary = getBaselinesForEventType('Anniversary Banquet');
    assert.strictEqual(anniversary.occasionLabel, 'Anniversary Celebration Banquet');
    assert.strictEqual(anniversary.venueBase, 45000);
    assert.strictEqual(anniversary.cateringPerGuest.standard, 1450);
    assert.strictEqual(anniversary.ritualsFixed, 0);
  });

  it('returns Griha Pravesh baselines correctly', () => {
    const griha = getBaselinesForEventType('Griha Pravesh (Housewarming)');
    assert.strictEqual(griha.occasionLabel, 'Griha Pravesh & Puja');
    assert.strictEqual(griha.venueBase, 25000);
    assert.strictEqual(griha.ritualsFixed, 18000);
    assert.strictEqual(griha.attireMehendiFixed, 0);
  });

  it('returns Festival and Community baselines correctly', () => {
    const festival = getBaselinesForEventType('Festive Gala (Diwali / Navratri)');
    assert.strictEqual(festival.occasionLabel, 'Festival & Community Gathering');
    assert.strictEqual(festival.venueBase, 65000);
    assert.strictEqual(festival.ritualsFixed, 12000);

    const community = getBaselinesForEventType('Community Gathering / Society Event');
    assert.strictEqual(community.occasionLabel, 'Festival & Community Gathering');
  });

  it('TIER_BASELINES is exported and matches default wedding baseline', () => {
    assert.ok(TIER_BASELINES);
    assert.strictEqual(TIER_BASELINES.venueBase, 150000);
  });
});

describe('Budget Calculations - calculateSimulatorTotals Engine', () => {
  const baseOptions = {
    guestCount: 150,
    targetBudget: 1500000,
    cateringTier: 'standard',
    decorTier: 'signature',
    entertainmentTier: 'live_dj',
    includeRituals: true,
    includeMehendiAttire: true,
    contingencyPercent: 10,
    eventType: 'Wedding / Royal Vivah',
  };

  it('reconciles every single rupee mathematically with zero drift', () => {
    const results = calculateSimulatorTotals(baseOptions);
    const cat = results.categoryTotals;

    const directSubtotal =
      cat.venue +
      cat.catering +
      cat.decor +
      cat.photography +
      cat.entertainment +
      cat.rituals +
      cat.attire_mehendi +
      cat.invites_favors;

    const expectedContingency = Math.round(directSubtotal * (baseOptions.contingencyPercent / 100));
    assert.strictEqual(cat.contingency, expectedContingency);

    const expectedTotal = directSubtotal + cat.contingency;
    assert.strictEqual(results.totalEstimatedCost, expectedTotal);

    // Sum of all 9 category totals must match totalEstimatedCost exactly
    const categorySum = Object.values(cat).reduce((sum, val) => sum + val, 0);
    assert.strictEqual(categorySum, results.totalEstimatedCost);
  });

  it('calculates variance, deficit, and surplus correctly', () => {
    // 1. Surplus scenario
    const surplusOptions = { ...baseOptions, targetBudget: 2000000 };
    const surplusResults = calculateSimulatorTotals(surplusOptions);
    assert.strictEqual(surplusResults.isOverBudget, false);
    assert.strictEqual(surplusResults.deficitAmount, 0);
    assert.strictEqual(
      surplusResults.surplusAmount,
      surplusResults.targetBudget - surplusResults.totalEstimatedCost
    );
    assert.strictEqual(
      surplusResults.variance,
      surplusResults.targetBudget - surplusResults.totalEstimatedCost
    );

    // 2. Deficit scenario
    const deficitOptions = { ...baseOptions, targetBudget: 500000 };
    const deficitResults = calculateSimulatorTotals(deficitOptions);
    assert.strictEqual(deficitResults.isOverBudget, true);
    assert.strictEqual(deficitResults.surplusAmount, 0);
    assert.strictEqual(
      deficitResults.deficitAmount,
      deficitResults.totalEstimatedCost - deficitResults.targetBudget
    );
    assert.strictEqual(
      deficitResults.variance,
      deficitResults.targetBudget - deficitResults.totalEstimatedCost
    );
  });

  it('calculates costPerGuest correctly', () => {
    const results = calculateSimulatorTotals(baseOptions);
    const expectedCostPerGuest = Math.round(results.totalEstimatedCost / baseOptions.guestCount);
    assert.strictEqual(results.costPerGuest, expectedCostPerGuest);
  });

  it('tests all catering tiers (budget, standard, premium)', () => {
    const baselines = getBaselinesForEventType(baseOptions.eventType);

    const budgetRes = calculateSimulatorTotals({ ...baseOptions, cateringTier: 'budget' });
    assert.strictEqual(budgetRes.categoryTotals.catering, baselines.cateringPerGuest.budget * 150);

    const standardRes = calculateSimulatorTotals({ ...baseOptions, cateringTier: 'standard' });
    assert.strictEqual(standardRes.categoryTotals.catering, baselines.cateringPerGuest.standard * 150);

    const premiumRes = calculateSimulatorTotals({ ...baseOptions, cateringTier: 'premium' });
    assert.strictEqual(premiumRes.categoryTotals.catering, baselines.cateringPerGuest.premium * 150);
  });

  it('tests all decor tiers (minimal, signature, luxury)', () => {
    const baselines = getBaselinesForEventType(baseOptions.eventType);

    const minRes = calculateSimulatorTotals({ ...baseOptions, decorTier: 'minimal' });
    assert.strictEqual(minRes.categoryTotals.decor, baselines.decorFixed.minimal);

    const sigRes = calculateSimulatorTotals({ ...baseOptions, decorTier: 'signature' });
    assert.strictEqual(sigRes.categoryTotals.decor, baselines.decorFixed.signature);

    const luxRes = calculateSimulatorTotals({ ...baseOptions, decorTier: 'luxury' });
    assert.strictEqual(luxRes.categoryTotals.decor, baselines.decorFixed.luxury);
  });

  it('tests all entertainment tiers (diy, live_dj, full_band)', () => {
    const baselines = getBaselinesForEventType(baseOptions.eventType);

    const diyRes = calculateSimulatorTotals({ ...baseOptions, entertainmentTier: 'diy' });
    assert.strictEqual(diyRes.categoryTotals.entertainment, baselines.entertainmentFixed.diy);

    const djRes = calculateSimulatorTotals({ ...baseOptions, entertainmentTier: 'live_dj' });
    assert.strictEqual(djRes.categoryTotals.entertainment, baselines.entertainmentFixed.live_dj);

    const bandRes = calculateSimulatorTotals({ ...baseOptions, entertainmentTier: 'full_band' });
    assert.strictEqual(bandRes.categoryTotals.entertainment, baselines.entertainmentFixed.full_band);
  });

  it('tests optional ritual and attire toggles', () => {
    const baselines = getBaselinesForEventType(baseOptions.eventType);

    const withBoth = calculateSimulatorTotals({ ...baseOptions, includeRituals: true, includeMehendiAttire: true });
    assert.strictEqual(withBoth.categoryTotals.rituals, baselines.ritualsFixed);
    assert.strictEqual(withBoth.categoryTotals.attire_mehendi, baselines.attireMehendiFixed);

    const withoutBoth = calculateSimulatorTotals({ ...baseOptions, includeRituals: false, includeMehendiAttire: false });
    assert.strictEqual(withoutBoth.categoryTotals.rituals, 0);
    assert.strictEqual(withoutBoth.categoryTotals.attire_mehendi, 0);
  });

  it('handles guest count boundaries: negative, zero, normal, and max limit', () => {
    // Negative guest count clamps to 0
    const negRes = calculateSimulatorTotals({ ...baseOptions, guestCount: -50 });
    assert.strictEqual(negRes.categoryTotals.catering, 0);
    assert.strictEqual(negRes.categoryTotals.invites_favors, 0);
    assert.strictEqual(negRes.costPerGuest, 0);

    // Zero guest count
    const zeroRes = calculateSimulatorTotals({ ...baseOptions, guestCount: 0 });
    assert.strictEqual(zeroRes.categoryTotals.catering, 0);
    assert.strictEqual(zeroRes.categoryTotals.invites_favors, 0);
    assert.strictEqual(zeroRes.costPerGuest, 0);

    // Normal guest count
    const normalRes = calculateSimulatorTotals({ ...baseOptions, guestCount: 200 });
    assert.ok(normalRes.categoryTotals.catering > 0);
    assert.ok(normalRes.costPerGuest > 0);

    // Maximum boundary clamped to 25000
    const maxRes = calculateSimulatorTotals({ ...baseOptions, guestCount: 50000 });
    const clampedExpected = calculateSimulatorTotals({ ...baseOptions, guestCount: 25000 });
    assert.strictEqual(maxRes.categoryTotals.catering, clampedExpected.categoryTotals.catering);

    // NaN guest count clamps safely to 0
    const nanRes = calculateSimulatorTotals({ ...baseOptions, guestCount: NaN });
    assert.strictEqual(nanRes.categoryTotals.catering, 0);
  });

  it('handles target budget boundaries: negative, zero, and normal', () => {
    // Negative target budget clamped to 0
    const negBudget = calculateSimulatorTotals({ ...baseOptions, targetBudget: -200000 });
    assert.strictEqual(negBudget.targetBudget, 0);
    assert.strictEqual(negBudget.isOverBudget, true);

    // Zero target budget
    const zeroBudget = calculateSimulatorTotals({ ...baseOptions, targetBudget: 0 });
    assert.strictEqual(zeroBudget.targetBudget, 0);
    assert.strictEqual(zeroBudget.isOverBudget, true);
    assert.ok(
      zeroBudget.recommendations.some((r) => r.includes('Target budget is currently set to ₹0'))
    );

    // NaN target budget clamped to 0
    const nanBudget = calculateSimulatorTotals({ ...baseOptions, targetBudget: NaN });
    assert.strictEqual(nanBudget.targetBudget, 0);
  });

  it('handles contingency percentage clamping: negative, zero, default, and above max', () => {
    // Negative clamped to 0
    const negContingency = calculateSimulatorTotals({ ...baseOptions, contingencyPercent: -10 });
    assert.strictEqual(negContingency.categoryTotals.contingency, 0);

    // Zero contingency
    const zeroContingency = calculateSimulatorTotals({ ...baseOptions, contingencyPercent: 0 });
    assert.strictEqual(zeroContingency.categoryTotals.contingency, 0);

    // Above maximum (clamped to 30)
    const highContingency = calculateSimulatorTotals({ ...baseOptions, contingencyPercent: 50 });
    const maxContingency = calculateSimulatorTotals({ ...baseOptions, contingencyPercent: 30 });
    assert.strictEqual(highContingency.categoryTotals.contingency, maxContingency.categoryTotals.contingency);

    // NaN contingency defaults to 10
    const nanContingency = calculateSimulatorTotals({ ...baseOptions, contingencyPercent: NaN });
    const default10 = calculateSimulatorTotals({ ...baseOptions, contingencyPercent: 10 });
    assert.strictEqual(nanContingency.categoryTotals.contingency, default10.categoryTotals.contingency);
  });

  it('produces actionable recommendations for deficit with tier downgrade levers', () => {
    const deficitOptions = {
      ...baseOptions,
      targetBudget: 300000,
      cateringTier: 'premium',
      decorTier: 'luxury',
      entertainmentTier: 'full_band',
    };
    const results = calculateSimulatorTotals(deficitOptions);
    assert.strictEqual(results.isOverBudget, true);
    assert.ok(results.recommendations.length > 0);

    // Should recommend catering downgrade from premium to standard
    assert.ok(results.recommendations.some((r) => r.includes('Premium Artisanal')));
    // Should recommend decor downgrade from luxury to signature
    assert.ok(results.recommendations.some((r) => r.includes('Signature Thematic Decor')));
    // Should recommend entertainment downgrade from full band to DJ
    assert.ok(results.recommendations.some((r) => r.includes('professional celebration DJ')));
  });

  it('produces healthy surplus guidance when budget is on target', () => {
    const surplusOptions = {
      ...baseOptions,
      targetBudget: 2500000,
      contingencyPercent: 12,
    };
    const results = calculateSimulatorTotals(surplusOptions);
    assert.strictEqual(results.isOverBudget, false);
    assert.ok(results.recommendations.some((r) => r.includes('comfortably on target')));
  });
});

