import axios, { AxiosRequestConfig,AxiosResponse} from 'axios'
import { message} from 'antd'

const HTTPSUCCESSSTATUS = 200;
const NOTLOGIN = 401;
const axiosInstance = axios.create({
    baseURL:'/api/'
})

const location = `${document.location.protocol}//${window.location.host}`;
const loginPageUrl = `${location}/login`;

async function handleResponse<T>(res: AxiosResponse<any>,): Promise<T> {
 try {
     const { data } = await res
     const { status ,message:msg} = data;
     if (status === HTTPSUCCESSSTATUS) return data.data;
     if (status === NOTLOGIN) {
         window.location.href = loginPageUrl;
         return Promise.reject();
     } else {
       
         message.error(msg);
         return Promise.reject();   
     }
     
 } catch (error) {
    message.error('网络错误');
    return Promise.reject(); 
     
 }
}


export async function get<T>(url:string ,params:any) {
    const res = await axiosInstance.get(url, {
        params,
    })
    return handleResponse<T>(res)

}
 
export async function post<T>(url: string, data?: any, options?:AxiosRequestConfig) {
    const res = await axiosInstance.post(url, data,options)
    return handleResponse<T>(res)    
}