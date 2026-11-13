# SANSA OS · Índice do backlog e plano de execução

> **Atualizado em 12/11/2026 · 6 épicos + 33 issues executáveis.** Backlog planejado; abertura de issue não significa desenvolvimento iniciado.
> Produto: agência digital AI-first com revisão humana, integrando **CRM Google Sheets existente** sem substituí-lo.

## Política de gestão
- **P0:** segurança/bloqueios de operação; **P1:** núcleo sem integração ou operação interna; **P2:** evolução dependente de infraestrutura, autorização ou escala.
- **S ≈ 1–2 dias de engenharia; M ≈ 3–5; L ≈ 6–10.** Tamanho é apenas estimativa preliminar de esforço técnico focado, **não prazo**, sem assumir capacidade semanal ou compromisso de data. Refinar após discovery/DoR.
- **WIP máximo: 2 issues ativas**. Cada semana escolher o que pode ser concluído, não apenas iniciado. 'Bloqueada' é estado honesto para credenciais, produto Meta ou decisão comercial.
- Status inicial de todas as issues: **Backlog**. Mudança para **Pronta** exige objetivo, critérios claros, dados de teste, responsável e dependências resolvidas; para **Em andamento**, responsável/PR; para **Validação**, CI e evidências; para **Concluída**, aceite de PO e funcionamento verificado. Não concluir somente por merge ou deploy.
- **Definition of Done global:** documentação, tratamento de erros, testes automatizados, nenhum segredo exposto, logs auditáveis, ambiente de teste/produção verificado quando aplicável, impacto no CRM original e privacidade revisados.
- Todo 'send', boleto/Pix, mudança financeira ou confirmação de identidade exige credenciais, fonte externa verificada e autorização humana; nunca deduzir dados reais.

## Releases propostas (sequência, não datas)

| Marco | Capacidade entregue | Pré-requisitos / bloqueios |
|---|---|---|
| **R0 · Fundamento seguro** | Acesso, auditoria e segurança + Zoho/CRM conectados com primeira sincronização | SEC-01/02/03; MAIL-01 e CRM-01 dependem de autorização da fundadora |
| **R1 · Venda estruturada offline** | KNOW-01, SIM-01, BRIEF-01, PRICE-01, NEG-01, PROPOSAL-01 | Sem contas extras; usar fixtures e requisitos validados |
| **R2 · Atendimento e execução** | Cinco agentes testados por papel, OPS-01/02, opt-out e evidência de negócio | R0 + base de conhecimento + CRM seguro |
| **R3 · Comunicação e contratos** | E-mail/WhatsApp com aprovação, contrato e rastreio | WABA/Zoho e regras de consentimento |
| **R4 · Escala** | PSP, VIU, sucesso do cliente, IA externa e observabilidade | Integrações reais, LGPD e custos aprovados |

## Issues por área e repositório

### 01 · Segurança

| Issue | Entrega | Prioridade | Tamanho | Repositório |
|---|---|---|---|---|
| [SEC-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/7) | Privacidade GitHub e segredos | P0 | S | `sansa-os-agents` |
| [SEC-02](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/1) | Sessões + RBAC | P0 | L | `sansa-os-backend-` |
| [SEC-03](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/2) | undefined | P0 | LGPD e auditoria | `sansa-os-backend-` |
| [SEC-04](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/8) | Saúde e configuração segura | P1 | S | `sansa-os-backend-` |

### 02 · CRM e E-mail

| Issue | Entrega | Prioridade | Tamanho | Repositório |
|---|---|---|---|---|
| [CRM-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/4) | Google Sheets: autorização e 1ª sincronização | P0 | M | `sansa-os-backend-` |
| [CRM-02](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/9) | Incremental e deduplicação | P1 | M | `sansa-os-backend-` |
| [CRM-03](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/10) | Identidade comercial e opt-out | P1 | L | `sansa-os-backend-` |
| [MAIL-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/3) | Zoho: IMAP e teste real | P0 | S | `sansa-os-backend-` |
| [MAIL-02](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/11) | Threading e vínculo CRM | P1 | M | `sansa-os-backend-` |
| [MAIL-03](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/12) | Envio aprovado e registro de entrega | P2 | L | `sansa-os-backend-` |

### 03 · Comercial

