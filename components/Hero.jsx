'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))
  }, [])

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 2.5rem 2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ maxWidth: '600px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'block', width: '28px', height: '1px', background: 'linear-gradient(90deg, var(--green), transparent)' }} />
          Sustainable AI Initiative
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 46px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          The{' '}
          <strong style={{ fontWeight: 500, fontStyle: 'normal', color: 'var(--green)' }}>environmental cost</strong>
          <br />of artificial intelligence
        </h1>

        <p style={{ fontSize: '14px', color: 'var(--text2)', maxWidth: '520px', lineHeight: 1.75 }}>
          As AI scales globally, so does the infrastructure behind it. This tracker visualises the energy consumed, carbon emitted, and water used by AI data centers — and why measuring these matters for responsible innovation.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        {[
          { label: 'Period',  val: '2019 – 2030 (projected)' },
          { label: 'Sources', val: 'IEA · MIT · Nature Sustainability' },
          { label: 'Updated', val: dateStr },
        ].map(({ label, val }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text2)' }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
