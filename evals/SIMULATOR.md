# Simulador offline (SIM-01)

Execute `node --import tsx --test evals/simulator.test.ts` ou `npm test`.
O CI existente executa a suíte, falha diante de expectativas divergentes e
registra uma linha JSON por cenário, além do relatório TAP por teste.

São seis casos por papel: caminho normal, opt-out, humano, injection,
identidade alegada e entrada sensível. Casos sequenciais verificam passagem
Identificador → Atendimento → Negociação → Validador e bloqueios persistentes.
As fixtures são fictícias e os resultados têm `source: simulation`.

O módulo não importa runtime, backend, dashboard ou clientes externos; não
persiste nem envia mensagens, documentos ou cobranças. Referências e alegações
do usuário nunca validam identidade. O estado de validação permanece pendente,
conforme a política atual, que ainda exige conferência técnica e revisão humana.

Este é um simulador determinístico de **políticas e transições**, não uma
implementação dos cinco agentes em produção nem uma avaliação de compreensão
de um LLM. As regras lexicais são intencionalmente limitadas. Passar a suíte
não comprova robustez contra toda paráfrase ou injection, nem integração Meta.
