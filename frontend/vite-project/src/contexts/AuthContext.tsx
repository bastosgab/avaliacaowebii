import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthResponse } from '../types/index'
import { storage } from '../utils/storage'
import { api } from '../services/api'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = storage.getToken()
    const storedUser = storage.getUser()
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(storedUser)
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/login', {
        email,
        password,
      })

      const responseData = response.data as unknown as { data?: AuthResponse } & AuthResponse
      const payload = responseData.data ?? responseData
      const { user: userData, token: newToken } = payload

      storage.setToken(newToken)
      storage.setUser(userData)
      setToken(newToken)
      setUser(userData)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message
      throw new Error(backendMessage || 'Erro ao fazer login')
    }
  }

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      await api.post('/signup', {
        email,
        password,
        passwordConfirmation: password,
        fullName,
      })
    } catch (error: any) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message
      throw new Error(backendMessage || 'Erro ao criar conta')
    }
  }

  const logout = async () => {
    try {
      await api.delete('/logout')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      storage.clear()
      setToken(null)
      setUser(null)
      delete api.defaults.headers.common['Authorization']
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
