import { D } from '../data/constants'
import { TRENDING_HASHTAGS, SENTIMENT_TIMELINE, SENTIMENT_SUMMARY, SAMPLE_POSTS } from '../data/mockSentiment'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const SENTIMENT_COLORS = {
  positive: D.green,
  neutral: D.blue,
  negative: D.accent,
}

const TREND_ICONS = { up: '\u2191', down: '\u2193', stable: '\u2192' }
const TREND_COLORS = { up: D.green, down: D.accent, stable: D.muted }

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 text-[11px]" style={{ backgroundColor: D.surface, border: `1px solid ${D.border}`, color: D.text }}>
      <div className="font-medium mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: D.sub }}>{p.name}:</span>
          <span className="font-medium">{p.value}%</span>
        </div>
      ))}
    </div>
  )
}

const fmtNum = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

export default function SentimentDashboard() {
  const pieData = [
    { name: 'เชิงบวก', value: SENTIMENT_SUMMARY.positive, color: D.green },
    { name: 'เป็นกลาง', value: SENTIMENT_SUMMARY.neutral, color: D.blue },
    { name: 'เชิงลบ', value: SENTIMENT_SUMMARY.negative, color: D.accent },
  ]

  return (
    <div className="space-y-5">
      {/* Header info */}
      <div className="rounded-lg p-4" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: D.muted }}>
              การวิเคราะห์ความคิดเห็นโซเชียลมีเดีย
            </h3>
            <p className="text-[11px] mt-1" style={{ color: D.dim }}>
              ติดตามความคิดเห็นสาธารณะบน X (Twitter) เกี่ยวกับความสัมพันธ์ไทย-กัมพูชา (ข้อมูลจำลอง)
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold" style={{ color: D.text }}>{fmtNum(SENTIMENT_SUMMARY.total)}</div>
            <div className="text-[10px]" style={{ color: D.muted }}>การกล่าวถึงทั้งหมด</div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sentiment over time */}
        <div className="lg:col-span-2 rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            ความคิดเห็นตามช่วงเวลา
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={SENTIMENT_TIMELINE}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: D.dim }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: D.dim }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="positive" stackId="1" stroke={D.green} fill={D.greenBg} name="เชิงบวก" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke={D.blue} fill={D.blueBg} name="เป็นกลาง" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke={D.accent} fill={D.accentBg} name="เชิงลบ" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center gap-1.5 text-[10px]" style={{ color: D.sub }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name} ({item.value}%)
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment breakdown donut */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            สัดส่วนปัจจุบัน
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span style={{ color: D.sub }}>{item.name}</span>
                </div>
                <span className="font-semibold" style={{ color: item.color }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending + Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trending hashtags */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            แฮชแท็กที่กำลังเป็นกระแส
          </h3>
          <div className="space-y-2.5">
            {TRENDING_HASHTAGS.map((ht, i) => (
              <div key={ht.tag} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono w-4 text-right" style={{ color: D.dim }}>{i + 1}</span>
                  <span className="text-[12px] font-medium" style={{ color: D.text }}>{ht.tag}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]" style={{ color: D.sub }}>{fmtNum(ht.count)}</span>
                  <span className="text-[11px] font-bold" style={{ color: TREND_COLORS[ht.trend] }}>
                    {TREND_ICONS[ht.trend]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample posts */}
        <div className="lg:col-span-2 rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: D.muted }}>
            โพสต์ที่น่าสนใจ
          </h3>
          <div className="space-y-3">
            {SAMPLE_POSTS.map((post, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{ backgroundColor: D.bg, border: `1px solid ${D.border}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ backgroundColor: D.surface, color: D.sub }}
                    >
                      {post.handle.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[11px] font-medium" style={{ color: D.text }}>{post.handle}</div>
                      <div className="text-[10px]" style={{ color: D.dim }}>{post.user} · {post.time}</div>
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase"
                    style={{
                      backgroundColor: SENTIMENT_COLORS[post.sentiment] + '15',
                      color: SENTIMENT_COLORS[post.sentiment],
                    }}
                  >
                    {post.sentiment}
                  </span>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: D.sub }}>
                  {post.text}
                </p>
                <div className="flex items-center gap-4 mt-2 text-[10px]" style={{ color: D.dim }}>
                  <span>{fmtNum(post.likes)} ถูกใจ</span>
                  <span>{fmtNum(post.reposts)} รีโพสต์</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
