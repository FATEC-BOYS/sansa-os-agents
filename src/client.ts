import {WorkQueue,Overview,type RunReport} from "./agent-runtime.js";

export class SansaApi {
  private readonly root:URL;
  constructor(url:string,private readonly apiKey:string){
    if(!apiKey||apiKey.length<24)throw new Error("AGENTS_API_KEY ausente/inválida");
    const u=new URL(url);
    if(!["http:","https:"].includes(u.protocol))throw new Error("Invalid backend URL");
    if(process.env.NODE_ENV==="production" && !u.hostname.endsWith(".railway.internal")){
      throw new Error("O worker em produção exige comunicação com backend via Railway privada");
    }
    this.root=u;
  }
  private async request<T>(path:string,init:RequestInit={},timeoutMs=35000):Promise<T>{
    const headers=new Headers(init.headers);
    headers.set("x-api-key",this.apiKey);
    headers.set("content-type","application/json");
    const response=await fetch(new URL(path,this.root),{
      ...init,headers,signal:AbortSignal.timeout(timeoutMs)
    });
    if(!response.ok){
      throw new Error(`SANSA API ${response.status} em ${path}`);
    }
    return response.json() as Promise<T>;
  }
  async overview(){
    return Overview.parse(await this.request("/api/overview"));
  }
  async workItems(){
    return WorkQueue.parse(await this.request("/api/agents/work-items"));
  }
  async draft(item:{id:string;channel:"email"|"whatsapp"}){
    return this.request<{reused?:boolean;mode?:string;provider?:string}>(
      `/api/discovery/prospects/${encodeURIComponent(item.id)}/draft`,
      {method:"POST",body:JSON.stringify({channel:item.channel,provider:"auto"})},45000
    );
  }
  async report(report:RunReport){
    return this.request<{id:string}>("/api/agents/run-report",{
      method:"POST",body:JSON.stringify(report)
    });
  }
}
