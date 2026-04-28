import router from '@adonisjs/core/services/router'

router.get('/teste', async () => {
  return {
    msg: 'Backend funcionando'
  }
})