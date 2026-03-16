import { D } from '../data/constants'

export default function StatCard({ label, value, sub, accent = D.text, icon }) {
  return (
    <div
      className="rounded-lg p-4"
      style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: D.muted }}>
          {label}
        </span>
        {icon && <span className="text-sm">{icon}</span>}
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: accent }}>
        {value}
      </div>
      {sub && (
        <div className="text-[11px]" style={{ color: D.sub }}>
          {sub}
        </div>
      )}
    </div>
  )
}
