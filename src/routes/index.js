const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  let session = ctx.session
  if(session.viewNum==null){
    session.viewNum=0
  }
  session.viewNum++
  console.log(888)
  ctx.body= {
    title:'koa json333',
    viewNum:session.viewNum
  }
})

module.exports = router
