// Lógica da página "Acompanhamento Mensal": totais acumulados, evolução e detalhe por mês.

let resultChart = null;

// Cores exclusivas deste gráfico (verde/vermelho) — não partilhadas com as restantes páginas.
const MENSAL_VENDAS_COLOR = "#1f9d6e";
const MENSAL_DESPESAS_COLOR = "#c1434f";

function renderResultChart() {
  const ctx = document.getElementById("result-chart").getContext("2d");
  const labels = MONTHLY.map((m) => m.mes);
  const faturacao = MONTHLY.map((m) => toDisplayValue(m.faturacao));
  const despesas = MONTHLY.map((m) => toDisplayValue(m.despesas));

  if (resultChart) {
    resultChart.data.datasets[0].data = faturacao;
    resultChart.data.datasets[1].data = despesas;
    resultChart.update();
    return;
  }

  resultChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Receitas",
          data: faturacao,
          borderColor: MENSAL_VENDAS_COLOR,
          backgroundColor: `${MENSAL_VENDAS_COLOR}2e`,
          fill: "origin",
          tension: 0.3,
          pointRadius: 3,
          borderWidth: 2,
        },
        {
          label: "Despesas",
          data: despesas,
          borderColor: MENSAL_DESPESAS_COLOR,
          backgroundColor: `${MENSAL_DESPESAS_COLOR}2e`,
          fill: "origin",
          tension: 0.3,
          pointRadius: 3,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: {
          beginAtZero: true,
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

function renderTable() {
  const tbody = document.getElementById("monthly-table-body");
  tbody.innerHTML = "";

  MONTHLY.forEach((m) => {
    const margem = ((m.resultado / m.faturacao) * 100).toFixed(1);
    const sign = m.resultado < 0 ? "negative" : "positive";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.mes} 2026</td>
      <td class="amount">${formatCurrency(m.faturacao)}</td>
      <td class="amount">${formatCurrency(m.despesas)}</td>
      <td class="amount ${sign}">${formatCurrency(m.resultado)}</td>
      <td class="center ${sign}">${margem}%</td>
    `;
    tbody.appendChild(tr);
  });

  const totalFat = MONTHLY.reduce((s, m) => s + m.faturacao, 0);
  const totalDesp = MONTHLY.reduce((s, m) => s + m.despesas, 0);
  const totalRes = totalFat - totalDesp;
  const totalMargem = ((totalRes / totalFat) * 100).toFixed(1);
  const totalSign = totalRes < 0 ? "negative" : "positive";

  const totalTr = document.createElement("tr");
  totalTr.className = "total-row";
  totalTr.innerHTML = `
    <td>Acumulado 2026</td>
    <td class="amount">${formatCurrency(totalFat)}</td>
    <td class="amount">${formatCurrency(totalDesp)}</td>
    <td class="amount ${totalSign}">${formatCurrency(totalRes)}</td>
    <td class="center ${totalSign}">${totalMargem}%</td>
  `;
  tbody.appendChild(totalTr);
}

function renderAll() {
  renderResultChart();
  renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!guardSession()) return;
  renderHeader();
  initCurrencyToggle(renderAll);
  initLogout();
  renderAll();
});
