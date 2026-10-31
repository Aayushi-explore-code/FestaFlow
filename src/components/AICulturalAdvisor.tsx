'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Palette,
  Clock,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { EventFormData, AICulturalAdvisorResponse } from '../types';

interface AICulturalAdvisorProps {
  eventData: EventFormData;
}

export const AICulturalAdvisor: React.FC<AICulturalAdvisorProps> = ({ eventData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [advisorData, setAdvisorData] = useState<AICulturalAdvisorResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const fetchAIBlueprint = async () => {
    if (loading) return; // Prevent duplicate requests while loading
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/ai-plan-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => null);
        throw new Error(errorJson?.error || `Server returned status ${res.status}`);
      }

      const data: AICulturalAdvisorResponse = await res.json();
      setAdvisorData(data);
      setErrorMessage(null);
    } catch (err: any) {
      console.error('Error fetching cultural blueprint:', err);
      setErrorMessage(err?.message || 'Failed to connect to the Cultural Advisor. Please verify your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIBlueprint();
  }, [eventData.eventType, eventData.eventName]);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Editorial AI Disclaimer Banner */}
      <div className="editorial-banner editorial-banner-marigold" style={{ margin: 0 }}>
        <div>
          <strong>GenAI Cultural Guidance:</strong> FestaFlow uses Google Gemini exclusively for personalized
          thematic storytelling, ceremony schedules, and hospitality advice. <em>Financial arithmetic is computed
          strictly through deterministic code.</em>
        </div>
      </div>

      {/* Main Cultural Blueprint Card */}
      <div className="card" style={{ padding: '28px' }}>
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
            <span className="editorial-kicker">
              {advisorData
                ? advisorData.isFallback
                  ? 'Curated Jaipur Knowledge Base'
                  : 'Live Google Gemini Advisor'
                : 'Cultural Advisor'}
            </span>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--text-deep)' }}>
              Ceremony Blueprint & Cultural Styling
            </h2>
          </div>

          <button
            type="button"
            onClick={fetchAIBlueprint}
            disabled={loading}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={12} />
            <span>{loading ? 'Consulting Advisor...' : 'Refresh Concept'}</span>
          </button>
        </div>

        {/* Transient warning banner if subsequent refresh fails while retaining existing blueprint */}
        {errorMessage && advisorData && (
          <div
            className="editorial-banner editorial-banner-terracotta"
            style={{
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '0.82rem' }}>
                Could not refresh cultural concept ({errorMessage}). Showing current blueprint.
              </span>
            </div>
            <button
              type="button"
              onClick={fetchAIBlueprint}
              disabled={loading}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.74rem', padding: '4px 10px', flexShrink: 0 }}
            >
              Retry
            </button>
          </div>
        )}

        {loading && !advisorData ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-deep)', marginBottom: '4px', fontWeight: 500 }}>
              Curating authentic Indian celebration themes and ceremony schedule...
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Consulting regional decor traditions, auspicious colors, and hospitality etiquette.
            </p>
          </div>
        ) : !advisorData && errorMessage ? (
          <div
            className="editorial-banner editorial-banner-terracotta"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '14px',
              margin: '16px 0',
            }}
          >
            <AlertCircle size={28} style={{ color: 'var(--color-terracotta)' }} />
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-deep)', marginBottom: '6px' }}>
                Unable to Load Cultural Blueprint
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.55 }}>
                {errorMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={fetchAIBlueprint}
              disabled={loading}
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.84rem' }}
            >
              <RefreshCw size={13} />
              <span>Retry Request</span>
            </button>
          </div>
        ) : advisorData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. THEME CONCEPT & PALETTE */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-terracotta">Aesthetic Concept</span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-deep)' }}>
                  {advisorData.themeConcept.title}
                </h3>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                {advisorData.themeConcept.description}
              </p>

              {/* Color Swatches */}
              <div style={{ marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Curated Celebration Color Swatches (Click to copy hex):
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {advisorData.themeConcept.colorPalette.map((col, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => copyHex(col.hex)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'var(--bg-paper-elevated)',
                        border: '1px solid var(--border-sandstone)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                      title={`Click to copy ${col.hex}`}
                    >
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '2px',
                          background: col.hex,
                          border: '1px solid rgba(0,0,0,0.15)',
                        }}
                      />
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-deep)' }}>
                        {col.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {copiedColor === col.hex ? 'Copied' : col.hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decor Elements */}
              <div
                style={{
                  background: 'var(--bg-paper-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  border: '1px solid var(--border-sandstone)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Decor & Floral Production Details:
                </div>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {advisorData.themeConcept.decorElements.map((el, idx) => (
                    <li key={idx} style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {el}
                    </li>
                  ))}
                  <li style={{ fontSize: '0.84rem', color: 'var(--text-deep)', marginTop: '4px' }}>
                    <strong>Floral Palette:</strong> {advisorData.themeConcept.floralStyle}
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. CEREMONIAL DAY-OF TIMELINE */}
            <div>
              <div style={{ marginBottom: '10px' }}>
                <span className="editorial-kicker">Order of Events</span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-deep)' }}>
                  Ceremonial Day-of Schedule
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {advisorData.dayOfSchedule.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '14px',
                      background: 'var(--bg-paper)',
                      border: '1px solid var(--border-sandstone)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px',
                    }}
                  >
                    <span
                      className="badge badge-marigold"
                      style={{ flexShrink: 0, fontSize: '0.7rem' }}
                    >
                      {item.time}
                    </span>
                    <div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-deep)', marginRight: '8px' }}>
                        {item.activity}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {item.details}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. HOSPITALITY GUIDANCE */}
            <div>
              <div style={{ marginBottom: '10px' }}>
                <span className="editorial-kicker">Host Etiquette</span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-deep)' }}>
                  Indian Guest Hospitality & Ritual Best Practices
                </h3>
              </div>

              <div className="grid-2" style={{ gap: '10px' }}>
                {advisorData.hospitalityAndRituals.map((tip, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-paper-elevated)',
                      border: '1px solid var(--border-sandstone)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <CheckCircle2 size={14} color="var(--color-sage)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
