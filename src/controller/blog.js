/**serviceCreateBlog
 * @description blog路由相关业务处理
 * @author 王子豪
 */

const { serviceCreateBlog ,serviceProfileBlog} = require('../services/blog')
const { SucessModel, ErrorModel } = require('../model/resModel')
const {blogCreateInfo} = require('../model/errorInfo')

const xss= require('xss')

async function createBlog(ctx,content, image) {
    const {id} = ctx.session.userInfo
    try{
        const res = await serviceCreateBlog({ userId:id,content:xss(content), image })
        return new SucessModel()
    }catch(e){
        console.log(e.stack)
        return new ErrorModel(blogCreateInfo)
    }
}

async function getProfile(userName,pageIndex=0){
    const res = await serviceProfileBlog(userName,pageIndex)
    let blogList = res.list
    return new SucessModel({
        isEmpty:blogList.length===0,
        blogList,
        pageSize:10,
        pageIndex,
        count:res.count
    })
}

module.exports = {
    createBlog,
    getProfile
}