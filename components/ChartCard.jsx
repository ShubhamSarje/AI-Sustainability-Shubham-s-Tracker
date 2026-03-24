'use client'

export default function ChartCard({ title, sub, legend, source, sourceLinks, children, style = {} }) {
  return (
    <div style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(16px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
      border: '1px solid var(--glass-border)',
      borderRadius: '16px',
      padding: '1.5rem 1.75rem',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* top shimmer line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(74,200,100,0.2), transparent)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', letterSpacing: '0.01em' }}>{title}</div>
          {sub && <div style={{ fontSize: '11px', color: 'var(--text3)', marginTop: '3px', fontFamily: 'var(--mono)' }}>{sub}</div>}
        </div>
        {legend && (
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {legend.map(({ label, color }) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: color, flexShrink: 0 }} />
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {children}

      {(source || sourceLinks) && (
        <div style={{ marginTop: '1rem', fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', borderTop: '1px solid var(--glass-border)', paddingTop: '10px', lineHeight: 1.6 }}>
          {source}
          {sourceLinks && sourceLinks.map(({ label, href }, i) => (
            <span key={label}>
              {i > 0 && ' · '}
              <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--text3)', textDecoration: 'underline' }}>{label}</a>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
