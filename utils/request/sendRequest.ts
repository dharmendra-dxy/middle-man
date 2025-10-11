import axios, {AxiosRequestConfig} from "axios";

export interface requestConfig {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?:any;
}

export async function sendRequest(request: requestConfig){

  const config: AxiosRequestConfig= {
    method: request.method,
    url: request.url,
    headers: request.headers,
    params: request.params,
    data: request.body,
    validateStatus: () => true,
  }

  const start= performance.now();

  try{

    const res = await axios(config);
    const end = performance.now();

    const duration = end-start;
    const size = res.headers["Content-Type"] || 
    new TextEncoder().encode(JSON.stringify(res.data)).length;

    return {
      status: res.status,        
      statusText: res.statusText, 
      headers: Object.fromEntries(Object.entries(res.headers)),      
      data: res.data,            
      duration: Math.round(duration),
      size,
    };

  }catch(error:any){
    const end = performance.now();
    return {
      error: error.message,
      duration: Math.round(end-start),
    }
  }

}