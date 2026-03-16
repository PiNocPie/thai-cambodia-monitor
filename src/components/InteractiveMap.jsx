import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { D, EVENT_CATEGORIES } from '../data/constants'
import { LOCATIONS, BORDER_LINE, CANAL_ROUTE } from '../data/locations'

// Fix default marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const CENTER = [12.8, 103.5]
const ZOOM = 6

const MARKER_COLORS = {
  capital: '#3b82f6',
  disputed: '#ef4444',
  border_crossing: '#f59e0b',
  military: '#ef4444',
  city: '#94a3b8',
  environmental: '#10b981',
  infrastructure: '#f59e0b',
}

function createIcon(type) {
  const color = MARKER_COLORS[type] || '#94a3b8'
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 12px; height: 12px; border-radius: 50%;
      background: ${color}; border: 2px solid ${color}40;
      box-shadow: 0 0 8px ${color}60;
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

function MapLegend() {
  const map = useMap()

  useEffect(() => {
    const legend = L.control({ position: 'bottomleft' })
    legend.onAdd = () => {
      const div = L.DomUtil.create('div')
      div.style.cssText = `
        background: ${D.surface}ee; padding: 10px 12px; border-radius: 8px;
        border: 1px solid ${D.border}; font-size: 10px; color: ${D.sub};
        line-height: 1.8;
      `
      div.innerHTML = `
        <div style="font-weight:600; margin-bottom:4px; color:${D.text}; text-transform:uppercase; letter-spacing:1px; font-size:9px">คำอธิบาย</div>
        ${Object.entries(MARKER_COLORS).map(([type, color]) => {
          const labels = { capital: 'เมืองหลวง', disputed: 'พื้นที่พิพาท', border_crossing: 'ด่านชายแดน', military: 'ทหาร', city: 'เมือง', environmental: 'สิ่งแวดล้อม', infrastructure: 'โครงสร้างพื้นฐาน' }
          return `<div style="display:flex; align-items:center; gap:6px">
            <span style="width:8px; height:8px; border-radius:50%; background:${color}; flex-shrink:0"></span>
            ${labels[type] || type}
          </div>`
        }).join('')}
        <div style="display:flex; align-items:center; gap:6px; margin-top:2px">
          <span style="width:12px; height:2px; background:${D.accent}; flex-shrink:0"></span>
          ชายแดน
        </div>
        <div style="display:flex; align-items:center; gap:6px">
          <span style="width:12px; height:2px; background:${D.amber}; flex-shrink:0; border-style:dashed; border-width:0 0 2px 0; border-color:${D.amber}; height:0;"></span>
          เส้นทางคลอง
        </div>
      `
      return div
    }
    legend.addTo(map)
    return () => legend.remove()
  }, [map])

  return null
}

export default function InteractiveMap() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: D.muted }}>
          ภาพรวมทางภูมิศาสตร์
        </h3>
        <p className="text-[11px]" style={{ color: D.dim }}>
          พื้นที่ชายแดนไทย-กัมพูชา พร้อมจุดสำคัญ พื้นที่พิพาท และโครงการโครงสร้างพื้นฐาน
        </p>
      </div>

      <div
        className="rounded-lg overflow-hidden"
        style={{ border: `1px solid ${D.border}` }}
      >
        <MapContainer
          center={CENTER}
          zoom={ZOOM}
          style={{ height: '550px', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />

          {/* Border line */}
          <Polyline
            positions={BORDER_LINE}
            pathOptions={{ color: D.accent, weight: 2, opacity: 0.6, dashArray: '8, 4' }}
          />

          {/* Canal route */}
          <Polyline
            positions={CANAL_ROUTE}
            pathOptions={{ color: D.amber, weight: 3, opacity: 0.7, dashArray: '5, 8' }}
          />

          {/* Location markers */}
          {LOCATIONS.map(loc => (
            <Marker
              key={loc.id}
              position={loc.coords}
              icon={createIcon(loc.type)}
            >
              <Popup>
                <div style={{ minWidth: 180, fontSize: 12 }}>
                  <strong style={{ fontSize: 13 }}>{loc.name}</strong>
                  <div style={{ marginTop: 4, opacity: 0.8 }}>{loc.description}</div>
                  <div style={{ marginTop: 6, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5 }}>
                    {loc.type.replace('_', ' ')}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapLegend />
        </MapContainer>
      </div>
    </div>
  )
}
