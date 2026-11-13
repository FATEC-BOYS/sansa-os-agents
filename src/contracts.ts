import { z } from "zod";

export const AgentKind = z.enum([
  "commercial", "customer_success", "creative", "projects",
  "finance", "operations"
]);

export const ProposedAction = z.object({
  agent: AgentKind,
  kind: z.enum(["email_draft", "whatsapp_draft", "followup_draft", "briefing", "internal_note", "project_task"]),
  title: z.string().min(3).max(160),
  summary: z.string().min(5).max(500),
  content: z.string().min(1).max(20000),
  sourceIds: z.array(z.string()).default([]),
  requiresApproval: z.literal(true),
  status: z.literal("pending_approval")
});

export type ProposedAction = z.infer<typeof ProposedAction>;

export function assertSafeProposal(value: unknown): ProposedAction {
  return ProposedAction.parse(value);
}
