'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Edit3,
  Check,
} from 'lucide-react';
import { VendorChecklistItem, CurrencyCode } from '../types';
import { formatCurrency } from '../utils/budgetCalculations';

interface VendorChecklistProps {
  initialVendors: VendorChecklistItem[];
  currentCurrency: CurrencyCode;
  onUpdateVendors?: (vendors: VendorChecklistItem[]) => void;
}

export const VendorChecklist: React.FC<VendorChecklistProps> = ({
  initialVendors,
  currentCurrency,
  onUpdateVendors,
}) => {
  const [vendors, setVendors] = useState<VendorChecklistItem[]>(initialVendors);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editQuote, setEditQuote] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>('');

  React.useEffect(() => {
    setVendors(initialVendors);
  }, [initialVendors]);

  const cycleStatus = (id: string) => {
    const updated = vendors.map((v) => {
      if (v.id === id) {
        const nextStatus: VendorChecklistItem['status'] =
          v.status === 'not_started'
            ? 'comparing_quotes'
            : v.status === 'comparing_quotes'
            ? 'booked'
            : 'not_started';
        return { ...v, status: nextStatus };
      }
      return v;
    });
    setVendors(updated);
    if (onUpdateVendors) onUpdateVendors(updated);
  };

  const startEdit = (v: VendorChecklistItem) => {
    setEditingId(v.id);
    setEditName(v.bookedVendorName || '');
    setEditQuote(v.actualQuote || 0);
    setEditNotes(v.notes || '');
  };

  const saveEdit = (id: string) => {
    const updated = vendors.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          bookedVendorName: editName.trim(),
          actualQuote: editQuote,
          notes: editNotes.trim(),
          status: editName.trim() ? ('booked' as const) : v.status,
        };
      }
      return v;
    });
    setVendors(updated);
    if (onUpdateVendors) onUpdateVendors(updated);
    setEditingId(null);
  };

  const getStatusBadge = (status: VendorChecklistItem['status']) => {
    switch (status) {
      case 'booked':
        return (
          <span className="badge badge-sage">
            <CheckCircle2 size={11} /> Booked & Locked
          </span>
        );
      case 'comparing_quotes':
        return (
          <span className="badge badge-marigold">
            <Clock size={11} /> Comparing Quotes
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="badge badge-neutral">
            <AlertCircle size={11} /> Uncontracted
          </span>
        );
    }
  };

  const getDirectorySearchUrl = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('venue')) return 'https://www.wedmegood.com/vendors/jaipur/wedding-venues/';
    if (cat.includes('catering')) return 'https://www.wedmegood.com/vendors/jaipur/wedding-caterers/';
    if (cat.includes('decor')) return 'https://www.wedmegood.com/vendors/jaipur/wedding-decorators/';
    if (cat.includes('photo')) return 'https://www.wedmegood.com/vendors/jaipur/wedding-photographers/';
    if (cat.includes('music') || cat.includes('dj') || cat.includes('artist'))
      return 'https://www.wedmegood.com/vendors/jaipur/wedding-entertainment/';
    return 'https://www.wedmegood.com/vendors/jaipur/';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Handbook Overview Banner */}
      <div className="editorial-banner editorial-banner-marigold" style={{ margin: 0 }}>
        <div>
          <strong>Vendor Procurement Handbook:</strong> FestaFlow provides objective market benchmarks,
          essential contract vetting questions, and hiring checklists instead of fabricated vendor directories
          or unverified availability claims.
        </div>
      </div>

      {/* Handbook Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {vendors.map((vendor, index) => (
          <div key={vendor.id} className="card" style={{ padding: '24px' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: '1px solid var(--border-sandstone)',
                paddingBottom: '12px',
                marginBottom: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span className="editorial-kicker">Section 0{index + 1} • {vendor.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-terracotta)', fontWeight: 600 }}>
                    Target Allocation: {vendor.recommendedBudgetRange}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-deep)' }}>{vendor.title}</h3>
                {vendor.bookedVendorName && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-sage)', fontWeight: 600, marginTop: '2px' }}>
                    Contracted Partner: {vendor.bookedVendorName}{' '}
                    {vendor.actualQuote && vendor.actualQuote > 0
                      ? `(${formatCurrency(vendor.actualQuote, currentCurrency)})`
                      : ''}
                  </div>
                )}
              </div>

              {/* Status & Edit Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => cycleStatus(vendor.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  title="Click to advance status"
                >
                  {getStatusBadge(vendor.status)}
                </button>

                <button
                  type="button"
                  onClick={() => startEdit(vendor)}
                  className="btn btn-outline btn-sm"
                  title="Record contract quotation"
                >
                  <Edit3 size={12} />
                  <span>Record Terms</span>
                </button>
              </div>
            </div>

            {/* Editable Terms Drawer */}
            {editingId === vendor.id && (
              <div
                style={{
                  background: 'var(--bg-paper-elevated)',
                  border: '1px solid var(--color-marigold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-deep)', marginBottom: '8px' }}>
                  Record Quotation Terms & Contract Notes:
                </div>
                <div className="grid-3" style={{ gap: '10px', marginBottom: '10px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Business Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Amer Heritage Catering"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.84rem', padding: '6px 10px' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Quoted Fee ({currentCurrency})</label>
                    <input
                      type="number"
                      placeholder="e.g. 250000"
                      value={editQuote > 0 ? editQuote : ''}
                      onChange={(e) => setEditQuote(parseInt(e.target.value, 10) || 0)}
                      className="form-input"
                      style={{ fontSize: '0.84rem', padding: '6px 10px' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.78rem' }}>Advance & Terms Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. 25% token advance, balance post-event"
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.84rem', padding: '6px 10px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="btn btn-outline btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => saveEdit(vendor.id)}
                    className="btn btn-primary btn-sm"
                  >
                    <Check size={12} />
                    <span>Save Terms</span>
                  </button>
                </div>
              </div>
            )}

            {/* Vetting Questions */}
            <div>
              <div
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text-deep)',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Crucial Vetting Questions Before Agreement:
              </div>

              <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {vendor.keyQuestionsToAsk.map((q, idx) => (
                  <li key={idx} style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Handbook Footnote */}
            <div
              style={{
                marginTop: '14px',
                borderTop: '1px solid var(--border-sandstone)',
                paddingTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {vendor.notes ? (
                  <span>
                    <strong>Notes:</strong> {vendor.notes}
                  </span>
                ) : (
                  <span>No terms notes recorded.</span>
                )}
              </div>

              <a
                href={getDirectorySearchUrl(vendor.category)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.74rem' }}
                title="Search and verify real licensed vendors in Jaipur and Rajasthan"
              >
                <span>Find Jaipur Vendors on WedMeGood</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
