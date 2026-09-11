# Contas em Dia — Portal do Cliente (Mockup)

Mockup estático de um dashboard onde os clientes do gabinete **Contas em Dia**
(Praia, Cabo Verde) podem consultar as suas contas e indicadores financeiros
através do NIF da empresa.

⚠️ **Isto é uma demonstração/mockup.** Não existe backend nem base de dados —
os valores apresentados são fictícios e servem apenas para apresentar o
conceito ao cliente.

## Empresa de demonstração

| Campo | Valor |
|---|---|
| NIF | `100100100` |
| Nome | Empresa DEMO, Lda |

Ao abrir o site, use este NIF (ou o botão "Preencher automaticamente") para
entrar na área de cliente.

## Funcionalidades demonstradas

- Login simulado por NIF da empresa
- Indicadores (KPIs): faturação, despesas, resultado líquido, IVA a pagar
- Gráfico de faturação vs. despesas mensal
- Lista de obrigações fiscais e respetivo estado
- Tabela de documentos/faturas recentes
- Resumo de balanço (caixa, clientes, fornecedores, capital próprio)
- **Alternância de moeda CVE ⇄ EUR** (taxa fixa 1 EUR = 110,265 CVE)

## Ver localmente

Não é necessário nenhum build. Basta servir a pasta com um servidor estático:

```bash
python3 -m http.server 8000
```

e abrir [http://localhost:8000](http://localhost:8000) no browser.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie este projeto:
   ```bash
   git remote add origin https://github.com/<utilizador>/<repositorio>.git
   git push -u origin main
   ```
2. No GitHub, vá a **Settings → Pages**.
3. Em "Source", escolha a branch `main` e a pasta `/ (root)`.
4. Guarde. Ao fim de cerca de um minuto o site fica disponível em:
   `https://<utilizador>.github.io/<repositorio>/`

Basta enviar esse link ao cliente para que possa navegar na demonstração.

## Estrutura

```
index.html            Página de login (entrada por NIF)
dashboard.html         Dashboard principal
assets/css/style.css   Estilos
assets/js/data.js      Dados fictícios da empresa DEMO
assets/js/auth.js      Lógica de login simulado
assets/js/dashboard.js Renderização do dashboard e conversão de moeda
assets/img/logo.png    Logótipo (recortado a partir de ContasEmDia.JPG)
```
