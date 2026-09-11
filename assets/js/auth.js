// Autenticação simulada para o MOCKUP (sem backend real).

const VALID_NIF = "100100100";

function formatNifInput(value) {
  return value.replace(/\D/g, "").slice(0, 9);
}

function initLoginPage() {
  const form = document.getElementById("login-form");
  const nifInput = document.getElementById("nif");
  const errorBox = document.getElementById("error-msg");
  const demoBtn = document.getElementById("fill-demo");

  nifInput.addEventListener("input", () => {
    nifInput.value = formatNifInput(nifInput.value);
  });

  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      nifInput.value = VALID_NIF;
      errorBox.classList.remove("show");
      nifInput.focus();
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nif = nifInput.value.trim();

    if (nif === VALID_NIF) {
      sessionStorage.setItem("contasemdia_nif", nif);
      window.location.href = "dashboard.html";
    } else {
      errorBox.textContent = nif.length !== 9
        ? "Introduza um NIF válido com 9 dígitos."
        : "NIF não encontrado. Verifique o número ou contacte o gabinete.";
      errorBox.classList.add("show");
    }
  });
}

document.addEventListener("DOMContentLoaded", initLoginPage);
