import { D, NAV } from '../data/constants'
import StatusIndicator from './StatusIndicator'

export default function Header({ activeTab, onNavigate }) {
  return (
    <header style={{ background: D.header, borderBottom: `1px solid ${D.border}`, position: 'sticky', top: 0, zIndex: 40 }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        {/* Title bar */}
        <div className="flex items-center justify-between" style={{ height: 52 }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold"
                style={{ background: D.accentBg, color: D.accent, border: `1px solid ${D.accentBorder}` }}
              >
                M
              </div>
              <span className="font-semibold text-sm" style={{ color: D.text }}>
                TH-KH Monitor
              </span>
            </div>
            <StatusIndicator status="elevated" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] hidden sm:block" style={{ color: D.dim }}>
              Thailand - Cambodia Situation Dashboard
            </span>
            <div className="w-px h-4" style={{ backgroundColor: D.border }} />
            <span className="text-[10px]" style={{ color: D.muted }}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
        {/* Nav tabs */}
        <div
          className="flex items-end gap-0 overflow-x-auto hide-scrollbar"
          style={{ borderTop: `1px solid ${D.border}` }}
        >
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="px-4 py-2.5 text-[11px] font-medium relative whitespace-nowrap transition-colors"
              style={activeTab === item.id
                ? { color: D.text }
                : { color: D.muted }
              }
            >
              {item.label}
              {activeTab === item.id && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 2, background: D.accent, borderRadius: '1px 1px 0 0',
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
