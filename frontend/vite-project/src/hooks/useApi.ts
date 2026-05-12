import { useState } from 'react'
import { api } from '../services/api'
import type { ApiError } from '../types/index'

interface UseApiState<T> {
  data: T | null
  isLoading: boolean
  error: ApiError | null
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  })

  const request = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any
  ) => {
    setState({ data: null, isLoading: true, error: null })

    try {
      const response = await api[method]<T>(url, data)
      setState({ data: response.data, isLoading: false, error: null })
      return response.data
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || 'Erro na requisição',
        code: error.response?.status,
      }
      setState({ data: null, isLoading: false, error: apiError })
      throw apiError
    }
  }

  return {
    ...state,
    request,
    get: (url: string) => request('get', url),
    post: (url: string, data: any) => request('post', url, data),
    put: (url: string, data: any) => request('put', url, data),
    delete: (url: string) => request('delete', url),
  }
}
