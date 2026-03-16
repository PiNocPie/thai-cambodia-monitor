import { useState, useEffect, useCallback } from 'react'
import { NEWS_KEYWORDS } from '../data/constants'

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || ''

// Fallback static articles when API is unavailable
const FALLBACK_ARTICLES = [
  {
    title: 'ไทยและกัมพูชาหารือความมั่นคงชายแดนในการประชุมทวิภาคี',
    description: 'เจ้าหน้าที่ระดับสูงจากทั้งสองประเทศพบกันที่กรุงเทพฯ เพื่อหารือความร่วมมือด้านความมั่นคงชายแดนและมาตรการอำนวยความสะดวกทางการค้าตามแนวชายแดน',
    source: { name: 'Bangkok Post' },
    publishedAt: '2025-03-15T10:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'โครงการคลองฟูนันเตโชเดินหน้าแม้มีข้อกังวลระดับภูมิภาค',
    description: 'กัมพูชาเดินหน้าพัฒนาคลองฟูนันเตโชมูลค่า 1.7 พันล้านดอลลาร์ที่เชื่อมพนมเปญกับชายฝั่ง ขณะที่ไทยแสดงความกังวลเรื่องการผันน้ำจากแม่น้ำโขง',
    source: { name: 'Nikkei Asia' },
    publishedAt: '2025-03-14T08:30:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'อาเซียนเรียกร้องให้ไทยและกัมพูชาเจรจา',
    description: 'เลขาธิการอาเซียนเรียกร้องให้ทั้งสองประเทศเปิดช่องทางการทูต ท่ามกลางความตึงเครียดที่เพิ่มขึ้นเรื่องข้อพิพาทดินแดนและทรัพยากรน้ำ',
    source: { name: 'Reuters' },
    publishedAt: '2025-03-13T14:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'กองทัพไทยเพิ่มลาดตระเวนตามแนวชายแดนกัมพูชา',
    description: 'กองทัพไทยประกาศเพิ่มการลาดตระเวนชายแดนในจังหวัดสระแก้วและสุรินทร์ หลังมีรายงานการลักลอบข้ามแดน',
    source: { name: 'The Nation Thailand' },
    publishedAt: '2025-03-12T06:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'กัมพูชายืนยันอธิปไตยเหนือปราสาทพระวิหาร',
    description: 'นายกฯ ฮุน มาเนต ย้ำจุดยืนของกัมพูชาต่อปราสาทพระวิหาร เรียกว่าเป็นส่วนสำคัญของมรดกทางวัฒนธรรมกัมพูชา',
    source: { name: 'Khmer Times' },
    publishedAt: '2025-03-11T09:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'การค้าข้ามพรมแดนไทย-กัมพูชาแตะ 8.2 พันล้านดอลลาร์',
    description: 'แม้มีความตึงเครียดทางการเมือง การค้าทวิภาคีระหว่างสองประเทศยังคงเติบโต โดยมีสินค้าอิเล็กทรอนิกส์และเกษตรนำหน้าการส่งออก',
    source: { name: 'Bloomberg' },
    publishedAt: '2025-03-10T12:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'ไทยเสนอจัดตั้งคณะกรรมการบริหารจัดการน้ำร่วมกับกัมพูชา',
    description: 'กระทรวงทรัพยากรธรรมชาติของไทยเสนอจัดตั้งคณะกรรมการร่วมเพื่อบริหารจัดการทรัพยากรน้ำร่วมกัน รวมถึงระบบแม่น้ำโขงและโตนเลสาบ',
    source: { name: 'Bangkok Post' },
    publishedAt: '2025-03-09T07:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'ชุมชนพลัดถิ่นตามแนวชายแดนไทย-กัมพูชาต้องการความช่วยเหลือ',
    description: 'องค์กร NGO รายงานผู้พลัดถิ่นมากกว่า 1,200 คนในชุมชนชายแดนที่ได้รับผลกระทบจากการวางกำลังทหารและการจำกัดการเดินทางในพื้นที่ชายแดน',
    source: { name: 'Al Jazeera' },
    publishedAt: '2025-03-08T15:00:00Z',
    url: '#',
    image: null,
  },
]

function classifyArticle(article) {
  const text = `${article.title} ${article.description}`.toLowerCase()
  for (const [cat, keywords] of Object.entries(NEWS_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return cat
  }
  return 'general'
}

export function useNewsFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (!API_KEY) {
        // Use fallback data when no API key
        const classified = FALLBACK_ARTICLES.map(a => ({ ...a, category: classifyArticle(a) }))
        setArticles(classified)
        setLastUpdated(new Date())
        setLoading(false)
        return
      }
      const q = encodeURIComponent('Thailand Cambodia')
      const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=20&apikey=${API_KEY}`
      const resp = await fetch(url)
      if (!resp.ok) throw new Error(`API error: ${resp.status}`)
      const data = await resp.json()
      const classified = (data.articles || []).map(a => ({ ...a, category: classifyArticle(a) }))
      setArticles(classified)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
      // Fall back to static articles on error
      const classified = FALLBACK_ARTICLES.map(a => ({ ...a, category: classifyArticle(a) }))
      setArticles(classified)
      setLastUpdated(new Date())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchNews()
    const interval = setInterval(fetchNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchNews])

  return { articles, loading, error, lastUpdated, refresh: fetchNews }
}
