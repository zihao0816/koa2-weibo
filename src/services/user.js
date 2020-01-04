/**
 * @description user数据库中数据处理
 * @author 王子豪
 */

const { User } = require('../db/model/index')
const formatUser = require('./_format')
const doMd5 = require('../utils/md5')
/**
 * 
 * @param {string} userName  用户名
 * @param {string} password 密码
 */

async function getUserInfo(userName, password) {
    let whereObj = { userName }
    
    if (password) Object.assign(whereObj, { password })
    let result = await User.findOne({
        attributes: ['id', 'userName','nickName', 'picture', 'city'],
        where: whereObj
    })
    //未找到
    if (result == null) {
        return result
    }
    return formatUser(result.dataValues)
}

//注册用户
async function addUser(userName, password, gender) {
    let result = await User.create({ userName, password: doMd5(password), gender, nickName: userName })
    if (result.dataValues == null) return result
    return result.dataValues
}

//测试环境下删除用户
async function delUser(userName) {
    let result = await User.destroy({
        where: {
            userName
        }
    })
    return result > 0
}

//修改数据库中用户信息
async function serverUpdateInfo(id,obj){
    console.log(9999,obj)
    let res = await User.update(obj,{
        where:{
            id
        }
    })
    return res[0]>0
}

module.exports = {
    getUserInfo,
    addUser,
    delUser,
    serverUpdateInfo

}