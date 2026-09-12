// Lógica da página "Balancete": saldos devedores e credores de todas as contas.

function renderBalancete() {
  const tbody = document.getElementById("balancete-body");
  tbody.innerHTML = "";

  let totalDevedor = 0;
  let totalCredor = 0;

  BALANCETE.forEach((a) => {
    totalDevedor += a.devedor;
    totalCredor += a.credor;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.conta}</td>
      <td>${a.nome}</td>
      <td class="amount">${a.devedor ? formatCurrency(a.devedor) : "—"}</td>
      <td class="amount">${a.credor ? formatCurrency(a.credor) : "—"}</td>
    `;
    tbody.appendChild(tr);
  });

  const totalTr = document.createElement("tr");
  totalTr.className = "total-row";
  totalTr.innerHTML = `
    <td colspan="2">Total</td>
    <td class="amount">${formatCurrency(totalDevedor)}</td>
    <td class="amount">${formatCurrency(totalCredor)}</td>
  `;
  tbody.appendChild(totalTr);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!guardSession()) return;
  renderHeader();
  initCurrencyToggle(renderBalancete);
  initLogout();
  renderBalancete();
});
