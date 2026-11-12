# Workflow — oportunidade comercial

1. **Observação:** sincronizar CRM existente por fonte autorizada e registrar data da leitura.
2. **Classificação:** separar contato, resposta, negociação, proposta e fechamento.
3. **Proposta:** agente comercial elabora uma ação `pending_approval`, sem efeitos externos.
4. **Revisão:** fundadora aprova/rejeita; guardar trilha auditável.
5. **Execução:** uma integração separada, autenticada e explicitamente habilitada pode executar apenas a ação autorizada.
6. **Evidência:** armazenar resultado real de execução; se falhar, sinalizar falha, nunca sucesso implícito.

No MVP, o passo 5 **não existe**: aprovação não envia e-mails.
