/**serviceCreateBlog
 * @description blog路由相关业务处理
 * @author 王子豪
 */

const { serviceCreateBlog } = require('../services/blog')
const { SucessModel, ErrorModel } = require('../model/resModel')
const {blogCreateInfo} = require('../model/errorInfo')
async function createBlog(ctx,content, image) {
    const {id} = ctx.session.userInfo
    try{
        const res = await serviceCreateBlog({ userId:id,content, image })
        return new SucessModel()

    }catch(e){
        console.log(e.stack)
        return new ErrorModel(blogCreateInfo)
    }

}

module.exports = {
    createBlog
}