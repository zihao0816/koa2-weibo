/**
 * @description 数据定义入口
 * @author 王子豪
 */

const User  = require('./user')
const Blog =require('./blog')

Blog.belongsTo(User,{
    foreignKey:'userId'//查微博顺便查出用户
})
//User.hasMany(Blog)查用户顺便查出微博
module.exports = {
    User,
    Blog
}