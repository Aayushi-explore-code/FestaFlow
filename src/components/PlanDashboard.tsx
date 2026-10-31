'use client';

import React, { useState, useCallback } from 'react';
import {
  SlidersHorizontal,
  PieChart,
  Calendar,
  ClipboardList,
  Sparkles,
  MapPin,
  Users,
  Palette,
  Printer,
  Compass,
  Utensils,
  BookmarkCheck,
  Edit2,
} from 'lucide-react';
import {
  EventFormData,
  CurrencyCode,
  TimelineMilestone,
  VendorChecklistItem,
  SimulatorResults,
  SimulatorOptions,
} from '../types';
import { BudgetSimulator } from './BudgetSimulator';
import { BudgetBreakdown } from './BudgetBreakdown';
import { TimelineSection } from './TimelineSection';
import { VendorChecklist } from './VendorChecklist';
import { IndianMarketDataViewer } from './IndianMarketDataViewer';
import { AICulturalAdvisor } from './AICulturalAdvisor';
import { RangoliMandala, RangoliDivider } from './RangoliMotif';
import { formatCurrency, formatCurrencyCompact, calculateSimulatorTotals } from '../utils/budgetCalculations';

interface PlanDashboardProps {
  eventData: EventFormData;
  currentCurrency: CurrencyCode;
  timelineMilestones: TimelineMilestone[];
  vendorChecklist: VendorChecklistItem[];
  simulatorOptions?: SimulatorOptions;
  onOpenForm: () => void;
  onSavePlan: () => void;
  onUpdateMilestones?: (milestones: TimelineMilestone[]) => void;
  onUpdateVendors?: (vendors: VendorChecklistItem[]) => void;
  onUpdateSimulatorOptions?: (options: SimulatorOptions) => void;
}

