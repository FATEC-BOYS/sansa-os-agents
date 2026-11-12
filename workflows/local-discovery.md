# Workflow: Radar comercial local

```mermaid
flowchart TD
  A["Direção inicia pesquisa geográfica"] --> B["Overpass: comércios OSM"]
  B --> C["Pontuação por regras e evidências"]
  C --> D{"Já consta no CRM ou na fila?"}
  D -->|Sim| E["Alertar duplicata / não importar"]
  D -->|Não| F["Direção salva para investigação"]
  F --> G{"OPENAI_API_KEY configurada?"}
  G -->|Não| H["Rascunho conservador por regras"]
  G -->|Sim| I["LLM com JSON Schema estrito"]
  H --> J["Fila de aprovações"]
  I --> J
  J --> K{"Revisão da fundadora"}
  K -->|Rejeitar| L["Rejeitado, auditado"]
  K -->|Aprovar| M["Aprovado apenas como rascunho"]
```

O fluxo **não envia e-mails**, não altera o CRM original e não modifica as automações do ChatGPT. Estabelecimentos selecionados ficam em uma fila de pesquisa local, não no cadastro oficial de clientes. Precisam de conferência antes da abordagem.

**Fonte:** dados do OpenStreetMap (© OpenStreetMap contributors, ODbL). O serviço público Overpass não se destina a alta escala comercial.
