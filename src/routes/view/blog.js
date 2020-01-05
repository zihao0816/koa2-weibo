/**
 * @description 微博页面
 * @author 王子豪
 */

const router = require('koa-router')()
const { loginRedict } = require('../../middlewares/routeCkeck')

router.get('/',loginRedict, async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router



