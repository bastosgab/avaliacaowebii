import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import NewAccountController from '#controllers/new_account_controller'
import AccessTokensController from '#controllers/access_tokens_controller'
import ProfileController from '#controllers/profile_controller'
import ClientesController from '#controllers/clientes_controller'
import ContaCorrentesController from '#controllers/conta_correntes_controller'
import MovimentacaosController from '#controllers/movimentacaos_controller'
import InvestimentosController from '#controllers/investimentos_controller'

router.get('/', ({ response }) => {
    return response.ok({
        message: '💰 Bem-vindo ao BANIF',
        version: '1.0.0',
        status: 'online',
    })
})

router.post('/signup', [NewAccountController, 'store'])
router.post('/login', [AccessTokensController, 'store'])
router.delete('/logout', [AccessTokensController, 'destroy']).middleware(middleware.auth())
router.get('/profile', [ProfileController, 'show']).middleware(middleware.auth())

router.post('/clientes', [ClientesController, 'store']).middleware(middleware.auth())
router.get('/clientes', [ClientesController, 'index']).middleware(middleware.auth())
router.post('/contas', [ContaCorrentesController, 'store']).middleware(middleware.auth())
router.get('/contas', [ContaCorrentesController, 'index']).middleware(middleware.auth())
router.get('/contas/:id', [ContaCorrentesController, 'show']).middleware(middleware.auth())
router.get('/contas/:id/saldo', [MovimentacaosController, 'saldo']).middleware(middleware.auth())
router.get('/contas/:id/extrato', [MovimentacaosController, 'extrato']).middleware(middleware.auth())
router.post('/pix', [MovimentacaosController, 'pix']).middleware(middleware.auth())

router.post('/investimentos', [InvestimentosController, 'store']).middleware(middleware.auth())
router.post('/investimentos/resgate', [InvestimentosController, 'resgate']).middleware(middleware.auth())
router.get('/clientes/:cliente_id/investimentos', [InvestimentosController, 'index']).middleware(middleware.auth())
