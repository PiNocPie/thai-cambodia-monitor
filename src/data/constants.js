// Design tokens — intelligence dashboard theme
export const D = {
  bg:           '#0f1419',
  header:       '#0a0f14',
  surface:      '#1a2332',
  surfaceAlt:   '#152028',
  border:       '#243040',
  borderLight:  '#2d3e50',
  accent:       '#ef4444',
  accentBg:     'rgba(239,68,68,0.1)',
  accentBorder: 'rgba(239,68,68,0.3)',
  amber:        '#f59e0b',
  amberBg:      'rgba(245,158,11,0.1)',
  amberBorder:  'rgba(245,158,11,0.3)',
  green:        '#10b981',
  greenBg:      'rgba(16,185,129,0.1)',
  greenBorder:  'rgba(16,185,129,0.3)',
  blue:         '#3b82f6',
  blueBg:       'rgba(59,130,246,0.1)',
  blueBorder:   'rgba(59,130,246,0.3)',
  text:         '#e2e8f0',
  sub:          '#94a3b8',
  muted:        '#64748b',
  dim:          '#475569',
}

export const NAV = [
  { id: 'summary',   label: 'Summary' },
  { id: 'news',      label: 'Live News' },
  { id: 'timeline',  label: 'Timeline' },
  { id: 'map',       label: 'Map' },
  { id: 'stats',     label: 'Statistics' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'players',   label: 'Key Players' },
]

export const EVENT_CATEGORIES = {
  military:     { label: 'Military',     color: '#ef4444' },
  diplomatic:   { label: 'Diplomatic',   color: '#3b82f6' },
  economic:     { label: 'Economic',     color: '#f59e0b' },
  humanitarian: { label: 'Humanitarian', color: '#10b981' },
}

export const DIPLO_STATUS = {
  normal:   { label: 'Normal',   color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  elevated: { label: 'Elevated', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  tense:    { label: 'Tense',    color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  critical: { label: 'Critical', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
}

export const NEWS_KEYWORDS = {
  military:     ['military', 'army', 'troops', 'deploy', 'soldier', 'weapon', 'defense', 'navy', 'air force', 'clash', 'border patrol'],
  diplomatic:   ['diplomat', 'embassy', 'talks', 'minister', 'summit', 'negotiate', 'bilateral', 'ASEAN', 'UN', 'resolution', 'ambassador'],
  economic:     ['trade', 'economic', 'tariff', 'export', 'import', 'investment', 'canal', 'commerce', 'sanction', 'business'],
  humanitarian: ['refugee', 'displaced', 'humanitarian', 'aid', 'crisis', 'civilian', 'evacuation', 'NGO', 'red cross'],
}
