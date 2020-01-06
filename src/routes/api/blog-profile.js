/**
 * @description 加载更多接口profile
 * @author 王子豪
 */

const router = require('koa-router')()
const { getProfile } = require('../../controller/blog')
const { loginCheck } = require('../../middlewares/routeCkeck')
const {getBlogListStr}  =require('../../utils/blog')
router.prefix('/api/profile')
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let { userName, pageIndex } = ctx.params
    pageIndx = parseInt(pageIndex)
    let res= await getProfile(userName, pageIndex)

    res.data.blogListTpl=getBlogListStr(res.data.blogList)
    ctx.body=res
})
module.exports = router