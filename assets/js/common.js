// Lógica partilhada entre páginas: sessão simulada, formatação de moeda, cabeçalho e logout.

let currentCurrency = "CVE";

const FATURACAO_COLOR = "#5b4b8f";

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

function formatCurrency(cveValue) {
  const value = toDisplayValue(cveValue);
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);

  if (currentCurrency === "EUR") {
    const formatted = abs.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${sign}${formatted} €`;
  }
  const formatted = Math.round(abs).toLocaleString("pt-PT");
  return `${sign}${formatted} CVE`;
}

function renderHeader() {
  document.getElementById("company-name").textContent = COMPANY.nome;
  document.getElementById("company-nif").textContent = `NIF ${COMPANY.nif} · ${COMPANY.regime}`;
}

function initCurrencyToggle(onChange) {
  const btnCVE = document.getElementById("btn-cve");
  const btnEUR = document.getElementById("btn-eur");

  btnCVE.addEventListener("click", () => {
    if (currentCurrency === "CVE") return;
    currentCurrency = "CVE";
    btnCVE.classList.add("active");
    btnEUR.classList.remove("active");
    onChange();
  });

  btnEUR.addEventListener("click", () => {
    if (currentCurrency === "EUR") return;
    currentCurrency = "EUR";
    btnEUR.classList.add("active");
    btnCVE.classList.remove("active");
    onChange();
  });
}

function initLogout() {
  document.getElementById("btn-logout").addEventListener("click", () => {
    sessionStorage.removeItem("contasemdia_nif");
    window.location.href = "index.html";
  });
}
