import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEMO_PRESETS,
  INITIAL_TIMELINE,
  INITIAL_VENDOR_CHECKLIST,
  getTimelineForEventType,
  getVendorChecklistForEventType,
} from '../src/data/samplePlan.ts';

describe('Sample Plan Data & Presets', () => {
  it('contains all required preset keys', () => {
    const requiredKeys = [
      'royal_wedding',
      'sangeet',
      'mehendi',
      'griha_pravesh',
      'birthday',
      'cultural_festival',
      'community_event',
      'blank',
    ];

    for (const key of requiredKeys) {
      assert.ok(DEMO_PRESETS[key], `Preset "${key}" must exist in DEMO_PRESETS`);
      assert.ok(typeof DEMO_PRESETS[key].label === 'string', `Preset "${key}" must have a string label`);
      assert.ok(DEMO_PRESETS[key].form, `Preset "${key}" must have form data`);
    }
  });

  it('validates each preset form structure and reasonable values', () => {
    for (const [key, preset] of Object.entries(DEMO_PRESETS)) {
      const { form } = preset;
      assert.ok(form.eventType, `Preset ${key} must have eventType`);
      assert.ok(form.eventName, `Preset ${key} must have eventName`);
      assert.ok(typeof form.targetBudget === 'number' && form.targetBudget > 0, `Preset ${key} targetBudget must be positive`);
      assert.ok(typeof form.guestCount === 'number' && form.guestCount > 0, `Preset ${key} guestCount must be positive`);
      assert.ok(form.currency, `Preset ${key} must have currency`);
      assert.ok(form.location, `Preset ${key} must have location`);
      assert.ok(typeof form.isVegetarian === 'boolean', `Preset ${key} must specify isVegetarian`);
    }
  });

  it('blank preset provides clean starting defaults', () => {
    const blank = DEMO_PRESETS['blank'];
    assert.strictEqual(blank.label, 'Start with Blank Plan');
    assert.strictEqual(blank.form.eventType, 'Custom Celebration');
    assert.strictEqual(blank.form.eventName, 'My Upcoming Celebration');
    assert.strictEqual(blank.form.targetBudget, 500000);
    assert.strictEqual(blank.form.guestCount, 100);
    assert.strictEqual(blank.form.currency, 'INR');
    assert.strictEqual(blank.form.notes, '');
  });
});

describe('Timeline Generation - getTimelineForEventType', () => {
  const categories = ['planning', 'booking', 'logistics', 'day-of'];

  function validateMilestones(milestones, occasionName) {
    assert.ok(Array.isArray(milestones), `${occasionName} timeline must be an array`);
    assert.ok(milestones.length >= 5, `${occasionName} timeline should have at least 5 milestones`);

    for (const m of milestones) {
      assert.ok(m.id, `Milestone in ${occasionName} must have an id`);
      assert.ok(m.timeframe, `Milestone in ${occasionName} must have a timeframe`);
      assert.ok(m.title, `Milestone in ${occasionName} must have a non-empty title`);
      assert.ok(m.description, `Milestone in ${occasionName} must have a non-empty description`);
      assert.ok(
        categories.includes(m.category),
        `Milestone ${m.id} in ${occasionName} has valid category (${m.category})`
      );
      assert.strictEqual(typeof m.completed, 'boolean', `Milestone ${m.id} completed must be boolean`);
    }
  }

  it('generates valid milestones for Birthday / Soiree / Anniversary', () => {
    const birthdayTimeline = getTimelineForEventType('Milestone Birthday');
    validateMilestones(birthdayTimeline, 'Birthday');
    assert.ok(birthdayTimeline.some((m) => m.title.toLowerCase().includes('cake')));

    const anniversaryTimeline = getTimelineForEventType('Anniversary Banquet');
    validateMilestones(anniversaryTimeline, 'Anniversary');
  });

  it('generates valid milestones for Festivals and Community Events', () => {
    const festivalTimeline = getTimelineForEventType('Festive Gala (Diwali / Navratri)');
    validateMilestones(festivalTimeline, 'Festival');
    assert.ok(festivalTimeline.some((m) => m.title.toLowerCase().includes('rangoli') || m.title.toLowerCase().includes('stage')));

    const communityTimeline = getTimelineForEventType('Community Gathering / Society Event');
    validateMilestones(communityTimeline, 'Community');
  });

  it('generates valid milestones for Griha Pravesh', () => {
    const grihaTimeline = getTimelineForEventType('Griha Pravesh (Housewarming)');
    validateMilestones(grihaTimeline, 'Griha Pravesh');
    assert.ok(grihaTimeline.some((m) => m.title.toLowerCase().includes('havan') || m.title.toLowerCase().includes('kalash')));
  });

  it('generates valid default milestones for Wedding and unrecognized types', () => {
    const weddingTimeline = getTimelineForEventType('Wedding / Royal Vivah');
    validateMilestones(weddingTimeline, 'Wedding');

    const defaultTimeline = getTimelineForEventType('Unknown Celebration');
    validateMilestones(defaultTimeline, 'Default');
  });

  it('INITIAL_TIMELINE is exported and contains valid initial items', () => {
    validateMilestones(INITIAL_TIMELINE, 'INITIAL_TIMELINE');
  });
});

