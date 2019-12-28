/**
 * @description 页面登录注册
 * @author 王子豪
 */

const router  = require('koa-router')()

router.get('/login',async (ctx,next)=>{
    await ctx.render('login',{})
})

router.get('/register',async (ctx,next)=>{
    await ctx.render('register',{})
})

module.exports=router