// Dados fictícios para efeitos de demonstração (MOCKUP).
// Nenhum valor aqui corresponde a dados reais de clientes.

const EUR_RATE = 110.265; // taxa fixa oficial CVE -> EUR

const COMPANY = {
  nif: "100100100",
  nome: "Empresa DEMO, Lda",
  atividade: "Comércio a Retalho e Prestação de Serviços",
  morada: "Achada Santo António, Praia - Santiago, Cabo Verde",
  regime: "Regime Normal de IVA",
};

// Faturação e despesas mensais 2026 (em CVE), com despesas divididas por categoria.
// pessoal = Gastos com Pessoal
// cmvmc   = Custo das Mercadorias Vendidas e Matérias Consumidas
// fse     = Fornecimentos e Serviços Externos
// outras  = Outras Despesas
const MONTHLY = [
  { mes: "Jan", faturacao: 3820000, pessoal: 1450000, cmvmc: 900000, fse: 210000, outras: 90000 },
  { mes: "Fev", faturacao: 3540000, pessoal: 1380000, cmvmc: 1800000, fse: 200000, outras: 810000 },
  { mes: "Mar", faturacao: 4110000, pessoal: 1520000, cmvmc: 970000, fse: 210000, outras: 90000 },
  { mes: "Abr", faturacao: 3960000, pessoal: 1580000, cmvmc: 1850000, fse: 210000, outras: 620000 },
  { mes: "Mai", faturacao: 4280000, pessoal: 1630000, cmvmc: 1080000, fse: 210000, outras: 90000 },
  { mes: "Jun", faturacao: 4450000, pessoal: 1690000, cmvmc: 1130000, fse: 210000, outras: 90000 },
  { mes: "Jul", faturacao: 4670000, pessoal: 1760000, cmvmc: 1190000, fse: 220000, outras: 90000 },
  { mes: "Ago", faturacao: 4590000, pessoal: 1720000, cmvmc: 1150000, fse: 220000, outras: 90000 },
  { mes: "Set", faturacao: 4850000, pessoal: 1720000, cmvmc: 1040000, fse: 260000, outras: 100000 },
];

MONTHLY.forEach((m) => {
  m.despesas = m.pessoal + m.cmvmc + m.fse + m.outras;
  m.resultado = m.faturacao - m.despesas;
});

// Totais acumulados do ano, calculados a partir do MONTHLY (fonte única de verdade).
const ACUMULADO = {
  faturacao: MONTHLY.reduce((s, m) => s + m.faturacao, 0),
  pessoal: MONTHLY.reduce((s, m) => s + m.pessoal, 0),
  cmvmc: MONTHLY.reduce((s, m) => s + m.cmvmc, 0),
  fse: MONTHLY.reduce((s, m) => s + m.fse, 0),
  outras: MONTHLY.reduce((s, m) => s + m.outras, 0),
  despesas: MONTHLY.reduce((s, m) => s + m.despesas, 0),
  resultado: MONTHLY.reduce((s, m) => s + m.resultado, 0),
};

// Totais do período homólogo do ano anterior (Jan—Set 2025), para comparação anual.
const ANO_ANTERIOR = {
  ano: "2025",
  faturacao: 33700000,
  pessoal: 13300000,
  cmvmc: 10300000,
  fse: 1800000,
  outras: 1900000,
};
ANO_ANTERIOR.despesas = ANO_ANTERIOR.pessoal + ANO_ANTERIOR.cmvmc + ANO_ANTERIOR.fse + ANO_ANTERIOR.outras;
ANO_ANTERIOR.resultado = ANO_ANTERIOR.faturacao - ANO_ANTERIOR.despesas;

// Balanço (Demonstração da Posição Financeira) a 30 de Setembro de 2026,
// com comparativo do período homólogo do ano anterior (30 de Setembro de 2025).
const BALANCO = {
  data: "30 Set 2026",
  dataAnterior: "30 Set 2025",
  ativoNaoCorrente: [
    { nome: "Ativos Fixos Tangíveis", valor: 8300000, valorAnterior: 7600000 },
    { nome: "Ativos Intangíveis", valor: 420000, valorAnterior: 340000 },
  ],
  ativoCorrente: [
    { nome: "Inventários", valor: 2850000, valorAnterior: 2420000 },
    { nome: "Clientes", valor: 1840000, valorAnterior: 1560000 },
    { nome: "Estado e Outros Entes Públicos", valor: 190000, valorAnterior: 165000 },
    { nome: "Caixa e Depósitos Bancários", valor: 6120000, valorAnterior: 4980000 },
  ],
  passivoNaoCorrente: [
    { nome: "Financiamentos Obtidos", valor: 3200000, valorAnterior: 3600000 },
  ],
  passivoCorrente: [
    { nome: "Fornecedores", valor: 950000, valorAnterior: 820000 },
    { nome: "Estado e Outros Entes Públicos", valor: 685000, valorAnterior: 590000 },
    { nome: "Outras Contas a Pagar", valor: 195000, valorAnterior: 150000 },
  ],
  capitalProprio: [
    { nome: "Capital Social", valor: 5000000, valorAnterior: 5000000 },
    { nome: "Reservas", valor: 500000, valorAnterior: 350000 },
    { nome: "Resultados Transitados", valor: 500000, valorAnterior: 150000 },
    { nome: "Resultado Líquido do Período", valor: ACUMULADO.resultado, valorAnterior: 6405000 },
  ],
};

// Balancete (Trial Balance) acumulado a 30 de Setembro de 2026.
// Os saldos devem verificar-se: total Devedor = total Credor.
const BALANCETE = [
  { conta: "11", nome: "Caixa", devedor: 320000, credor: 0 },
  { conta: "12", nome: "Depósitos à Ordem", devedor: 5800000, credor: 0 },
  { conta: "21", nome: "Clientes", devedor: 1840000, credor: 0 },
  { conta: "22", nome: "Fornecedores", devedor: 0, credor: 950000 },
  { conta: "24", nome: "Estado - IVA a Recuperar", devedor: 190000, credor: 0 },
  { conta: "24", nome: "Estado - IVA a Pagar", devedor: 0, credor: 500000 },
  { conta: "24", nome: "Estado - Segurança Social a Pagar", devedor: 0, credor: 185000 },
  { conta: "26", nome: "Outras Contas a Pagar", devedor: 0, credor: 195000 },
  { conta: "32", nome: "Mercadorias", devedor: 2850000, credor: 0 },
  { conta: "43", nome: "Ativos Fixos Tangíveis", devedor: 8300000, credor: 0 },
  { conta: "44", nome: "Ativos Intangíveis", devedor: 420000, credor: 0 },
  { conta: "25", nome: "Financiamentos Obtidos", devedor: 0, credor: 3200000 },
  { conta: "51", nome: "Capital Social", devedor: 0, credor: 5000000 },
  { conta: "54", nome: "Reservas", devedor: 0, credor: 500000 },
  { conta: "56", nome: "Resultados Transitados", devedor: 0, credor: 500000 },
  { conta: "61", nome: "Custo das Mercadorias Vendidas e Matérias Consumidas", devedor: ACUMULADO.cmvmc, credor: 0 },
  { conta: "62", nome: "Fornecimentos e Serviços Externos", devedor: ACUMULADO.fse, credor: 0 },
  { conta: "63", nome: "Gastos com Pessoal", devedor: ACUMULADO.pessoal, credor: 0 },
  { conta: "68", nome: "Outros Gastos", devedor: ACUMULADO.outras, credor: 0 },
  { conta: "71", nome: "Receitas e Serviços Prestados", devedor: 0, credor: ACUMULADO.faturacao },
];
