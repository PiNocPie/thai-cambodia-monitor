import { D } from '../data/constants'
import StatCard from './StatCard'
import RiskGauge from './RiskGauge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const STATS = [
  { label: 'สถานะทางการทูต', value: 'ยกระดับ', accent: D.amber, sub: 'ตั้งแต่ ต.ค. 2567' },
  { label: 'การค้าทวิภาคี', value: '$8.2B', accent: D.text, sub: 'รายปี (+4.2%)' },
  { label: 'เหตุการณ์ชายแดน', value: '12', accent: D.accent, sub: '90 วันที่ผ่านมา' },
  { label: 'กำลังทหารประจำการ', value: '~5,000', accent: D.accent, sub: 'ชายแดนไทย ประมาณการ' },
  { label: 'ผู้พลัดถิ่น', value: '1,200+', accent: D.amber, sub: 'ตามแนวชายแดน' },
  { label: 'การเจรจาที่กำลังดำเนิน', value: '3', accent: D.green, sub: 'เจรจาทวิภาคี' },
  { label: 'มติสหประชาชาติ', value: '0', accent: D.muted, sub: 'ไม่มีมติใหม่' },
  { label: 'การรายงานข่าว', value: 'สูง', accent: D.amber, sub: 'ได้รับความสนใจระหว่างประเทศ' },
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
  { month: 'ต.ค.', incidents: 2 },
  { month: 'พ.ย.', incidents: 3 },
  { month: 'ธ.ค.', incidents: 1 },
  { month: 'ม.ค.', incidents: 4 },
  { month: 'ก.พ.', incidents: 1 },
  { month: 'มี.ค.', incidents: 1 },
]

const ISSUE_BREAKDOWN = [
  { name: 'ความมั่นคงชายแดน', value: 35, color: D.accent },
  { name: 'สิทธิ์ทางน้ำ', value: 25, color: D.blue },
  { name: 'ข้อพิพาทการค้า', value: 20, color: D.amber },
  { name: 'ดินแดน', value: 15, color: '#a855f7' },
  { name: 'อื่นๆ', value: 5, color: D.muted },
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
          <RiskGauge value={62} label="ดัชนีความเสี่ยงรวม" size={200} />
        </div>

        {/* Trade chart */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            การค้าทวิภาคี (พันล้าน $)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={TRADE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
              <XAxis dataKey="year" tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="thailand" stroke={D.blue} fill={D.blueBg} strokeWidth={2} name="มูลค่าการค้า" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Issue breakdown */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            สัดส่วนประเด็น
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
          เหตุการณ์ชายแดน (6 เดือนที่ผ่านมา)
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={INCIDENT_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="incidents" fill={D.accent} radius={[4, 4, 0, 0]} name="เหตุการณ์" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
