import { useState, useMemo } from 'react'
import { D, EVENT_CATEGORIES } from '../data/constants'
import { useNewsFeed } from '../hooks/useNewsFeed'

const ALL_CATEGORIES = ['all', 'military', 'diplomatic', 'economic', 'humanitarian']

export default function NewsFeed() {
  const { articles, loading, error, lastUpdated, refresh } = useNewsFeed()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    let list = articles
    if (category !== 'all') {
      list = list.filter(a => a.category === category)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(a =>
        (a.title || '').toLowerCase().includes(q) ||
        (a.description || '').toLowerCase().includes(q)
      )
    }
    return list
  }, [articles, category, search])

  const catColor = (cat) => {
    if (cat === 'all') return D.text
    return EVENT_CATEGORIES[cat]?.color || D.muted
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="rounded-lg p-4" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาข่าว..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-sm outline-none"
              style={{
                backgroundColor: D.bg,
                color: D.text,
                border: `1px solid ${D.border}`,
              }}
            />
          </div>
          {/* Category filters */}
          <div className="flex gap-1.5 flex-wrap">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors capitalize"
                style={category === cat
                  ? { backgroundColor: catColor(cat) + '20', color: catColor(cat), border: `1px solid ${catColor(cat)}40` }
                  : { backgroundColor: D.bg, color: D.muted, border: `1px solid ${D.border}` }
                }
              >
                {cat === 'all' ? 'ทั้งหมด' : EVENT_CATEGORIES[cat]?.label || cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px]" style={{ color: D.dim }}>
            {filtered.length} บทความ
            {lastUpdated && ` · อัปเดตล่าสุด ${lastUpdated.toLocaleTimeString('th-TH')}`}
          </span>
          <button
            onClick={refresh}
            className="text-[10px] font-medium px-2.5 py-1 rounded transition-colors"
            style={{ color: D.blue, backgroundColor: D.blueBg, border: `1px solid ${D.blueBorder}` }}
          >
            รีเฟรช
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg p-3 text-sm" style={{ backgroundColor: D.accentBg, color: D.accent, border: `1px solid ${D.accentBorder}` }}>
          ข้อผิดพลาด API: {error} — แสดงบทความที่แคชไว้
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12" style={{ color: D.muted }}>
          <div className="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full mx-auto mb-3" />
          กำลังโหลดข่าว...
        </div>
      )}

      {/* Articles */}
      {!loading && (
        <div className="space-y-3">
          {filtered.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-4 transition-colors"
              style={{ background: D.surface, border: `1px solid ${D.border}` }}
              onMouseOver={e => e.currentTarget.style.borderColor = D.borderLight}
              onMouseOut={e => e.currentTarget.style.borderColor = D.border}
            >
              <div className="flex items-start gap-4">
                {article.image && (
                  <img
                    src={article.image}
                    alt=""
                    className="w-24 h-16 object-cover rounded flex-shrink-0"
                    onError={e => e.target.style.display = 'none'}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase"
                      style={{
                        backgroundColor: (catColor(article.category) || D.muted) + '15',
                        color: catColor(article.category) || D.muted,
                      }}
                    >
                      {article.category || 'general'}
                    </span>
                    <span className="text-[10px]" style={{ color: D.dim }}>
                      {article.source?.name || 'Unknown'}
                    </span>
                    <span className="text-[10px]" style={{ color: D.dim }}>
                      · {new Date(article.publishedAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium mb-1 line-clamp-2" style={{ color: D.text }}>
                    {article.title}
                  </h3>
                  <p className="text-[12px] line-clamp-2" style={{ color: D.sub }}>
                    {article.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
          {filtered.length === 0 && !loading && (
            <div className="text-center py-12 text-sm" style={{ color: D.muted }}>
              ไม่พบบทความที่ตรงกับตัวกรองของคุณ
            </div>
          )}
        </div>
      )}
    </div>
  )
}
