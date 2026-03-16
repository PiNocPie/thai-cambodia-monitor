import { D } from '../data/constants'
import StatCard from './StatCard'
import StatusIndicator from './StatusIndicator'
import RiskGauge from './RiskGauge'

const TAKEAWAYS = [
  'ความตึงเครียดทวิภาคียังคงอยู่ในระดับสูง หลังจากยกเลิกการฝึกทหารร่วมและข้อพิพาททางการค้า',
  'โครงการคลองฟูนันเตโชยังคงเป็นจุดขัดแย้งหลัก ด้วยข้อกังวลด้านสิ่งแวดล้อมและเชิงกลยุทธ์จากไทยและเวียดนาม',
  'การเจรจาที่มีอาเซียนเป็นตัวกลางที่สิงคโปร์แสดงสัญญาณเชิงบวก โดยรัฐมนตรีต่างประเทศทั้งสองฝ่ายตกลงมาตรการลดความตึงเครียด',
  'ชุมชนชายแดนยังคงได้รับผลกระทบ โดยมีผู้พลัดถิ่นมากกว่า 1,200 คนตามรายงานขององค์กรระหว่างประเทศ',
  'ความสัมพันธ์ทางเศรษฐกิจยังคงแข็งแกร่งแม้มีความตึงเครียดทางการเมือง การค้าทวิภาคีเติบโต 4.2% เมื่อเทียบปีต่อปี เป็นมูลค่า 8.2 พันล้านดอลลาร์',
  'การวางกำลังทหารในจังหวัดสระแก้วและสุรินทร์เพิ่มขึ้น แม้ทั้งสองฝ่ายยืนยันว่าเป็นเชิงป้องกัน',
]

const QUICK_STATS = [
  { label: 'สถานะทางการทูต', value: 'ยกระดับ', accent: D.amber, sub: 'ตั้งแต่ ต.ค. 2567' },
  { label: 'เหตุการณ์ชายแดน', value: '12', accent: D.accent, sub: '90 วันที่ผ่านมา' },
  { label: 'การค้าทวิภาคี', value: '$8.2B', accent: D.text, sub: 'รายปี (+4.2% YoY)' },
  { label: 'ผู้พลัดถิ่น', value: '1,200+', accent: D.amber, sub: 'ตามแนวชายแดน' },
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
                  การประเมินสถานการณ์
                </h2>
                <p className="text-[11px]" style={{ color: D.sub }}>
                  ณ วันที่ {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: D.sub }}>
              ความสัมพันธ์ไทย-กัมพูชายังคงอยู่ในระดับตึงเครียดสูง โดยมีสาเหตุหลักจากข้อพิพาทเรื่องโครงการคลองฟูนันเตโช
              ข้อกังวลด้านความมั่นคงชายแดนที่ยังดำเนินอยู่ และความขัดแย้งทางการค้าเป็นระยะ แม้จะยังไม่เกิดการเผชิญหน้าทางทหาร
              แต่การยกเลิกการฝึกทหารร่วมและการเพิ่มกำลังทหารเป็นสัญญาณของความเสื่อมถอยจากช่วงเสถียรภาพ
              ในปี 2558-2566 ช่องทางการทูตยังคงเปิดอยู่ผ่านการไกล่เกลี่ยของอาเซียน และการเจรจาล่าสุดของรัฐมนตรีต่างประเทศ
              ที่สิงคโปร์ให้ความหวังอย่างระมัดระวังต่อการลดความตึงเครียด
            </p>
            <div className="flex flex-wrap gap-2">
              {['ความมั่นคงชายแดน', 'ทรัพยากรน้ำ', 'ความสัมพันธ์การค้า', 'ท่าทีทางทหาร', 'ช่องทางการทูต'].map(tag => (
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
            <RiskGauge value={62} label="ระดับความเสี่ยงรวม" />
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
          ประเด็นสำคัญ
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
            <h3 className="text-sm font-semibold">ประเทศไทย</h3>
          </div>
          <div className="space-y-2 text-[12px]" style={{ color: D.sub }}>
            <div className="flex justify-between">
              <span>ผู้นำประเทศ</span>
              <span style={{ color: D.text }}>นายกฯ แพทองธาร ชินวัตร</span>
            </div>
            <div className="flex justify-between">
              <span>ท่าทีทางทหาร</span>
              <span style={{ color: D.amber }}>เสริมกำลัง</span>
            </div>
            <div className="flex justify-between">
              <span>แนวทางการทูต</span>
              <span style={{ color: D.blue }}>เจรจา + ยืนหยัด</span>
            </div>
            <div className="flex justify-between">
              <span>ข้อกังวลหลัก</span>
              <span style={{ color: D.text }}>สิทธิ์ทางน้ำ & ความมั่นคงชายแดน</span>
            </div>
          </div>
        </div>
        {/* Cambodia */}
        <div className="rounded-lg p-5" style={{ background: D.surface, border: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🇰🇭</span>
            <h3 className="text-sm font-semibold">กัมพูชา</h3>
          </div>
          <div className="space-y-2 text-[12px]" style={{ color: D.sub }}>
            <div className="flex justify-between">
              <span>ผู้นำประเทศ</span>
              <span style={{ color: D.text }}>นายกฯ ฮุน มาเนต</span>
            </div>
            <div className="flex justify-between">
              <span>ท่าทีทางทหาร</span>
              <span style={{ color: D.amber }}>เชิงรับ</span>
            </div>
            <div className="flex justify-between">
              <span>แนวทางการทูต</span>
              <span style={{ color: D.blue }}>อธิปไตย + ความร่วมมือ</span>
            </div>
            <div className="flex justify-between">
              <span>ประเด็นสำคัญ</span>
              <span style={{ color: D.text }}>คลองฟูนันเตโช</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
