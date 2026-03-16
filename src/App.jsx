import { lazy, Suspense } from 'react'
import { D } from './data/constants'
import { useHashRoute } from './hooks/useHashRoute'
import Header from './components/Header'
import SituationSummary from './components/SituationSummary'
import NewsFeed from './components/NewsFeed'
import EventTimeline from './components/EventTimeline'
import StatsPanel from './components/StatsPanel'
import SentimentDashboard from './components/SentimentDashboard'
import KeyPlayers from './components/KeyPlayers'

const InteractiveMap = lazy(() => import('./components/InteractiveMap'))

const MapLoader = () => (
  <div className="text-center py-20" style={{ color: D.muted }}>
    <div className="animate-spin w-6 h-6 border-2 border-current border-t-transparent rounded-full mx-auto mb-3" />
    กำลังโหลดแผนที่...
  </div>
)

export default function App() {
  const [activeTab, navigateTo] = useHashRoute('summary')

  return (
    <div className="min-h-screen" style={{ backgroundColor: D.bg, color: D.text }}>
      <Header activeTab={activeTab} onNavigate={navigateTo} />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'summary'   && <SituationSummary />}
        {activeTab === 'news'      && <NewsFeed />}
        {activeTab === 'timeline'  && <EventTimeline />}
        {activeTab === 'map'       && (
          <Suspense fallback={<MapLoader />}>
            <InteractiveMap />
          </Suspense>
        )}
        {activeTab === 'stats'     && <StatsPanel />}
        {activeTab === 'sentiment' && <SentimentDashboard />}
        {activeTab === 'players'   && <KeyPlayers />}
      </main>

      {/* Footer */}
      <footer className="border-t px-6 py-4 text-center" style={{ borderColor: D.border }}>
        <p className="text-[10px]" style={{ color: D.dim }}>
          ศูนย์ติดตาม ไทย-กัมพูชา — แดชบอร์ดติดตามสถานการณ์ — ข้อมูลเพื่อการศึกษาเท่านั้น
        </p>
      </footer>
    </div>
  )
}
