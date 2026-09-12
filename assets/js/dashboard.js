// Lógica da página "Visão Geral": KPIs, gráficos e resumo de balanço.

let revenueChart = null;
const expenseCharts = {};

function renderKPIs() {
  document.getElementById("kpi-faturacao").textContent = formatCurrency(ACUMULADO.faturacao);
  document.getElementById("kpi-despesas").textContent = formatCurrency(ACUMULADO.despesas);

  const resultadoEl = document.getElementById("kpi-resultado");
  resultadoEl.textContent = formatCurrency(ACUMULADO.resultado);
  resultadoEl.classList.toggle("negative", ACUMULADO.resultado < 0);

  const setDelta = (id, valor, valorAnterior, invert = false) => {
    const pct = ((valor - valorAnterior) / valorAnterior) * 100;
    const up = invert ? pct <= 0 : pct >= 0;
    const el = document.getElementById(id);
    el.textContent = `${pct >= 0 ? "▲" : "▼"} ${Math.abs(pct).toFixed(1)}% vs. ${ANO_ANTERIOR.ano}`;
    el.className = `kpi-delta ${up ? "up" : "down"}`;
  };
  setDelta("kpi-faturacao-delta", ACUMULADO.faturacao, ANO_ANTERIOR.faturacao);
  setDelta("kpi-despesas-delta", ACUMULADO.despesas, ANO_ANTERIOR.despesas, true);
  setDelta("kpi-resultado-delta", ACUMULADO.resultado, ANO_ANTERIOR.resultado);
}

const EXPENSE_CATEGORIES = [
  { key: "pessoal", short: "Pessoal", label: "Gastos com Pessoal", color: "#2f6399" },
  { key: "cmvmc", short: "CMVMC", label: "Custo das Mercadorias Vendidas e Matérias Consumidas", color: "#c9a15a" },
  { key: "fse", short: "FSE", label: "Fornecimentos e Serviços Externos", color: "#6c8fb0" },
  { key: "outras", short: "Outras", label: "Outras Despesas", color: "#b7c4d3" },
];

function renderRevenueLegend() {
  const legend = document.getElementById("revenue-legend");
  const items = [
    { short: "Receitas", label: "Receitas", color: FATURACAO_COLOR },
    ...EXPENSE_CATEGORIES,
  ];
  legend.innerHTML = items
    .map((it) => `<span title="${it.label}"><span class="legend-dot" style="background:${it.color};"></span>${it.short}</span>`)
    .join("");
}

function renderChart() {
  const ctx = document.getElementById("revenue-chart").getContext("2d");
  const labels = [ANO_ANTERIOR.ano, "2026"];
  const faturacao = [toDisplayValue(ANO_ANTERIOR.faturacao), toDisplayValue(ACUMULADO.faturacao)];
  const expenseSeries = EXPENSE_CATEGORIES.map((c) => [
    toDisplayValue(ANO_ANTERIOR[c.key]),
    toDisplayValue(ACUMULADO[c.key]),
  ]);

  if (revenueChart) {
    revenueChart.data.datasets[0].data = faturacao;
    expenseSeries.forEach((data, i) => { revenueChart.data.datasets[i + 1].data = data; });
    revenueChart.update();
    return;
  }

  revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Receitas",
          data: faturacao,
          backgroundColor: FATURACAO_COLOR,
          stack: "faturacao",
          borderRadius: 5,
          maxBarThickness: 60,
        },
        ...EXPENSE_CATEGORIES.map((c, i) => ({
          label: c.short,
          data: expenseSeries[i],
          backgroundColor: c.color,
          stack: "despesas",
          borderRadius: i === EXPENSE_CATEGORIES.length - 1 ? 5 : 0,
          maxBarThickness: 60,
        })),
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: {
          stacked: true,
          grid: { color: "#eef1f6" },
          ticks: {
            callback: (v) => currentCurrency === "EUR"
              ? `${(v / 1000).toFixed(0)}k €`
              : `${(v / 1000000).toFixed(1)}M`,
          },
        },
      },
    },
  });
}

function renderExpenseDonut(year, dados) {
  const values = EXPENSE_CATEGORIES.map((c) => toDisplayValue(dados[c.key]));

  const ctx = document.getElementById(`expense-chart-${year}`).getContext("2d");
  if (expenseCharts[year]) {
    expenseCharts[year].data.datasets[0].data = values;
    expenseCharts[year].update();
  } else {
    expenseCharts[year] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: EXPENSE_CATEGORIES.map((c) => c.label),
        datasets: [{
          data: values,
          backgroundColor: EXPENSE_CATEGORIES.map((c) => c.color),
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: { legend: { display: false } },
      },
    });
  }

  const legend = document.getElementById(`expense-legend-${year}`);
  legend.innerHTML = "";
  EXPENSE_CATEGORIES.forEach((c) => {
    const pct = ((dados[c.key] / dados.despesas) * 100).toFixed(1);
    const li = document.createElement("li");
    li.className = "tax-item";
    li.innerHTML = `
      <div>
        <div class="name" title="${c.label}"><span class="legend-dot" style="background:${c.color};"></span>${c.short}</div>
        <div class="date">${pct}% das despesas</div>
      </div>
      <span>${formatCurrency(dados[c.key])}</span>
    `;
    legend.appendChild(li);
  });
}

function renderExpenseBreakdown() {
  renderExpenseDonut("2025", ANO_ANTERIOR);
  renderExpenseDonut("2026", ACUMULADO);
}

function renderAll() {
  renderKPIs();
  renderChart();
  renderExpenseBreakdown();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!guardSession()) return;
  renderHeader();
  renderRevenueLegend();
  initCurrencyToggle(renderAll);
  initLogout();
  renderAll();

  document.getElementById("period-label").textContent = "Jan — Set 2026";
});
