import { D } from '../data/constants'
import StatCard from './StatCard'
import RiskGauge from './RiskGauge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const STATS = [
  { label: 'Diplomatic Status', value: 'ELEVATED', accent: D.amber, sub: 'Since Oct 2024' },
  { label: 'Bilateral Trade', value: '$8.2B', accent: D.text, sub: 'Annual volume (+4.2%)' },
  { label: 'Border Incidents', value: '12', accent: D.accent, sub: 'Last 90 days' },
  { label: 'Military Deployments', value: '~5,000', accent: D.accent, sub: 'Thai border est.' },
  { label: 'Displaced Persons', value: '1,200+', accent: D.amber, sub: 'Along border' },
  { label: 'Active Negotiations', value: '3', accent: D.green, sub: 'Bilateral talks' },
  { label: 'UN Resolutions', value: '0', accent: D.muted, sub: 'No new resolutions' },
  { label: 'Media Coverage', value: 'HIGH', accent: D.amber, sub: 'International attention' },
]

const TRADE_DATA = [
  { year: '2019', thailand: 5.8, cambodia: 5.8 },
  { year: '2020', thailand: 4.9, cambodia: 4.9 },
  { year: '2021', thailand: 5.4, cambodia: 5.4 },
  { year: '2022', thailand: 6.8, cambodia: 6.8 },
  { year: '2023', thailand: 7.5, cambodia: 7.5 },
  { year: '2024', thailand: 7.9, cambodia: 7.9 },
  { year: '2025*', thailand: 8.2, cambodia: 8.2 },
]

const INCIDENT_DATA = [
  { month: 'Oct', incidents: 2 },
  { month: 'Nov', incidents: 3 },
  { month: 'Dec', incidents: 1 },
  { month: 'Jan', incidents: 4 },
  { month: 'Feb', incidents: 1 },
  { month: 'Mar', incidents: 1 },
]

const ISSUE_BREAKDOWN = [
  { name: 'Border Security', value: 35, color: D.accent },
  { name: 'Water Rights', value: 25, color: D.blue },
  { name: 'Trade Disputes', value: 20, color: D.amber },
  { name: 'Territorial', value: 15, color: '#a855f7' },
  { name: 'Other', value: 5, color: D.muted },
]

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg px-3 py-2 text-[11px]"
      style={{ backgroundColor: D.surface, border: `1px solid ${D.border}`, color: D.text }}
    >
      <div className="font-medium mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: D.sub }}>{p.name}:</span>
          <span className="font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function StatsPanel() {
  return (
    <div className="space-y-5">
      {/* Stat cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Risk Gauge */}
        <div className="rounded-lg p-5 flex items-center justify-center" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <RiskGauge value={62} label="Overall Risk Index" size={200} />
        </div>

        {/* Trade chart */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            Bilateral Trade ($B)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={TRADE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="thailand" stroke={D.blue} fill={D.blueBg} strokeWidth={2} name="Trade Volume" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Issue breakdown */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            Issue Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={ISSUE_BREAKDOWN}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey="value"
              >
                {ISSUE_BREAKDOWN.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {ISSUE_BREAKDOWN.map(item => (
              <div key={item.name} className="flex items-center gap-1.5 text-[10px]" style={{ color: D.sub }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Border incidents */}
      <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
          Border Incidents (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={INCIDENT_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="incidents" fill={D.accent} radius={[4, 4, 0, 0]} name="Incidents" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
