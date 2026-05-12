/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    store: typeof routes['new_account.store']
  }
  accessTokens: {
    store: typeof routes['access_tokens.store']
    destroy: typeof routes['access_tokens.destroy']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  clientes: {
    store: typeof routes['clientes.store']
    index: typeof routes['clientes.index']
  }
  contaCorrentes: {
    store: typeof routes['conta_correntes.store']
    index: typeof routes['conta_correntes.index']
    show: typeof routes['conta_correntes.show']
  }
  movimentacaos: {
    saldo: typeof routes['movimentacaos.saldo']
    extrato: typeof routes['movimentacaos.extrato']
    pix: typeof routes['movimentacaos.pix']
  }
  investimentos: {
    store: typeof routes['investimentos.store']
    resgate: typeof routes['investimentos.resgate']
    index: typeof routes['investimentos.index']
  }
}
