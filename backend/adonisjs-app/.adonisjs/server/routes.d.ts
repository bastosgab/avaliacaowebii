import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_tokens.store': { paramsTuple?: []; params?: {} }
    'access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'conta_correntes.store': { paramsTuple?: []; params?: {} }
    'conta_correntes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.saldo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.extrato': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.pix': { paramsTuple?: []; params?: {} }
    'investimentos.store': { paramsTuple?: []; params?: {} }
    'investimentos.resgate': { paramsTuple?: []; params?: {} }
    'investimentos.index': { paramsTuple: [ParamValue]; params: {'cliente_id': ParamValue} }
  }
  GET: {
    'profile.show': { paramsTuple?: []; params?: {} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'conta_correntes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.saldo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.extrato': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'investimentos.index': { paramsTuple: [ParamValue]; params: {'cliente_id': ParamValue} }
  }
  HEAD: {
    'profile.show': { paramsTuple?: []; params?: {} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'conta_correntes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.saldo': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'movimentacaos.extrato': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'investimentos.index': { paramsTuple: [ParamValue]; params: {'cliente_id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'access_tokens.store': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'conta_correntes.store': { paramsTuple?: []; params?: {} }
    'movimentacaos.pix': { paramsTuple?: []; params?: {} }
    'investimentos.store': { paramsTuple?: []; params?: {} }
    'investimentos.resgate': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}