describe('Vendor Checklist Generation - getVendorChecklistForEventType', () => {
  const statuses = ['not_started', 'comparing_quotes', 'booked'];

  function validateChecklist(items, occasionName) {
    assert.ok(Array.isArray(items), `${occasionName} vendor checklist must be an array`);
    assert.ok(items.length >= 4, `${occasionName} vendor checklist must have at least 4 items`);

    for (const item of items) {
      assert.ok(item.id, `Vendor item in ${occasionName} must have an id`);
      assert.ok(item.category, `Vendor item in ${occasionName} must have a category`);
      assert.ok(item.title, `Vendor item in ${occasionName} must have a title`);
      assert.ok(item.recommendedBudgetRange, `Vendor item in ${occasionName} must have recommendedBudgetRange`);
      assert.ok(
        Array.isArray(item.keyQuestionsToAsk) && item.keyQuestionsToAsk.length > 0,
        `Vendor item in ${occasionName} must have questions to ask`
      );
      assert.ok(
        statuses.includes(item.status),
        `Vendor item ${item.id} status must be valid (${item.status})`
      );
      assert.strictEqual(typeof item.notes, 'string', `Vendor item notes must be string`);
      assert.strictEqual(typeof item.actualQuote, 'number', `Vendor item actualQuote must be numeric`);
    }
  }

  it('generates valid vendor checklist for Birthday / Anniversary', () => {
    const birthdayChecklist = getVendorChecklistForEventType('Milestone Birthday');
    validateChecklist(birthdayChecklist, 'Birthday');
  });

  it('generates valid vendor checklist for Festival and Community events', () => {
    const festivalChecklist = getVendorChecklistForEventType('Festive Gala (Diwali / Navratri)');
    validateChecklist(festivalChecklist, 'Festival');
  });

  it('generates valid vendor checklist for Griha Pravesh', () => {
    const grihaChecklist = getVendorChecklistForEventType('Griha Pravesh (Housewarming)');
    validateChecklist(grihaChecklist, 'Griha Pravesh');
  });

  it('generates valid default vendor checklist for Wedding and fallback events', () => {
    const weddingChecklist = getVendorChecklistForEventType('Wedding / Royal Vivah');
    validateChecklist(weddingChecklist, 'Wedding');

    const fallbackChecklist = getVendorChecklistForEventType('');
    validateChecklist(fallbackChecklist, 'Fallback');
  });

  it('INITIAL_VENDOR_CHECKLIST is exported and contains valid initial vendor items', () => {
    validateChecklist(INITIAL_VENDOR_CHECKLIST, 'INITIAL_VENDOR_CHECKLIST');
  });
});

