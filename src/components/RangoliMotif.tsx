import React from 'react';

/**
 * Premium Indian Rangoli and Paisley ornamentation.
 * Designed with restrained geometric line-art, inspired by traditional Kolam/Rangoli
 * and Rajasthani Jharokha stone jaali craftsmanship.
 */

export const RangoliCorner: React.FC<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  opacity?: number;
}> = ({ size = 96, className = '', style = {}, color = '#D99024', opacity = 0.22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ ...style, opacity, pointerEvents: 'none' }}
    aria-hidden="true"
  >
    {/* Outer corner framing arcs */}
    <path
      d="M2 98V2H98"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M8 98V8H98"
      stroke={color}
      strokeWidth="0.75"
      strokeDasharray="2 3"
    />
    {/* Delicate lotus petal radiating from top-left */}
    <path
      d="M12 12C28 16 48 36 52 52C36 48 16 28 12 12Z"
      stroke={color}
      strokeWidth="1"
      fill={color}
      fillOpacity="0.08"
    />
    <path
      d="M12 12C36 14 62 40 68 68C40 62 14 36 12 12Z"
      stroke={color}
      strokeWidth="0.75"
      strokeLinecap="round"
    />
    {/* Petal sub-arcs */}
    <path
      d="M16 40C26 36 36 26 40 16"
      stroke={color}
      strokeWidth="0.8"
    />
    <path
      d="M22 55C38 48 48 38 55 22"
      stroke={color}
      strokeWidth="0.6"
    />
    {/* Auspicious bindu dots */}
    <circle cx="12" cy="12" r="2.5" fill={color} />
    <circle cx="28" cy="28" r="1.5" fill={color} />
    <circle cx="45" cy="45" r="1.2" fill={color} />
    <circle cx="68" cy="68" r="1.5" fill={color} />
    <circle cx="8" cy="8" r="1" fill={color} />
  </svg>
);

export const RangoliMandala: React.FC<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  opacity?: number;
}> = ({ size = 280, className = '', style = {}, color = '#D99024', opacity = 0.12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ ...style, opacity, pointerEvents: 'none' }}
    aria-hidden="true"
  >
    {/* Concentric rings */}
    <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="0.8" strokeDasharray="3 4" />
    <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="100" r="62" stroke={color} strokeWidth="0.75" />
    <circle cx="100" cy="100" r="42" stroke={color} strokeWidth="1" />
    <circle cx="100" cy="100" r="24" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
    <circle cx="100" cy="100" r="6" fill={color} fillOpacity="0.4" />

    {/* 8-fold lotus petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <g key={deg} transform={`rotate(${deg} 100 100)`}>
        {/* Inner petal */}
        <path
          d="M100 58C94 72 94 86 100 100C106 86 106 72 100 58Z"
          stroke={color}
          strokeWidth="0.9"
          fill={color}
          fillOpacity="0.05"
        />
        {/* Outer petal point */}
        <path
          d="M100 20C90 44 92 62 100 80C108 62 110 44 100 20Z"
          stroke={color}
          strokeWidth="0.8"
        />
        {/* Decorative tip bindu */}
        <circle cx="100" cy="18" r="1.8" fill={color} />
        <circle cx="100" cy="38" r="1" fill={color} />
      </g>
    ))}

    {/* Delicate secondary star points */}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
      <g key={deg} transform={`rotate(${deg} 100 100)`}>
        <line x1="100" y1="42" x2="100" y2="78" stroke={color} strokeWidth="0.6" strokeDasharray="1 3" />
        <circle cx="100" cy="40" r="1.2" fill={color} />
      </g>
    ))}
  </svg>
);

export const RangoliDivider: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}> = ({ className = '', style = {}, color = '#D99024' }) => (
  <div
    className={`rangoli-divider ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      margin: '24px 0',
      ...style,
    }}
    aria-hidden="true"
  >
    <span
      style={{
        flex: 1,
        maxWidth: '120px',
        height: '1px',
        background: `linear-gradient(to right, transparent, ${color})`,
        opacity: 0.35,
      }}
    />
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 2C9 7 9 13 14 18C19 13 19 7 14 2Z"
        stroke={color}
        strokeWidth="1"
        fill={color}
        fillOpacity="0.1"
      />
      <circle cx="6" cy="10" r="1.2" fill={color} opacity="0.6" />
      <circle cx="22" cy="10" r="1.2" fill={color} opacity="0.6" />
      <circle cx="14" cy="10" r="1.5" fill={color} />
    </svg>
    <span
      style={{
        flex: 1,
        maxWidth: '120px',
        height: '1px',
        background: `linear-gradient(to left, transparent, ${color})`,
        opacity: 0.35,
      }}
    />
  </div>
);
