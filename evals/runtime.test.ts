import {test} from "node:test";
import assert from "node:assert/strict";
import {maxPerRun,saoPauloDay,canPropose,policyFilesRequired} from "../src/agent-runtime.js";

test("date respects Sao Paulo rather than UTC",()=>{
  assert.equal(saoPauloDay(new Date("2026-11-13T00:30:00Z")),"2026-11-12");
});
test("never process more than 3 items per run",()=>{
  assert.equal(maxPerRun("999"),3);
  assert.equal(maxPerRun("2"),2);
  assert.equal(maxPerRun("0"),3);
});
test("rejects low priority or empty candidates",()=>{
  assert.equal(canPropose({id:"1",name:"Loja",category:"Moda",priorityScore:25,channel:"email"}),false);
  assert.equal(canPropose({id:"1",name:"  ",category:"Moda",priorityScore:95,channel:"whatsapp"}),false);
});
test("required safety policies must be present",()=>{
  assert.throws(()=>policyFilesRequired({commercial:"Faça abordagens",operations:"Audit"}));
  assert.doesNotThrow(()=>policyFilesRequired({commercial:"Nunca envie uma mensagem. Não insistir.",operations:"Realize verificação. Nunca fabricar logs."}));
});
