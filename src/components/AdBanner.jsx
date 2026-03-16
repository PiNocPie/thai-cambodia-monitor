import { useEffect, useRef } from 'react'
import { D } from '../data/constants'

// Replace these with your actual Google AdSense values
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || ''
const ADSENSE_SLOTS = {
  banner: import.meta.env.VITE_ADSENSE_SLOT_BANNER || '',
  sidebar: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR || '',
  inline: import.meta.env.VITE_ADSENSE_SLOT_INLINE || '',
}

export default function AdBanner({ format = 'banner', className = '' }) {
  const adRef = useRef(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (ADSENSE_CLIENT && !pushed.current) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        pushed.current = true
      } catch (e) {
        // AdSense not loaded
      }
    }
  }, [])

  const sizes = {
    banner: { minHeight: 90, display: 'block' },
    sidebar: { minHeight: 250, display: 'block' },
    inline: { minHeight: 100, display: 'block' },
  }

  const style = sizes[format] || sizes.banner

  // If AdSense is configured, render real ad unit
  if (ADSENSE_CLIENT && ADSENSE_SLOTS[format]) {
    return (
      <div className={`my-4 ${className}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: style.display, minHeight: style.minHeight }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_SLOTS[format]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }

  // Placeholder when AdSense is not configured
  return (
    <div
      className={`my-4 rounded-lg flex items-center justify-center ${className}`}
      style={{
        background: D.surface,
        border: `1px dashed ${D.border}`,
        minHeight: style.minHeight,
      }}
    >
      <div className="text-center px-4">
        <p className="text-[11px] font-medium" style={{ color: D.muted }}>
          พื้นที่โฆษณา
        </p>
        <p className="text-[9px] mt-1" style={{ color: D.dim }}>
          ติดต่อลงโฆษณา — Ad Space Available
        </p>
      </div>
    </div>
  )
}
