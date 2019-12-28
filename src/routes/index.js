const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('哈哈哈')
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})


router.get('/json', async (ctx, next) => {
    // let session = ctx.session
    // if(session.viewNum==null){
    //   session.viewNum=0
    // }
    // session.viewNum++

    ctx.body= {
        title:'koa json'
    }
})

module.exports = router
