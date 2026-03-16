import { D } from '../data/constants'
import StatCard from './StatCard'
import StatusIndicator from './StatusIndicator'
import RiskGauge from './RiskGauge'

const TAKEAWAYS = [
  'Bilateral tensions remain elevated following cancellation of joint military exercises and trade restriction disputes.',
  'The Funan Techo Canal project continues to be a central point of friction, with environmental and strategic concerns from Thailand and Vietnam.',
  'ASEAN-mediated talks in Singapore show signs of progress, with both foreign ministers agreeing to de-escalation measures.',
  'Border communities remain affected, with over 1,200 displaced persons reported by international organizations.',
  'Economic ties remain resilient despite political tensions, with bilateral trade growing 4.2% year-over-year to $8.2 billion.',
  'Military deployments in Sa Kaeo and Surin provinces have increased, though both sides maintain they are defensive in nature.',
]

const QUICK_STATS = [
  { label: 'Diplomatic Status', value: 'ELEVATED', accent: D.amber, sub: 'Since Oct 2024' },
  { label: 'Border Incidents', value: '12', accent: D.accent, sub: 'Last 90 days' },
  { label: 'Bilateral Trade', value: '$8.2B', accent: D.text, sub: 'Annual (+4.2% YoY)' },
  { label: 'Displaced Persons', value: '1,200+', accent: D.amber, sub: 'Along border region' },
]

export default function SituationSummary() {
  return (
    <div className="space-y-5">
      {/* Risk Assessment Header */}
      <div className="rounded-lg p-6" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <StatusIndicator status="elevated" size="lg" />
              <div>
                <h2 className="text-base font-semibold" style={{ color: D.text }}>
                  Situation Assessment
                </h2>
                <p className="text-[11px]" style={{ color: D.sub }}>
                  As of {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: D.sub }}>
              Thai-Cambodia relations remain at an elevated level of tension, primarily driven by disputes over the Funan Techo Canal
              project, ongoing border security concerns, and periodic trade frictions. While active military confrontation has not occurred,
              the cancellation of joint military exercises and increased troop deployments signal a deterioration from the relatively
              stable period of 2015-2023. Diplomatic channels remain open through ASEAN mediation, and recent foreign minister talks
              in Singapore offer cautious optimism for de-escalation.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Border Security', 'Water Resources', 'Trade Relations', 'Military Posture', 'Diplomatic Channels'].map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded text-[10px] font-medium"
                  style={{ backgroundColor: D.surfaceAlt, color: D.muted, border: `1px solid ${D.border}` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <RiskGauge value={62} label="Overall Risk" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK_STATS.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <h3
          className="text-[10px] font-semibold uppercase tracking-widest mb-4"
          style={{ color: D.muted }}
        >
          Key Takeaways
        </h3>
        <ul className="space-y-3">
          {TAKEAWAYS.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: D.sub }}>
              <span
                className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: D.amber }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Country Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Thailand */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇹🇭</span>
            <h3 className="text-sm font-semibold">Thailand</h3>
          </div>
          <div className="space-y-2 text-[12px]" style={{ color: D.sub }}>
            <div className="flex justify-between">
              <span>Head of State</span>
              <span style={{ color: D.text }}>PM Paetongtarn Shinawatra</span>
            </div>
            <div className="flex justify-between">
              <span>Military Posture</span>
              <span style={{ color: D.amber }}>Reinforced</span>
            </div>
            <div className="flex justify-between">
              <span>Diplomatic Approach</span>
              <span style={{ color: D.blue }}>Dialogue + Firmness</span>
            </div>
            <div className="flex justify-between">
              <span>Key Concern</span>
              <span style={{ color: D.text }}>Water rights & border security</span>
            </div>
          </div>
        </div>
        {/* Cambodia */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇰🇭</span>
            <h3 className="text-sm font-semibold">Cambodia</h3>
          </div>
          <div className="space-y-2 text-[12px]" style={{ color: D.sub }}>
            <div className="flex justify-between">
              <span>Head of State</span>
              <span style={{ color: D.text }}>PM Hun Manet</span>
            </div>
            <div className="flex justify-between">
              <span>Military Posture</span>
              <span style={{ color: D.amber }}>Defensive</span>
            </div>
            <div className="flex justify-between">
              <span>Diplomatic Approach</span>
              <span style={{ color: D.blue }}>Sovereignty + Cooperation</span>
            </div>
            <div className="flex justify-between">
              <span>Key Priority</span>
              <span style={{ color: D.text }}>Funan Techo Canal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
