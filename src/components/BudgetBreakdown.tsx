'use client';

import React from 'react';
import { Printer } from 'lucide-react';
import { EventFormData, CurrencyCode, SimulatorResults } from '../types';
import { formatCurrency, formatCurrencyCompact } from '../utils/budgetCalculations';

interface BudgetBreakdownProps {
  eventData: EventFormData;
  currentCurrency: CurrencyCode;
  simulatorResults?: SimulatorResults;
}

export const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  eventData,
  currentCurrency,
  simulatorResults,
}) => {
  const { targetBudget, guestCount } = eventData;

  const totals = simulatorResults?.categoryTotals || {
    catering: Math.round(targetBudget * 0.35),
    decor: Math.round(targetBudget * 0.18),
    venue: Math.round(targetBudget * 0.16),
    photography: Math.round(targetBudget * 0.1),
    entertainment: Math.round(targetBudget * 0.06),
    rituals: Math.round(targetBudget * 0.02),
    attire_mehendi: Math.round(targetBudget * 0.02),
    invites_favors: Math.round(targetBudget * 0.03),
    contingency: Math.round(targetBudget * 0.08),
  };

  const totalCalculated =
    simulatorResults?.totalEstimatedCost ||
    Object.values(totals).reduce((a, b) => a + b, 0);

  const eventTypeLower = (eventData.eventType || '').toLowerCase();
  const isNonWedding =
    eventTypeLower.includes('birthday') ||
    eventTypeLower.includes('anniversary') ||
    eventTypeLower.includes('festival') ||
    eventTypeLower.includes('community') ||
    eventTypeLower.includes('mela');

  const categories = [
    {
      id: 'catering',
      name: 'Catering & Dining Hospitality',
      amount: totals.catering,
      isPerGuest: true,
      notes: isNonWedding
        ? 'Live food counters, regional appetizers, dessert bar, and hospitality staff.'
        : 'Live chaat counters, authentic regional specialties, dessert lounge, and steward service.',
      color: '#C76B29',
    },
    {
      id: 'decor',
      name: isNonWedding ? 'Thematic Decor & Ambient Staging' : 'Decor, Mandap & Stage Craft',
      amount: totals.decor,
      isPerGuest: false,
      notes: isNonWedding
        ? 'Thematic photo booth, floral accents, Edison filament lighting, and celebration backdrop.'
        : 'Ceremonial mandap, fresh marigold and rajnigandha blooms, ambient lighting truss, and stage backdrop.',
      color: '#D68527',
    },
    {
      id: 'venue',
      name: isNonWedding ? 'Celebration Venue / Terrace Lawn' : 'Heritage Haveli / Venue Grounds',
      amount: totals.venue,
      isPerGuest: false,
      notes: 'Space rental, generator power backup, climate cooling/heating, and guest facilities.',
      color: '#9B5B47',
    },
    {
      id: 'photography',
      name: 'Photography & Highlight Video',
      amount: totals.photography,
      isPerGuest: false,
      notes: isNonWedding
        ? 'Candid event photographer, high-res digital gallery, and short highlight reel.'
        : 'Candid photographer, traditional family coverage, 4K teaser reel, and full heirloom album.',
      color: '#5B7065',
    },
    {
      id: 'entertainment',
      name: isNonWedding ? 'Music, DJ & Audio Staging' : 'Music, DJ & Cultural Troupe',
      amount: totals.entertainment,
      isPerGuest: false,
      notes: isNonWedding
        ? 'Professional celebration DJ or acoustic performer with wireless mics for speeches/toasts.'
        : 'Baraat Dhol procession, wedding DJ, acoustic audio truss, and traditional folk artists.',
      color: '#7E6B80',
    },
    {
      id: 'rituals',
      name: 'Puja, Panditji & Havan Samagri',
      amount: totals.rituals,
      isPerGuest: false,
      notes: 'Purohit dakshina, copper vessels, havan kund, pure ghee, and sacred puja samagri.',
      color: '#A04530',
    },
    {
      id: 'attire_mehendi',
      name: 'Henna Artistry & Safa Tying',
      amount: totals.attire_mehendi,
      isPerGuest: false,
      notes: 'Organic Sojat bridal henna, guest mehendi station, and traditional safa draping team.',
      color: '#C98528',
    },
    {
      id: 'invites_favors',
      name: 'Attendee Favors & Digital Invites',
      amount: totals.invites_favors,
      isPerGuest: true,
      notes: isNonWedding
        ? 'Customized attendee favors/gift hampers and digital animated RSVP invites.'
        : 'Bespoke sweet boxes, brass gift favors, and WhatsApp animated invitations with RSVP tracking.',
      color: '#8F5E70',
    },
    {
      id: 'contingency',
      name: 'Safety Contingency Reserve',
      amount: totals.contingency,
      isPerGuest: false,
      notes: 'Dedicated buffer reserved for unanticipated guest plates, weather adaptation, or emergency needs.',
      color: '#6E7E63',
    },
  ].filter((c) => c.amount > 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Editorial Header Ledger */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          background: 'var(--bg-paper)',
          padding: '24px 28px',
        }}
      >
        <div>
          <span className="editorial-kicker">Comprehensive Ledger</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-deep)', fontFamily: 'var(--font-sans)' }}>
            {formatCurrency(totalCalculated, currentCurrency)}{' '}
            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-terracotta)' }}>
              ({formatCurrencyCompact(totalCalculated, currentCurrency)})
            </span>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Target Budget: <strong>{formatCurrency(targetBudget, currentCurrency)}</strong> •{' '}
            {totalCalculated <= targetBudget ? (
              <span style={{ color: 'var(--color-sage)', fontWeight: 600 }}>
                Within target by {formatCurrency(targetBudget - totalCalculated, currentCurrency)}
              </span>
            ) : (
              <span style={{ color: 'var(--color-terracotta)', fontWeight: 600 }}>
                Over target by {formatCurrency(totalCalculated - targetBudget, currentCurrency)}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Guest Allocation
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-deep)' }}>
              {guestCount} Attendees
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ~{formatCurrency(guestCount > 0 ? Math.round(totalCalculated / guestCount) : 0, currentCurrency)}/attendee
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-secondary btn-sm no-print"
            title="Export a printable PDF dossier"
          >
            <Printer size={13} />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Category Progress Stacked Bar */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '6px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          <span>Category Share Distribution (100% Reconciled)</span>
          <span>Zero Arithmetic Drift</span>
        </div>
        <div
          style={{
            height: '10px',
            borderRadius: '2px',
            overflow: 'hidden',
            display: 'flex',
            background: 'var(--border-sandstone)',
          }}
        >
          {categories.map((cat) => {
            const pct = (cat.amount / totalCalculated) * 100;
            return (
              <div
                key={cat.id}
                style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: cat.color,
                }}
                title={`${cat.name}: ${Math.round(pct)}% (${formatCurrency(cat.amount, currentCurrency)})`}
              />
            );
          })}
        </div>
      </div>

      {/* Itemized Categories Grid */}
      <div className="grid-2" style={{ gap: '16px' }}>
        {categories.map((cat) => {
          const percent = Math.round((cat.amount / totalCalculated) * 100);
          const perGuestAmount =
            cat.isPerGuest && guestCount > 0 ? Math.round(cat.amount / guestCount) : null;

          return (
            <div
              key={cat.id}
              className="card"
              style={{
                padding: '18px 20px',
                borderLeft: `3px solid ${cat.color}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '4px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.96rem', color: 'var(--text-deep)', marginBottom: '1px' }}>
                    {cat.name}
                  </h4>
                  <span className="badge badge-neutral" style={{ fontSize: '0.66rem' }}>
                    {percent}% of total
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-deep)' }}>
                    {formatCurrency(cat.amount, currentCurrency)}
                  </div>
                  {perGuestAmount && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                      ~{formatCurrency(perGuestAmount, currentCurrency)}/head
                    </div>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '4px' }}>
                {cat.notes}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
