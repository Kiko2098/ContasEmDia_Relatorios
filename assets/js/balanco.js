// Lógica da página "Balanço": Ativo, Passivo e Capital Próprio, com comparativo homólogo (N vs. N-1).

function sumValores(items) {
  return items.reduce((s, i) => s + i.valor, 0);
}

function sumValoresAnteriores(items) {
  return items.reduce((s, i) => s + i.valorAnterior, 0);
}

function sectionRow(label) {
  return `<tr class="section-row"><td colspan="3">${label}</td></tr>`;
}

function itemRow(nome, valor, valorAnterior) {
  return `<tr>
    <td>${nome}</td>
    <td class="amount">${formatCurrency(valor)}</td>
    <td class="amount secondary">${formatCurrency(valorAnterior)}</td>
  </tr>`;
}

function subtotalRow(nome, valor, valorAnterior) {
  return `<tr class="subtotal-row">
    <td>${nome}</td>
    <td class="amount">${formatCurrency(valor)}</td>
    <td class="amount secondary">${formatCurrency(valorAnterior)}</td>
  </tr>`;
}

function totalRow(nome, valor, valorAnterior) {
  return `<tr class="total-row">
    <td>${nome}</td>
    <td class="amount">${formatCurrency(valor)}</td>
    <td class="amount secondary">${formatCurrency(valorAnterior)}</td>
  </tr>`;
}

function renderAtivo() {
  const subANC = sumValores(BALANCO.ativoNaoCorrente);
  const subANCAnt = sumValoresAnteriores(BALANCO.ativoNaoCorrente);
  const subAC = sumValores(BALANCO.ativoCorrente);
  const subACAnt = sumValoresAnteriores(BALANCO.ativoCorrente);
  const total = subANC + subAC;
  const totalAnt = subANCAnt + subACAnt;

  const rows = [
    sectionRow("Ativo Não Corrente"),
    ...BALANCO.ativoNaoCorrente.map((i) => itemRow(i.nome, i.valor, i.valorAnterior)),
    subtotalRow("Subtotal Ativo Não Corrente", subANC, subANCAnt),
    sectionRow("Ativo Corrente"),
    ...BALANCO.ativoCorrente.map((i) => itemRow(i.nome, i.valor, i.valorAnterior)),
    subtotalRow("Subtotal Ativo Corrente", subAC, subACAnt),
    totalRow("Total Ativo", total, totalAnt),
  ];

  document.getElementById("ativo-body").innerHTML = rows.join("");
}

function renderPassivoCapitalProprio() {
  const subPNC = sumValores(BALANCO.passivoNaoCorrente);
  const subPNCAnt = sumValoresAnteriores(BALANCO.passivoNaoCorrente);
  const subPC = sumValores(BALANCO.passivoCorrente);
  const subPCAnt = sumValoresAnteriores(BALANCO.passivoCorrente);
  const totalPassivo = subPNC + subPC;
  const totalPassivoAnt = subPNCAnt + subPCAnt;
  const totalCP = sumValores(BALANCO.capitalProprio);
  const totalCPAnt = sumValoresAnteriores(BALANCO.capitalProprio);
  const total = totalPassivo + totalCP;
  const totalAnt = totalPassivoAnt + totalCPAnt;

  const rows = [
    sectionRow("Passivo Não Corrente"),
    ...BALANCO.passivoNaoCorrente.map((i) => itemRow(i.nome, i.valor, i.valorAnterior)),
    subtotalRow("Subtotal Passivo Não Corrente", subPNC, subPNCAnt),
    sectionRow("Passivo Corrente"),
    ...BALANCO.passivoCorrente.map((i) => itemRow(i.nome, i.valor, i.valorAnterior)),
    subtotalRow("Subtotal Passivo Corrente", subPC, subPCAnt),
    totalRow("Total Passivo", totalPassivo, totalPassivoAnt),
    sectionRow("Capital Próprio"),
    ...BALANCO.capitalProprio.map((i) => itemRow(i.nome, i.valor, i.valorAnterior)),
    totalRow("Total Capital Próprio", totalCP, totalCPAnt),
    totalRow("Total Passivo + Capital Próprio", total, totalAnt),
  ];

  document.getElementById("passivo-body").innerHTML = rows.join("");
}

function renderAll() {
  renderAtivo();
  renderPassivoCapitalProprio();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!guardSession()) return;
  renderHeader();
  initCurrencyToggle(renderAll);
  initLogout();
  renderAll();

  document.getElementById("period-label").textContent = `${BALANCO.data} vs. ${BALANCO.dataAnterior}`;
});
