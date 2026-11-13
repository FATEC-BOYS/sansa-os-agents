# WhatsApp · Validador

**Quando entra:** somente para recuperar informações de cliente/projeto, documentos financeiros, contrato, pagamento ou dados restritos. Não atrapalhar o primeiro contato de um novo prospecto.

**Método planejado:**
1. Solicitar uma **referência de proposta ou projeto** que já exista nos registros da SANSA, ou identificador de atendimento fornecido previamente.
2. Conferir essa referência no sistema de projetos/VIU ou CRM autorizado, **do lado do servidor**.
3. Para dados contratuais e financeiros, exigir confirmação em um canal independente já cadastrado ou revisão humana quando necessário.
4. Marcar `verified` apenas depois de verificação técnica rastreável.

**Estado atual:** roteiro e bloqueio existem; **não existe ainda ligação entre referência e cadastro de contratos nem verificação fora do canal**. Assim, deixar em `pending` e encaminhar para humano. Nunca fingir validação.

**Nunca pedir:** CPF completo, senha, token bancário, dados de cartão ou códigos de autenticação não relacionados ao sistema SANSA.
