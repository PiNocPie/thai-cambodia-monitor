import { useState, useMemo } from 'react'
import { D, EVENT_CATEGORIES } from '../data/constants'
import { TIMELINE_EVENTS } from '../data/timeline'

const ALL_CATS = ['all', 'military', 'diplomatic', 'economic', 'humanitarian']

export default function EventTimeline() {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const events = useMemo(() => {
    const sorted = [...TIMELINE_EVENTS].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (filter === 'all') return sorted
    return sorted.filter(e => e.category === filter)
  }, [filter])

  const catColor = (cat) => EVENT_CATEGORIES[cat]?.color || D.muted

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="rounded-lg p-4" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: D.muted }}>
            ไทม์ไลน์เหตุการณ์ ({events.length} เหตุการณ์)
          </h3>
          <div className="flex gap-1.5">
            {ALL_CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors capitalize"
                style={filter === cat
                  ? { backgroundColor: (cat === 'all' ? D.text : catColor(cat)) + '20', color: cat === 'all' ? D.text : catColor(cat), border: `1px solid ${(cat === 'all' ? D.text : catColor(cat))}40` }
                  : { backgroundColor: D.bg, color: D.muted, border: `1px solid ${D.border}` }
                }
              >
                {cat === 'all' ? 'ทั้งหมด' : EVENT_CATEGORIES[cat]?.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-3 top-0 bottom-0 w-px"
          style={{ backgroundColor: D.border }}
        />

        {events.map((event, i) => {
          const color = catColor(event.category)
          const isExpanded = expanded === event.id
          return (
            <div key={event.id} className="relative mb-4">
              {/* Dot */}
              <div
                className="absolute -left-5 top-4 w-3 h-3 rounded-full border-2"
                style={{ backgroundColor: D.bg, borderColor: color }}
              />
              {/* Card */}
              <div
                className="rounded-lg p-4 cursor-pointer transition-colors"
                style={{ background: D.surface, border: `1px solid ${D.border}`, borderLeft: `3px solid ${color}` }}
                onClick={() => setExpanded(isExpanded ? null : event.id)}
                onMouseOver={e => e.currentTarget.style.borderColor = D.borderLight}
                onMouseOut={e => { e.currentTarget.style.borderColor = D.border; e.currentTarget.style.borderLeftColor = color }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono" style={{ color: D.dim }}>
                    {new Date(event.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase"
                    style={{ backgroundColor: color + '15', color }}
                  >
                    {EVENT_CATEGORIES[event.category]?.label}
                  </span>
                  {event.source && (
                    <span className="text-[10px]" style={{ color: D.dim }}>
                      จาก {event.source}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-medium" style={{ color: D.text }}>
                  {event.title}
                </h4>
                {isExpanded && (
                  <p className="text-[12px] mt-2 leading-relaxed" style={{ color: D.sub }}>
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
