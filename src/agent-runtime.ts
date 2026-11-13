import { z } from "zod";

export const WorkItem=z.object({
  id:z.string().min(1),
  name:z.string().min(1),
  category:z.string(),
  priorityScore:z.number().int(),
  channel:z.enum(["email","whatsapp"])
});
export const WorkQueue=z.object({
  crmReady:z.boolean(),
  reason:z.string().nullable(),
  candidates:z.array(WorkItem).max(100)
});
export const Overview=z.object({
  crm:z.object({
    connected:z.boolean(),
    lastSyncedAt:z.string().nullable()
  })
}).passthrough();
export type WorkItem=z.infer<typeof WorkItem>;
export type RunReport={
  agent:"commercial"|"operations";
  runDate:string;
  status:"completed"|"blocked"|"failed";
  summary:string;
  processed:number;
  skipped:number;
};

export function saoPauloDay(now:Date):string {
  const p=new Intl.DateTimeFormat("en-CA",{
    timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"
  }).formatToParts(now);
  const value=(key:string)=>p.find(x=>x.type===key)?.value??"";
  return `${value("year")}-${value("month")}-${value("day")}`;
}
export function maxPerRun(value:string|undefined):number {
  const n=Number(value);
  return Number.isInteger(n)&&n>=1?Math.min(n,3):3;
}
export function canPropose(item:WorkItem):boolean {
  return item.priorityScore>=40 && Boolean(item.name.trim()) && ["email","whatsapp"].includes(item.channel);
}
export function policyFilesRequired(files:Record<string,string>):void {
  const commercial=files.commercial?.toLowerCase()||"";
  const operations=files.operations?.toLowerCase()||"";
  if(!commercial.includes("não insistir")||!commercial.includes("nunca envie")) {
    throw new Error("A política comercial obrigatória está ausente");
  }
  if(!operations.includes("verificação")||!operations.includes("nunca fabricar")) {
    throw new Error("A política de auditoria obrigatória está ausente");
  }
}
