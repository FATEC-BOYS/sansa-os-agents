# SANSA OS · Agents

Agentes e contratos versionados do sistema operacional da SANSA Oficina Digital.

> **Estado inicial:** especificações versionadas. Este repositório, por si só, não executa agentes nem aciona automações do ChatGPT.

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
