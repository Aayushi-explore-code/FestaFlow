'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Search,
  TrendingDown,
  TrendingUp,
  Minus,
  MapPin,
} from 'lucide-react';
import { IndianCostBenchmark, CurrencyCode } from '../types';
import { JAIPUR_RAJASTHAN_BENCHMARKS } from '../data/indianMarketCosts';
import { formatCurrency } from '../utils/budgetCalculations';

interface IndianMarketDataViewerProps {
  currentCurrency: CurrencyCode;
}

export const IndianMarketDataViewer: React.FC<IndianMarketDataViewerProps> = ({
  currentCurrency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userQuotes, setUserQuotes] = useState<Record<string, number>>({});

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'catering', label: 'Catering & Feasts' },
    { key: 'venue', label: 'Venues & Havelis' },
    { key: 'decor', label: 'Decor & Mandap' },
    { key: 'photography', label: 'Photography & Cinema' },
    { key: 'entertainment', label: 'Music & Dhol' },
    { key: 'rituals', label: 'Puja & Panditji' },
    { key: 'attire_mehendi', label: 'Mehendi & Safa' },
    { key: 'invites_favors', label: 'Mithai & Invites' },
  ];

  const filteredBenchmarks = JAIPUR_RAJASTHAN_BENCHMARKS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuoteChange = (id: string, val: string) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setUserQuotes((prev) => ({ ...prev, [id]: num }));
  };

  const getComparisonBadge = (benchmark: IndianCostBenchmark, quote: number) => {
    if (!quote || quote <= 0) return null;

    if (quote < benchmark.lowPriceINR) {
      return (
        <span className="badge badge-sage" style={{ gap: '3px' }}>
          <TrendingDown size={11} /> {formatCurrency(benchmark.lowPriceINR - quote, currentCurrency)} Below Market
        </span>
      );
    }
    if (quote > benchmark.highPriceINR) {
      return (
        <span className="badge badge-terracotta" style={{ gap: '3px' }}>
          <TrendingUp size={11} /> {formatCurrency(quote - benchmark.highPriceINR, currentCurrency)} Above Market
        </span>
      );
    }
    return (
      <span className="badge badge-marigold" style={{ gap: '3px' }}>
        <Minus size={11} /> Fair Market Band
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Editorial Sourced Disclosure */}
      <div className="editorial-banner editorial-banner-marigold" style={{ margin: 0 }}>
        <div>
          <strong>Verified Rajasthan Market Intelligence:</strong> Price benchmarks derived from published
          industry indices (<em>WedMeGood Rajasthan Market Survey 2024–2025</em> and <em>WeddingWire India</em>),
          with direct provider survey rates across Jaipur (Amer Road, Kukas, Mansarovar, C-Scheme).
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '18px 24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <input
              type="text"
              placeholder="Search services (e.g. Haveli, Marigold decor, Dal Baati, Dhol)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '34px', fontSize: '0.88rem' }}
            />
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '11px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredBenchmarks.length}</strong> verified benchmarks
          </span>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`btn btn-sm ${
                selectedCategory === cat.key ? 'btn-primary' : 'btn-outline'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Benchmarks Grid */}
      <div className="grid-2" style={{ gap: '20px' }}>
        {filteredBenchmarks.map((item) => {
          const userQuote = userQuotes[item.id] || 0;
          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                borderLeft:
                  item.dataSourceType === 'verified_benchmark'
                    ? '3px solid var(--color-terracotta)'
                    : '3px solid var(--border-sandstone)',
              }}
            >
              <div>
                {/* Meta Top Line */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '6px',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  <span
                    className={`badge ${
                      item.dataSourceType === 'verified_benchmark'
                        ? 'badge-terracotta'
                        : 'badge-neutral'
                    }`}
                  >
                    {item.dataSourceType === 'verified_benchmark'
                      ? 'Verified Benchmark'
                      : 'Indicative Market'}
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <MapPin size={11} color="var(--color-terracotta)" />
                    {item.region}
                  </span>
                </div>

                {/* Service Name */}
                <h3 style={{ fontSize: '1.18rem', marginBottom: '6px', color: 'var(--text-deep)' }}>
                  {item.serviceName}
                </h3>

                <p
                  style={{
                    fontSize: '0.84rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '14px',
                  }}
                >
                  {item.description}
                </p>

                {/* Rate Card */}
                <div
                  style={{
                    background: 'var(--bg-paper-elevated)',
                    border: '1px solid var(--border-sandstone)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      Typical Market Rate ({item.unit.replace('_', ' ')})
                    </span>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>
                      {formatCurrency(item.typicalPriceINR, currentCurrency)}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    <div>
                      Low: <strong>{formatCurrency(item.lowPriceINR, currentCurrency)}</strong>
                    </div>
                    <div>
                      High: <strong>{formatCurrency(item.highPriceINR, currentCurrency)}</strong>
                    </div>
                  </div>
                </div>

                {/* Quotation Comparison Field */}
                <div style={{ marginTop: '12px' }}>
                  <label
                    htmlFor={`quote-${item.id}`}
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-deep)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span>Compare Your Quoted Rate:</span>
                    {getComparisonBadge(item, userQuote)}
                  </label>
                  <input
                    id={`quote-${item.id}`}
                    type="number"
                    placeholder={`Enter quote in INR (${item.unit.replace('_', ' ')})`}
                    value={userQuote > 0 ? userQuote : ''}
                    onChange={(e) => handleQuoteChange(item.id, e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.86rem', padding: '7px 10px' }}
                  />
                </div>
              </div>

              {/* Source & Link */}
              <div
                style={{
                  borderTop: '1px solid var(--border-sandstone)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                }}
              >
                <div>
                  <span>Source: {item.sourceBenchmarkName}</span>
                  <span style={{ margin: '0 4px' }}>•</span>
                  <span>{item.verificationDate}</span>
                </div>

                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                  title="Discover real licensed vendors on WedMeGood"
                >
                  <span>Explore Directory</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
