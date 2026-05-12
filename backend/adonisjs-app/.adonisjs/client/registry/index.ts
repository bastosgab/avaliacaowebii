/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'access_tokens.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['access_tokens.store']['types'],
  },
  'access_tokens.destroy': {
    methods: ["DELETE"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['access_tokens.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'clientes.store': {
    methods: ["POST"],
    pattern: '/clientes',
    tokens: [{"old":"/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.store']['types'],
  },
  'clientes.index': {
    methods: ["GET","HEAD"],
    pattern: '/clientes',
    tokens: [{"old":"/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.index']['types'],
  },
  'conta_correntes.store': {
    methods: ["POST"],
    pattern: '/contas',
    tokens: [{"old":"/contas","type":0,"val":"contas","end":""}],
    types: placeholder as Registry['conta_correntes.store']['types'],
  },
  'conta_correntes.index': {
    methods: ["GET","HEAD"],
    pattern: '/contas',
    tokens: [{"old":"/contas","type":0,"val":"contas","end":""}],
    types: placeholder as Registry['conta_correntes.index']['types'],
  },
  'conta_correntes.show': {
    methods: ["GET","HEAD"],
    pattern: '/contas/:id',
    tokens: [{"old":"/contas/:id","type":0,"val":"contas","end":""},{"old":"/contas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['conta_correntes.show']['types'],
  },
  'movimentacaos.saldo': {
    methods: ["GET","HEAD"],
    pattern: '/contas/:id/saldo',
    tokens: [{"old":"/contas/:id/saldo","type":0,"val":"contas","end":""},{"old":"/contas/:id/saldo","type":1,"val":"id","end":""},{"old":"/contas/:id/saldo","type":0,"val":"saldo","end":""}],
    types: placeholder as Registry['movimentacaos.saldo']['types'],
  },
  'movimentacaos.extrato': {
    methods: ["GET","HEAD"],
    pattern: '/contas/:id/extrato',
    tokens: [{"old":"/contas/:id/extrato","type":0,"val":"contas","end":""},{"old":"/contas/:id/extrato","type":1,"val":"id","end":""},{"old":"/contas/:id/extrato","type":0,"val":"extrato","end":""}],
    types: placeholder as Registry['movimentacaos.extrato']['types'],
  },
  'movimentacaos.pix': {
    methods: ["POST"],
    pattern: '/pix',
    tokens: [{"old":"/pix","type":0,"val":"pix","end":""}],
    types: placeholder as Registry['movimentacaos.pix']['types'],
  },
  'investimentos.store': {
    methods: ["POST"],
    pattern: '/investimentos',
    tokens: [{"old":"/investimentos","type":0,"val":"investimentos","end":""}],
    types: placeholder as Registry['investimentos.store']['types'],
  },
  'investimentos.resgate': {
    methods: ["POST"],
    pattern: '/investimentos/resgate',
    tokens: [{"old":"/investimentos/resgate","type":0,"val":"investimentos","end":""},{"old":"/investimentos/resgate","type":0,"val":"resgate","end":""}],
    types: placeholder as Registry['investimentos.resgate']['types'],
  },
  'investimentos.index': {
    methods: ["GET","HEAD"],
    pattern: '/clientes/:cliente_id/investimentos',
    tokens: [{"old":"/clientes/:cliente_id/investimentos","type":0,"val":"clientes","end":""},{"old":"/clientes/:cliente_id/investimentos","type":1,"val":"cliente_id","end":""},{"old":"/clientes/:cliente_id/investimentos","type":0,"val":"investimentos","end":""}],
    types: placeholder as Registry['investimentos.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
