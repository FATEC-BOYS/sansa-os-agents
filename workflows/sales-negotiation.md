# Negociação comercial SANSA — versão segura v0.6

## Caminho feliz
Contato com intenção clara → qualificação inicial → diagnóstico/briefing → serviço e modalidade → proposta preliminar → aprovação humana → envio manual/permitido → aceite documentado → contrato → cobrança do PSP → confirmação por webhook → execução do projeto → pós-atendimento.

## Kit de produtos
**Landing page, site institucional, identidade visual, UI/UX e redesign** são ofertas padronizadas para triagem, com três complexidades: Essencial, Completo, Sob medida. Cada caso ainda exige avaliação do objetivo, escopo final, risco técnico, integrações e recursos disponíveis. Sem preço automático.

### Quando sugerir cada negociação
- Escopo definido e curto: projeto fechado.
- Cliente sem orçamento para tudo: reduzir escopo ou fasear entregas, sem mascarar uma redução de preço.
- Necessidade que continua depois do projeto: recorrência apenas para manutenção/suporte bem delimitado.
- Objeção de preço: comparar valor e entregáveis, fazer pergunta exploratória, oferecer alternativa reduzida.
- Objeção de prazo: sem promessa antes de checar capacidade de execução.
- Concorrência: explicar diferenças objetivas, nunca denegrir outro estúdio.
- Pagamento: só condições efetivamente aprovadas, não "Pix" fabricado.

## Autorizações
O sistema pode coletar requisitos públicos e preparar documentos, mas **não pode** aplicar descontos, alterar contrato, cobrar, agendar entrega firme ou confirmar pagamento. Toda exceção vai para a Central de Aprovações.

## Integração técnica
- Backend: `GET /api/sales/catalog`, `POST /api/sales/proposal-drafts`, `POST /api/sales/negotiation-drafts`, `PATCH /api/sales/drafts/:id`.
- Frontend: aba **Propostas comerciais**.
- Saída: um registro `Approval` pendente, com trilha de auditoria.
- Não se conecta ainda aos contratos, ao CRM original, à API de envio WhatsApp nem ao PSP.
