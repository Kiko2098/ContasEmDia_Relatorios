// Dados fictícios para efeitos de demonstração (MOCKUP).
// Nenhum valor aqui corresponde a dados reais de clientes.

const EUR_RATE = 110.265; // taxa fixa oficial CVE -> EUR

const COMPANY = {
  nif: "100100100",
  nome: "Empresa DEMO, Lda",
  atividade: "Comércio a Retalho e Prestação de Serviços",
  morada: "Achada Santo António, Praia - Santiago, Cabo Verde",
  regime: "Regime Normal de IVA",
  gestorContabilistico: "Daniela Fernandes",
};

// Faturação e despesas mensais 2026 (em CVE)
const MONTHLY = [
  { mes: "Jan", faturacao: 3820000, despesas: 2650000 },
  { mes: "Fev", faturacao: 3540000, despesas: 2480000 },
  { mes: "Mar", faturacao: 4110000, despesas: 2790000 },
  { mes: "Abr", faturacao: 3960000, despesas: 2900000 },
  { mes: "Mai", faturacao: 4280000, despesas: 3010000 },
  { mes: "Jun", faturacao: 4450000, despesas: 3120000 },
  { mes: "Jul", faturacao: 4670000, despesas: 3260000 },
  { mes: "Ago", faturacao: 4590000, despesas: 3180000 },
  { mes: "Set", faturacao: 4850000, despesas: 3120000 },
];

const KPI = {
  faturacaoMes: 4850000,
  faturacaoDeltaPct: 5.7,
  despesasMes: 3120000,
  despesasDeltaPct: -1.9,
  resultadoLiquido: 1730000,
  resultadoDeltaPct: 12.4,
  ivaAPagar: 685000,
  ivaVencimento: "15 Out 2026",
};

const OBRIGACOES = [
  { nome: "IVA - 3º Trimestre 2026", data: "15 Out 2026", estado: "pendente" },
  { nome: "IUR - Pagamento por Conta", data: "30 Set 2026", estado: "pago" },
  { nome: "Segurança Social - Setembro", data: "08 Out 2026", estado: "pendente" },
  { nome: "IVA - 2º Trimestre 2026", data: "15 Jul 2026", estado: "pago" },
  { nome: "Declaração Anual IUR 2025", data: "31 Mai 2026", estado: "pago" },
];

const DOCUMENTOS = [
  { numero: "FT 2026/184", data: "09 Set 2026", cliente: "Mercado Central, Lda", tipo: "Fatura", valor: 385000, estado: "paga" },
  { numero: "FT 2026/183", data: "05 Set 2026", cliente: "Sodade Import, SA", tipo: "Fatura", valor: 612000, estado: "paga" },
  { numero: "FT 2026/182", data: "02 Set 2026", cliente: "Casa Verde Comércio", tipo: "Fatura", valor: 214500, estado: "pendente" },
  { numero: "NC 2026/014", data: "29 Ago 2026", cliente: "Mercado Central, Lda", tipo: "Nota Crédito", valor: -35000, estado: "paga" },
  { numero: "FT 2026/181", data: "27 Ago 2026", cliente: "Praia Retail Group", tipo: "Fatura", valor: 498000, estado: "paga" },
  { numero: "FT 2026/180", data: "21 Ago 2026", cliente: "Ilha Doce Distribuição", tipo: "Fatura", valor: 176000, estado: "atrasada" },
  { numero: "FT 2026/179", data: "14 Ago 2026", cliente: "Sodade Import, SA", tipo: "Fatura", valor: 723000, estado: "paga" },
];

const BALANCO_RESUMO = {
  caixaEBancos: 6120000,
  clientes: 1840000,
  fornecedores: 950000,
  capitalProprio: 12500000,
};
