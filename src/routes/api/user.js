/**
 * @description user 路由
 * @author 王子豪
 */

const router  = require('koa-router')()
const {isExist,register} = require('../../controller/user')
const userValidateFunction = require('../../validate/user')
const { genValidate } = require('../../middlewares/validate')

router.prefix('/api/user')
router.post('/register',genValidate(userValidateFunction),async (ctx,next)=>{
    const {
        userName,
        password,
        gender
    } = ctx.request.body
    ctx.body = await register(userName,password,gender)
})

router.post('/isExist',async (ctx,next)=>{
    const {userName } = ctx.request.body
    ctx.body  = await isExist(userName)
    

})

module.exports = router