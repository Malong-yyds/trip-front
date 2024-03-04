// 导入 Request 类和 AxiosResponse 类型  
import Request from './request';
import { AxiosResponse } from 'axios';
import { useStore } from '/@/store/modules/user';

// 导入自定义的请求配置类型  
import type { RequestConfig } from './request/types';

// 定义自定义响应的接口  
export interface CustomResponse<T> {
  data: any;
  statusCode: number;
  desc: string;
  result: T;
}


const router = useRouter()
// 扩展请求配置，添加 data 属性  
interface CustomRequestConfig<T, R> extends RequestConfig<CustomResponse<R>> {
  data?: T;
}

// 基础 URL  
const baseUrl = 'http://127.0.0.1:5000/api/';

// 创建 Request 实例并配置  
const request = new Request({
  baseURL: baseUrl,
  timeout: 1000 * 60 * 5, // 设置超时时间为5分钟  
  interceptors: {
    // 请求拦截器，可以在这里对请求进行预处理  
    requestInterceptors: (config) => {

      const userStore = useStore();
      if (userStore.token) {

        // 如果 token 存在，添加到请求头中  
        config.headers.Authorization = `Bearer ${userStore.token}`;
      }
      // console.log(config);
      
      return config
    },
    // 响应拦截器，可以在这里对响应进行后处理  
    responseInterceptors: (result: AxiosResponse) => {

      if (result.status >= 200 && result.status < 300) {
        return result.data; // 返回响应数据  
      } else if (result.status == 422) {
        alert('用户信息已失效，请重新登录')
        router.push('/login')

        throw new Error(`token失效 ${result.status}`);
      }
      else {
        throw new Error(`请联系管理人员 ${result.status}`);
      }
    },
  },
});

/**  
 * 自定义请求函数  
 *  
 * @description: 发送 HTTP 请求  
 * @generic D 请求数据的类型  
 * @generic T 响应数据的类型  
 * @param {CustomRequestConfig} config 请求配置对象  
 * @returns {Promise<CustomResponse<T>>} 返回一个解析为自定义响应的 Promise  
 */
const customRequest = <D = any, T = any>(config: CustomRequestConfig<D, T>) => {
  const { method = 'GET', data, params } = config;

  // 根据请求方法处理数据  
  if (method === 'get' || method === 'GET') {
    // GET 请求使用 params  
    config.params = data || params;
  } else if (method === 'post' || method === 'POST') {
    // POST 请求使用 data  
    config.data = data;
  } else if (method === 'delete' || method === 'DELETE') {
    // DELETE 请求通常不需要 data，但可以使用 params  
    config.params = data || params;
  } else if (method === 'put' || method === 'PUT') {
    // PUT 请求使用 data  
    config.data = data;
  }

  // 发送请求并返回 Promise  
  return request.request<CustomResponse<T>>(config);
};

// 导出自定义请求函数  
export default customRequest;