import Movimentacao from '#models/movimentacao'
import ContaCorrente from '#models/conta_corrente'
import { pixValidator } from '#validators/movimentacao'
import type { HttpContext } from '@adonisjs/core/http'
import Database from '@adonisjs/lucid/services/db'

export default class MovimentacaosController {
  async pix({ request, response }: HttpContext) {
    const { conta_origem_id, numero_conta_destino, valor } = await request.validateUsing(pixValidator)

    try {
      const result = await Database.transaction(async (trx) => {
        const contaOrigem = await ContaCorrente.query({ client: trx })
          .where('id', conta_origem_id)
          .forUpdate()
          .first()

        if (!contaOrigem) {
          return { error: { status: 400, message: 'Conta de origem não encontrada' } }
        }

        const contaDestino = await ContaCorrente.query({ client: trx })
          .where('numero_conta', numero_conta_destino)
          .forUpdate()
          .first()

        if (!contaDestino) {
          return { error: { status: 400, message: 'Conta de destino não encontrada' } }
        }

        if (contaOrigem.id === contaDestino.id) {
          return { error: { status: 400, message: 'Não é possível transferir para a mesma conta' } }
        }

        const saldoOrigem = Number(contaOrigem.saldo)
        if (saldoOrigem < valor) {
          return { error: { status: 400, message: 'Saldo insuficiente' } }
        }

        contaOrigem.saldo = saldoOrigem - valor
        contaDestino.saldo = Number(contaDestino.saldo) + valor

        await contaOrigem.useTransaction(trx).save()
        await contaDestino.useTransaction(trx).save()

        const movimentacao = await Movimentacao.create({
          contaOrigemId: contaOrigem.id,
          contaDestinoId: contaDestino.id,
          tipo: 'transferencia',
          valor,
          descricao: 'Transferência PIX'
        }, { client: trx })

        return { movimentacao }
      })

      if ('error' in result) {
        return response.status(result.error.status).send({ message: result.error.message })
      }

      return response.created(result.movimentacao)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao processar transferência' })
    }
  }

  async saldo({ params, response }: HttpContext) {
    const conta = await ContaCorrente.find(params.id)
    if (!conta) {
      return response.notFound({ message: 'Conta não encontrada' })
    }

    return {
      saldo: conta.saldo,
      numero_conta: conta.numeroConta,
      agencia: conta.agencia
    }
  }

  async extrato({ params, response }: HttpContext) {
    const conta = await ContaCorrente.find(params.id)
    if (!conta) {
      return response.notFound({ message: 'Conta não encontrada' })
    }

    const movimentacoes = await Movimentacao.query()
      .where('conta_origem_id', conta.id)
      .orWhere('conta_destino_id', conta.id)
      .orderBy('created_at', 'desc')

    const extrato = movimentacoes.map((mov) => ({
      id: mov.id,
      tipo: mov.tipo,
      valor: mov.contaOrigemId === conta.id ? -mov.valor : mov.valor,
      descricao: mov.descricao,
      data: mov.createdAt,
    }))

    return {
      conta: {
        numero_conta: conta.numeroConta,
        agencia: conta.agencia,
      },
      extrato,
    }
  }
}