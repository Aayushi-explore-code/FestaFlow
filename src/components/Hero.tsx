'use client';

import React from 'react';
import { SlidersHorizontal, ArrowRight, FilePlus2 } from 'lucide-react';
import { RangoliCorner, RangoliDivider } from './RangoliMotif';
import { BrandMark } from './BrandMark';

interface HeroProps {
  onStartPlanning: () => void;
  onOpenSimulator: () => void;
  onLoadPreset: (presetKey: string) => void;
  onStartBlank: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPlanning,
  onOpenSimulator,
  onLoadPreset,
  onStartBlank,
}) => {
  return (
    <section
      style={{
        position: 'relative',
        padding: '48px 0 44px 0',
        textAlign: 'center',
        background: 'var(--bg-ivory)',
        borderBottom: '1px solid var(--border-sandstone)',
        overflow: 'hidden',
      }}
    >
      {/* Delicate Rangoli Corner Ornaments */}
      <RangoliCorner
        size={80}
        color="#C76B29"
        opacity={0.16}
        style={{ position: 'absolute', top: '10px', left: '16px' }}
      />
      <RangoliCorner
        size={80}
        color="#C76B29"
        opacity={0.16}
        style={{
          position: 'absolute',
          top: '10px',
          right: '16px',
          transform: 'scaleX(-1)',
        }}
      />

      <div className="container" style={{ maxWidth: '960px', position: 'relative', zIndex: 1 }}>
        {/* Editorial Kicker with Minimal Rangoli Emblem */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <BrandMark size={16} color="#C76B29" />
          <span className="editorial-kicker" style={{ margin: 0 }}>
            Celebration Planning & Budget Intelligence • All Occasions
          </span>
        </div>

        {/* Main Occasion-Neutral Editorial Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4.6vw, 3.4rem)',
            lineHeight: 1.18,
            color: 'var(--text-deep)',
            marginBottom: '16px',
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            letterSpacing: '-0.015em',
          }}
        >
          Smarter Celebration Planning, <br />
          <span className="serif-italic" style={{ color: 'var(--color-terracotta)' }}>
            Complete Budget Intelligence
          </span>
        </h1>

        {/* Supporting Copy */}
        <p
          style={{
            fontSize: 'clamp(0.96rem, 1.8vw, 1.1rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: '720px',
            margin: '0 auto 24px auto',
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
          }}
        >
          From weddings and milestone birthdays to cultural festivals and community gatherings,
          FestaFlow empowers you to model expenses deterministically, coordinate verified vendors,
          and craft unforgettable Indian celebrations with zero financial surprises.
        </p>

        {/* Occasion Coverage Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <span className="badge badge-terracotta">Weddings & Vivah</span>
          <span className="badge badge-marigold">Milestone Birthdays</span>
          <span className="badge badge-sage">Cultural Festivals & Galas</span>
          <span className="badge badge-neutral">Community Gatherings</span>
        </div>

        {/* Primary Call to Actions */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          <button onClick={onStartPlanning} className="btn btn-primary" style={{ padding: '11px 24px' }}>
            <span>Start Planning Celebration</span>
            <ArrowRight size={15} />
          </button>

          <button onClick={onOpenSimulator} className="btn btn-secondary" style={{ padding: '11px 24px' }}>
            <SlidersHorizontal size={15} color="var(--color-terracotta)" />
            <span>Explore Budget Simulator</span>
          </button>
        </div>

        {/* Tasteful Visual Storytelling - Contemporary Celebration Photography */}
        <div
          style={{
            margin: '0 auto 36px auto',
            maxWidth: '900px',
            position: 'relative',
          }}
        >
          {/* Subtle Outer Frame Border */}
          <div
            style={{
              padding: '6px',
              background: 'var(--bg-paper)',
              border: '1px solid var(--border-sandstone)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                background: '#FAF5EB',
              }}
            >
              <img
                src="/images/hero_celebration.jpg"
                alt="Contemporary Indian celebration banquet in a warm illuminated heritage courtyard"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                  display: 'block',
                }}
              />
              {/* Subtle vignette gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(47, 37, 27, 0.02) 0%, rgba(47, 37, 27, 0.32) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Caption Overlay Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '18px',
                  background: 'rgba(255, 252, 247, 0.94)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid var(--border-sandstone)',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-deep)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                Contemporary Indian Evening Gathering • Illuminated Courtyard Architecture & Festive Hospitality
              </div>
            </div>
          </div>
        </div>

        {/* Curated Presets Bar - Multi-Occasion */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-paper)',
            border: '1px solid var(--border-sandstone)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 20px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Explore Curated Occasions
          </span>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => onLoadPreset('royal_wedding')}
              className="btn btn-outline btn-sm"
              title="Royal Jaipur Vivah (150 guests)"
            >
              Royal Vivah
            </button>
            <button
              onClick={() => onLoadPreset('birthday')}
              className="btn btn-outline btn-sm"
              title="Milestone 50th Rooftop Soirée (50 guests)"
            >
              50th Birthday Soirée
            </button>
            <button
              onClick={() => onLoadPreset('cultural_festival')}
              className="btn btn-outline btn-sm"
              title="Diwali & Annakut Cultural Gala (250 guests)"
            >
              Diwali Cultural Gala
            </button>
            <button
              onClick={() => onLoadPreset('community_event')}
              className="btn btn-outline btn-sm"
              title="Resident Society Cultural Mela (300 guests)"
            >
              Society Mela
            </button>
            <button
              onClick={() => onLoadPreset('sangeet')}
              className="btn btn-outline btn-sm"
              title="Bollywood Sangeet & Cocktail (120 guests)"
            >
              Sangeet & Cocktail
            </button>
            <button
              onClick={() => onLoadPreset('griha_pravesh')}
              className="btn btn-outline btn-sm"
              title="Griha Pravesh & Puja (60 guests)"
            >
              Griha Pravesh
            </button>
            <button
              onClick={onStartBlank}
              className="btn btn-outline btn-sm"
              style={{ color: 'var(--color-terracotta)' }}
              title="Start with a blank custom celebration"
            >
              <FilePlus2 size={12} />
              <span>Blank Plan</span>
            </button>
          </div>
        </div>

        <RangoliDivider style={{ margin: '36px auto 28px auto' }} color="#C76B29" />

        {/* 3 Core Value Pillars */}
        <div
          className="grid-3"
          style={{
            textAlign: 'left',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '18px',
              borderLeft: '2px solid var(--color-marigold)',
              background: 'var(--bg-paper)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              borderTop: '1px solid var(--border-subtle)',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-marigold)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              Deterministic Levers
            </span>
            <h3 style={{ fontSize: '1.12rem', marginBottom: '6px', color: 'var(--text-deep)' }}>
              Interactive Budget Simulator
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Explore real-time trade-offs between guest headcount, dining styles, and venue staging with
              instant mathematical reconciliation.
            </p>
          </div>

          <div
            style={{
              padding: '18px',
              borderLeft: '2px solid var(--color-terracotta)',
              background: 'var(--bg-paper)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              borderTop: '1px solid var(--border-subtle)',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-terracotta)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              Financial Integrity
            </span>
            <h3 style={{ fontSize: '1.12rem', marginBottom: '6px', color: 'var(--text-deep)' }}>
              Zero Math Hallucinations
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Every calculation is computed deterministically in client code outside of LLMs. All category
              allocations sum to the exact rupee without AI drift.
            </p>
          </div>

          <div
            style={{
              padding: '18px',
              borderLeft: '2px solid var(--color-sage)',
              background: 'var(--bg-paper)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              borderTop: '1px solid var(--border-subtle)',
              borderRight: '1px solid var(--border-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-sage)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              Indian Market Benchmarks
            </span>
            <h3 style={{ fontSize: '1.12rem', marginBottom: '6px', color: 'var(--text-deep)' }}>
              Verified Market Intelligence
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Calibrated against published Indian banquet, catering, and artist rate indices with transparent price
              range boundaries and honest estimation labeling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
