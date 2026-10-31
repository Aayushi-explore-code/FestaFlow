'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
} from 'lucide-react';
import { TimelineMilestone } from '../types';

interface TimelineSectionProps {
  initialMilestones: TimelineMilestone[];
  onUpdateMilestones?: (milestones: TimelineMilestone[]) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  initialMilestones,
  onUpdateMilestones,
}) => {
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(initialMilestones);
  const [filter, setFilter] = useState<'all' | 'planning' | 'booking' | 'logistics' | 'day-of'>('all');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  React.useEffect(() => {
    setMilestones(initialMilestones);
  }, [initialMilestones]);

  const [newTitle, setNewTitle] = useState<string>('');
  const [newTimeframe, setNewTimeframe] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'planning' | 'booking' | 'logistics' | 'day-of'>('planning');

  const toggleComplete = (id: string) => {
    const updated = milestones.map((m) =>
      m.id === id ? { ...m, completed: !m.completed } : m
    );
    setMilestones(updated);
    if (onUpdateMilestones) onUpdateMilestones(updated);
  };

  const deleteMilestone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = milestones.filter((m) => m.id !== id);
    setMilestones(updated);
    if (onUpdateMilestones) onUpdateMilestones(updated);
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newM: TimelineMilestone = {
      id: `custom-t-${Date.now()}`,
      title: newTitle.trim(),
      timeframe: newTimeframe.trim() || 'Milestone',
      description: newDesc.trim() || 'Checklist item for celebration execution.',
      category: newCategory,
      completed: false,
    };

    const updated = [newM, ...milestones];
    setMilestones(updated);
    if (onUpdateMilestones) onUpdateMilestones(updated);

    setNewTitle('');
    setNewTimeframe('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const filtered = milestones.filter((m) => (filter === 'all' ? true : m.category === filter));
  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Progress & Header */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span className="editorial-kicker">Execution Cadence</span>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-deep)' }}>
            {completedCount} of {milestones.length} Milestones Achieved ({progressPercent}%)
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '180px' }}>
            <div
              style={{
                height: '6px',
                borderRadius: '3px',
                background: 'var(--border-sandstone)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'var(--color-sage)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-secondary btn-sm"
          >
            <Plus size={13} />
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {/* Add Milestone Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleAddMilestone}
          className="card"
          style={{
            padding: '20px',
            background: 'var(--bg-paper-elevated)',
            border: '1px solid var(--color-marigold)',
          }}
        >
          <h4 style={{ fontSize: '0.98rem', marginBottom: '12px', color: 'var(--text-deep)' }}>
            Add Custom Celebration Milestone
          </h4>
          <div className="grid-3" style={{ gap: '12px' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Milestone Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Finalize Safa Draping Count"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.86rem', padding: '7px 10px' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Timeframe</label>
              <input
                type="text"
                placeholder="e.g. T-15 Days or 05:00 PM"
                value={newTimeframe}
                onChange={(e) => setNewTimeframe(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.86rem', padding: '7px 10px' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem' }}>Phase</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="form-select"
                style={{ fontSize: '0.86rem', padding: '7px 10px' }}
              >
                <option value="planning">Planning</option>
                <option value="booking">Booking</option>
                <option value="logistics">Logistics</option>
                <option value="day-of">Event Day Schedule</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Description</label>
            <input
              type="text"
              placeholder="e.g. Confirm 60 leheriya turbans arrive by 3 PM with master draping artists."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="form-input"
              style={{ fontSize: '0.86rem', padding: '7px 10px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Milestone
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All Milestones' },
          { key: 'planning', label: 'Planning' },
          { key: 'booking', label: 'Bookings' },
          { key: 'logistics', label: 'Logistics' },
          { key: 'day-of', label: 'Ceremony Schedule' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`btn btn-sm ${filter === tab.key ? 'btn-primary' : 'btn-secondary'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Visually Connected Timeline Track */}
      <div style={{ position: 'relative', paddingLeft: '28px', marginTop: '6px' }}>
        {/* Continuous Vertical Timeline Line */}
        <div
          style={{
            position: 'absolute',
            left: '9px',
            top: '16px',
            bottom: '16px',
            width: '2px',
            background: 'var(--border-sandstone)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((milestone) => (
            <div
              key={milestone.id}
              onClick={() => toggleComplete(milestone.id)}
              style={{
                position: 'relative',
                background: milestone.completed ? '#F8FAF6' : 'var(--bg-paper)',
                border: milestone.completed
                  ? '1px solid var(--border-sandstone)'
                  : '1px solid var(--border-sandstone)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Connected Step Marker Node on Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '18px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: milestone.completed ? 'var(--color-sage)' : 'var(--bg-paper)',
                  border: milestone.completed
                    ? '2px solid var(--color-sage)'
                    : '2px solid var(--border-sandstone)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  zIndex: 2,
                }}
              >
                {milestone.completed ? (
                  <CheckCircle2 size={12} color="#FFFFFF" />
                ) : (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--border-sandstone)' }} />
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '4px',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.96rem',
                    fontWeight: 600,
                    textDecoration: milestone.completed ? 'line-through' : 'none',
                    color: milestone.completed ? 'var(--text-light)' : 'var(--text-deep)',
                  }}
                >
                  {milestone.title}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    className="badge"
                    style={{
                      background:
                        milestone.category === 'day-of'
                          ? 'var(--color-terracotta-tint)'
                          : 'var(--color-marigold-tint)',
                      color:
                        milestone.category === 'day-of'
                          ? 'var(--color-terracotta)'
                          : 'var(--color-marigold)',
                    }}
                  >
                    {milestone.timeframe}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => deleteMilestone(milestone.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-light)',
                      padding: '2px',
                    }}
                    title="Remove task"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
