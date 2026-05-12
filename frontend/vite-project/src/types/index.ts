export interface User {
  id: number
  email: string
  fullName: string | null
  createdAt: string
}

export interface Cliente {
  id: number
  nome: string
  email: string
  cpf: string
  rua: string
  numero: string
  cidade: string
  estado: string
  createdAt: string
}

export interface ContaCorrente {
  id: number
  clienteId: number
  numeroConta: string
  agencia: string
  saldo: number
  createdAt: string
}

export interface Movimentacao {
  id: number
  contaOrigemId: number
  contaDestinoId: number | null
  tipo: 'deposito' | 'saque' | 'transferencia' | 'aplicacao' | 'resgate'
  valor: number
  descricao: string | null
  createdAt: string
}

export interface Investimento {
  id: number
  clienteId: number
  tipo: 'poupanca' | 'titulos' | 'acoes'
  valorInvestido: number
  dataAplicacao: string
  dataResgate: string | null
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiError {
  message: string
  code?: string
}
