import { test } from "node:test";
import assert from "node:assert/strict";
import { assertSafeProposal } from "../src/contracts.js";

test("ações propostas sempre exigem aprovação", () => {
  const action = assertSafeProposal({
    agent: "commercial",
    kind: "followup_draft",
    title: "Revisar retorno de parceria",
    summary: "Preparar um rascunho sem enviar",
    content: "Mensagem para aprovação",
    requiresApproval: true,
    status: "pending_approval"
  });
  assert.equal(action.requiresApproval, true);
});

test("rejeita tentativa de marcar como enviada", () => {
  assert.throws(() => assertSafeProposal({
    agent: "commercial", kind: "email_draft",
    title: "Contato", summary: "Contato sem permissão",
    content: "Mensagem", requiresApproval: false, status: "sent"
  }));
});
