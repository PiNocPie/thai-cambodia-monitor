import { useState } from 'react'
import { D } from '../data/constants'
import { KEY_PLAYERS } from '../data/keyPlayers'

const COUNTRIES = ['all', 'TH', 'KH']

export default function KeyPlayers() {
  const [filter, setFilter] = useState('all')

  const players = filter === 'all' ? KEY_PLAYERS : KEY_PLAYERS.filter(p => p.country === filter)

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="rounded-lg p-4" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: D.muted }}>
            Key Political & Military Figures ({players.length})
          </h3>
          <div className="flex gap-1.5">
            {COUNTRIES.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                style={filter === c
                  ? { backgroundColor: D.text + '15', color: D.text, border: `1px solid ${D.text}30` }
                  : { backgroundColor: D.bg, color: D.muted, border: `1px solid ${D.border}` }
                }
              >
                {c === 'all' ? 'All' : c === 'TH' ? '🇹🇭 Thailand' : '🇰🇭 Cambodia'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {players.map(player => (
          <div
            key={player.id}
            className="rounded-lg p-5"
            style={{ background: D.surface, border: `1px solid ${D.border}` }}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                style={{ backgroundColor: player.color + '20', color: player.color, border: `2px solid ${player.color}40` }}
              >
                {player.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-semibold" style={{ color: D.text }}>
                    {player.name}
                  </h4>
                  <span className="text-xs">{player.country === 'TH' ? '🇹🇭' : '🇰🇭'}</span>
                </div>
                <div className="text-[11px] mb-1" style={{ color: D.blue }}>
                  {player.role}
                </div>
                <div className="text-[10px] mb-3" style={{ color: D.dim }}>
                  {player.party}
                </div>

                {/* Stance */}
                <div className="mb-3">
                  <div className="text-[9px] font-semibold uppercase tracking-widest mb-1" style={{ color: D.muted }}>
                    Position
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: D.sub }}>
                    {player.stance}
                  </p>
                </div>

                {/* Recent statement */}
                <div
                  className="rounded-md p-3"
                  style={{ backgroundColor: D.bg, borderLeft: `3px solid ${player.color}` }}
                >
                  <div className="text-[9px] font-semibold uppercase tracking-widest mb-1" style={{ color: D.muted }}>
                    Recent Statement
                  </div>
                  <p className="text-[12px] italic leading-relaxed" style={{ color: D.sub }}>
                    {player.recentStatement}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
