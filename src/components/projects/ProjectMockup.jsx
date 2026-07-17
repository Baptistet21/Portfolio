import { BarChart3, CheckCircle2, Database, FileText, HeartPulse, HardHat, Server, Users } from 'lucide-react'

function MlogMockup() {
  return (
    <div className="product-screen product-screen-mlog">
      <div className="product-sidebar"><span className="active" /><span /><span /><span /></div>
      <div className="product-ui">
        <div className="product-toolbar"><strong>MLOG Ops</strong><i /></div>
        <div className="product-kpis">
          <span><small>Flux</small><strong>128</strong></span>
          <span><small>API</small><strong>99.9%</strong></span>
          <span><small>Jobs</small><strong>24</strong></span>
        </div>
        <div className="product-chart">
          {[44, 68, 53, 82, 66, 91, 74].map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}
        </div>
      </div>
      <div className="product-float-chip"><Server size={15} />Progress ABL</div>
    </div>
  )
}

function BoqpilotMockup() {
  return (
    <div className="product-screen product-screen-boq">
      <div className="product-toolbar"><strong>Boqpilot</strong><span><Users size={15} />12</span></div>
      <div className="boq-grid">
        <div><HardHat size={20} /><small>Projets actifs</small><strong>08</strong></div>
        <div><FileText size={20} /><small>BOQ</small><strong>146</strong></div>
      </div>
      <div className="boq-table">
        <span><i />Nicosia Residence <b>82%</b></span>
        <span><i />Limassol Offices <b>64%</b></span>
        <span><i />Paphos Villas <b>41%</b></span>
      </div>
      <div className="product-float-chip"><CheckCircle2 size={15} />Docker ready</div>
    </div>
  )
}

function BirthBookMockup() {
  return (
    <div className="product-screen product-screen-birth">
      <div className="birth-header"><HeartPulse size={20} /><strong>BirthBook</strong><span>12:42</span></div>
      <div className="birth-card">
        <div className="birth-avatar">L</div>
        <div><strong>Léa</strong><small>17 juillet 2026</small></div>
        <span>3.42 kg</span>
      </div>
      <div className="birth-stats">
        <span><small>Naissances</small><strong>126</strong></span>
        <span><small>Ce mois</small><strong>14</strong></span>
      </div>
      <div className="product-float-chip"><Database size={15} />Secure data</div>
    </div>
  )
}

export default function ProjectMockup({ index }) {
  if (index === 0) return <MlogMockup />
  if (index === 1) return <BoqpilotMockup />
  return <BirthBookMockup />
}
