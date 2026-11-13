# SANSA OS · Agents

Agentes e contratos versionados do sistema operacional da SANSA Oficina Digital.

> **v0.2:** worker TypeScript executável em serviço Railway independente. A execução depende de variáveis privadas e da disponibilidade do CRM; prompts de outras áreas continuam em especificação.

## Estrutura
- `agents/`: instruções por função, com limites e critérios de escalonamento.
- `schemas/`: contratos tipados de entrada, saída e decisões.
- `workflows/`: handoffs entre agentes.
- `evals/`: casos de avaliação que podem ser executados em CI.
- `src/`: validação de especificações em TypeScript.

## Como executar
```bash
npm install
npm test
npm run typecheck
```

## Regras de operação
1. Nunca presumir que um agente ou integração está ativo por existir um arquivo.
2. Nunca enviar e-mail, publicar conteúdos, cobrar clientes, firmar contratos ou movimentar dinheiro sem autorização explícita e controle técnico correspondente.
3. Cada ação externa deve gerar registro verificável de identidade, payload, resultado e data.
4. Usar CRM existente como fonte; não criar um segundo CRM independente.
5. Não incluir dados de clientes, chaves ou tokens neste repositório.
6. Não modificar automações existentes no ChatGPT. Elas são um sistema externo, sem integração automática.

O backend define ferramentas e permissões reais. Os prompts **não concedem acesso** a ferramentas sozinhos.

## Serviço Railway `sansa-os-agents` — runtime operacional

Dois agentes são executáveis:
- **Operações:** verifica a API e se o CRM já foi sincronizado; registra o resultado real no banco do SANSA OS.
- **Comercial:** recupera oportunidades locais já salvas com contato comercial e CRM recente; gera até 3 propostas por rodada (Claude, GPT ou regras por meio do backend); deixa na fila de Aprovações.

O worker é um **cron job** que faz um ciclo e termina; não consome uma instância 24 horas por dia. Agendado para `0 13 * * 1-5` (13h UTC = 10h em São Paulo, dias úteis), sem domínio público. Ele NÃO faz busca autônoma em massa em provedores externos, NÃO envia mensagens nem altera o CRM Google Sheets. A automação comercial já existente no ChatGPT continua separada.

### Credenciais (Railway → serviço sansa-os-agents → Variables)

```dotenv
AGENTS_AUTOMATION_ENABLED=true
AGENTS_API_URL=http://${{sansa-os-api.RAILWAY_PRIVATE_DOMAIN}}:3333
AGENTS_API_KEY=${{sansa-os-api.INTERNAL_API_KEY}}
MAX_DRAFTS_PER_RUN=3
NODE_ENV=production
RAILPACK_NODE_VERSION=22
```

O token é referenciado internamente, não é comitado nem exposto ao navegador. O backend precisa estar ativo. **Primeira sincronização do CRM oficial é obrigatória antes de gerar propostas automaticamente**, e a sincronização deve ser renovada ao menos a cada 7 dias.

### Local
```bash
npm install
npm run typecheck
npm test
npm run build
# Defina as variáveis do .env.example e aponte para uma API autorizada.
npm run start
```

**Status comprovável:** a API registra `AgentRun` por agente/data, e o dashboard pode exibir o último status. Ausência de oportunidades elegíveis gera relatório de rodada concluída com zero rascunhos; integração do CRM pendente gera `blocked`. Nenhuma execução é declarada feita apenas porque um cron está agendado.

## Roteiro mantido no repositório
Veja [ROADMAP-SANSA-OS.md](ROADMAP-SANSA-OS.md) para o acompanhamento consolidado de CRM, Meta, os cinco agentes, propostas, negociações, pagamentos e integrações futuras. Concluir código e passar no CI não equivale a uma integração externa autenticada.

## Zoho Mail — leitura comercial
O worker consulta `GET /api/email/status` e, se a integração tiver credenciais, executa `POST /api/email/sync` antes da rotina comercial. A API faz a leitura IMAP, deduplica as mensagens e registra rascunhos pendentes; o worker nunca recebe a senha ou o conteúdo completo dos e-mails. A sincronização acontece **nos dias úteis às 10h de São Paulo**, conforme o cron atual, e pode ser iniciada manualmente a qualquer hora no dashboard. Sem autorização, a integração fica bloqueada sem afetar a prospecção existente. **Nenhum e-mail é enviado.**
