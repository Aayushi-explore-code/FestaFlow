import React from 'react';

interface BrandMarkProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * FestaFlow Minimal Rangoli / Lotus Brand Mark
 * A refined contemporary Indian geometric emblem combining the eightfold lotus
 * of auspicious celebration with architectural precision.
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  size = 32,
  color = '#C76B29',
  className = '',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-label="FestaFlow Brand Mark"
    >
      {/* Concentric subtle alignment ring */}
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.5" />
      <circle cx="20" cy="20" r="14.5" stroke={color} strokeWidth="0.8" opacity="0.8" />

      {/* 8-fold symmetrical lotus petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 20 20)`}>
          {/* Petal contour */}
          <path
            d="M20 5.5C18.2 9.5 17.5 13.5 20 17C22.5 13.5 21.8 9.5 20 5.5Z"
            stroke={color}
            strokeWidth="1"
            fill={color}
            fillOpacity="0.12"
          />
          {/* Cardinal accent node */}
          <circle cx="20" cy="5.5" r="0.9" fill={color} />
        </g>
      ))}

      {/* Inner sacred geometry and bindu core */}
      <circle cx="20" cy="20" r="5" stroke={color} strokeWidth="0.9" />
      <circle cx="20" cy="20" r="2.2" fill={color} />
    </svg>
  );
};
