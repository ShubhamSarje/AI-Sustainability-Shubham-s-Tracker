'use client'

import { useState, useEffect, useRef } from 'react'
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

const TABS = ['Energy', 'Carbon', 'Water', 'Context']

const BASE_OPTIONS = (yCallback) => ({
  responsive: true,
  maintainAspectRatio: false,
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
  plugins: { legend: { display: false }, tooltip: TOOLTIP },
  scales: {
    x: { grid: { color: GRID }, ticks: { ...TICK, callback: xCallback }, border: { color: 'transparent' } },
    y: { grid: { display: false }, ticks: TICK, border: { color: 'transparent' } },
  },
})

function CanvasChart({ id, type, data, options, height = 290 }) {
  const ref = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (chartRef.current) chartRef.current.destroy()
    chartRef.current = new Chart(ref.current, { type, data, options })
    return () => { if (chartRef.current) chartRef.current.destroy() }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
      <canvas ref={ref} id={id} />
    </div>
  )
}

function Grid2({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '14px', marginBottom: '14px' }}>
      {children}
    </div>
  )
}

export default function Dashboard() {
  const [active, setActive] = useState('Energy')

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2.5rem 4rem' }}>

      {/* Tab Nav */}
      <div style={{ display: 'flex', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '4px', width: 'fit-content', marginBottom: '1.5rem' }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActive(tab)} style={{
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            padding: '8px 22px',
            background: active === tab ? 'var(--green-dim)' : 'transparent',
            border: active === tab ? '1px solid rgba(74,200,100,0.22)' : '1px solid transparent',
            borderRadius: '8px',
            color: active === tab ? 'var(--green)' : 'var(--text3)',
            cursor: 'pointer',
            boxShadow: active === tab ? '0 0 14px rgba(74,200,100,0.1)' : 'none',
            letterSpacing: '0.04em',
            transition: 'all 0.2s',
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ENERGY */}
      {active === 'Energy' && (
        <>
          <ChartCard
            title="Global data center electricity demand (TWh) — 2019 to 2030"
            sub="AI share growing significantly · values from 2026 onward are projected"
            legend={[
              { label: 'Non-AI workloads', color: 'rgba(240,160,48,0.75)' },
              { label: 'AI workloads', color: 'rgba(74,200,100,0.75)' },
            ]}
            sourceLinks={[
              { label: 'MIT News 2025', href: 'https://news.mit.edu/2025/responding-to-generative-ai-climate-impact-0930' },
              { label: 'Nature Sustainability 2025', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
            ]}
          >
            <CanvasChart id="energyStack" type="bar" data={energyStackData} options={STACKED_OPTIONS(v => v + ' TWh')} height={290} />
          </ChartCard>

          <Grid2>
            <ChartCard title="Energy per AI action type" sub="Estimated Wh per task" source="Estimates based on published model efficiency benchmarks" style={{ marginBottom: 0 }}>
              <CanvasChart id="actionEnergy" type="bar" data={actionEnergyData} options={HOR_OPTIONS(v => v + ' Wh')} height={220} />
            </ChartCard>
            <ChartCard title="Energy cost by model size" sub="Wh per 1,000 queries" source="Smaller optimised models can reduce energy use by 10–50×" style={{ marginBottom: 0 }}>
              <CanvasChart id="modelEnergy" type="bar" data={modelEnergyData} options={BASE_OPTIONS(v => v >= 1000 ? (v / 1000) + 'k Wh' : v + ' Wh')} height={220} />
            </ChartCard>
          </Grid2>
        </>
      )}

      {/* CARBON */}
      {active === 'Carbon' && (
        <>
          <ChartCard
            title="AI data center CO₂ vs country-level emissions (Mt/year)"
            sub="Putting AI's carbon footprint in perspective"
            sourceLinks={[
              { label: 'Euronews 2025', href: 'https://www.euronews.com/next/2025/12/20/ai-data-centres-could-have-a-carbon-footprint-that-matches-small-european-country-new-stud' },
              { label: 'Nature Sustainability 2025', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
            ]}
          >
            <CanvasChart id="carbonContext" type="bar" data={carbonContextData} options={BASE_OPTIONS(v => v + ' Mt')} height={290} />
          </ChartCard>

          <Grid2>
            <ChartCard title="Projected AI CO₂ growth" sub="Mt — 2022 to 2030" source="24–44 Mt CO₂ equivalent projected annually by 2030 (Nature Sustainability)" style={{ marginBottom: 0 }}>
              <CanvasChart id="carbonGrowth" type="line" data={carbonGrowthData} options={BASE_OPTIONS(v => v + ' Mt')} height={220} />
            </ChartCard>
            <ChartCard title="Emissions by pipeline stage" sub="Share of total AI carbon output" source="Training dominates; inference growing fastest as adoption scales" style={{ marginBottom: 0 }}>
              <CanvasChart id="carbonShare" type="doughnut" data={carbonShareData} options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '62%',
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: { color: '#3d6644', font: { size: 10, family: "'DM Mono'" }, boxWidth: 10, padding: 12 },
                  },
                  tooltip: TOOLTIP,
                },
              }} height={220} />
            </ChartCard>
          </Grid2>
        </>
      )}

      {/* WATER */}
      {active === 'Water' && (
        <>
          <ChartCard
            title="Data center water consumption (bn litres/year) — 2020 to 2030"
            sub="Cooling systems are the primary driver · values from 2026 onward are projected"
            legend={[
              { label: 'Cooling systems', color: 'rgba(80,168,240,0.75)' },
              { label: 'Humidification', color: 'rgba(45,110,158,0.6)' },
            ]}
            sourceLinks={[
              { label: 'AI-EDU Arxiv 2025', href: 'https://journals.calstate.edu/ai-edu/article/view/5448' },
              { label: 'Nature Sustainability 2025', href: 'https://www.nature.com/articles/s41893-025-01681-y' },
            ]}
          >
            <CanvasChart id="waterTrend" type="bar" data={waterTrendData} options={STACKED_OPTIONS(v => v + ' bn L')} height={290} />
          </ChartCard>

          <ChartCard
            title="Water usage per 1,000 AI queries (litres) — by model size"
            sub="Smaller models use up to 150× less water per query"
            source="Varies by data center location and cooling method · figures are estimates"
          >
            <CanvasChart id="waterModel" type="bar" data={waterModelData} options={HOR_OPTIONS(v => v + ' L')} height={230} />
          </ChartCard>
        </>
      )}

      {/* CONTEXT */}
      {active === 'Context' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '14px', marginBottom: '14px' }}>

            {/* Perspective card */}
            <div style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px) saturate(1.2)', WebkitBackdropFilter: 'blur(16px) saturate(1.2)', border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '1.5rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(74,200,100,0.2), transparent)' }} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text)', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)', letterSpacing: '0.04em' }}>
                // putting the numbers in perspective
              </div>
              {[
                {
                  num: '415 TWh',
                  text: <><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Annual data center energy</strong> equals the total electricity consumption of <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Poland or South Africa</strong> for a full year.</>
                },
                {
                  num: '40 Mt CO₂',
                  text: <><strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI-related emissions</strong> match the annual output of a <strong style={{ color: 'var(--text)', fontWeight: 500 }}>mid-sized European nation</strong> like Portugal or Denmark.</>
                },
                {
                  num: '620 bn L',
                  text: <><strong style={{ color: 'var(--text)', fontWeight: 500 }}>Annual cooling water</strong> is enough to fill over <strong style={{ color: 'var(--text)', fontWeight: 500 }}>240,000 Olympic swimming pools</strong> every single year.</>
                },
              ].map(({ num, text }) => (
                <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '17px', fontWeight: 500, color: 'var(--green)', minWidth: '100px', lineHeight: 1.3, textShadow: '0 0 20px rgba(74,200,100,0.3)' }}>
                    {num}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.7 }}>{text}</div>
                </div>
              ))}
            </div>

            <ChartCard title="Annual energy demand growth by sector" sub="% per year — AI vs other industries" source="AI data center growth significantly outpaces most other sectors" style={{ marginBottom: 0 }}>
              <CanvasChart id="growthRate" type="bar" data={growthRateData} options={HOR_OPTIONS(v => v + '%')} height={250} />
            </ChartCard>
          </div>

          <ChartCard
            title="Carbon intensity of electricity grids powering AI (gCO₂/kWh)"
            sub="Transitioning to renewables is one of the highest-impact levers for reducing AI's footprint"
            source="Grid intensity data: IEA 2024 · values are approximate national averages"
          >
            <CanvasChart id="gridIntensity" type="bar" data={gridIntensityData} options={BASE_OPTIONS(v => v + ' gCO₂/kWh')} height={220} />
          </ChartCard>
        </>
      )}

    </div>
  )
}