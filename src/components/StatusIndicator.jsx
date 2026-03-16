import { DIPLO_STATUS } from '../data/constants'

export default function StatusIndicator({ status = 'elevated', size = 'sm' }) {
  const s = DIPLO_STATUS[status] || DIPLO_STATUS.elevated
  const px = size === 'lg' ? 'px-3 py-1.5 text-xs' : 'px-2 py-0.5 text-[10px]'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider ${px}`}
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.color}30` }}
    >
      <span
        className="rounded-full animate-pulse"
        style={{ width: size === 'lg' ? 8 : 6, height: size === 'lg' ? 8 : 6, backgroundColor: s.color }}
      />
      {s.label}
    </span>
  )
}
