/**
 * @description user数据库中数据处理
 * @author 王子豪
 */

const {User} = require('../db/model/index')
const formatUser = require('./_format')
const doMd5 = require('../utils/md5')
/**
 * 
 * @param {string} userName  用户名
 * @param {string} password 密码
 */

async function  getUserInfo(userName,password){
    let whereObj = {userName}
    if(password) Object.assign(whereObj,{password})
    let result  = await User.findOne({
        attributes:['id','nickName','picture','city'],
        where:whereObj
    })
    //未找到
    if(result==null){
        return result
    }
    return formatUser(result.dataValues)
}

//注册用户
async function addUser(userName,password,gender){
    let result = await User.create({userName,password:doMd5(password),gender,nickName:userName})
    if(result.dataValues==null) return result
    return result.dataValues
}

module.exports = {
    getUserInfo,
    addUser
    
}