import Investimento from '#models/investimento'
import ContaCorrente from '#models/conta_corrente'
import Movimentacao from '#models/movimentacao'
import { aplicacaoValidator, resgateValidator } from '#validators/investimento'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Database from '@adonisjs/lucid/services/db'

export default class InvestimentosController {
  async store({ request, response }: HttpContext) {
    const { cliente_id, tipo, valor } = await request.validateUsing(aplicacaoValidator) as {
      cliente_id: number
      tipo: 'poupanca' | 'titulos' | 'acoes'
      valor: number
    }

    try {
      const result = await Database.transaction(async (trx) => {
        const conta = await ContaCorrente.query({ client: trx })
          .where('cliente_id', cliente_id)
          .forUpdate()
          .first()

        if (!conta) {
          return { error: { status: 400, message: 'Cliente não possui conta corrente' } }
        }

        const saldoAtual = Number(conta.saldo)
        if (saldoAtual < valor) {
          return { error: { status: 400, message: 'Saldo insuficiente para aplicação' } }
        }

        conta.saldo = saldoAtual - valor
        await conta.useTransaction(trx).save()

        const investimento = await Investimento.create({
          clienteId: cliente_id,
          tipo,
          valorInvestido: valor,
          dataAplicacao: DateTime.local()
        }, { client: trx })

        await Movimentacao.create({
          contaOrigemId: conta.id,
          tipo: 'aplicacao',
          valor,
          descricao: `Aplicação em ${tipo}`
        }, { client: trx })

        return { investimento }
      })

      if ('error' in result) {
        return response.status(result.error.status).send({ message: result.error.message })
      }

      return response.created(result.investimento)
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao processar aplicação' })
    }
  }

  async resgate({ request, response }: HttpContext) {
    const { investimento_id } = await request.validateUsing(resgateValidator)

    try {
      const result = await Database.transaction(async (trx) => {
        const investimento = await Investimento.query({ client: trx })
          .where('id', investimento_id)
          .forUpdate()
          .first()

        if (!investimento) {
          return { error: { status: 404, message: 'Investimento não encontrado' } }
        }

        if (investimento.dataResgate) {
          return { error: { status: 400, message: 'Investimento já foi resgatado' } }
        }

        const conta = await ContaCorrente.query({ client: trx })
          .where('cliente_id', investimento.clienteId)
          .forUpdate()
          .first()

        if (!conta) {
          return { error: { status: 400, message: 'Conta corrente não encontrada' } }
        }

        conta.saldo = Number(conta.saldo) + Number(investimento.valorInvestido)
        await conta.useTransaction(trx).save()

        investimento.dataResgate = DateTime.local()
        await investimento.useTransaction(trx).save()

        await Movimentacao.create({
          contaOrigemId: conta.id,
          tipo: 'resgate',
          valor: investimento.valorInvestido,
          descricao: `Resgate de ${investimento.tipo}`
        }, { client: trx })

        return { ok: true }
      })

      if ('error' in result) {
        return response.status(result.error.status).send({ message: result.error.message })
      }

      return response.ok({ message: 'Resgate realizado com sucesso' })
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao processar resgate' })
    }
  }

  async index({ params }: HttpContext) {
    const investimentos = await Investimento.query()
      .where('cliente_id', params.cliente_id)
      .orderBy('created_at', 'desc')

    return investimentos
  }
}