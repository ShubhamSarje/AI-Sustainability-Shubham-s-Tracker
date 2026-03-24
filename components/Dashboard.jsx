'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

import ChartCard from './ChartCard'
import {
  GRID, TICK, TOOLTIP,
  energyStackData, actionEnergyData, modelEnergyData,
  carbonContextData, carbonGrowthData, carbonShareData,
  waterTrendData, waterModelData,
  growthRateData, gridIntensityData,
} from './chartData'

/* ─────────────────────────────────────────────
   ANIMATION CONSTANTS  (single source of truth)
───────────────────────────────────────────── */
const ANIM = {
  tabFade:    { duration: 350, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },  // tab panel
  cardStagger:{ base: 60, step: 55 },                                         // ms delay per card
  chartDraw:  { duration: 700, easing: 'easeOutQuart' },                      // chart.js built-in
  countUp:    { duration: 1200 },                                              // KPI count-up
  hover:      { scale: 'scale(1.018)', shadow: '0 8px 32px rgba(74,200,100,0.13)', transition: '180ms cubic-bezier(0.22,1,0.36,1)' },
}

/* ─────────────────────────────────────────────
   CHART OPTION FACTORIES
   All charts use animation: { duration, easing }
   so every render triggers the draw animation.
───────────────────────────────────────────── */
const CHART_ANIM = { animation: { duration: ANIM.chartDraw.duration, easing: ANIM.chartDraw.easing } }

const BASE_OPTIONS = (yCallback) => ({
  responsive: true,
  maintainAspectRatio: false,
  ...CHART_ANIM,
  plugins: { legend: { display: false }, tooltip: TOOLTIP },
  scales: {
    x: { grid: { color: GRID }, ticks: TICK, border: { color: 'transparent' } },
    y: { grid: { color: GRID }, ticks: { ...TICK, callback: yCallback }, border: { color: 'transparent' } },
  },
})

const STACKED_OPTIONS = (yCallback) => ({
  ...BASE_OPTIONS(yCallback),
  scales: {
    x: { stacked: true, grid: { color: GRID }, ticks: TICK, border: { color: 'transparent' } },
    y: { stacked: true, grid: { color: GRID }, ticks: { ...TICK, callback: yCallback }, border: { color: 'transparent' } },
  },
})

const HOR_OPTIONS = (xCallback) => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  ...CHART_ANIM,
  plugins: { legend: { display: false }, tooltip: TOOLTIP },
  scales: {
    x: { grid: { color: GRID }, ticks: { ...TICK, callback: xCallback }, border: { color: 'transparent' } },
    y: { grid: { display: false }, ticks: TICK, border: { color: 'transparent' } },
  },
})

const DOUGHNUT_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  ...CHART_ANIM,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: { color: '#3d6644', font: { size: 10, family: "'DM Mono'" }, boxWidth: 10, padding: 12 },
    },
    tooltip: TOOLTIP,
  },
}

/* ─────────────────────────────────────────────
   CANVAS CHART
   Destroys + re-creates the Chart.js instance
   on every mount so the draw animation always
   fires when switching tabs.
───────────────────────────────────────────── */
function CanvasChart({ id, type, data, options, height = 290 }) {
  const ref      = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (chartRef.current) chartRef.current.destroy()
    chartRef.current = new Chart(ref.current, { type, data, options })
    return () => { if (chartRef.current) chartRef.current.destroy() }
  }, [])  // intentional empty deps — remounts on tab switch give fresh animation

  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
      <canvas ref={ref} id={id} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   ANIMATED CARD
   Wraps any card with:
     • fade + translateY on mount
     • staggered delay via `index` prop
     • hover scale + shadow via onMouse handlers
