export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
  baseURL?: string
  url: string
  data?: any
  params?: any
  method?: Method
  show?: any
  headers?: any
  timeout?: number
  responseType?: ResponseType
}

export interface AxiosResponse {
  data: any
  headers: any
  request?: any
  status: number
  statusText: string
  config: AxiosRequest
}

export interface CustomResponse {
  readonly status: boolean
  readonly message: string
  data: any
  origin?: any
}
