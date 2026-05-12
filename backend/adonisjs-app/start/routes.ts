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
router.delete('/logout', 'AccessTokens.destroy').middleware(middleware.auth())
router.get('/profile', 'Profile.show').middleware(middleware.auth())

router.post('/clientes', 'Clientes.store').middleware(middleware.auth())
router.get('/clientes', 'Clientes.index').middleware(middleware.auth())
router.post('/contas', 'ContaCorrentes.store').middleware(middleware.auth())
router.get('/contas/:id', 'ContaCorrentes.show').middleware(middleware.auth())
router.get('/contas/:id/saldo', 'Movimentacaos.saldo').middleware(middleware.auth())
router.get('/contas/:id/extrato', 'Movimentacaos.extrato').middleware(middleware.auth())
router.post('/pix', 'Movimentacaos.pix').middleware(middleware.auth())

router.post('/investimentos', 'Investimentos.store').middleware(middleware.auth())
router.post('/investimentos/resgate', 'Investimentos.resgate').middleware(middleware.auth())
router.get('/clientes/:cliente_id/investimentos', 'Investimentos.index').middleware(middleware.auth())
