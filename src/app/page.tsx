'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header, SaveStatus } from '../components/Header';
import { Hero } from '../components/Hero';
import { EventSetupForm } from '../components/EventSetupForm';
import { PlanDashboard } from '../components/PlanDashboard';
import { CurrencyCode, EventFormData, TimelineMilestone, VendorChecklistItem, SimulatorOptions } from '../types';
import {
  DEMO_PRESETS,
  INITIAL_TIMELINE,
  INITIAL_VENDOR_CHECKLIST,
  getTimelineForEventType,
  getVendorChecklistForEventType,
} from '../data/samplePlan';
import { CheckCircle2, Bookmark, Download, Upload, RotateCcw } from 'lucide-react';
import { RangoliDivider } from '../components/RangoliMotif';

const LOCAL_STORAGE_KEY = 'festaflow_indian_celebration_plan_v2';

export default function Home() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [eventData, setEventData] = useState<EventFormData>(DEMO_PRESETS.cultural_festival.form);
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(() =>
    getTimelineForEventType(DEMO_PRESETS.cultural_festival.form.eventType)
  );
  const [vendors, setVendors] = useState<VendorChecklistItem[]>(() =>
    getVendorChecklistForEventType(DEMO_PRESETS.cultural_festival.form.eventType)
  );
  const [simulatorOptions, setSimulatorOptions] = useState<SimulatorOptions | undefined>(undefined);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [planVersion, setPlanVersion] = useState<number>(0);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isResettingRef = useRef<boolean>(false);
  const latestStateRef = useRef<{
    eventData: EventFormData;
    currency: CurrencyCode;
    milestones: TimelineMilestone[];
    vendors: VendorChecklistItem[];
    simulatorOptions?: SimulatorOptions;
  }>({
    eventData,
    currency,
    milestones,
    vendors,
    simulatorOptions,
  });

  // Keep latestStateRef updated for synchronous unload persistence
  useEffect(() => {
    latestStateRef.current = {
      eventData,
      currency,
      milestones,
      vendors,
      simulatorOptions,
    };
  }, [eventData, currency, milestones, vendors, simulatorOptions]);

  // Initial hydration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (parsed.eventData && typeof parsed.eventData === 'object') {
            setEventData(parsed.eventData);
            setPlanVersion((v) => v + 1);
          }
          if (parsed.currency && typeof parsed.currency === 'string') {
            setCurrency(parsed.currency);
          }
          if (Array.isArray(parsed.milestones)) {
            setMilestones(parsed.milestones);
          }
          if (Array.isArray(parsed.vendors)) {
            setVendors(parsed.vendors);
          }
          if (parsed.simulatorOptions && typeof parsed.simulatorOptions === 'object') {
            setSimulatorOptions(parsed.simulatorOptions);
          }
        }
      }
    } catch (e) {
      console.warn('Could not restore saved plan from local storage:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Synchronous flush on page unload / refresh to prevent losing rapid edits
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isHydrated || isResettingRef.current) return;
      try {
        const current = latestStateRef.current;
        const payload = {
          eventData: current.eventData,
          currency: current.currency,
          milestones: current.milestones,
          vendors: current.vendors,
          simulatorOptions: current.simulatorOptions,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        // Silently catch during unload
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isHydrated]);

  // Debounced auto-save effect (650ms)
  useEffect(() => {
    // CRITICAL: Do NOT auto-save before initial hydration has completed
    if (!isHydrated) return;

    if (isResettingRef.current) {
      isResettingRef.current = false;
      return;
    }

    setSaveStatus('saving');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const payload = {
          eventData,
          currency,
          milestones,
          vendors,
          simulatorOptions,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
        setSaveStatus('saved');

        if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
        statusTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      } catch (err) {
        console.error('Failed to auto-save plan to localStorage:', err);
        setSaveStatus('error');
      }
    }, 650);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [eventData, currency, milestones, vendors, simulatorOptions, isHydrated]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    showToast(`Currency changed to ${newCurrency}.`);
  };

  const handleUpdateSimulatorOptions = useCallback((options: SimulatorOptions) => {
    setSimulatorOptions((prev) => {
      if (
        prev &&
        prev.guestCount === options.guestCount &&
        prev.targetBudget === options.targetBudget &&
        prev.cateringTier === options.cateringTier &&
        prev.decorTier === options.decorTier &&
        prev.entertainmentTier === options.entertainmentTier &&
        prev.includeRituals === options.includeRituals &&
        prev.includeMehendiAttire === options.includeMehendiAttire &&
        prev.contingencyPercent === options.contingencyPercent &&
        prev.eventType === options.eventType
      ) {
        return prev;
      }
      return options;
    });

    // If simulator sliders adjusted target budget or guest count, keep eventData synchronized
    setEventData((prev) => {
      if (prev.targetBudget === options.targetBudget && prev.guestCount === options.guestCount) {
        return prev;
      }
      return {
        ...prev,
        targetBudget: options.targetBudget,
        guestCount: options.guestCount,
      };
    });
  }, []);

  const handleFormSubmit = (updatedData: EventFormData) => {
    const typeChanged = updatedData.eventType !== eventData.eventType;
    setEventData(updatedData);
    if (typeChanged) {
      setMilestones(getTimelineForEventType(updatedData.eventType));
      setVendors(getVendorChecklistForEventType(updatedData.eventType));
    }
    showToast('Celebration parameters updated. Financial ledger recalculated.');

    const dashboardElement = document.getElementById('dashboard-section');
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadPreset = (key: string) => {
    const preset = DEMO_PRESETS[key];
    if (preset) {
      setEventData(preset.form);
      setMilestones(getTimelineForEventType(preset.form.eventType));
      setVendors(getVendorChecklistForEventType(preset.form.eventType));
      setSimulatorOptions(undefined);
      setPlanVersion((v) => v + 1);
      showToast(`Loaded preset: "${preset.label}".`);
      const dashboardElement = document.getElementById('dashboard-section');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartBlank = () => {
    setEventData(DEMO_PRESETS.blank.form);
    setMilestones(getTimelineForEventType('Custom Celebration'));
    setVendors(getVendorChecklistForEventType('Custom Celebration'));
    setSimulatorOptions(undefined);
    setPlanVersion((v) => v + 1);
    showToast('Clean blank plan initialized. Enter your parameters in Step 01.');
    const formElement = document.getElementById('setup-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSavePlan = () => {
    try {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
      setSaveStatus('saving');
      const payload = {
        eventData,
        currency,
        milestones,
        vendors,
        simulatorOptions,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      setSaveStatus('saved');
      showToast('Plan saved to local storage.');
      statusTimeoutRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (e) {
      setSaveStatus('error');
      showToast('Could not save plan. Storage may be full or disabled.');
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset celebration to default preset?')) {
      isResettingRef.current = true;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);

      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {
        console.warn('Could not clear localStorage:', e);
      }

      setEventData(DEMO_PRESETS.cultural_festival.form);
      setMilestones(getTimelineForEventType(DEMO_PRESETS.cultural_festival.form.eventType));
      setVendors(getVendorChecklistForEventType(DEMO_PRESETS.cultural_festival.form.eventType));
      setSimulatorOptions(undefined);
      setCurrency('INR');
      setSaveStatus('idle');
      setPlanVersion((v) => v + 1);
      showToast('Reset to default celebration preset.');
    }
  };

  const handleExportJSON = () => {
    const payload = {
      eventData,
      currency,
      milestones,
      vendors,
      simulatorOptions,
      exportedAt: new Date().toISOString(),
      app: 'FestaFlow Indian Celebration Planner',
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FestaFlow_${(eventData.eventName || 'Plan').replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Plan exported as JSON.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed || typeof parsed !== 'object') {
          throw new Error('Invalid JSON structure');
        }

        let importedEventData = eventData;
        let importedCurrency = currency;
        let importedMilestones = milestones;
        let importedVendors = vendors;
        let importedSimulatorOptions = simulatorOptions;

        if (parsed.eventData && typeof parsed.eventData === 'object') {
          importedEventData = parsed.eventData;
          setEventData(parsed.eventData);
        }
        if (parsed.currency && typeof parsed.currency === 'string') {
          importedCurrency = parsed.currency as CurrencyCode;
          setCurrency(parsed.currency as CurrencyCode);
        }
        if (Array.isArray(parsed.milestones)) {
          importedMilestones = parsed.milestones;
          setMilestones(parsed.milestones);
        }
        if (Array.isArray(parsed.vendors)) {
          importedVendors = parsed.vendors;
          setVendors(parsed.vendors);
        }
        if (parsed.simulatorOptions && typeof parsed.simulatorOptions === 'object') {
          importedSimulatorOptions = parsed.simulatorOptions;
          setSimulatorOptions(parsed.simulatorOptions);
        }

        setPlanVersion((v) => v + 1);

        // Immediately persist the imported plan to localStorage to prevent data loss
        try {
          const payload = {
            eventData: importedEventData,
            currency: importedCurrency,
            milestones: importedMilestones,
            vendors: importedVendors,
            simulatorOptions: importedSimulatorOptions,
            savedAt: new Date().toISOString(),
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
          setSaveStatus('saved');
        } catch (storageErr) {
          console.warn('Could not immediately persist imported plan:', storageErr);
        }

        showToast('Celebration plan imported successfully.');
      } catch (err) {
        showToast('Invalid JSON plan file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header
        currentCurrency={currency}
        saveStatus={saveStatus}
        onCurrencyChange={handleCurrencyChange}
        onNavigateToForm={() => scrollToSection('setup-form-section')}
        onNavigateToSimulator={() => scrollToSection('dashboard-section')}
        onNavigateToMarket={() => scrollToSection('dashboard-section')}
        onPrintDossier={() => window.print()}
        onSavePlan={handleSavePlan}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onResetToDefault={handleResetToDefault}
      />

      {/* Toast Notification */}
      {notification && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            top: '68px',
            right: '20px',
            zIndex: 100,
            background: 'var(--text-deep)',
            color: 'var(--bg-paper)',
            padding: '8px 14px',
            borderRadius: 'var(--radius-xs)',
            boxShadow: '0 4px 14px rgba(51, 41, 31, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <CheckCircle2 size={14} color="var(--color-sage)" />
          <span>{notification}</span>
        </div>
      )}

      <main>
        {/* Editorial Landing Hero */}
        <Hero
          onStartPlanning={() => scrollToSection('setup-form-section')}
          onOpenSimulator={() => scrollToSection('dashboard-section')}
          onLoadPreset={handleLoadPreset}
          onStartBlank={handleStartBlank}
        />

        {/* Event Setup Form */}
        <EventSetupForm
          key={`setup-form-${planVersion}`}
          initialData={eventData}
          currentCurrency={currency}
          onSubmit={handleFormSubmit}
          onLoadPreset={handleLoadPreset}
          onStartBlankPlan={handleStartBlank}
        />

        {/* Dashboard, Ledgers & Guides */}
        <PlanDashboard
          key={`dashboard-${planVersion}`}
          eventData={eventData}
          currentCurrency={currency}
          timelineMilestones={milestones}
          vendorChecklist={vendors}
          simulatorOptions={simulatorOptions}
          onOpenForm={() => scrollToSection('setup-form-section')}
          onSavePlan={handleSavePlan}
          onUpdateMilestones={setMilestones}
          onUpdateVendors={setVendors}
          onUpdateSimulatorOptions={handleUpdateSimulatorOptions}
        />
      </main>

      {/* Editorial Colophon Footer */}
      <footer
        className="no-print"
        style={{
          borderTop: '1px solid var(--border-sandstone)',
          background: 'var(--bg-paper)',
          padding: '44px 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.82rem',
        }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <RangoliDivider style={{ margin: '0 auto 18px auto' }} color="#D99024" />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-deep)',
              }}
            >
              FestaFlow
            </span>
            <span style={{ color: 'var(--border-sandstone)', fontSize: '1rem', fontWeight: 300 }}>|</span>
            <span
              className="font-devanagari"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-deep)',
              }}
            >
              फेस्टाफ्लो
            </span>
            <span style={{ margin: '0 4px', color: 'var(--text-light)' }}>•</span>
            <span style={{ color: 'var(--color-terracotta)', fontWeight: 600, fontSize: '0.84rem' }}>
              Contemporary Indian Celebration Architecture
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.82rem', lineHeight: 1.6 }}>
            Designed as a fusion of bespoke Indian celebration stationery and deterministic financial planning.
            Calibrated with verified Rajasthan market intelligence, Google Gemini cultural blueprints, and local browser persistence.
          </p>

          <div style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
            All calculations are mathematically guaranteed in client-side code. No fabricated vendor contacts or unverified live availability.
          </div>
        </div>
      </footer>
    </>
  );
}
