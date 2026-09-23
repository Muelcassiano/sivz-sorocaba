import React from 'react';

export const LogoPrefeituraSorocaba: React.FC<{ className?: string }> = ({ className = "h-9 w-auto" }) => (
  <svg 
    viewBox="0 0 160 52" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Brasão Oficial da Prefeitura de Sorocaba"
  >
    {/* Municipal Shield Emblem */}
    <g transform="translate(4, 2)">
      {/* Mural Crown / Coroa Mural */}
      <path d="M6 10 L12 4 L18 8 L24 4 L30 8 L36 4 L42 10 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />
      <rect x="8" y="10" width="32" height="4" fill="#F59E0B" />
      <rect x="12" y="11" width="3" height="2" fill="#78350F" />
      <rect x="22" y="11" width="3" height="2" fill="#78350F" />
      <rect x="32" y="11" width="3" height="2" fill="#78350F" />
      
      {/* Portuguese Classical Escutcheon */}
      <path 
        d="M8 14 H40 V28 Q40 38 24 44 Q8 38 8 28 Z" 
        fill="#1E3A8A" 
        stroke="#1E40AF" 
        strokeWidth="1.5"
      />
      {/* Silver Chevron & Golden Cross */}
      <path d="M12 28 L24 16 L36 28 L32 30 L24 22 L16 30 Z" fill="#FFFFFF" />
      <circle cx="24" cy="27" r="4" fill="#F59E0B" />
      <path d="M22 27 H26 M24 25 V29" stroke="#78350F" strokeWidth="1.5" />
      
      {/* Ribbon / Listel */}
      <path d="M4 42 Q24 46 44 42 L42 46 Q24 50 6 46 Z" fill="#DC2626" />
    </g>

    {/* Typography - Prefeitura de Sorocaba */}
    <text x="56" y="21" fill="currentColor" fontSize="13" fontWeight="800" letterSpacing="-0.02em" fontFamily="system-ui, sans-serif">
      PREFEITURA
    </text>
    <text x="56" y="34" fill="currentColor" fontSize="12" fontWeight="700" letterSpacing="0.06em" fontFamily="system-ui, sans-serif" opacity="0.9">
      DE SOROCABA
    </text>
    <text x="56" y="44" fill="currentColor" fontSize="8" fontWeight="500" letterSpacing="0.04em" fontFamily="system-ui, sans-serif" opacity="0.6">
      SECRETARIA DA SAÚDE
    </text>
  </svg>
);

export const LogoZoonoses: React.FC<{ className?: string }> = ({ className = "h-9 w-auto" }) => (
  <svg 
    viewBox="0 0 170 52" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Divisão de Vigilância de Zoonoses"
  >
    {/* Zoonoses Shield & Health Caduceus Badge */}
    <g transform="translate(4, 3)">
      {/* Circle Background */}
      <circle cx="23" cy="23" r="21" fill="#047857" stroke="#065F46" strokeWidth="1.5" />
      <circle cx="23" cy="23" r="18" fill="#065F46" />
      
      {/* Cross of Public Health */}
      <rect x="20" y="11" width="6" height="24" rx="1.5" fill="#FFFFFF" />
      <rect x="11" y="20" width="24" height="6" rx="1.5" fill="#FFFFFF" />
      
      {/* Animal Paw Silhouette inside Cross */}
      <circle cx="23" cy="25" r="2.8" fill="#047857" />
      <circle cx="19.5" cy="19.5" r="1.3" fill="#047857" />
      <circle cx="22" cy="17.5" r="1.3" fill="#047857" />
      <circle cx="24.5" cy="17.5" r="1.3" fill="#047857" />
      <circle cx="26.5" cy="19.5" r="1.3" fill="#047857" />
    </g>

    {/* Text Description */}
    <text x="56" y="20" fill="currentColor" fontSize="12.5" fontWeight="800" letterSpacing="-0.01em" fontFamily="system-ui, sans-serif">
      ZOONOSES
    </text>
    <text x="56" y="32" fill="currentColor" fontSize="10.5" fontWeight="600" letterSpacing="0.02em" fontFamily="system-ui, sans-serif" opacity="0.85">
      Vigilância em Saúde
    </text>
    <text x="56" y="43" fill="#059669" fontSize="8" fontWeight="600" letterSpacing="0.05em" fontFamily="system-ui, sans-serif">
      DIVISÃO MUNICIPAL DE ZOONOSES
    </text>
  </svg>
);
