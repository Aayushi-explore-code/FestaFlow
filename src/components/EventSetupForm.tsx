'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Palette,
  CheckCircle2,
  Utensils,
  FilePlus2,
  ArrowRight,
} from 'lucide-react';
import { EventFormData, CurrencyCode } from '../types';
import { DEMO_PRESETS } from '../data/samplePlan';
import { CURRENCIES, formatCurrency, formatCurrencyCompact } from '../utils/budgetCalculations';

interface EventSetupFormProps {
  initialData: EventFormData;
  currentCurrency: CurrencyCode;
  onSubmit: (data: EventFormData) => void;
  onLoadPreset: (presetKey: string) => void;
  onStartBlankPlan: () => void;
}

export const EventSetupForm: React.FC<EventSetupFormProps> = ({
  initialData,
  currentCurrency,
  onSubmit,
  onLoadPreset,
  onStartBlankPlan,
}) => {
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const currencyConfig = CURRENCIES[currentCurrency] || CURRENCIES.INR;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === 'targetBudget' || name === 'guestCount'
            ? Math.max(0, parseInt(value, 10) || 0)
            : value,
      }));
    }
  };

  const handleApplyPreset = (key: string) => {
    if (key === 'blank') {
      onStartBlankPlan();
      setFormData(DEMO_PRESETS.blank.form);
      setSuccessMessage('Clean blank plan initialized. Enter your parameters below.');
    } else {
      const preset = DEMO_PRESETS[key];
      if (preset) {
        setFormData(preset.form);
        onLoadPreset(key);
        setSuccessMessage(`Loaded "${preset.label}". Click "Save Parameters" to update dashboard.`);
      }
    }
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData: EventFormData = {
      ...formData,
      currency: currentCurrency,
    };
    onSubmit(updatedData);
    setSuccessMessage('Celebration parameters updated. Financial ledger recalculated.');
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const quickThemePills = [
    'Royal Marigold & Rajput Heritage',
    'Warm Amber & Edison Filament Lights',
    'Shubh Deepam Diyas & Starlight Canopies',
    'Vibrant Rajasthani Bazaar Mela',
    'Sacred Brass & Fragrant Mogra',
    'Sunshine Haldi & Leheriya Drapes',
  ];

  return (
    <section id="setup-form-section" style={{ padding: '36px 0' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="card" style={{ padding: '32px' }}>
          {/* Header */}
          <div
            style={{
              borderBottom: '1px solid var(--border-sandstone)',
              paddingBottom: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <div>
                <span className="editorial-kicker">Step 01 • Parameter Setup</span>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--text-deep)' }}>
                  Celebration Details & Ground Rules
                </h2>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Deterministic budget recalculation will automatically update all ledgers
              </span>
            </div>

            {/* Curated Presets Bar - Compact & Clean */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                background: 'var(--bg-paper-elevated)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-sandstone)',
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                }}
              >
                Curated Templates:
              </span>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('royal_wedding')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem' }}
                >
                  Royal Vivah
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('birthday')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem' }}
                >
                  50th Birthday
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('cultural_festival')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem' }}
                >
                  Diwali Gala
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('community_event')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem' }}
                >
                  Society Mela
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('sangeet')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem' }}
                >
                  Sangeet
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('griha_pravesh')}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem' }}
                >
                  Griha Pravesh
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('blank')}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '3px 8px', fontSize: '0.76rem', color: 'var(--color-terracotta)' }}
                >
                  <FilePlus2 size={11} />
                  <span>Blank</span>
                </button>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="editorial-banner editorial-banner-sage" style={{ animation: 'fadeIn 0.2s ease' }}>
              <CheckCircle2 size={16} />
              <div>{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* GROUP 01: EVENT BASICS */}
            <div>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-terracotta)',
                  marginBottom: '10px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '4px',
                }}
              >
                01 • Celebration Basics
              </div>

              <div className="grid-2">
                {/* Event Name */}
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label" htmlFor="eventName">
                    Celebration Title
                  </label>
                  <input
                    id="eventName"
                    name="eventName"
                    type="text"
                    required
                    value={formData.eventName}
                    onChange={handleChange}
                    placeholder="e.g. Vikram’s Golden 50th Milestone Soirée"
                    className="form-input"
                  />
                </div>

                {/* Event Category */}
                <div className="form-group" style={{ marginBottom: '12px' }}>
                  <label className="form-label" htmlFor="eventType">
                    Occasion Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Wedding / Royal Vivah">Wedding / Royal Vivah</option>
                    <option value="Milestone Birthday">Milestone Birthday (1st, 25th, 50th, 60th)</option>
                    <option value="Festive Gala (Diwali / Navratri)">Festive Cultural Gala (Diwali / Navratri)</option>
                    <option value="Community Gathering / Society Event">Community Gathering / Society Mela</option>
                    <option value="Sangeet & Cocktail Night">Sangeet & Cocktail Night</option>
                    <option value="Haldi & Mehendi Fiesta">Haldi & Mehendi Fiesta</option>
                    <option value="Griha Pravesh (Housewarming)">Griha Pravesh (Housewarming Puja)</option>
                    <option value="Anniversary Banquet">Anniversary Celebration</option>
                    <option value="Custom Celebration">Custom Celebration</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                {/* Event Date */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="eventDate">
                    Celebration / Muhurat Date
                  </label>
                  <input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Location */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="location">
                    City / Venue Region
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Jaipur, Rajasthan / Heritage Lawn"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* GROUP 02: BUDGET & ATTENDANCE */}
            <div>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-terracotta)',
                  marginBottom: '10px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '4px',
                }}
              >
                02 • Attendance & Target Budget Ceiling
              </div>

              <div className="grid-2">
                {/* Target Budget */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="targetBudget">
                    Target Budget Ceiling ({currencyConfig.symbol})
                  </label>
                  <input
                    id="targetBudget"
                    name="targetBudget"
                    type="number"
                    min="10000"
                    step="10000"
                    required
                    value={formData.targetBudget}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {formatCurrency(formData.targetBudget, currentCurrency)} (
                    {formatCurrencyCompact(formData.targetBudget, currentCurrency)})
                  </span>
                </div>

                {/* Guest Count */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="guestCount">
                    Estimated Headcount (Attendees)
                  </label>
                  <input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    min="5"
                    max="3000"
                    required
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Average per-head budget: ~
                    {formatCurrency(
                      formData.guestCount > 0
                        ? Math.round(formData.targetBudget / formData.guestCount)
                        : 0,
                      currentCurrency
                    )}
                    /head
                  </span>
                </div>
              </div>
            </div>

            {/* GROUP 03: PREFERENCES & ATMOSPHERE */}
            <div>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-terracotta)',
                  marginBottom: '10px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '4px',
                }}
              >
                03 • Hospitality, Aesthetic & Dietary Guidelines
              </div>

              {/* Theme Preference */}
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <label className="form-label" htmlFor="themePreference">
                  Theme & Cultural Aesthetic
                </label>
                <input
                  id="themePreference"
                  name="themePreference"
                  type="text"
                  value={formData.themePreference}
                  onChange={handleChange}
                  placeholder="e.g. Royal Marigold & Starlight Amber"
                  className="form-input"
                />
              </div>

              {/* Theme Suggestions */}
              <div style={{ marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Suggested Aesthetics:
                </span>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {quickThemePills.map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, themePreference: pill }))}
                      className="btn btn-outline btn-sm"
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        borderColor:
                          formData.themePreference === pill ? 'var(--color-terracotta)' : 'var(--border-sandstone)',
                        background:
                          formData.themePreference === pill ? 'var(--color-terracotta-tint)' : 'transparent',
                        color:
                          formData.themePreference === pill ? 'var(--color-terracotta)' : 'var(--text-muted)',
                        fontWeight: formData.themePreference === pill ? 600 : 400,
                      }}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pure Veg Option */}
              <div
                style={{
                  background: 'var(--bg-paper-elevated)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '14px',
                  border: '1px solid var(--border-sandstone)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <Utensils size={15} color="var(--color-sage)" />
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-deep)',
                  }}
                >
                  <input
                    type="checkbox"
                    name="isVegetarian"
                    checked={formData.isVegetarian ?? true}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--color-sage)' }}
                  />
                  <span>Strict Pure Vegetarian / Satvik Hospitality Guidelines</span>
                </label>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  Jain-friendly preparation & separate live buffet stations
                </span>
              </div>

              {/* Notes */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="notes">
                  Special Rituals, Family Priorities & Guest Needs
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={formData.notes || ''}
                  onChange={handleChange}
                  placeholder="Mention specific priorities: e.g. elder-friendly seating, live acoustic musicians, welcome gift hampers, or stage lighting preferences."
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Submit Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--border-sandstone)',
                paddingTop: '16px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Inputs update the financial simulator and planning timeline in real time.
              </span>
              <button type="submit" className="btn btn-primary" style={{ padding: '9px 20px' }}>
                <span>Save Parameters & Recalculate</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
