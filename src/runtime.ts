import "node:process";
import {readFile} from "node:fs/promises";
import {SansaApi} from "./client.js";
import {saoPauloDay,maxPerRun,canPropose,policyFilesRequired,type RunReport} from "./agent-runtime.js";

async function main(){
  if(process.env.AGENTS_AUTOMATION_ENABLED!=="true"){
    console.info(JSON.stringify({event:"agents_disabled",note:"Nenhuma ação executada."}));
    return;
  }
  const commercial=await readFile(new URL("../agents/commercial.md",import.meta.url),"utf8");
  const operations=await readFile(new URL("../agents/operations.md",import.meta.url),"utf8");
  policyFilesRequired({commercial,operations});
  const api=new SansaApi(process.env.AGENTS_API_URL??"",process.env.AGENTS_API_KEY??"");
  const runDate=saoPauloDay(new Date());
  let failed=false;

  // Operations is a distinct agent: checks real system data, never invents health.
  try{
    const overview=await api.overview();
    const crm=overview.crm;
    const report:RunReport={
      agent:"operations",runDate,status:crm.connected?"completed":"blocked",
      summary:crm.connected
        ? `API acessível; CRM sincronizado pela última vez em ${crm.lastSyncedAt??"data não registrada"}. Não controla automações externas.`
        :"API acessível; CRM original ainda não foi sincronizado no SANSA OS. Integração comercial bloqueada.",
      processed:0,skipped:0
    };
    await api.report(report);
    console.info(JSON.stringify({agent:report.agent,status:report.status}));
  }catch(error){
    failed=true;
    console.error(JSON.stringify({agent:"operations",status:"failed",error:error instanceof Error?error.message:"unknown"}));
    try{await api.report({agent:"operations",runDate,status:"failed",summary:"Não foi possível verificar o estado operacional.",processed:0,skipped:0});}catch{}
  }

  // Commercial is a separate agent: makes ONLY internal, reviewable drafts.
  try{
    const queue=await api.workItems();
    if(!queue.crmReady){
      await api.report({agent:"commercial",runDate,status:"blocked",
        summary:queue.reason||"CRM não sincronizado recentemente; nenhuma proposta automática gerada.",
        processed:0,skipped:0});
      console.info(JSON.stringify({agent:"commercial",status:"blocked",reason:"crm_not_ready"}));
      return;
    }
    const limit=maxPerRun(process.env.MAX_DRAFTS_PER_RUN);
    const candidates=queue.candidates.filter(canPropose).slice(0,limit);
    let processed=0,skipped=0;
    for(const item of candidates){
      try{
        const output=await api.draft(item);
        if(output.reused)skipped++;
        else processed++;
      }catch(error){
        skipped++;
        console.error(JSON.stringify({agent:"commercial",event:"draft_failed",reason:error instanceof Error?error.message:"unknown"}));
      }
    }
    const status=candidates.length && skipped && processed===0?"failed":"completed";
    const summary=processed
      ? `${processed} rascunho(s) preparado(s) para revisão; ${skipped} não concluído(s). Nenhuma mensagem enviada.`
      : `${candidates.length===0?"Nenhuma oportunidade elegível na fila local.":"Nenhum novo rascunho criado; verifique a fila e os logs."} Nenhuma mensagem enviada.`;
    await api.report({agent:"commercial",runDate,status,summary,processed,skipped});
    console.info(JSON.stringify({agent:"commercial",status,processed,skipped}));
    if(status==="failed")failed=true;
  }catch(error){
    failed=true;
    console.error(JSON.stringify({agent:"commercial",status:"failed",error:error instanceof Error?error.message:"unknown"}));
    try{await api.report({agent:"commercial",runDate,status:"failed",summary:"Falha ao recuperar oportunidades ou registrar rascunhos.",processed:0,skipped:0});}catch{}
  }
  if(failed)process.exitCode=1;
}

await main().catch(error=>{
  console.error(JSON.stringify({event:"agents_error",error:error instanceof Error?error.message:"unknown"}));
  process.exitCode=1;
});