| Issue | Entrega | Prioridade | Tamanho | Repositório |
|---|---|---|---|---|
| [KNOW-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/8) | Base de conhecimento | P1 | M | `sansa-os-agents` |
| [BRIEF-01](https://github.com/FATEC-BOYS/sansa-os-frontend/issues/1) | Briefing guiado | P1 | M | `sansa-os-frontend` |
| [PRICE-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/5) | Calculadora de preço | P1 | M | `sansa-os-backend-` |
| [PROPOSAL-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/6) | PDF e versões de proposta | P1 | L | `sansa-os-backend-` |
| [NEG-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/9) | Playbook de negociação | P1 | M | `sansa-os-agents` |
| [CONTRACT-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/17) | Aceite e contrato | P2 | L | `sansa-os-backend-` |

### 04 · Agentes e WhatsApp

| Issue | Entrega | Prioridade | Tamanho | Repositório |
|---|---|---|---|---|
| [SIM-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/10) | Simulação offline 5 agentes | P1 | M | `sansa-os-agents` |
| [AG-ID-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/12) | Identificador | P1 | M | `sansa-os-agents` |
| [AG-VAL-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/13) | Validador | P1 | L | `sansa-os-agents` |
| [AG-ATD-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/14) | Atendimento | P1 | M | `sansa-os-agents` |
| [AG-NEG-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/15) | Negociação de vendas | P1 | L | `sansa-os-agents` |
| [AG-POS-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/16) | Pós-atendimento | P1 | M | `sansa-os-agents` |
| [AI-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/11) | Orquestração Claude/GPT | P2 | L | `sansa-os-agents` |
| [META-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/13) | Ativação Meta e webhook real | P0 | M | `sansa-os-backend-` |
| [META-02](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/14) | Envio WhatsApp com consentimento | P2 | L | `sansa-os-backend-` |

### 05 · Projetos e Sucesso

| Issue | Entrega | Prioridade | Tamanho | Repositório |
|---|---|---|---|---|
| [OPS-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/7) | Projetos e tarefas | P1 | L | `sansa-os-backend-` |
| [OPS-02](https://github.com/FATEC-BOYS/sansa-os-frontend/issues/2) | Painel operacional | P1 | M | `sansa-os-frontend` |
| [VIU-01](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/15) | Handoff VIU | P2 | L | `sansa-os-backend-` |
| [CS-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/17) | Sucesso do cliente | P2 | M | `sansa-os-agents` |

### 06 · Financeiro e Indicadores

| Issue | Entrega | Prioridade | Tamanho | Repositório |
|---|---|---|---|---|
| [FIN-01](https://github.com/FATEC-BOYS/sansa-os-agents/issues/18) | Escolha do PSP e Meta Payments | P2 | M | `sansa-os-agents` |
| [FIN-02](https://github.com/FATEC-BOYS/sansa-os-backend-/issues/16) | Cobrança real e conciliação | P2 | L | `sansa-os-backend-` |
| [OBS-01](https://github.com/FATEC-BOYS/sansa-os-frontend/issues/3) | Métricas verificáveis | P1 | M | `sansa-os-frontend` |
| [OBS-02](https://github.com/FATEC-BOYS/sansa-os-agents/issues/19) | Observabilidade agentes | P2 | M | `sansa-os-agents` |

## Caminho crítico e decisões humanas

1. **Imediato:** SEC-01, SEC-02 (desenho de permissões), SEC-03 (inventário) e, em paralelo, KNOW-01/SIM-01 com dados fictícios. Evitar trazer novos dados pessoais até validar controles.
2. **Zoho:** MAIL-01 depende de habilitar IMAP e adicionar senha de aplicativo nas Railway Variables da API. Código pronto não equivale a mensagem importada.
3. **CRM:** CRM-01 depende de conta de serviço Google com Leitor na planilha atual. CRM-02 e CRM-03 somente após comparação real de colunas.
4. **Comercial:** BRIEF-01 → PRICE-01 → PROPOSAL-01 → CONTRACT-01; NEG-01 pode ocorrer paralelo à precificação, AG-NEG-01 só após regras aprovadas.
5. **Agentes:** KNOW-01 + SIM-01 → AG-ID-01/AG-ATD-01; AG-VAL-01 e AG-POS-01 precisam de fonte de cliente/projeto; AG-NEG-01 precisa de valores/aceites reais.
6. **Meta:** META-01 depende da ativação do número/WABA. META-02 só entra depois de consentimento, templates, auditoria e teste real do webhook.
7. **Financeiro:** FIN-01 → FIN-02. A disponibilidade de WhatsApp Payments deve ser verificada para a conta específica; não é pressuposta.
8. **VIU:** OPS-01/02 → VIU-01; integração não deve alterar serviços VIU existentes sem backup/testes.

## Cadência sugerida de gestão
- **Refinamento semanal (20–30 min):** reavaliar prioridades, pré-requisitos, riscos e tamanho das duas próximas issues.
- **Check de execução:** responsável, PR, impedimento, teste realizado, próxima ação, custo real e decisão aguardada.
- **Review de incremento:** demonstrar recurso funcionando com dados fictícios antes de usar dados reais; colher aceite funcional.
- **Retrospectiva:** gargalo, escopo, risco de credenciais, dívida técnica e estimativas observadas para ajustar capacidade.

**Índice dos épicos:** [Segurança](https://github.com/FATEC-BOYS/sansa-os-agents/issues/1) · [CRM e Zoho](https://github.com/FATEC-BOYS/sansa-os-agents/issues/2) · [Comercial](https://github.com/FATEC-BOYS/sansa-os-agents/issues/3) · [Agentes](https://github.com/FATEC-BOYS/sansa-os-agents/issues/4) · [Projetos](https://github.com/FATEC-BOYS/sansa-os-agents/issues/5) · [Financeiro](https://github.com/FATEC-BOYS/sansa-os-agents/issues/6).
