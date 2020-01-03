const router = require('koa-router')()
const { loginCheck,
    loginRedict} = require('../middlewares/routeCkeck')
router.get('/',loginCheck, async (ctx, next) => {
    ctx.body = 'koa1 string'
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
