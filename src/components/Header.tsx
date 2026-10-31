'use client';

import React from 'react';
import { SlidersHorizontal, Calendar, Printer, Bookmark, Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/budgetCalculations';
import { BrandMark } from './BrandMark';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  saveStatus?: SaveStatus;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onNavigateToForm: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToMarket?: () => void;
  onPrintDossier: () => void;
  onSavePlan?: () => void;
  onExportJSON?: () => void;
  onImportJSON?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetToDefault?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  saveStatus = 'idle',
  onCurrencyChange,
  onNavigateToForm,
  onNavigateToSimulator,
  onPrintDossier,
  onSavePlan,
  onExportJSON,
  onImportJSON,
  onResetToDefault,
}) => {
  return (
    <header
      className="no-print"
      style={{
        borderBottom: '1px solid var(--border-sandstone)',
        background: 'rgba(255, 252, 246, 0.96)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '10px',
          paddingBottom: '10px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Brand: Rangoli Emblem + English & Hindi Wordmarks with Equal Visual Importance */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BrandMark size={28} color="#C76B29" />

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: 'var(--text-deep)',
              }}
            >
              FestaFlow
            </span>

            <span
              style={{
                color: 'var(--border-sandstone)',
                fontSize: '1.1rem',
                fontWeight: 300,
                userSelect: 'none',
              }}
            >
              |
            </span>

            <span
              className="font-devanagari"
              style={{
                fontSize: '1.35rem',
                fontWeight: 600,
                color: 'var(--text-deep)',
                letterSpacing: '0.01em',
              }}
            >
              फेस्टाफ्लो
            </span>
          </div>

          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
              marginLeft: '4px',
              borderLeft: '1px solid var(--border-sandstone)',
              paddingLeft: '10px',
              display: 'inline-block',
            }}
          >
            Celebration & Budget Intelligence
          </span>
        </div>

        {/* Controls and Tidy Plan Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Currency Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label
              htmlFor="currency-select"
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Currency:
            </label>
            <select
              id="currency-select"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="form-select"
              style={{
                padding: '4px 8px',
                fontSize: '0.8rem',
                width: 'auto',
                height: '30px',
                cursor: 'pointer',
                borderColor: 'var(--border-sandstone)',
                background: 'var(--bg-paper)',
              }}
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code}>
                  {CURRENCIES[code as CurrencyCode].symbol} {code}
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Shortcuts */}
          <button
            onClick={onNavigateToForm}
            className="btn btn-secondary btn-sm"
            title="Edit celebration parameters"
          >
            <Calendar size={13} color="var(--color-terracotta)" />
            <span>Setup</span>
          </button>

          <button
            onClick={onNavigateToSimulator}
            className="btn btn-primary btn-sm"
            title="Interactive financial simulator"
          >
            <SlidersHorizontal size={13} />
            <span>Simulator</span>
          </button>

          {/* Tidy Plan Actions (Save, Export, Import, Reset, Print) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'var(--bg-paper-elevated)',
              padding: '2px 4px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-sandstone)',
              marginLeft: '2px',
            }}
          >
            {/* Subtle Save Status Indicator */}
            {saveStatus !== 'idle' && (
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '0 6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 500,
                  color:
                    saveStatus === 'saved'
                      ? 'var(--color-sage)'
                      : saveStatus === 'saving'
                      ? 'var(--text-muted)'
                      : 'var(--color-terracotta)',
                }}
              >
                {saveStatus === 'saving' && (
                  <>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-marigold)',
                        display: 'inline-block',
                      }}
                    />
                    <span>Saving…</span>
                  </>
                )}
                {saveStatus === 'saved' && (
                  <>
                    <Check size={11} color="var(--color-sage)" />
                    <span>Saved</span>
                  </>
                )}
                {saveStatus === 'error' && (
                  <>
                    <AlertCircle size={11} color="var(--color-terracotta)" />
                    <span>Couldn't save</span>
                  </>
                )}
              </span>
            )}

            {onSavePlan && (
              <button
                type="button"
                onClick={onSavePlan}
                className="btn btn-secondary btn-sm"
                style={{ padding: '4px 8px', height: '28px' }}
                title="Save plan to local storage"
              >
                <Bookmark size={12} color="var(--color-terracotta)" />
                <span style={{ fontSize: '0.76rem' }}>Save</span>
              </button>
            )}

            {onExportJSON && (
              <button
                type="button"
                onClick={onExportJSON}
                className="btn btn-outline btn-sm"
                style={{ padding: '4px 8px', height: '28px' }}
                title="Export plan as JSON file"
              >
                <Download size={12} />
                <span style={{ fontSize: '0.76rem' }}>Export</span>
              </button>
            )}

            {onImportJSON && (
              <label
                className="btn btn-outline btn-sm"
                style={{
                  padding: '4px 8px',
                  height: '28px',
                  cursor: 'pointer',
                  margin: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                title="Import plan from JSON file"
              >
                <Upload size={12} />
                <span style={{ fontSize: '0.76rem' }}>Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportJSON}
                  style={{ display: 'none' }}
                />
              </label>
            )}

            {onResetToDefault && (
              <button
                type="button"
                onClick={onResetToDefault}
                className="btn btn-outline btn-sm"
                style={{ padding: '4px 7px', height: '28px' }}
                title="Reset to default celebration preset"
              >
                <RotateCcw size={11} />
              </button>
            )}

            <button
              onClick={onPrintDossier}
              className="btn btn-outline btn-sm"
              style={{ padding: '4px 7px', height: '28px' }}
              title="Print / Export Dossier"
            >
              <Printer size={12} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
