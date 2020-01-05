/**
 * @description blog相关数据处理
 * @author 王子豪
 */

const { Blog} = require('../db/model/index')

async function serviceCreateBlog({userId,content,image}){
    let obj = {userId}
    if(!userId) return false
    if(content) obj.content =content
    if(image) obj.image =image
    const res = await Blog.create({
        content,
        image,
        userId
    })
    if(!res.dataValues) return res
    return res.dataValues
}

module.exports ={
    serviceCreateBlog
}