'use client'

export default function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      background: 'rgba(5, 12, 7, 0.82)',
      backdropFilter: 'blur(20px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
      borderBottom: '1px solid var(--glass-border)',
      height: '56px',
      padding: '0 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '13px', fontWeight: 500, color: 'var(--text)', letterSpacing: '0.04em' }}>
        AI Sustainability — <span style={{ color: 'var(--green)' }}>Shubham's Tracker</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)', letterSpacing: '0.06em' }}>
          Environmental impact of AI · 2025
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          color: 'var(--green)',
          background: 'var(--green-dim)',
          border: '1px solid rgba(74,200,100,0.22)',
          padding: '4px 12px',
          borderRadius: '20px',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 6px var(--green)',
            animation: 'pulse 2s infinite',
            display: 'inline-block',
          }} />
          Live
        </div>
      </div>
    </header>
  )
}
