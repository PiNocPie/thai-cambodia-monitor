import { D } from '../data/constants'

export default function RiskGauge({ value = 65, label = 'ระดับความเสี่ยง', size = 180 }) {
  const r = (size - 20) / 2
  const cx = size / 2
  const cy = size / 2 + 10
  const circumference = Math.PI * r
  const offset = circumference - (value / 100) * circumference

  let riskLabel, riskColor
  if (value < 30) { riskLabel = 'ต่ำ'; riskColor = D.green }
  else if (value < 50) { riskLabel = 'ปานกลาง'; riskColor = '#22d3ee' }
  else if (value < 70) { riskLabel = 'ยกระดับ'; riskColor = D.amber }
  else if (value < 85) { riskLabel = 'สูง'; riskColor = '#f97316' }
  else { riskLabel = 'วิกฤต'; riskColor = D.accent }

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={D.border}
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={riskColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
        />
        {/* Value text */}
        <text x={cx} y={cy - 15} textAnchor="middle" fill={riskColor} fontSize="28" fontWeight="bold">
          {value}
        </text>
        <text x={cx} y={cy + 5} textAnchor="middle" fill={D.sub} fontSize="11" fontWeight="600" letterSpacing="2">
          {riskLabel}
        </text>
      </svg>
      <span className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: D.muted }}>
        {label}
      </span>
    </div>
  )
}
