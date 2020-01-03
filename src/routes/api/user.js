/**
 * @description user 路由
 * @author 王子豪
 */

const router = require('koa-router')()
const { isExist, register, isLogin, isDelete } = require('../../controller/user')
const userValidateFunction = require('../../validate/user')
const { genValidate } = require('../../middlewares/validate')
const { isTest } = require('../../utils/env')

router.prefix('/api/user')
router.post('/register', genValidate(userValidateFunction), async (ctx, next) => {
    const {
        userName,
        password,
        gender
    } = ctx.request.body
    ctx.body = await register(userName, password, gender)
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)


})

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await isLogin({ ctx, userName, password })
})

router.post('/delete', async (ctx, next) => {
    //仅是在测试环境下使用
    if (isTest) {
        const { nickName } = ctx.session.userInfo
        ctx.body = await isDelete(nickName)
    }
})

module.exports = router