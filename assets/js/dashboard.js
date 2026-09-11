// Lógica do dashboard: sessão simulada, formatação de moeda e gráficos.

let currentCurrency = "CVE";
let revenueChart = null;

function guardSession() {
  const nif = sessionStorage.getItem("contasemdia_nif");
  if (nif !== "100100100") {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

function toDisplayValue(cveValue) {
  if (currentCurrency === "EUR") {
    return cveValue / EUR_RATE;
  }
  return cveValue;
}

function formatCurrency(cveValue, { showSign = false } = {}) {
  const value = toDisplayValue(cveValue);
  const sign = value < 0 ? "-" : (showSign && value > 0 ? "+" : "");
  const abs = Math.abs(value);

  let formatted;
  if (currentCurrency === "EUR") {
    formatted = abs.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${sign}${formatted} €`;
  }
  formatted = Math.round(abs).toLocaleString("pt-PT");
  return `${sign}${formatted} CVE`;
}

function renderHeader() {
  document.getElementById("company-name").textContent = COMPANY.nome;
  document.getElementById("company-nif").textContent = `NIF ${COMPANY.nif} · ${COMPANY.regime}`;
}

function renderKPIs() {
  document.getElementById("kpi-faturacao").textContent = formatCurrency(KPI.faturacaoMes);
  document.getElementById("kpi-despesas").textContent = formatCurrency(KPI.despesasMes);
  document.getElementById("kpi-resultado").textContent = formatCurrency(KPI.resultadoLiquido);
  document.getElementById("kpi-iva").textContent = formatCurrency(KPI.ivaAPagar);

  const fatDelta = document.getElementById("kpi-faturacao-delta");
  fatDelta.textContent = `${KPI.faturacaoDeltaPct > 0 ? "▲" : "▼"} ${Math.abs(KPI.faturacaoDeltaPct)}% vs. mês anterior`;
  fatDelta.className = `kpi-delta ${KPI.faturacaoDeltaPct >= 0 ? "up" : "down"}`;

  const despDelta = document.getElementById("kpi-despesas-delta");
  despDelta.textContent = `${KPI.despesasDeltaPct > 0 ? "▲" : "▼"} ${Math.abs(KPI.despesasDeltaPct)}% vs. mês anterior`;
  despDelta.className = `kpi-delta ${KPI.despesasDeltaPct <= 0 ? "up" : "down"}`;

  const resDelta = document.getElementById("kpi-resultado-delta");
  resDelta.textContent = `${KPI.resultadoDeltaPct > 0 ? "▲" : "▼"} ${Math.abs(KPI.resultadoDeltaPct)}% vs. mês anterior`;
  resDelta.className = `kpi-delta ${KPI.resultadoDeltaPct >= 0 ? "up" : "down"}`;

  document.getElementById("kpi-iva-delta").textContent = `Vencimento: ${KPI.ivaVencimento}`;
}

function renderChart() {
  const ctx = document.getElementById("revenue-chart").getContext("2d");
  const labels = MONTHLY.map((m) => m.mes);
  const faturacao = MONTHLY.map((m) => toDisplayValue(m.faturacao));
  const despesas = MONTHLY.map((m) => toDisplayValue(m.despesas));

  if (revenueChart) {
    revenueChart.data.datasets[0].data = faturacao;
    revenueChart.data.datasets[1].data = despesas;
    revenueChart.update();
    return;
  }

  revenueChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Faturação",
          data: faturacao,
          backgroundColor: "#2f6399",
          borderRadius: 5,
          maxBarThickness: 26,
        },
        {
          label: "Despesas",
          data: despesas,
          backgroundColor: "#c9a15a",
          borderRadius: 5,
          maxBarThickness: 26,
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

function renderObligations() {
  const list = document.getElementById("tax-list");
  list.innerHTML = "";
  OBRIGACOES.forEach((o) => {
    const li = document.createElement("li");
    li.className = "tax-item";
    li.innerHTML = `
      <div>
        <div class="name">${o.nome}</div>
        <div class="date">${o.data}</div>
      </div>
      <span class="status-pill ${o.estado}">${o.estado.charAt(0).toUpperCase() + o.estado.slice(1)}</span>
    `;
    list.appendChild(li);
  });
}

function renderDocuments() {
  const tbody = document.getElementById("doc-table-body");
  tbody.innerHTML = "";
  DOCUMENTOS.forEach((d) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.numero}</td>
      <td>${d.data}</td>
      <td>${d.cliente}</td>
      <td class="center"><span class="badge-doc">${d.tipo}</span></td>
      <td class="amount">${formatCurrency(d.valor)}</td>
      <td class="center"><span class="status-pill ${d.estado === "paga" ? "pago" : d.estado === "pendente" ? "pendente" : "atrasado"}">${d.estado.charAt(0).toUpperCase() + d.estado.slice(1)}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderBalance() {
  document.getElementById("bal-caixa").textContent = formatCurrency(BALANCO_RESUMO.caixaEBancos);
  document.getElementById("bal-clientes").textContent = formatCurrency(BALANCO_RESUMO.clientes);
  document.getElementById("bal-fornecedores").textContent = formatCurrency(BALANCO_RESUMO.fornecedores);
  document.getElementById("bal-capital").textContent = formatCurrency(BALANCO_RESUMO.capitalProprio);
}

function renderAll() {
  renderKPIs();
  renderChart();
  renderDocuments();
  renderBalance();
}

function initCurrencyToggle() {
  const btnCVE = document.getElementById("btn-cve");
  const btnEUR = document.getElementById("btn-eur");

  btnCVE.addEventListener("click", () => {
    if (currentCurrency === "CVE") return;
    currentCurrency = "CVE";
    btnCVE.classList.add("active");
    btnEUR.classList.remove("active");
    renderAll();
  });

  btnEUR.addEventListener("click", () => {
    if (currentCurrency === "EUR") return;
    currentCurrency = "EUR";
    btnEUR.classList.add("active");
    btnCVE.classList.remove("active");
    renderAll();
  });
}

function initLogout() {
  document.getElementById("btn-logout").addEventListener("click", () => {
    sessionStorage.removeItem("contasemdia_nif");
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!guardSession()) return;
  renderHeader();
  renderObligations();
  initCurrencyToggle();
  initLogout();
  renderAll();

  document.getElementById("period-label").textContent = "Setembro 2026";
  document.getElementById("gestor-nome").textContent = COMPANY.gestorContabilistico;
});
