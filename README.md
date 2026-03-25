# 🌱 AI Sustainability — Shubham's Tracker

> An interactive data dashboard tracking the environmental footprint of artificial intelligence — energy consumption, carbon emissions, and water usage across global AI data centers.

**Live Demo →** [https://ai-sustainability-shubham-s-tracker-two.vercel.app/]

---

## 📸 Preview![AI Sustainability Dashboard](./screenshot.png)

![AI Sustainability Dashboard](https://via.placeholder.com/1200x600/050c07/4ac864?text=AI+Sustainability+Dashboard+Preview)

> _Replace the image above with a screenshot of your live dashboard_

---

## 🧭 About This Project

This dashboard is part of a LinkedIn thought leadership series on **Sustainable AI** — exploring the real-world environmental cost of AI infrastructure and advocating for responsible, efficient AI development.

As AI scales globally, so does the infrastructure powering it. Behind every model training run and AI-generated response lies a network of data centers, GPUs, cooling systems, and energy grids — all consuming real-world resources.

This tracker visualises:
- ⚡ **Energy** — Global data center electricity demand driven by AI workloads (2019–2030)
- 🌍 **Carbon** — CO₂ emissions from AI infrastructure vs country-level comparisons
- 💧 **Water** — Data center cooling water consumption by model size and scale
- 📊 **Context** — Putting the numbers in perspective against global benchmarks

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [Chart.js 4](https://www.chartjs.org/) | Interactive data visualizations |
| [Vercel](https://vercel.com/) | Deployment & hosting |
| CSS Variables + Glassmorphism | Dark futuristic UI theme |
| DM Mono / DM Sans | Typography |

---

## ✨ Features

- **4 interactive tabs** — Energy, Carbon, Water, Context
- **10 charts** — stacked bars, line charts, horizontal bars, doughnut
- **Glassmorphism UI** — frosted glass cards with green glow accents on a dark background
- **Smooth animations** — staggered card entry, tab fade transitions, chart draw animations on every render
- **Hover micro-interactions** — scale + shadow on all cards
- **Count-up KPI numbers** — animated on every tab visit
- **Fully responsive** — works on mobile, tablet, and desktop
- **Source citations** — every data point linked to published research

---

## 📊 Data Sources

All data is based on published research and reporting:

| Source | Coverage |
|---|---|
| [MIT News 2025](https://news.mit.edu/2025/responding-to-generative-ai-climate-impact-0930) | Energy demand & generative AI climate impact |
| [Nature Sustainability 2025](https://www.nature.com/articles/s41893-025-01681-y) | AI server environmental impact & net-zero pathways |
| [Euronews 2025](https://www.euronews.com/next/2025/12/20/ai-data-centres-could-have-a-carbon-footprint-that-matches-small-european-country-new-stud) | Carbon footprint comparisons |
| [AI-EDU Arxiv 2025](https://journals.calstate.edu/ai-edu/article/view/5448) | Water consumption estimates |
| IEA Data Center Report | Electricity demand & grid intensity |

> Note: Projected values (2026–2030) are estimates based on published research. Actual values may vary.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ ([download](https://nodejs.org))
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-sustainability-tracker.git

# Navigate into the project
cd ai-sustainability-tracker

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
ai-sustainability/
├── app/
│   ├── globals.css        # Global styles, CSS variables, dark theme
│   ├── layout.jsx         # Root layout & metadata
│   └── page.jsx           # Main page — composes all components
├── components/
│   ├── Header.jsx         # Sticky nav header with live badge
│   ├── Hero.jsx           # Title section with metadata
│   ├── KpiStrip.jsx       # 3 headline KPI cards (energy, carbon, water)
│   ├── Dashboard.jsx      # Tab navigation + all chart panels
│   ├── ChartCard.jsx      # Reusable glassmorphism chart container
│   ├── Footer.jsx         # Source links footer
│   └── chartData.js       # All chart datasets & Chart.js config
├── jsconfig.json          # Path alias configuration (@/)
├── next.config.js         # Next.js configuration
└── package.json
```

---

## 🎨 Design System

The UI uses a custom dark green theme built with CSS variables:

| Variable | Value | Usage |
|---|---|---|
| `--bg-deep` | `#050c07` | Page background |
| `--glass-bg` | `rgba(15,30,18,0.55)` | Card backgrounds |
| `--green` | `#4ac864` | Primary accent |
| `--text` | `#d8f0dc` | Primary text |
| `--text2` | `#7aaa84` | Secondary text |
| `--amber` | `#f0a030` | Energy accent |
| `--red` | `#f05050` | Carbon / warning accent |
| `--blue` | `#50a8f0` | Water accent |

---

## 🌱 Part of the Sustainable AI Series

This dashboard accompanies a LinkedIn content series on the environmental impact of AI:

| Post | Topic | Status |
|---|---|---|
| Post 1 | The hidden carbon footprint of AI | ✅ Published |
| Post 2 | Interactive Environmental Dashboard | ✅ Published |
| Post 3 | What makes AI so energy-intensive? | 🔜 Coming soon |
| Post 4 | Sustainable AI solutions | 🔜 Coming soon |
| Post 5 | What data scientists can do | 🔜 Coming soon |
| Post 6 | Policy & ethics | 🔜 Coming soon |
| Post 7 | My personal stand | 🔜 Coming soon |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Connect

Built by **Shubham** — Data Science student passionate about responsible AI and sustainable innovation.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/shubhamsarje)

---

> _"If AI is going to shape the future, then sustainable AI must shape AI."_