───────────────────────────────────────────── */
function AnimCard({ children, index = 0, style = {} }) {
  const ref = useRef(null)

  // mount animation (staggered)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const delay = ANIM.cardStagger.base + index * ANIM.cardStagger.step

    el.style.transition = 'none'
    el.style.opacity    = '0'
    el.style.transform  = 'translateY(18px)'
    void el.offsetHeight

    setTimeout(() => {
      el.style.transition = `opacity ${ANIM.tabFade.duration}ms ${ANIM.tabFade.easing},
                             transform ${ANIM.tabFade.duration}ms ${ANIM.tabFade.easing}`
      el.style.opacity   = '1'
      el.style.transform = 'translateY(0px)'
    }, delay)
  }, [index])

  const onEnter = useCallback((e) => {
    e.currentTarget.style.transform  = ANIM.hover.scale
    e.currentTarget.style.boxShadow  = ANIM.hover.shadow
    e.currentTarget.style.transition = `transform ${ANIM.hover.transition}, box-shadow ${ANIM.hover.transition}`
  }, [])

  const onLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'scale(1)'
    e.currentTarget.style.boxShadow = 'none'
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        opacity: 0,
        transform: 'translateY(18px)',
        willChange: 'opacity, transform',   // hint GPU acceleration
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   TAB PANEL
   Fades + slides the whole panel on tab switch.
   animKey increments every switch to retrigger.
───────────────────────────────────────────── */
function TabPanel({ children, animKey }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'none'
    el.style.opacity    = '0'
    el.style.transform  = 'translateY(12px)'
    void el.offsetHeight
    el.style.transition = `opacity ${ANIM.tabFade.duration}ms ${ANIM.tabFade.easing},
                           transform ${ANIM.tabFade.duration}ms ${ANIM.tabFade.easing}`
    el.style.opacity   = '1'
    el.style.transform = 'translateY(0px)'
  }, [animKey])

  return (
    <div ref={ref} style={{ opacity: 0, transform: 'translateY(12px)', willChange: 'opacity, transform' }}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   COUNT-UP HOOK
   Animates a numeric value from 0 → target.
   Supports integers and decimals.
   Triggers whenever `trigger` changes.
───────────────────────────────────────────── */
function useCountUp(target, trigger, duration = ANIM.countUp.duration) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    let start = null
    const isFloat   = String(target).includes('.')
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''))

    function step(ts) {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out-quart
      const ease = 1 - Math.pow(1 - progress, 4)
      const current = ease * numericTarget
      setVal(isFloat ? parseFloat(current.toFixed(1)) : Math.round(current))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger])  // re-run on every tab switch

  return val
}

/* ─────────────────────────────────────────────
   KPI COUNT-UP CARD
   Animates the headline number each time the
   Context tab is visited.
───────────────────────────────────────────── */
function CountUpCard({ rawNum, unit, label, change, trigger, index }) {
  const displayed = useCountUp(rawNum, trigger)

  return (
    <AnimCard index={index}>
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(74,200,100,0.25), transparent)' }} />
        <div style={{ fontFamily: 'var(--mono)', fontSize: '32px', fontWeight: 500, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          {displayed}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text3)', marginBottom: '8px' }}>{unit}</div>
        <div style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '10px' }}>{label}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--red)' }}>{change}</div>
      </div>
    </AnimCard>
  )
}

/* ─────────────────────────────────────────────
   GRID HELPERS
───────────────────────────────────────────── */
function Grid2({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '14px', marginBottom: '14px' }}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   ANIMATED CHART CARD
   Thin wrapper that combines AnimCard + ChartCard
───────────────────────────────────────────── */
function ACard({ index, title, sub, legend, source, sourceLinks, children, style = {} }) {
  return (
    <AnimCard index={index} style={style}>
      <ChartCard title={title} sub={sub} legend={legend} source={source} sourceLinks={sourceLinks}>
        {children}
      </ChartCard>
    </AnimCard>
  )
}

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */
const TABS = ['Energy', 'Carbon', 'Water', 'Context']

