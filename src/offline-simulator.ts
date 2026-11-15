/** Isolated policy simulator: no clients, network, persistence or production imports. */
export const roles = ['identifier', 'validator', 'service', 'sales', 'after-service'] as const;
export type Role = typeof roles[number];
export type State = { role: Role; optedOut: boolean; humanRequested: boolean };
export type Turn = { message: string; intent?: 'general' | 'quote' | 'private'; reference?: string; claimsVerified?: boolean };
export type Result = { state: State; decision: 'stopped' | 'human' | 'validation_pending' | 'public_information' | 'draft_for_review'; source: 'simulation'; effects: readonly []; identity: 'pending' };

export function simulate(state: State, turn: Turn): Result {
  const message = turn.message.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const next = { ...state };
  let decision: Result['decision'];
  if (next.optedOut || /\b(stop|pare|sair|cancelar contato)\b|nao (me )?(mande|envie)|nao quero (mais )?(mensagens|contato)/.test(message)) {
    next.optedOut = true;
    decision = 'stopped';
  } else if (next.humanRequested || /humano|pessoa|atendente/.test(message)) {
    next.humanRequested = true;
    decision = 'human';
  } else if (/ignore|instrucoes|system prompt|senha|token|cartao|cpf/.test(message)) {
    next.humanRequested = true;
    decision = 'human';
  } else if (turn.intent === 'private' || /boleto|pix|pagamento|contrato|meu projeto|minha proposta/.test(message) || next.role === 'validator' || next.role === 'after-service') {
    // References and user assertions never constitute server-side verification.
    next.role = 'validator';
    decision = 'validation_pending';
  } else if (turn.intent === 'quote' || /orcamento|proposta|desconto|parcel|preco|prazo/.test(message) || next.role === 'sales') {
    next.role = 'sales';
    decision = 'draft_for_review';
  } else {
    next.role = 'service';
    decision = 'public_information';
  }
  return { state: next, decision, source: 'simulation', effects: [], identity: 'pending' };
}

export function replay(initial: State, turns: readonly Turn[]): Result[] {
  let state = initial;
  return turns.map(turn => { const result = simulate(state, turn); state = result.state; return result; });
}
