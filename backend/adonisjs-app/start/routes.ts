import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', ({ response }) => {
    return response.ok({
        message: '💰 Bem-vindo ao BANIF',
        version: '1.0.0',
        status: 'online',
    })
})

router.post('/signup', 'NewAccount.store')
router.post('/login', 'AccessTokens.store')
router.delete('/logout', 'AccessTokens.destroy')
router.get('/profile', 'Profile.show')

router.post('/clientes', 'Clientes.store')
router.get('/clientes', 'Clientes.index').middleware(middleware.auth())
router.post('/contas', 'ContaCorrentes.store')
router.get('/contas/:id', 'ContaCorrentes.show')
router.get('/contas/:id/saldo', 'Movimentacaos.saldo')
router.get('/contas/:id/extrato', 'Movimentacaos.extrato')
router.post('/pix', 'Movimentacaos.pix')

router.post('/investimentos', 'Investimentos.store')
router.post('/investimentos/resgate', 'Investimentos.resgate')
router.get('/clientes/:cliente_id/investimentos', 'Investimentos.index')
