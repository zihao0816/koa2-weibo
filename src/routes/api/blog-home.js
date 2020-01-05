/**
 * @description blog相关路由
 * @author 王子豪
 */

const router = require('koa-router')()
const {createBlog} = require('../../controller/blog')
const {loginCheck} = require('../../middlewares/routeCkeck')
const userValidate = require('../../validate/blog')
const {genValidate} = require('../../middlewares/validate')

router.prefix('/api/blog')

router.post('/create',loginCheck,genValidate(userValidate),async (ctx,next)=>{
    const {content,image} = ctx.request.body
    ctx.body = await createBlog(ctx,content,image)
})

module.exports = router