/**
 * @description user 业务逻辑处理
 * @author 王子豪
 */
const {getUserInfo}= require('../services/user')
const {  SucessModel,ErrorModel} = require('../model/resModel')
const  {isExistInfo} =require('../model/errorInfo')
/**
 * @param {string} userName 用户名
 */
async function isExist(userName){
    //业务处理无
    //调用servers 获取数据
    //返回统一格式
    let result  = await getUserInfo(userName)
    if(result){
        return new SucessModel(result)
    }else{
        return new ErrorModel(isExistInfo)
    }
}

module.exports = {
    isExist
}