export const PlanDashboard: React.FC<PlanDashboardProps> = ({
  eventData,
  currentCurrency,
  timelineMilestones,
  vendorChecklist,
  simulatorOptions,
  onOpenForm,
  onSavePlan,
  onUpdateMilestones,
  onUpdateVendors,
  onUpdateSimulatorOptions,
}) => {
  const [activeTab, setActiveTab] = useState<
    'simulator' | 'budget' | 'market' | 'advisor' | 'timeline' | 'vendors'
  >('simulator');

  const [showSecondaryDetails, setShowSecondaryDetails] = useState<boolean>(false);
  const [activeSimulatorResults, setActiveSimulatorResults] = useState<SimulatorResults>(() => {
    const isNonWedding =
      (eventData.eventType || '').toLowerCase().includes('birthday') ||
      (eventData.eventType || '').toLowerCase().includes('anniversary') ||
      (eventData.eventType || '').toLowerCase().includes('festival') ||
      (eventData.eventType || '').toLowerCase().includes('community') ||
      (eventData.eventType || '').toLowerCase().includes('mela');

    const opts: SimulatorOptions = simulatorOptions || {
      guestCount: eventData.guestCount,
      targetBudget: eventData.targetBudget,
      cateringTier: 'standard',
      decorTier: 'signature',
      entertainmentTier: 'live_dj',
      includeRituals: !isNonWedding,
      includeMehendiAttire: !isNonWedding,
      contingencyPercent: 10,
      eventType: eventData.eventType,
    };
    return calculateSimulatorTotals(opts);
  });

  const handleSimulatorUpdate = useCallback(
    (results: SimulatorResults, options: SimulatorOptions) => {
      setActiveSimulatorResults((prev) => {
        if (
          prev &&
          prev.totalEstimatedCost === results.totalEstimatedCost &&
          prev.targetBudget === results.targetBudget &&
          prev.variance === results.variance
        ) {
          return prev;
        }
        return results;
      });
      if (onUpdateSimulatorOptions) {
        onUpdateSimulatorOptions(options);
      }
    },
    [onUpdateSimulatorOptions]
  );

  const isWeddingEvent =
    eventData.eventType.toLowerCase().includes('wedding') ||
    eventData.eventType.toLowerCase().includes('vivah') ||
    eventData.eventType.toLowerCase().includes('sangeet') ||
    eventData.eventType.toLowerCase().includes('mehendi');

  const perHeadTarget =
    eventData.guestCount > 0 ? Math.round(eventData.targetBudget / eventData.guestCount) : 0;

  return (
    <section id="dashboard-section" style={{ padding: '32px 0 64px 0' }}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        {/* SIMPLIFIED, EDITORIAL EVENT BRIEF */}
        <div
          className="card"
          style={{
            marginBottom: '20px',
            background: 'var(--bg-paper)',
            border: '1px solid var(--border-sandstone)',
            borderRadius: 'var(--radius-sm)',
            padding: '24px 28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            {/* Left: Essential Event Hierarchy */}
            <div style={{ flex: '1 1 480px', minWidth: '280px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="badge badge-terracotta">{eventData.eventType}</span>
                {eventData.eventDate && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    • {isWeddingEvent || eventData.eventType.toLowerCase().includes('griha') ? 'Muhurat' : 'Celebration Date'}: <strong>{eventData.eventDate}</strong>
                  </span>
                )}
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)',
                  marginBottom: '10px',
                  color: 'var(--text-deep)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  lineHeight: 1.22,
                  letterSpacing: '-0.015em',
                }}
              >
                {eventData.eventName}
              </h1>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={13} color="var(--color-terracotta)" /> {eventData.location || 'Jaipur, Rajasthan'}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Users size={13} color="var(--color-marigold)" /> {eventData.guestCount} Confirmed Guests
                </span>
                {eventData.isVegetarian && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-sage)' }}>
                    <Utensils size={12} /> Pure Veg / Satvik
                  </span>
                )}
              </div>
            </div>

            {/* Right: Budget Target & Concise Controls */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                minWidth: '200px',
              }}
            >
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Target Budget Ceiling
              </span>

              <div
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-terracotta)',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1.15,
                  marginTop: '1px',
                }}
              >
                {formatCurrency(eventData.targetBudget, currentCurrency)}
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                ~{formatCurrency(perHeadTarget, currentCurrency)}/head ({formatCurrencyCompact(eventData.targetBudget, currentCurrency)})
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={onOpenForm}
                  className="btn btn-secondary btn-sm"
                  title="Modify parameters in Step 01"
                >
                  <Edit2 size={12} />
                  <span>Edit Parameters</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSecondaryDetails((prev) => !prev)}
                  className="btn btn-outline btn-sm"
                  title="Toggle cultural aesthetic and family notes"
                >
                  <span>{showSecondaryDetails ? 'Hide Details' : 'View Notes'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Clean Expandable Drawer for Secondary Metadata */}
          {showSecondaryDetails && (
            <div
              style={{
                marginTop: '16px',
                paddingTop: '14px',
                borderTop: '1px solid var(--border-sandstone)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
                fontSize: '0.82rem',
                color: 'var(--text-deep)',
              }}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '2px' }}>
                  Cultural Aesthetic & Theme:
                </strong>
                <span>{eventData.themePreference || 'Contemporary Festive Warmth'}</span>
              </div>
              {eventData.notes && (
                <div>
                  <strong style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: '2px' }}>
                    Family Priorities & Guidelines:
                  </strong>
                  <span style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>{eventData.notes}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RESPONSIVE SEGMENTED NAVIGATION */}
        <div className="tabs-nav no-print" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'simulator'}
            onClick={() => setActiveTab('simulator')}
            className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
          >
            <SlidersHorizontal size={14} />
            <span>Simulator</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'budget'}
            onClick={() => setActiveTab('budget')}
            className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`}
          >
            <PieChart size={14} />
            <span>Budget Ledger</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'market'}
            onClick={() => setActiveTab('market')}
            className={`tab-btn ${activeTab === 'market' ? 'active' : ''}`}
          >
            <Compass size={14} />
            <span>Market Rates</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'advisor'}
            onClick={() => setActiveTab('advisor')}
            className={`tab-btn ${activeTab === 'advisor' ? 'active' : ''}`}
          >
            <Sparkles size={14} />
            <span>Cultural Advisor</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'timeline'}
            onClick={() => setActiveTab('timeline')}
            className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          >
            <Calendar size={14} />
            <span>{isWeddingEvent ? 'Ceremony Timeline' : 'Planning Timeline'}</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'vendors'}
            onClick={() => setActiveTab('vendors')}
            className={`tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
          >
            <ClipboardList size={14} />
            <span>Vendor Handbook</span>
          </button>
        </div>

        {/* TAB WORKSPACE */}
        <div>
          {activeTab === 'simulator' && (
            <BudgetSimulator
              currentBudget={eventData.targetBudget}
              currentGuestCount={eventData.guestCount}
              currentCurrency={currentCurrency}
              eventType={eventData.eventType}
              initialOptions={simulatorOptions}
              onUpdateResults={handleSimulatorUpdate}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetBreakdown
              eventData={eventData}
              currentCurrency={currentCurrency}
              simulatorResults={activeSimulatorResults}
            />
          )}

          {activeTab === 'market' && (
            <IndianMarketDataViewer currentCurrency={currentCurrency} />
          )}

          {activeTab === 'advisor' && (
            <AICulturalAdvisor eventData={eventData} />
          )}

          {activeTab === 'timeline' && (
            <TimelineSection
              initialMilestones={timelineMilestones}
              onUpdateMilestones={onUpdateMilestones}
            />
          )}

          {activeTab === 'vendors' && (
            <VendorChecklist
              initialVendors={vendorChecklist}
              currentCurrency={currentCurrency}
              onUpdateVendors={onUpdateVendors}
            />
          )}
        </div>
      </div>
    </section>
  );
};
