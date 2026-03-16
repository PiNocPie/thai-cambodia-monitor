import { useState, useEffect, useCallback } from 'react'
import { NEWS_KEYWORDS } from '../data/constants'

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || ''

// Fallback static articles when API is unavailable
const FALLBACK_ARTICLES = [
  {
    title: 'Thailand and Cambodia Discuss Border Security at Bilateral Meeting',
    description: 'Senior officials from both nations met in Bangkok to discuss border security cooperation and trade facilitation measures along the shared frontier.',
    source: { name: 'Bangkok Post' },
    publishedAt: '2025-03-15T10:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'Funan Techo Canal Project Advances Despite Regional Concerns',
    description: 'Cambodia continues development of the $1.7 billion Funan Techo Canal connecting Phnom Penh to the coast, with Thailand expressing concerns over Mekong water diversion.',
    source: { name: 'Nikkei Asia' },
    publishedAt: '2025-03-14T08:30:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'ASEAN Calls for Dialogue Between Thailand and Cambodia',
    description: 'The ASEAN Secretary-General urged both nations to maintain diplomatic channels open amid rising tensions over territorial and water resource disputes.',
    source: { name: 'Reuters' },
    publishedAt: '2025-03-13T14:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'Thai Military Increases Patrols Along Cambodian Border',
    description: 'The Royal Thai Armed Forces announced increased border patrols in Sa Kaeo and Surin provinces following reports of illegal border crossings.',
    source: { name: 'The Nation Thailand' },
    publishedAt: '2025-03-12T06:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'Cambodia Reaffirms Sovereignty Over Preah Vihear Temple Complex',
    description: 'Cambodian PM Hun Manet reiterated Cambodia\'s position on the Preah Vihear temple, calling it an integral part of Cambodian cultural heritage.',
    source: { name: 'Khmer Times' },
    publishedAt: '2025-03-11T09:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'Cross-Border Trade Between Thailand and Cambodia Reaches $8.2 Billion',
    description: 'Despite political tensions, bilateral trade between the two nations continues to grow, with electronics and agricultural products leading exports.',
    source: { name: 'Bloomberg' },
    publishedAt: '2025-03-10T12:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'Thailand Proposes Joint Water Management Committee with Cambodia',
    description: 'Thailand\'s Ministry of Natural Resources proposed establishing a joint committee to manage shared water resources including the Mekong and Tonle Sap systems.',
    source: { name: 'Bangkok Post' },
    publishedAt: '2025-03-09T07:00:00Z',
    url: '#',
    image: null,
  },
  {
    title: 'Displaced Communities Along Thai-Cambodian Border Seek Aid',
    description: 'NGOs report over 1,200 displaced persons in border communities affected by military deployments and restricted movement in frontier areas.',
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
