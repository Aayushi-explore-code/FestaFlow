'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  Users,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { CurrencyCode, SimulatorOptions, SimulatorResults } from '../types';
import {
  calculateSimulatorTotals,
  formatCurrency,
  formatCurrencyCompact,
  getBaselinesForEventType,
} from '../utils/budgetCalculations';

interface BudgetSimulatorProps {
  currentBudget: number;
  currentGuestCount: number;
  currentCurrency: CurrencyCode;
  eventType?: string;
  initialOptions?: SimulatorOptions;
  onBudgetChange?: (newBudget: number) => void;
  onGuestCountChange?: (newGuestCount: number) => void;
  onUpdateResults?: (results: SimulatorResults, options: SimulatorOptions) => void;
}

export const BudgetSimulator: React.FC<BudgetSimulatorProps> = ({
  currentBudget,
  currentGuestCount,
  currentCurrency,
  eventType,
  initialOptions,
  onBudgetChange,
  onGuestCountChange,
  onUpdateResults,
}) => {
  const isNonWedding =
    (eventType || '').toLowerCase().includes('birthday') ||
    (eventType || '').toLowerCase().includes('anniversary') ||
    (eventType || '').toLowerCase().includes('festival') ||
    (eventType || '').toLowerCase().includes('community') ||
    (eventType || '').toLowerCase().includes('mela');

  // Single Source of Truth: Budget and Guest Count are controlled props from page.tsx
  const guestCount = typeof currentGuestCount === 'number' && Number.isFinite(currentGuestCount)
    ? currentGuestCount
    : (initialOptions?.guestCount ?? 100);
  const targetBudget = typeof currentBudget === 'number' && Number.isFinite(currentBudget)
    ? currentBudget
    : (initialOptions?.targetBudget ?? 500000);

  // Local Customization Levers
  const [cateringTier, setCateringTier] = useState<'budget' | 'standard' | 'premium'>(initialOptions?.cateringTier ?? 'standard');
  const [decorTier, setDecorTier] = useState<'minimal' | 'signature' | 'luxury'>(initialOptions?.decorTier ?? 'signature');
  const [entertainmentTier, setEntertainmentTier] = useState<'diy' | 'live_dj' | 'full_band'>(initialOptions?.entertainmentTier ?? 'live_dj');
  const [includeRituals, setIncludeRituals] = useState<boolean>(initialOptions?.includeRituals ?? !isNonWedding);
  const [includeMehendiAttire, setIncludeMehendiAttire] = useState<boolean>(initialOptions?.includeMehendiAttire ?? !isNonWedding);
  const [contingencyPercent, setContingencyPercent] = useState<number>(initialOptions?.contingencyPercent ?? 10);
  const [showAdvancedLevers, setShowAdvancedLevers] = useState<boolean>(false);

  // Sync non-wedding defaults when event occasion changes
  useEffect(() => {
    if (isNonWedding) {
      setIncludeRituals((prev) => (prev ? false : prev));
      setIncludeMehendiAttire((prev) => (prev ? false : prev));
    }
  }, [isNonWedding]);

  // Sync initialOptions when hydrated from localStorage or imported
  useEffect(() => {
    if (initialOptions) {
      if (initialOptions.cateringTier) {
        setCateringTier((prev) => (prev !== initialOptions.cateringTier ? initialOptions.cateringTier : prev));
      }
      if (initialOptions.decorTier) {
        setDecorTier((prev) => (prev !== initialOptions.decorTier ? initialOptions.decorTier : prev));
      }
      if (initialOptions.entertainmentTier) {
        setEntertainmentTier((prev) => (prev !== initialOptions.entertainmentTier ? initialOptions.entertainmentTier : prev));
      }
      if (typeof initialOptions.includeRituals === 'boolean') {
        const targetVal = isNonWedding ? false : initialOptions.includeRituals;
        setIncludeRituals((prev) => (prev !== targetVal ? targetVal : prev));
      }
      if (typeof initialOptions.includeMehendiAttire === 'boolean') {
        const targetVal = isNonWedding ? false : initialOptions.includeMehendiAttire;
        setIncludeMehendiAttire((prev) => (prev !== targetVal ? targetVal : prev));
      }
      if (typeof initialOptions.contingencyPercent === 'number' && Number.isFinite(initialOptions.contingencyPercent)) {
        setContingencyPercent((prev) => (prev !== initialOptions.contingencyPercent ? initialOptions.contingencyPercent : prev));
      }
    }
  }, [initialOptions, isNonWedding]);

  const baselines = getBaselinesForEventType(eventType);

  // Pure deterministic computation
  const options: SimulatorOptions = {
    guestCount,
    targetBudget,
    cateringTier,
    decorTier,
    entertainmentTier,
    includeRituals,
    includeMehendiAttire,
    contingencyPercent,
    eventType,
  };

  const results: SimulatorResults = calculateSimulatorTotals(options);

  const lastEmittedOptionsRef = useRef<SimulatorOptions>(options);

  useEffect(() => {
    if (onUpdateResults) {
      const prev = lastEmittedOptionsRef.current;
      const hasChanged =
        prev.guestCount !== options.guestCount ||
        prev.targetBudget !== options.targetBudget ||
        prev.cateringTier !== options.cateringTier ||
        prev.decorTier !== options.decorTier ||
        prev.entertainmentTier !== options.entertainmentTier ||
        prev.includeRituals !== options.includeRituals ||
        prev.includeMehendiAttire !== options.includeMehendiAttire ||
        prev.contingencyPercent !== options.contingencyPercent ||
        prev.eventType !== options.eventType;

      if (hasChanged) {
        lastEmittedOptionsRef.current = options;
        onUpdateResults(results, options);
      }
    }
  }, [
    guestCount,
    targetBudget,
    cateringTier,
    decorTier,
    entertainmentTier,
    includeRituals,
    includeMehendiAttire,
    contingencyPercent,
    eventType,
    onUpdateResults,
  ]);

  const handleResetToBaseline = () => {
    if (onGuestCountChange && typeof currentGuestCount === 'number') {
      onGuestCountChange(currentGuestCount || 100);
    }
    if (onBudgetChange && typeof currentBudget === 'number') {
      onBudgetChange(currentBudget || 500000);
    }
    setCateringTier('standard');
    setDecorTier('signature');
    setEntertainmentTier('live_dj');
    setIncludeRituals(!isNonWedding);
    setIncludeMehendiAttire(!isNonWedding);
    setContingencyPercent(10);
  };

  return (
    <div id="simulator-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        className="card"
        style={{
          border: results.isOverBudget
            ? '1px solid #E4B5A8'
            : '1px solid var(--border-sandstone)',
          padding: '28px',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '12px',
            borderBottom: '1px solid var(--border-sandstone)',
            paddingBottom: '14px',
            marginBottom: '20px',
          }}
        >
          <div>
            <span className="editorial-kicker">Deterministic What-If Engine</span>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--text-deep)' }}>
              Interactive Financial Planning Simulator
            </h2>
          </div>

          <button
            onClick={handleResetToBaseline}
            className="btn btn-outline btn-sm"
            title="Reset parameters to initial values"
          >
            <RotateCcw size={12} />
            <span>Reset Levers</span>
          </button>
        </div>

        {/* Financial Status Notification */}
        {results.isOverBudget ? (
          <div className="editorial-banner editorial-banner-terracotta">
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <strong>Deficit Notice:</strong> Projected spend exceeds your target allocation by{' '}
              <strong>{formatCurrency(results.deficitAmount, currentCurrency)}</strong>.{' '}
              Estimated total is <strong>{formatCurrency(results.totalEstimatedCost, currentCurrency)}</strong>{' '}
              ({formatCurrency(results.costPerGuest, currentCurrency)}/guest). Review the mitigation levers below.
            </div>
          </div>
        ) : (
          <div className="editorial-banner editorial-banner-sage">
            <CheckCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <strong>Within Allocation:</strong> Your celebration plan has a balanced surplus of{' '}
              <strong>{formatCurrency(results.surplusAmount, currentCurrency)}</strong> remaining buffer.{' '}
              Total projected spend is <strong>{formatCurrency(results.totalEstimatedCost, currentCurrency)}</strong>{' '}
              ({formatCurrency(results.costPerGuest, currentCurrency)}/guest).
            </div>
          </div>
        )}

        {/* 2-Column Work Bench */}
        <div className="grid-2" style={{ gap: '32px', marginTop: '12px' }}>
          {/* LEFT: FINANCIAL LEVERS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4
              style={{
                fontSize: '0.95rem',
                borderBottom: '1px solid var(--border-sandstone)',
                paddingBottom: '6px',
                color: 'var(--text-deep)',
              }}
            >
              Adjustable Levers
            </h4>

            {/* Guest Headcount Slider */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label htmlFor="slider-guest-count" className="form-label">
                  Expected Attendees
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>
                  {guestCount} Guests
                </span>
              </div>
              <input
                id="slider-guest-count"
                type="range"
                min="15"
                max="500"
                step="5"
                value={guestCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (onGuestCountChange && Number.isFinite(val)) {
                    onGuestCountChange(val);
                  }
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>Intimate (15)</span>
                <span>Medium (150)</span>
                <span>Grand Vivah (500)</span>
              </div>
            </div>

            {/* Target Budget Slider */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label htmlFor="slider-budget" className="form-label">
                  Target Budget Ceiling
                </label>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-deep)' }}>
                  {formatCurrency(targetBudget, currentCurrency)} ({formatCurrencyCompact(targetBudget, currentCurrency)})
                </span>
              </div>
              <input
                id="slider-budget"
                type="range"
                min="100000"
                max="4000000"
                step="50000"
                value={targetBudget}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (onBudgetChange && Number.isFinite(val)) {
                    onBudgetChange(val);
                  }
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span>₹1 Lakh</span>
                <span>₹20 Lakhs</span>
                <span>₹40 Lakhs</span>
              </div>
            </div>

            {/* Catering Style Selector */}
            <div>
              <label className="form-label" style={{ marginBottom: '6px', display: 'block' }}>
                Catering & Dining Hospitality
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { key: 'budget', label: isNonWedding ? 'Festive Buffet' : 'Traditional Feast', price: baselines.cateringPerGuest.budget },
                  { key: 'standard', label: 'Deluxe Multi-Cuisine', price: baselines.cateringPerGuest.standard },
                  { key: 'premium', label: isNonWedding ? 'Gourmet Tasting' : 'Palace Artisanal', price: baselines.cateringPerGuest.premium },
                ].map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setCateringTier(tier.key as any)}
                    className={`btn btn-sm ${
                      cateringTier === tier.key ? 'btn-primary' : 'btn-secondary'
                    }`}
                    style={{ flexDirection: 'column', padding: '8px 4px', textAlign: 'center' }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{tier.label}</span>
                    <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>
                      ~{formatCurrency(tier.price, currentCurrency)}/head
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Decor Tier Selector */}
            <div>
              <label className="form-label" style={{ marginBottom: '6px', display: 'block' }}>
                {isNonWedding ? 'Thematic Decor & Staging' : 'Decor & Stage Production'}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { key: 'minimal', label: isNonWedding ? 'Ambient Floral' : 'Genda Phool & Urli', price: baselines.decorFixed.minimal },
                  { key: 'signature', label: isNonWedding ? 'Signature Backdrop' : 'Signature Mandap', price: baselines.decorFixed.signature },
                  { key: 'luxury', label: isNonWedding ? 'Grand Production' : 'Palace Grandeur', price: baselines.decorFixed.luxury },
                ].map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setDecorTier(tier.key as any)}
                    className={`btn btn-sm ${
                      decorTier === tier.key ? 'btn-primary' : 'btn-secondary'
                    }`}
                    style={{ flexDirection: 'column', padding: '8px 4px', textAlign: 'center' }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{tier.label}</span>
                    <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>
                      {formatCurrencyCompact(tier.price, currentCurrency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Music & Sound Tier */}
            <div>
              <label className="form-label" style={{ marginBottom: '6px', display: 'block' }}>
                Music & Audio Entertainment
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {[
                  { key: 'diy', label: 'Sound Rig & Mic', price: baselines.entertainmentFixed.diy },
                  { key: 'live_dj', label: 'Celebration DJ', price: baselines.entertainmentFixed.live_dj },
                  { key: 'full_band', label: 'Live Band / Troupe', price: baselines.entertainmentFixed.full_band },
                ].map((tier) => (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => setEntertainmentTier(tier.key as any)}
                    className={`btn btn-sm ${
                      entertainmentTier === tier.key ? 'btn-primary' : 'btn-secondary'
                    }`}
                    style={{ flexDirection: 'column', padding: '8px 4px', textAlign: 'center' }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{tier.label}</span>
                    <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>
                      {formatCurrencyCompact(tier.price, currentCurrency)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Advanced Levers & Contingency */}
            <div
              style={{
                border: '1px solid var(--border-sandstone)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-paper-elevated)',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => setShowAdvancedLevers((prev) => !prev)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-deep)',
                  textAlign: 'left',
                }}
              >
                <span>Advanced Controls (Contingency Buffer & Ceremonies)</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                  {showAdvancedLevers ? 'Collapse −' : 'Configure +'}
                </span>
              </button>

              {showAdvancedLevers && (
                <div
                  style={{
                    padding: '12px 14px',
                    borderTop: '1px solid var(--border-sandstone)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'var(--bg-paper)',
                  }}
                >
                  {/* Contingency Slider */}
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <label htmlFor="slider-contingency" className="form-label" style={{ fontSize: '0.78rem' }}>
                        Safety Contingency Buffer
                      </label>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-sage)' }}>
                        {contingencyPercent}% ({formatCurrency(results.categoryTotals.contingency, currentCurrency)})
                      </span>
                    </div>
                    <input
                      id="slider-contingency"
                      type="range"
                      min="5"
                      max="20"
                      step="1"
                      value={contingencyPercent}
                      onChange={(e) => setContingencyPercent(parseInt(e.target.value, 10))}
                    />
                  </div>

                  {/* Cultural / Ceremony Checkboxes */}
                  {(baselines.ritualsFixed > 0 || baselines.attireMehendiFixed > 0) && (
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-sandstone)',
                        background: 'var(--bg-paper-elevated)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {baselines.ritualsFixed > 0 && (
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            color: 'var(--text-deep)',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={includeRituals}
                            onChange={(e) => setIncludeRituals(e.target.checked)}
                            style={{ accentColor: 'var(--color-terracotta)' }}
                          />
                          <span>
                            Puja & Ceremonial Samagri (+{formatCurrency(baselines.ritualsFixed, currentCurrency)})
                          </span>
                        </label>
                      )}

                      {baselines.attireMehendiFixed > 0 && (
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            color: 'var(--text-deep)',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={includeMehendiAttire}
                            onChange={(e) => setIncludeMehendiAttire(e.target.checked)}
                            style={{ accentColor: 'var(--color-terracotta)' }}
                          />
                          <span>
                            Henna & Cultural Tying (+{formatCurrency(baselines.attireMehendiFixed, currentCurrency)})
                          </span>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: RECONCILED FINANCIAL LEDGER */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h4
              style={{
                fontSize: '0.95rem',
                borderBottom: '1px solid var(--border-sandstone)',
                paddingBottom: '6px',
                color: 'var(--text-deep)',
              }}
            >
              Reconciled Ledger
            </h4>

            {/* Metric Blocks */}
            <div className="grid-2" style={{ gap: '12px' }}>
              <div className="stat-box">
                <span className="stat-label">Total Estimated Spend</span>
                <span
                  className="stat-value"
                  style={{
                    color: results.isOverBudget ? 'var(--color-terracotta)' : 'var(--color-sage)',
                  }}
                >
                  {formatCurrency(results.totalEstimatedCost, currentCurrency)}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Target Limit: {formatCurrency(results.targetBudget, currentCurrency)}
                </span>
              </div>

              <div className="stat-box">
                <span className="stat-label">Cost Per Guest</span>
                <span className="stat-value" style={{ color: 'var(--color-marigold)' }}>
                  {formatCurrency(results.costPerGuest, currentCurrency)}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Based on {guestCount} attendees
                </span>
              </div>

              <div className="stat-box">
                <span className="stat-label">Budget Variance</span>
                <span
                  className="stat-value"
                  style={{
                    color: results.isOverBudget ? 'var(--color-terracotta)' : 'var(--color-sage)',
                  }}
                >
                  {results.isOverBudget
                    ? `-${formatCurrency(results.deficitAmount, currentCurrency)}`
                    : `+${formatCurrency(results.surplusAmount, currentCurrency)}`}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {results.isOverBudget ? 'Deficit to trim' : 'Surplus buffer'}
                </span>
              </div>

              <div className="stat-box">
                <span className="stat-label">Dining Subtotal</span>
                <span className="stat-value">
                  {formatCurrency(results.categoryTotals.catering, currentCurrency)}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {Math.round((results.categoryTotals.catering / results.totalEstimatedCost) * 100)}% of total spend
                </span>
              </div>
            </div>

            {/* Reconciled Category Distribution */}
            <div
              style={{
                background: 'var(--bg-paper)',
                border: '1px solid var(--border-sandstone)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Budget Allocation Shares
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Total: {formatCurrency(results.totalEstimatedCost, currentCurrency)}
                </span>
              </div>

              {/* Proportional Multi-Segment Allocation Bar */}
              {results.totalEstimatedCost > 0 && (
                <div
                  style={{
                    display: 'flex',
                    height: '8px',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    marginBottom: '14px',
                    background: 'var(--border-subtle)',
                  }}
                >
                  {[
                    { label: 'Catering', amount: results.categoryTotals.catering, color: '#C76B29' },
                    { label: isNonWedding ? 'Decor & Staging' : 'Decor & Mandap', amount: results.categoryTotals.decor, color: '#D68527' },
                    { label: isNonWedding ? 'Venue Rental' : 'Venue Haveli Rental', amount: results.categoryTotals.venue, color: '#9B5B47' },
                    { label: 'Photography', amount: results.categoryTotals.photography, color: '#5B7065' },
                    { label: 'Entertainment', amount: results.categoryTotals.entertainment, color: '#7E6B80' },
                    { label: 'Rituals', amount: results.categoryTotals.rituals, color: '#A04530' },
                    { label: 'Attire & Grooming', amount: results.categoryTotals.attire_mehendi, color: '#C98528' },
                    { label: 'Favors', amount: results.categoryTotals.invites_favors, color: '#8F5E70' },
                    { label: 'Contingency', amount: results.categoryTotals.contingency, color: '#6E7E63' },
                  ]
                    .filter((c) => c.amount > 0)
                    .map((cat) => {
                      const pct = (cat.amount / results.totalEstimatedCost) * 100;
                      return (
                        <div
                          key={cat.label}
                          title={`${cat.label}: ${formatCurrency(cat.amount, currentCurrency)} (${Math.round(pct)}%)`}
                          style={{
                            width: `${pct}%`,
                            backgroundColor: cat.color,
                            transition: 'width 0.25s ease',
                          }}
                        />
                      );
                    })}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'Catering & Dining Hospitality', amount: results.categoryTotals.catering, color: '#C76B29' },
                  { label: isNonWedding ? 'Thematic Decor & Staging' : 'Decor & Mandap Architecture', amount: results.categoryTotals.decor, color: '#D68527' },
                  { label: isNonWedding ? 'Venue Rental / Lawn' : 'Heritage Haveli Venue Rental', amount: results.categoryTotals.venue, color: '#9B5B47' },
                  { label: 'Photography & Highlight Video', amount: results.categoryTotals.photography, color: '#5B7065' },
                  { label: 'Sound, DJ & Cultural Artists', amount: results.categoryTotals.entertainment, color: '#7E6B80' },
                  { label: 'Puja Samagri & Rituals', amount: results.categoryTotals.rituals, color: '#A04530' },
                  { label: isNonWedding ? 'Festive Grooming & Attire' : 'Mehendi & Safa Grooming', amount: results.categoryTotals.attire_mehendi, color: '#C98528' },
                  { label: 'Mithai, Invites & Favors', amount: results.categoryTotals.invites_favors, color: '#8F5E70' },
                  { label: 'Safety Contingency Buffer', amount: results.categoryTotals.contingency, color: '#6E7E63' },
                ]
                  .filter((c) => c.amount > 0)
                  .map((cat) => {
                    const percent =
                      Math.round((cat.amount / results.totalEstimatedCost) * 100) || 0;
                    return (
                      <div key={cat.label} style={{ fontSize: '0.78rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '2px',
                          }}
                        >
                          <span style={{ color: 'var(--text-muted)' }}>{cat.label}</span>
                          <span style={{ fontWeight: 600, color: 'var(--text-deep)' }}>
                            {formatCurrency(cat.amount, currentCurrency)} ({percent}%)
                          </span>
                        </div>
                        <div
                          style={{
                            height: '4px',
                            background: 'var(--border-subtle)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${percent}%`,
                              height: '100%',
                              background: cat.color,
                              transition: 'width 0.2s ease',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Actionable Recommendations */}
            <div
              style={{
                background: 'var(--bg-paper-elevated)',
                border: '1px solid var(--border-sandstone)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-deep)',
                  marginBottom: '6px',
                }}
              >
                {results.isOverBudget ? 'Mitigation Recommendations:' : 'Optimization Advice:'}
              </div>

              <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {results.recommendations.map((rec, idx) => (
                  <li
                    key={idx}
                    style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45 }}
                  >
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
