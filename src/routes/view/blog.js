/**
 * @description 微博页面
 * @author 王子豪
 */

const router = require('koa-router')()
const { loginRedict } = require('../../middlewares/routeCkeck')
const {getProfile}=require('../../controller/blog')
const { isExist } = require('../../controller/user')

router.get('/',loginRedict, async (ctx, next) => {
    await ctx.render('index', {})
})

router.get('/profile',loginRedict,async (ctx, next)=>{
    const {userName} = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName',loginRedict,async (ctx, next)=>{
    const { userName: curUserName } = ctx.params
    let res = await getProfile(curUserName)
    let {isEmpty,blogList,pageIndex,pageSize,count} = res.data
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName
    let curUserInfo
   
    const isMe = myUserName === curUserName
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }
    await ctx.render('profile',{
        blogData:{
            isEmpty,
            blogList,
            pageIndex,
            pageSize,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            // fansData: {
            //     count: fansCount,
            //     list: fansList
            // },
            // followersData: {
            //     count: followersCount,
            //     list: followersList
            // },
            // amIFollowed,
            // atCount
        }
    })
})

module.exports = router