export default function Dashboard() {
  const [active,   setActive]   = useState('Energy')
  const [animKey,  setAnimKey]  = useState(0)

  function switchTab(tab) {
    if (tab === active) return
    setActive(tab)
    setAnimKey(k => k + 1)
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem 4rem' }}>

      {/* ── Tab Nav ── */}
      <div style={{
        display: 'flex',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        padding: '4px',
        width: 'fit-content',
        marginBottom: '1.5rem',
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => switchTab(tab)}
            style={{
              fontFamily:   'var(--mono)',
              fontSize:     '12px',
              padding:      '8px 22px',
              background:   active === tab ? 'var(--green-dim)' : 'transparent',
              border:       active === tab ? '1px solid rgba(74,200,100,0.22)' : '1px solid transparent',
              borderRadius: '8px',
              color:        active === tab ? 'var(--green)' : 'var(--text3)',
              cursor:       'pointer',
              boxShadow:    active === tab ? '0 0 14px rgba(74,200,100,0.1)' : 'none',
              letterSpacing:'0.04em',
              transition:   'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════
          ENERGY TAB
      ══════════════════════════════ */}
      {active === 'Energy' && (
        <TabPanel animKey={animKey}>

          {/* Card 0 — main stacked bar */}
          <ACard
            index={0}
            title="Global data center electricity demand (TWh) — 2019 to 2030"
            sub="AI share growing significantly · values from 2026 onward are projected"
            legend={[
              { label: 'Non-AI workloads', color: 'rgba(240,160,48,0.75)' },
              { label: 'AI workloads',     color: 'rgba(74,200,100,0.75)' },
            ]}
            sourceLinks={[
              { label: 'MIT News 2025',             href: 'https://news.mit.edu/2025/responding-to-generative-ai-climate-impact-0930' },
              { label: 'Nature Sustainability 2025', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
            ]}
          >
            <CanvasChart id="energyStack" type="bar" data={energyStackData} options={STACKED_OPTIONS(v => v + ' TWh')} height={290} />
          </ACard>

          {/* Cards 1 & 2 — side by side */}
          <Grid2>
            <ACard index={1} title="Energy per AI action type" sub="Estimated Wh per task" source="Estimates based on published model efficiency benchmarks" style={{ marginBottom: 0 }}>
              <CanvasChart id="actionEnergy" type="bar" data={actionEnergyData} options={HOR_OPTIONS(v => v + ' Wh')} height={220} />
            </ACard>
            <ACard index={2} title="Energy cost by model size" sub="Wh per 1,000 queries" source="Smaller optimised models can reduce energy use by 10–50×" style={{ marginBottom: 0 }}>
              <CanvasChart id="modelEnergy" type="bar" data={modelEnergyData} options={BASE_OPTIONS(v => v >= 1000 ? (v / 1000) + 'k Wh' : v + ' Wh')} height={220} />
            </ACard>
          </Grid2>

        </TabPanel>
      )}

      {/* ══════════════════════════════
          CARBON TAB
      ══════════════════════════════ */}
      {active === 'Carbon' && (
        <TabPanel animKey={animKey}>

          <ACard
            index={0}
            title="AI data center CO₂ vs country-level emissions (Mt/year)"
            sub="Putting AI's carbon footprint in perspective"
            sourceLinks={[
              { label: 'Euronews 2025',             href: 'https://www.euronews.com/next/2025/12/20/ai-data-centres-could-have-a-carbon-footprint-that-matches-small-european-country-new-stud' },
              { label: 'Nature Sustainability 2025', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
            ]}
          >
            <CanvasChart id="carbonContext" type="bar" data={carbonContextData} options={BASE_OPTIONS(v => v + ' Mt')} height={290} />
          </ACard>

          <Grid2>
            <ACard index={1} title="Projected AI CO₂ growth" sub="Mt — 2022 to 2030" source="24–44 Mt CO₂ equivalent projected annually by 2030 (Nature Sustainability)" style={{ marginBottom: 0 }}>
              <CanvasChart id="carbonGrowth" type="line" data={carbonGrowthData} options={BASE_OPTIONS(v => v + ' Mt')} height={220} />
            </ACard>
            <ACard index={2} title="Emissions by pipeline stage" sub="Share of total AI carbon output" source="Training dominates; inference growing fastest as adoption scales" style={{ marginBottom: 0 }}>
              <CanvasChart id="carbonShare" type="doughnut" data={carbonShareData} options={DOUGHNUT_OPTIONS} height={220} />
            </ACard>
          </Grid2>

        </TabPanel>
      )}

      {/* ══════════════════════════════
          WATER TAB
      ══════════════════════════════ */}
      {active === 'Water' && (
        <TabPanel animKey={animKey}>

          <ACard
            index={0}
            title="Data center water consumption (bn litres/year) — 2020 to 2030"
            sub="Cooling systems are the primary driver · values from 2026 onward are projected"
            legend={[
              { label: 'Cooling systems', color: 'rgba(80,168,240,0.75)' },
              { label: 'Humidification',  color: 'rgba(45,110,158,0.6)'  },
            ]}
            sourceLinks={[
              { label: 'AI-EDU Arxiv 2025',         href: 'https://journals.calstate.edu/ai-edu/article/view/5448' },
              { label: 'Nature Sustainability 2025', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
            ]}
          >
            <CanvasChart id="waterTrend" type="bar" data={waterTrendData} options={STACKED_OPTIONS(v => v + ' bn L')} height={290} />
          </ACard>

          <ACard
            index={1}
            title="Water usage per 1,000 AI queries (litres) — by model size"
            sub="Smaller models use up to 150× less water per query"
            source="Varies by data center location and cooling method · figures are estimates"
          >
            <CanvasChart id="waterModel" type="bar" data={waterModelData} options={HOR_OPTIONS(v => v + ' L')} height={230} />
          </ACard>

        </TabPanel>
      )}

      {/* ══════════════════════════════
          CONTEXT TAB
      ══════════════════════════════ */}
      {active === 'Context' && (
        <TabPanel animKey={animKey}>

          {/* Row 1: perspective card + growth chart */}
          <Grid2>

            {/* Perspective card with animated rows */}
            <AnimCard index={0}>
              <div style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(16px) saturate(1.2)',
                WebkitBackdropFilter: 'blur(16px) saturate(1.2)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.5rem 1.75rem',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(74,200,100,0.2), transparent)' }} />
                <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text)', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)', letterSpacing: '0.04em' }}>
                  // putting the numbers in perspective
                </div>

                {/* Each stat row fades in with its own stagger */}
                {[
                  {
                    num: '415 TWh',
                    delay: 120,
                    text: <><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Annual data center energy</strong> equals the total electricity consumption of <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Poland or South Africa</strong> for a full year.</>
                  },
                  {
                    num: '40 Mt CO₂',
                    delay: 200,
                    text: <><strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI-related emissions</strong> match the annual output of a <strong style={{ color: 'var(--text)', fontWeight: 500 }}>mid-sized European nation</strong> like Portugal or Denmark.</>
                  },
                  {
                    num: '620 bn L',
                    delay: 280,
                    text: <><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Annual cooling water</strong> is enough to fill over <strong style={{ color: 'var(--text)', fontWeight: 500 }}>240,000 Olympic swimming pools</strong> every single year.</>
                  },
                ].map(({ num, delay, text }) => (
                  <StaggerRow key={num} delay={delay} animKey={animKey}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '17px', fontWeight: 500, color: 'var(--green)', minWidth: '100px', lineHeight: 1.3, textShadow: '0 0 20px rgba(74,200,100,0.3)' }}>
                      {num}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7 }}>{text}</div>
                  </StaggerRow>
                ))}
              </div>
            </AnimCard>

            {/* Growth rate chart */}
            <ACard index={1} title="Annual energy demand growth by sector" sub="% per year — AI vs other industries" source="AI data center growth significantly outpaces most other sectors" style={{ marginBottom: 0 }}>
              <CanvasChart id="growthRate" type="bar" data={growthRateData} options={HOR_OPTIONS(v => v + '%')} height={250} />
            </ACard>

          </Grid2>

          {/* Row 2: grid intensity chart */}
          <ACard
            index={2}
            title="Carbon intensity of electricity grids powering AI (gCO₂/kWh)"
            sub="Transitioning to renewables is one of the highest-impact levers for reducing AI's footprint"
            source="Grid intensity data: IEA 2024 · values are approximate national averages"
          >
            <CanvasChart id="gridIntensity" type="bar" data={gridIntensityData} options={BASE_OPTIONS(v => v + ' gCO₂/kWh')} height={220} />
          </ACard>

        </TabPanel>
      )}

    </div>
  )
}

/* ─────────────────────────────────────────────
   STAGGER ROW  (used in Context perspective card)
   Each stat row slides in with its own delay.
───────────────────────────────────────────── */
function StaggerRow({ children, delay, animKey }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'none'
    el.style.opacity    = '0'
    el.style.transform  = 'translateX(-10px)'
    void el.offsetHeight
    setTimeout(() => {
      el.style.transition = `opacity 320ms cubic-bezier(0.22,1,0.36,1), transform 320ms cubic-bezier(0.22,1,0.36,1)`
      el.style.opacity   = '1'
      el.style.transform = 'translateX(0px)'
    }, delay)
  }, [animKey])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.25rem',
        padding: '1rem 0',
        borderBottom: '1px solid var(--glass-border)',
        opacity: 0,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}