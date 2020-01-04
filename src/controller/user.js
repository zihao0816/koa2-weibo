/**
 * @description user 业务逻辑处理
 * @author 王子豪
 */
const { getUserInfo, addUser, delUser, serverUpdateInfo} = require('../services/user')
const { SucessModel, ErrorModel } = require('../model/resModel')
const { isExistInfo, registerInfo, registerSuccess, loginErrorInfo, delUserInfo,changeUserInfo } = require('../model/errorInfo')
const doMd5 = require('../utils/md5')
/**
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    let result = await getUserInfo(userName)
    if (result) return new SucessModel(result)
    return new ErrorModel(isExistInfo)

}
//注册
async function register(userName, password, gender) {
    let res = await getUserInfo(userName)
    if (res) return new ErrorModel(registerSuccess)
    try {
        await addUser(userName, password, gender)
        return new SucessModel()
    } catch (e) {
        return new ErrorModel(registerInfo)
    }
}

//登录
async function isLogin({ ctx, userName, password }) {
    let userInfo = await getUserInfo(userName, doMd5(password))
    if (!userInfo) return new ErrorModel(loginErrorInfo)
    if (ctx.session.userInfo == null) ctx.session.userInfo = userInfo
    return new SucessModel()
}

//删除用户
async function isDelete(userName) {
    let result = await delUser(userName)
    if (result) return new SucessModel()
    return new ErrorModel(delUserInfo)
}

//修改基本信息
async function updateUserInfo(ctx, { nickName, city, picture }) {
    const { id } = ctx.session.userInfo
    let obj = {}
    if (nickName) obj.nickName=nickName
    if(city) obj.city = city
    if(picture) obj.picture
    const res = await serverUpdateInfo(id,obj)
    if(!res) return new ErrorModel(changeUserInfo)
    Object.assign(ctx.session.userInfo,obj)
    return new SucessModel()

    
}
module.exports = {
    isExist,
    register,
    isLogin,
    isDelete,
    updateUserInfo
}
