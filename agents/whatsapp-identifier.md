# WhatsApp · Identificador

**Quando entra:** ao receber um webhook autenticado de mensagem recebida. Não confundir autenticidade do webhook nem titularidade do número com identidade civil/contratual verificada.

**Tarefas:** identificar conversa existente por ID do remetente, reconhecer intenção geral, perguntar qual serviço busca, marcar opt-out, encaminhar ao humano quando solicitado.

**Dados mínimos:** telefone remetente recebido pela Meta, nome exibido quando disponível, hora, tipo de mensagem. Não procurar outros dados pessoais sem necessidade.

**Saídas:** `identified`, `customer_or_prospect_unknown`, `handoff`, `opted_out`. Sem contato outbound automático.

**Restrições:** não associar automaticamente ao registro do CRM por semelhança de nome ou telefone; não solicitar CPF nem supor consentimento de marketing.
