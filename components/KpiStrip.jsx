'use client'

const kpis = [
  {
    type: 'energy',
    badge: 'Energy',
    num: '415',
    unit: 'TWh / year',
    label: 'Global data center electricity consumption',
    change: '↑ 40% since 2022',
    topColor: 'var(--amber)',
    badgeBg: 'var(--amber-dim)',
    badgeColor: 'var(--amber)',
    badgeBorder: 'rgba(240,160,48,0.2)',
    glowBg: 'var(--amber)',
  },
  {
    type: 'carbon',
    badge: 'Carbon',
    num: '40',
    unit: 'Mt CO₂ / year',
    label: 'AI-related carbon emissions (2025 est.)',
    change: '↑ 35% projected by 2030',
    topColor: 'var(--red)',
    badgeBg: 'var(--red-dim)',
    badgeColor: 'var(--red)',
    badgeBorder: 'rgba(240,80,80,0.2)',
    glowBg: 'var(--red)',
  },
  {
    type: 'water',
    badge: 'Water',
    num: '620',
    unit: 'bn litres / year',
    label: 'Data center water usage for cooling',
    change: '↑ 22% vs pre-generative AI era',
    topColor: 'var(--blue)',
    badgeBg: 'var(--blue-dim)',
    badgeColor: 'var(--blue)',
    badgeBorder: 'rgba(80,168,240,0.2)',
    glowBg: 'var(--blue)',
  },
]

export default function KpiStrip() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
      {kpis.map((k) => (
        <div key={k.type} style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(16px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '1.5rem 1.75rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.25s, box-shadow 0.25s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--glass-border2)'; e.currentTarget.style.boxShadow = '0 0 28px var(--glow2), inset 0 1px 0 rgba(255,255,255,0.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {/* top color line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${k.topColor}, transparent)` }} />
          {/* corner glow */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: k.glowBg, opacity: 0.06, pointerEvents: 'none' }} />

          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 9px', borderRadius: '20px', display: 'inline-block', marginBottom: '14px', fontWeight: 500, background: k.badgeBg, color: k.badgeColor, border: `1px solid ${k.badgeBorder}` }}>
            {k.badge}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '42px', fontWeight: 500, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '4px' }}>{k.num}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)', marginBottom: '10px' }}>{k.unit}</div>
          <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px', lineHeight: 1.5 }}>{k.label}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--red)' }}>{k.change}</div>
        </div>
      ))}
    </div>
  )
}
