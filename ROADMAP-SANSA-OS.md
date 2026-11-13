# SANSA OS · Plano de execução e pendências

> Atualizado em 12/11/2026. **Publicação de código não é sinônimo de integração operando.**
> Fonte de verdade do comercial: planilha `SANSA | Controle de Prospecção` existente.
> Não alterar automações existentes ou substituir CRM sem autorização.

## 0. Infraestrutura

- [x] Serviços Railway separados: frontend, backend, Postgres e worker comercial/operações.
- [x] Webhook Meta com challenge e verificação criptográfica no backend, sem envio.
- [x] Painel WhatsApp (conversas recebidas reais, sem dados demonstrativos).
- [x] Estúdio comercial (catálogo, escopo, valores manuais, rascunhos de proposta e negociação).
- [ ] Tornar repositórios GitHub privados antes de tratar dados comerciais reais.
- [ ] Autenticação individual e RBAC no lugar de Basic Auth do painel.
- [ ] Logs de auditoria, políticas LGPD, retenção/remoção de conversa e gestão de incidentes.

## 1. CRM e prospecção

- [x] CRM oficial Google Sheets existente; planilha e automação externa continuam independentes.
- [x] API de espelho read-only pronta.
- [ ] Autorizar `GOOGLE_SERVICE_ACCOUNT_JSON` (scopes read-only; conta com acesso Leitor).
- [ ] Primeira sincronização real confirmada no dashboard.
- [ ] Sincronização incremental segura e agendada com controles anti-duplicação.
- [ ] Vincular propostas a linhas reais do CRM e registrar handoffs por IDs estáveis.
- [ ] Histórico de contatos, consentimento/opt-out e follow-ups que não insistem.

## 2. Meta WhatsApp (pendente de ativação da conta)

- [x] Modelagem de conversa, deduplicação de mensagens e verificação HMAC do webhook.
- [x] Roteador determinístico com cinco papéis e aprovação humana.
- [ ] Resolver código de ativação do WhatsApp Business / Meta.
- [ ] Confirmar WABA, ID do número, App Secret, verify token e webhook `messages`.
- [ ] Teste ponta-a-ponta com número autorizado.
- [ ] Separar status de envio: rascunho, aprovado, enviado, entregue, lido, falhou.
- [ ] Política de opt-in, janela de atendimento de 24h, templates para mensagens iniciadas pela empresa.
- [ ] Envios limitados, somente para contatos elegíveis e respeitando aprovação.
- [ ] Integração real com Claude/GPT para respostas com contexto revisável (hoje regras conservadoras).

## 3. Cinco agentes de atendimento — critérios de pronto

| Agente | Já existe | Próximo passo necessário |
|---|---|---|
| Identificador | Detecção de intenção e conversa pelo webhook | Histórico, classificação mais rica e opt-out compartilhado com CRM |
| Validador | Fluxo que exige referência e revisão humana | Consulta autorizada de proposta/projeto em VIU ou sistema oficial; 2º fator quando apropriado |
| Atendimento | Mensagens de apresentação e encaminhamento | Base de conhecimento real de portfólio/FAQ e respostas por IA com guardrails |
| Negociação de vendas | Estúdio comercial e respostas por regras | Ferramentas de consulta de proposta atual, limites de escopo/preço e aprovação de exceções |
| Pós-atendimento | Encaminhamento de dúvidas/pagamentos à pessoa | Consultar pedido, projeto e cobranças verificadas com PSP; nenhuma emissão via LLM |

## 4. Propostas e preços

- [x] Catálogo com landing page, site institucional, identidade visual, UI/UX e redesign.
- [x] Três versões de escopo: Essencial, Completo, Sob medida; sem valores padrão inventados.
- [x] Campos de objetivo, escopo, preço manual, prazo, condições e dependências.
- [x] Objeções: investimento, prazo, escopo, fornecedor concorrente, pagamento, follow-up.
- [x] Rascunho pendente de aprovação; edição de conteúdo/título.
- [ ] Associar versões ao CRM, registrar aceitação verificável e contrato.
- [ ] Política comercial explícita: piso por serviço, margens, aprovações e limites de desconto definidos pela fundadora.
- [ ] Orçamento detalhado com horas/custo interno e proposta PDF/versionamento, sem inventar resultados.

### Estratégias de contratação
- **Projeto fechado:** entregáveis, exclusões, revisões, preço e prazo explícitos.
- **Projeto faseado:** diagnóstico e entregas em marcos; expansão sujeita a aceite e preço novos.
- **Recorrência:** serviço e volume mensal limitado; cancelamento, SLA e reajuste descritos em contrato.

### Estratégia de negociação
1. Registrar o que cliente realmente pediu e seus critérios de sucesso.
2. Comparar o escopo solicitado com a proposta atual.
3. Se houver objeção de preço, propor alternativa com **menos escopo ou execução por fases**; nunca aplicar desconto automaticamente.
4. Se prazo não couber, consultar disponibilidade real; não prometer data.
5. Registrar proposta revisada e enviar somente com aprovação humana.
6. Não interpretar conversa como aceite, aceite como pagamento, ou pagamento como contrato.

## 5. Cobrança e WhatsApp Payments

- [x] Pesquisa sobre WhatsApp Payments/Meta Pay no Brasil e formas de pagamento pela plataforma.
- [ ] Verificar se WABA da SANSA tem recursos de Payments API disponíveis e se categoria/negócio é elegível.
- [ ] Escolher PSP (ex.: Mercado Pago, Asaas, Efí) com API de cobrança, Pix, boleto, links e webhooks; checar taxas.
- [ ] Criar contratos de domínio `PaymentIntent`, `PaymentTransaction`, `PaymentWebhook` com chaves idempotentes e reconciliação.
- [ ] Gerar cobranças **somente** após proposta/contrato aprovado e credenciais oficiais de PSP.
- [ ] Verificar assinatura de webhook do PSP antes de marcar pagamento como recebido.
- [ ] Vincular cobrança ao cliente correto (referência verificada) e enviar apenas com opt-in e política da Meta.
- [ ] Faturamento e notas fiscais: integrar prestador autorizado futuramente; nunca inventar boleto, Pix ou status.

## 6. Outras áreas da agência

- [ ] Criativo: briefs, peças, revisão e aprovação; possível handoff para VIU.
- [ ] Gestão de projetos: escopo → cronograma → tarefas → revisão → entrega.
- [ ] Sucesso do cliente: satisfação, dúvidas, aprovações e histórico.
- [ ] Financeiro: custos, receitas e conciliação real (não estimativas confundidas com pagamentos).
- [ ] Operações: monitorar saúde, exceções e execuções verificadas de todos os serviços.

## Regras de aceitação

Uma integração só muda para **ativa** depois de execução autenticada e testada no ambiente real. Propostas e cobranças não devem ser enviadas automaticamente antes de um fluxo de consentimento, revisão e confirmação verificável. Nunca usar chaves bancárias inventadas, nem dados pessoais obtidos de scraping.
