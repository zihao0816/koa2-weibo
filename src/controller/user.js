/**
 * @description user 业务逻辑处理
 * @author 王子豪
 */
const {getUserInfo,addUser,delUser}= require('../services/user')
const {  SucessModel,ErrorModel} = require('../model/resModel')
const  {isExistInfo,registerInfo,registerSuccess,loginErrorInfo,delUserInfo} =require('../model/errorInfo')
const doMd5 = require('../utils/md5')
/**
 * @param {string} userName 用户名
 */
async function isExist(userName){
    let result  = await getUserInfo(userName)
    if(result) return new SucessModel(result)
    return new ErrorModel(isExistInfo)
    
}
//注册
async function register(userName,password,gender){
    let res = await getUserInfo(userName)
    if(res) return new ErrorModel(registerSuccess)
    try{
        await addUser(userName,password,gender)
        return new SucessModel()
    }catch(e){
        return new ErrorModel(registerInfo)
    }
}   

//登录
async function isLogin({ctx,userName,password}){
    let userInfo = await getUserInfo(userName,doMd5(password))
    if(!userInfo) return new ErrorModel(loginErrorInfo)
    if(ctx.session.userInfo==null) ctx.session.userInfo =userInfo

    return new SucessModel()
}

//删除用户
async function isDelete (userName){
    let result = await delUser(userName)
    if(result) return new SucessModel()
    return new ErrorModel(delUserInfo)
}
module.exports = {
    isExist,
    register,
    isLogin,
    isDelete
}
