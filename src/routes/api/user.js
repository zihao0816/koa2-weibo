/**
 * @description user 路由
 * @author 王子豪
 */

const router = require('koa-router')()
const { isExist, register, isLogin, isDelete,updateUserInfo } = require('../../controller/user')
const userValidateFunction = require('../../validate/user')
const { genValidate } = require('../../middlewares/validate')
const {loginCheck} = require('../../middlewares/routeCkeck')
const { isTest } = require('../../utils/env')

router.prefix('/api/user')
//注册
router.post('/register', genValidate(userValidateFunction), async (ctx, next) => {
    const {
        userName,
        password,
        gender
    } = ctx.request.body
    ctx.body = await register(userName, password, gender)
})
//查询用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)


})
//用户名登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await isLogin({ ctx, userName, password })
})
//删除当前用户仅在单元测试下面使用
router.post('/delete',loginCheck, async (ctx, next) => {
    //仅是在测试环境下使用
    if (isTest) {
        const { nickName } = ctx.session.userInfo
        ctx.body = await isDelete(nickName)
    }
})
//修改基本信息changeInfo
router.patch('/changeInfo',loginCheck, genValidate(userValidateFunction),async (ctx,next)=>{
    const {nickName,city,picture} = ctx.request.body
    ctx.body = await updateUserInfo(ctx,{nickName,city,picture})
})

module.exports = router