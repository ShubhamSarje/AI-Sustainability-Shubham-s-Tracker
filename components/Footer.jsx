'use client'

const sources = [
  { label: 'MIT News', href: 'https://news.mit.edu/2025/responding-to-generative-ai-climate-impact-0930' },
  { label: 'Euronews', href: 'https://www.euronews.com/next/2025/12/20/ai-data-centres-could-have-a-carbon-footprint-that-matches-small-european-country-new-stud' },
  { label: 'Nature Sustainability', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
  { label: 'AI-EDU Arxiv', href: 'https://journals.calstate.edu/ai-edu/article/view/5448' },
]

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid var(--glass-border)',
      background: 'rgba(5,12,7,0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '1.25rem 2.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px',
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)' }}>
        <strong style={{ color: 'var(--text2)' }}>AI Sustainability — Shubham's Tracker</strong>
        {' · '}Data estimates based on published research · Not financial or policy advice
      </div>
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        {sources.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)', textDecoration: 'none', borderBottom: '1px solid var(--text3)' }}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
