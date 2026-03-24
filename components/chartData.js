export const GRID = 'rgba(74,200,100,0.07)'
export const TICK = { color: '#3d6644', font: { size: 11, family: "'DM Mono', monospace" } }
export const TOOLTIP = {
  backgroundColor: 'rgba(10,24,13,0.92)',
  borderColor: 'rgba(74,200,100,0.2)',
  borderWidth: 1,
  titleColor: '#d8f0dc',
  bodyColor: '#7aaa84',
  titleFont: { family: "'DM Mono'", size: 12 },
  bodyFont: { family: "'DM Mono'", size: 11 },
  padding: 12,
  cornerRadius: 8,
}

export const energyStackData = {
  labels: ['2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'],
  datasets: [
    { label: 'Non-AI', data: [200,205,215,225,235,245,255,265,275,285,295,310], backgroundColor: 'rgba(240,160,48,0.75)', borderRadius: 0 },
    { label: 'AI workloads', data: [10,15,25,40,75,115,160,210,270,340,410,490], backgroundColor: 'rgba(74,200,100,0.75)', borderRadius: 0 },
  ],
}

export const actionEnergyData = {
  labels: ['Image generation','Long text (1k words)','Code completion','Simple Q&A','Web search'],
  datasets: [{
    data: [30,10,3,0.3,0.06],
    backgroundColor: ['rgba(74,200,100,0.8)','rgba(74,200,100,0.7)','rgba(74,200,100,0.6)','rgba(74,200,100,0.4)','rgba(74,200,100,0.25)'],
    borderRadius: 4,
  }],
}

export const modelEnergyData = {
  labels: ['Frontier LLM','Mid-size LLM','Small optimised','Web search'],
  datasets: [{
    data: [10000,2500,300,30],
    backgroundColor: ['rgba(240,80,80,0.75)','rgba(240,160,48,0.75)','rgba(74,200,100,0.75)','rgba(80,168,240,0.75)'],
    borderRadius: 5,
  }],
}

export const carbonContextData = {
  labels: ['AI data centers\n(2025 est.)','Portugal','Switzerland','Denmark','Norway','New Zealand','Slovakia'],
  datasets: [{
    data: [40,42,34,28,8,32,27],
    backgroundColor: ['rgba(240,80,80,0.8)','rgba(74,200,100,0.25)','rgba(74,200,100,0.25)','rgba(74,200,100,0.25)','rgba(74,200,100,0.25)','rgba(74,200,100,0.25)','rgba(74,200,100,0.25)'],
    borderRadius: 5,
  }],
}

export const carbonGrowthData = {
  labels: ['2022','2023','2024','2025','2026','2027','2028','2029','2030'],
  datasets: [{
    data: [15,22,30,40,52,67,83,100,120],
    borderColor: '#f05050',
    backgroundColor: 'rgba(240,80,80,0.07)',
    fill: true, tension: 0.4,
    pointRadius: 5,
    pointBackgroundColor: '#f05050',
    pointBorderColor: '#050c07',
    pointBorderWidth: 2,
  }],
}

export const carbonShareData = {
  labels: ['Model training','Inference (queries)','Data processing','Infrastructure'],
  datasets: [{
    data: [55,30,10,5],
    backgroundColor: ['rgba(240,80,80,0.8)','rgba(240,160,48,0.75)','rgba(80,168,240,0.7)','rgba(74,200,100,0.3)'],
    borderWidth: 2,
    borderColor: 'rgba(5,12,7,0.8)',
  }],
}

export const waterTrendData = {
  labels: ['2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'],
  datasets: [
    { label: 'Cooling', data: [200,220,260,350,460,560,680,820,970,1140,1320], backgroundColor: 'rgba(80,168,240,0.75)', borderRadius: 0 },
    { label: 'Humidification', data: [30,35,40,55,75,90,110,130,155,180,210], backgroundColor: 'rgba(45,110,158,0.6)', borderRadius: 0 },
  ],
}

export const waterModelData = {
  labels: ['Frontier LLM (GPT-4 scale)','Mid-size LLM (7–13B params)','Small optimised model (<3B)','Traditional web search'],
  datasets: [{
    data: [500,150,30,3.5],
    backgroundColor: ['rgba(240,80,80,0.75)','rgba(240,160,48,0.7)','rgba(74,200,100,0.75)','rgba(80,168,240,0.7)'],
    borderRadius: 4,
  }],
}

export const growthRateData = {
  labels: ['AI data centers','Electric vehicles','Cloud (non-AI)','Global aviation','Manufacturing','Residential'],
  datasets: [{
    data: [26,18,8,3.5,2.1,1.4],
    backgroundColor: ['rgba(240,80,80,0.8)','rgba(80,168,240,0.7)','rgba(74,200,100,0.45)','rgba(74,200,100,0.3)','rgba(74,200,100,0.2)','rgba(74,200,100,0.15)'],
    borderRadius: 4,
  }],
}

export const gridIntensityData = {
  labels: ['Coal-heavy grid','Global average','US average','EU average','Nordic hydro','100% renewables'],
  datasets: [{
    data: [700,430,370,230,25,0],
    backgroundColor: ['rgba(240,80,80,0.8)','rgba(240,160,48,0.75)','rgba(240,160,48,0.6)','rgba(74,200,100,0.55)','rgba(74,200,100,0.75)','rgba(74,200,100,0.85)'],
    borderRadius: 5,
  }],
}
