/**
 * @description blog相关数据处理
 * @author 王子豪
 */

const { Blog,User} = require('../db/model/index')

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

async function serviceProfileBlog(userName,pageIndex,pageSize=10){
    let obj = {}
    if(userName) obj.userName = userName
    let res = await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize*pageIndex,
        order:[['id','desc']],
        include:[
            {
                model:User,
                attributes:['userName','nickName','picture'],
                whereOptions:obj
            }
        ]
    })
    
    let list  =  res.rows.map(row=>row.dataValues)
    list  = list.map(item=>{
        let user = item.user.dataValues
        item.user = user
        return item
    }) 
    return {
        count:res.count,
        list
    }
}

module.exports ={
    serviceCreateBlog,
    serviceProfileBlog
}